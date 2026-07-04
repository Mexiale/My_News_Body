# Architecture — My New Body (Phase Alpha)

> Mise en place le 2026-07-04. Projet Supabase : `my-new-body` (`jclouhzyjsrooiykdmzu`, région eu-west-3 Paris, plan gratuit).

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│  SPA React (Vite) — landing + espace testeur                │
│                                                             │
│  /            Landing one-page (existante)                  │
│  /alpha       Connexion magic link (sans mot de passe)      │
│  /check-in    Check-in matinal (protégé, testeurs alpha)    │
│  /dashboard   Bilan du jour + historique (protégé)          │
└──────────────┬──────────────────────────────────────────────┘
               │ supabase-js (clé anon + RLS)
               ▼
┌─────────────────────────────────────────────────────────────┐
│  Supabase                                                   │
│                                                             │
│  Auth        Magic link (OTP email)                         │
│  Postgres    alpha_applications · profiles · check_ins ·    │
│              daily_programs  (RLS partout)                  │
│                                                             │
│  Edge Functions (Deno, service role) :                      │
│   · submit-alpha-application  ← formulaire public (landing) │
│   · generate-daily-program    ← coach IA ──► API Claude     │
└─────────────────────────────────────────────────────────────┘
```

## Flux principal (boucle quotidienne du testeur)

1. **Candidature** : formulaire landing (`Contact.jsx`) → Edge Function `submit-alpha-application` (validation + honeypot) → table `alpha_applications` (statut `pending`).
2. **Approbation** : Grace passe `status` à `approved` dans le Studio Supabase (Table Editor → `alpha_applications`). Un trigger synchronise `profiles.is_alpha_tester` si le compte existe déjà.
3. **Connexion** : le testeur va sur `/alpha`, entre son email → magic link. À la création du compte, un trigger crée son `profile` en héritant de sa candidature (prénom, objectif, niveau, statut alpha).
4. **Check-in** (`/check-in`) : 5 curseurs (sommeil, énergie, stress, douleurs, humeur) + alimentation de la veille + notes → insert `check_ins` (RLS : uniquement son propre check-in, uniquement si testeur alpha, 1 par jour).
5. **Génération IA** : le client invoque `generate-daily-program`. La fonction vérifie le JWT + le statut alpha, charge le check-in + le profil + les 3 derniers programmes, appelle l'**API Claude** avec *structured outputs* (JSON garanti conforme au schéma), et persiste dans `daily_programs`. Idempotente : 1 programme par jour, renvoyé depuis la base s'il existe déjà.
6. **Bilan** (`/dashboard`) : programme du jour en 3 cartes piliers (couleurs : emerald=Physique, amber=Nutrition, violet=Mental), bandeau d'alerte santé éventuel (SAMU 185), historique des 7 derniers check-ins.

## Modèle de données

| Table | Rôle | RLS |
|---|---|---|
| `alpha_applications` | Candidatures du formulaire public | Aucune policy — service role uniquement |
| `profiles` | 1:1 avec `auth.users` (prénom, objectif, niveau, `is_alpha_tester`) | SELECT own ; écriture via triggers/service role |
| `check_ins` | 1/jour/testeur, scores 1-5, contrainte `UNIQUE(user_id, checkin_date)` | SELECT own ; INSERT own + `is_alpha_tester()` |
| `daily_programs` | Programme IA (jsonb par pilier), `UNIQUE(user_id, program_date)` | SELECT own ; INSERT service role uniquement |

Fonctions `SECURITY DEFINER` (avec `EXECUTE` révoqué pour les rôles API — voir migration `harden_function_privileges`) :
- `is_alpha_tester()` — utilisée dans les policies (execute accordé à `authenticated` uniquement)
- `handle_new_user()` — trigger `auth.users` : crée le profil à l'inscription
- `sync_alpha_status()` — trigger `alpha_applications` : synchronise le statut alpha

## Coach IA (`generate-daily-program`)

- **Modèle** : `claude-opus-4-8` par défaut, surchargeable via le secret `ANTHROPIC_MODEL` (ex. `claude-haiku-4-5` pour réduire les coûts).
- **Structured outputs** (`output_config.format` + JSON Schema strict) : la réponse est garantie valide — champs `resume`, `alerte`, `physique{titre,duree_minutes,exercices[],conseil}`, `nutrition{titre,matin,midi,soir,hydratation}`, `mental{titre,pratique,duree_minutes,affirmation}`.
- **Guardrails** (system prompt) : pas de diagnostic ni médicaments ; signaux préoccupants → champ `alerte` avec recommandation de consulter + SAMU 185 ; nutrition ancrée dans les aliments locaux ivoiriens ; adaptation de l'intensité aux scores du check-in.
- **Gestion du refus** : `stop_reason === 'refusal'` traité explicitement (réponse 502 propre).
- La clé API n'existe **que** dans les secrets Supabase — jamais côté client.

## Sécurité

- Clé anon exposée au client, sécurisée par RLS (aucune table en lecture/écriture publique).
- Formulaire public : validation serveur stricte (whitelists objectif/niveau, regex email) + honeypot `website` (rejet silencieux).
- Edge Functions : `verify_jwt` activé ; CORS en liste blanche via le secret `ALLOWED_ORIGINS`.
- `SUPABASE_SERVICE_ROLE_KEY` et `ANTHROPIC_API_KEY` : secrets Supabase uniquement.

## Configuration requise (dashboard Supabase)

Secrets des Edge Functions (Dashboard → Edge Functions → Secrets) :

| Secret | Statut | Rôle |
|---|---|---|
| `ANTHROPIC_API_KEY` | **⚠️ À renseigner** | Clé API Claude (console.anthropic.com) — sans elle, le coach IA renvoie 503 |
| `ANTHROPIC_MODEL` | Optionnel | Défaut : `claude-opus-4-8` |
| `ALLOWED_ORIGINS` | À renseigner en prod | Liste d'origines CORS, ex. `https://mynewbody.ci,http://localhost:3000` |

Auth (Dashboard → Authentication → URL Configuration) :
- **Site URL** : `http://localhost:3000` en dev, le domaine de prod au déploiement.
- Ajouter `https://<domaine>/dashboard` aux **Redirect URLs** en prod (cible du magic link).
- Limite d'emails intégrée du plan gratuit : suffisante pour 10 testeurs ; brancher un SMTP custom (Resend) si besoin.

## Déploiement

- **Vercel** : `vercel.json` fournit le rewrite SPA. Variables d'env à définir : `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
- **Hostinger/Apache** : ajouter un `.htaccess` avec rewrite vers `index.html` (routes `/alpha`, `/check-in`, `/dashboard`).

## Approbation des testeurs (workflow admin)

Pas d'UI admin en alpha (10 testeurs — YAGNI). Dans le Studio Supabase :
1. Table Editor → `alpha_applications` → passer `status` de `pending` à `approved` (max 10).
2. Le trigger synchronise automatiquement `profiles.is_alpha_tester` au prochain login (ou immédiatement si le compte existe).
