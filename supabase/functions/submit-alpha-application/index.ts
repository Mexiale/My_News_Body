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

const OBJECTIFS = [
  'Perdre du poids',
  'Prendre de la masse',
  'Réduire le stress',
  'Mieux manger',
  'Améliorer mon sommeil',
  'Équilibre global',
];
const NIVEAUX = ['Débutant(e)', 'Intermédiaire', 'Confirmé(e)'];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
    const body = await req.json().catch(() => ({}));

    // Honeypot anti-bot : accepter silencieusement sans persister
    if (body.website && String(body.website).trim() !== '') {
      return json({ success: true });
    }

    const prenom = String(body.prenom || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const objectif = String(body.objectif || '').trim();
    const niveau = String(body.niveau || '').trim();

    if (prenom.length < 2 || prenom.length > 100) {
      return json({ error: 'Le prénom doit faire entre 2 et 100 caractères' }, 400);
    }
    if (!EMAIL_REGEX.test(email) || email.length > 254) {
      return json({ error: "Format d'email invalide" }, 400);
    }
    if (!OBJECTIFS.includes(objectif)) {
      return json({ error: 'Objectif invalide' }, 400);
    }
    if (!NIVEAUX.includes(niveau)) {
      return json({ error: "Niveau d'activité invalide" }, 400);
    }

    const admin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error } = await admin
      .from('alpha_applications')
      .insert({ prenom, email, objectif, niveau });

    if (error) {
      // 23505 = violation d'unicité → candidature déjà enregistrée
      if (error.code === '23505') {
        return json({
          success: true,
          isDuplicate: true,
          message: 'Votre candidature est déjà enregistrée. Nous revenons vers vous très vite !',
        });
      }
      console.error('alpha_applications insert error:', error.message);
      return json({ error: "Impossible d'enregistrer la candidature" }, 500);
    }

    return json({
      success: true,
      message: 'Candidature enregistrée ! Vous recevrez un email dès que votre place alpha est confirmée.',
    });
  } catch (err) {
    console.error('submit-alpha-application error:', err);
    return json({ error: 'Erreur interne du serveur' }, 500);
  }
});
