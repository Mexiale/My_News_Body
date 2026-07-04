import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const defaultOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];
const allowedOrigins = (Deno.env.get('ALLOWED_ORIGINS') || defaultOrigins.join(','))
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

const getCorsHeaders = (origin: string | null) => ({
  'Access-Control-Allow-Origin':
    origin && allowedOrigins.includes(origin.trim()) ? origin : allowedOrigins[0],
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  Vary: 'Origin',
});

const ANTHROPIC_MODEL = Deno.env.get('ANTHROPIC_MODEL') || 'claude-opus-4-8';

// Schéma JSON du programme — garanti par structured outputs (output_config.format)
const PROGRAM_SCHEMA = {
  type: 'object',
  properties: {
    resume: {
      type: 'string',
      description: "Message d'accueil personnalisé du jour, 2-3 phrases, ton bienveillant, tutoiement",
    },
    alerte: {
      anyOf: [{ type: 'string' }, { type: 'null' }],
      description:
        "null sauf si signaux préoccupants dans le check-in : alors un message bienveillant recommandant de consulter un professionnel de santé (SAMU 185 en Côte d'Ivoire en cas d'urgence)",
    },
    physique: {
      type: 'object',
      properties: {
        titre: { type: 'string' },
        duree_minutes: { type: 'integer' },
        exercices: { type: 'array', items: { type: 'string' } },
        conseil: { type: 'string' },
      },
      required: ['titre', 'duree_minutes', 'exercices', 'conseil'],
      additionalProperties: false,
    },
    nutrition: {
      type: 'object',
      properties: {
        titre: { type: 'string' },
        matin: { type: 'string' },
        midi: { type: 'string' },
        soir: { type: 'string' },
        hydratation: { type: 'string' },
      },
      required: ['titre', 'matin', 'midi', 'soir', 'hydratation'],
      additionalProperties: false,
    },
    mental: {
      type: 'object',
      properties: {
        titre: { type: 'string' },
        pratique: { type: 'string' },
        duree_minutes: { type: 'integer' },
        affirmation: { type: 'string' },
      },
      required: ['titre', 'pratique', 'duree_minutes', 'affirmation'],
      additionalProperties: false,
    },
  },
  required: ['resume', 'alerte', 'physique', 'nutrition', 'mental'],
  additionalProperties: false,
};

const SYSTEM_PROMPT = `Tu es le coach bien-être quotidien de "My New Body", une plateforme de bien-être holistique basée à Abidjan, Côte d'Ivoire. Chaque matin, tu reçois le check-in d'un testeur alpha et tu génères son programme du jour sur trois piliers : Physique, Nutrition, Mental.

Ton style : bienveillant, chaleureux, tutoiement, français naturel. Tu encourages sans culpabiliser.

Contexte local : le testeur vit en Côte d'Ivoire. Pour la nutrition, propose des aliments locaux, accessibles et abordables (attiéké, alloco, foutou, riz, igname, poisson braisé, poulet, œufs, arachide, mangue, papaye, banane, ananas, avocat, gombo, feuilles locales...), adaptés à son objectif. Reste réaliste : pas d'ingrédients exotiques introuvables à Abidjan.

Règles d'adaptation :
- Sommeil ou énergie faibles (1-2) → programme physique doux, récupération prioritaire.
- Stress élevé (4-5) → renforcer le pilier Mental (respiration, ancrage), réduire l'intensité physique.
- Douleurs élevées (4-5) → pas d'exercices sollicitant les zones douloureuses, privilégier mobilité douce.
- Bons scores partout → programme plus dynamique, progression.
- Tiens compte de l'objectif et du niveau du testeur, et de l'historique des jours précédents pour la variété et la progression.

Règles de sécurité STRICTES :
- Tu n'es PAS un médecin. Jamais de diagnostic, jamais de médicaments ou compléments.
- Si le check-in contient des signaux préoccupants (douleurs intenses persistantes, malaise, détresse psychologique, mentions inquiétantes dans les notes), remplis le champ "alerte" avec un message bienveillant recommandant de consulter un professionnel de santé, en rappelant le SAMU au 185 (Côte d'Ivoire) en cas d'urgence. Sinon "alerte" doit être null.
- Reste dans le domaine du bien-être général : mouvement, alimentation équilibrée, gestion du stress.`;

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req.headers.get('origin'));
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Méthode non autorisée' }, 405);

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY') ?? '';

    // 1. Identifier l'utilisateur via son JWT
    const authHeader = req.headers.get('Authorization') ?? '';
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: authError,
    } = await userClient.auth.getUser();

    if (authError || !user) return json({ error: 'Non authentifié' }, 401);

    const admin = createClient(supabaseUrl, serviceKey);

    // 2. Vérifier l'accès alpha
    const { data: profile } = await admin
      .from('profiles')
      .select('prenom, objectif, niveau, is_alpha_tester')
      .eq('id', user.id)
      .single();

    if (!profile?.is_alpha_tester) {
      return json({ error: "Accès alpha non activé pour ce compte" }, 403);
    }

    // 3. Date du programme (fournie par le client pour respecter son fuseau)
    const body = await req.json().catch(() => ({}));
    const dateInput = String(body.checkin_date || '');
    const programDate = /^\d{4}-\d{2}-\d{2}$/.test(dateInput)
      ? dateInput
      : new Date().toISOString().slice(0, 10);

    // 4. Idempotence : si le programme du jour existe déjà, le renvoyer
    const { data: existing } = await admin
      .from('daily_programs')
      .select('*')
      .eq('user_id', user.id)
      .eq('program_date', programDate)
      .maybeSingle();

    if (existing) return json({ success: true, program: existing, cached: true });

    // 5. Charger le check-in du jour
    const { data: checkIn } = await admin
      .from('check_ins')
      .select('*')
      .eq('user_id', user.id)
      .eq('checkin_date', programDate)
      .maybeSingle();

    if (!checkIn) {
      return json({ error: "Aucun check-in trouvé pour aujourd'hui. Fais d'abord ton check-in." }, 400);
    }

    // 6. Historique récent pour la variété/progression
    const { data: history } = await admin
      .from('daily_programs')
      .select('program_date, resume, physique')
      .eq('user_id', user.id)
      .order('program_date', { ascending: false })
      .limit(3);

    if (!anthropicKey) {
      console.error('ANTHROPIC_API_KEY manquante dans les secrets Supabase');
      return json(
        { error: "Le coach IA n'est pas encore configuré. Réessaie plus tard." },
        503
      );
    }

    // 7. Appel API Claude (structured outputs → JSON garanti conforme au schéma)
    const userPayload = {
      profil: { prenom: profile.prenom, objectif: profile.objectif, niveau: profile.niveau },
      check_in_du_jour: {
        sommeil: checkIn.sommeil,
        energie: checkIn.energie,
        stress: checkIn.stress,
        douleurs: checkIn.douleurs,
        humeur: checkIn.humeur,
        nutrition_hier: checkIn.nutrition_hier,
        notes: checkIn.notes,
      },
      programmes_precedents: (history ?? []).map((h) => ({
        date: h.program_date,
        resume: h.resume,
        physique_titre: h.physique?.titre,
      })),
    };

    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 3000,
        system: SYSTEM_PROMPT,
        output_config: { format: { type: 'json_schema', schema: PROGRAM_SCHEMA } },
        messages: [
          {
            role: 'user',
            content: `Génère le programme du jour (${programDate}) pour ce testeur :\n${JSON.stringify(userPayload, null, 2)}`,
          },
        ],
      }),
    });

    if (!anthropicResponse.ok) {
      const errBody = await anthropicResponse.text().catch(() => '');
      console.error('Anthropic API error:', anthropicResponse.status, errBody);
      return json({ error: 'Le coach IA est momentanément indisponible. Réessaie dans quelques minutes.' }, 502);
    }

    const result = await anthropicResponse.json();

    if (result.stop_reason === 'refusal') {
      console.error('Anthropic refusal:', JSON.stringify(result.stop_details ?? {}));
      return json({ error: "Le coach IA n'a pas pu générer de programme pour ce check-in." }, 502);
    }

    const textBlock = (result.content ?? []).find((b: { type: string }) => b.type === 'text');
    if (!textBlock?.text) {
      console.error('Anthropic: réponse sans bloc texte', JSON.stringify(result));
      return json({ error: 'Réponse IA invalide. Réessaie.' }, 502);
    }

    let program;
    try {
      program = JSON.parse(textBlock.text);
    } catch {
      console.error('Anthropic: JSON invalide', textBlock.text.slice(0, 500));
      return json({ error: 'Réponse IA invalide. Réessaie.' }, 502);
    }

    // 8. Persister le programme
    const { data: saved, error: insertError } = await admin
      .from('daily_programs')
      .insert({
        user_id: user.id,
        check_in_id: checkIn.id,
        program_date: programDate,
        physique: program.physique,
        nutrition: program.nutrition,
        mental: program.mental,
        resume: program.resume,
        alerte: program.alerte,
        model: result.model ?? ANTHROPIC_MODEL,
      })
      .select()
      .single();

    if (insertError) {
      // Course possible (double clic) : renvoyer le programme existant
      if (insertError.code === '23505') {
        const { data: raced } = await admin
          .from('daily_programs')
          .select('*')
          .eq('user_id', user.id)
          .eq('program_date', programDate)
          .single();
        return json({ success: true, program: raced, cached: true });
      }
      console.error('daily_programs insert error:', insertError.message);
      return json({ error: "Programme généré mais impossible de l'enregistrer" }, 500);
    }

    return json({ success: true, program: saved });
  } catch (err) {
    console.error('generate-daily-program error:', err);
    return json({ error: 'Erreur interne du serveur' }, 500);
  }
});
