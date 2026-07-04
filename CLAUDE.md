# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**"My New Body"** — Plateforme de bien-être holistique et hyper-personnalisée propulsée par l'IA. Un coach quotidien bienveillant basé à Abidjan, Côte d'Ivoire, qui écoute le corps de l'utilisateur chaque matin et recalcule ses recommandations en temps réel selon trois piliers : Physique, Nutrition et Mental.

Le projet comprend désormais **la landing (one-page) ET la plateforme alpha fonctionnelle** : candidature, connexion magic link, check-in quotidien, génération du programme par l'API Claude, dashboard testeur. Voir [ARCHITECTURE.md](ARCHITECTURE.md) pour le détail complet.

## Commandes

```bash
npm run dev       # Dev server sur le port 3000
npm run build     # Build de production Vite
npm run preview   # Aperçu du build prod sur le port 3000
```

Pas de suite de tests configurée. (Le script `lint` existe mais ESLint n'est pas installé dans les devDependencies — utiliser `npm run build` comme vérification.)

## Stack

- **Frontend :** React 18.3 + Vite 5.4, Tailwind CSS 3.4, React Router 6
- **Backend :** Supabase — projet `my-new-body` (`jclouhzyjsrooiykdmzu`, eu-west-3)
  - Auth : magic link (OTP email, sans mot de passe)
  - Postgres + RLS : `alpha_applications`, `profiles`, `check_ins`, `daily_programs`
  - Edge Functions (Deno) : `submit-alpha-application`, `generate-daily-program`
- **IA :** API Claude (`claude-opus-4-8` par défaut, secret `ANTHROPIC_MODEL` pour changer) avec structured outputs — appelée uniquement côté serveur
- **Animations :** CSS keyframes + état React (pas de framer-motion)
- **Fonts :** Google Fonts — Manrope (titres), Inter (corps de texte)

## Variables d'environnement

`.env` à la racine (jamais commité — voir `.env.example`) :

```env
VITE_SUPABASE_URL=          # URL du projet Supabase
VITE_SUPABASE_ANON_KEY=     # Clé anon (publique, sécurisée par RLS)
```

Secrets côté Supabase (Dashboard → Edge Functions → Secrets) : `ANTHROPIC_API_KEY` (requis pour le coach IA), `ANTHROPIC_MODEL` (optionnel), `ALLOWED_ORIGINS` (CORS prod).

## Architecture

### Routes (`src/main.jsx`)

| Route | Composant | Accès |
|---|---|---|
| `/` | `App` — landing one-page existante | Public |
| `/alpha` | `pages/AlphaAccess` — connexion magic link | Public |
| `/check-in` | `pages/CheckIn` — check-in matinal (5 curseurs + nutrition + notes) | `ProtectedRoute` (testeur alpha) |
| `/dashboard` | `pages/Dashboard` — programme du jour + historique 7 jours | `ProtectedRoute` (testeur alpha) |

### Structure

```
src/
  main.jsx                    # Router + AuthProvider
  App.jsx                     # Landing : scroll progress + sections
  lib/supabase.js             # Client Supabase unique (fail-fast si env manquante)
  contexts/AuthContext.jsx    # useAuth() → { user, profile, isAlphaTester, signInWithEmail, signOut }
  components/
    ProtectedRoute.jsx        # Gate : non connecté → /alpha ; non-alpha → écran d'attente
    AppHeader.jsx             # Header des pages app (≠ Navbar de la landing)
    Contact.jsx               # Formulaire alpha → Edge Function (honeypot inclus)
    ...                       # Sections landing (Hero, Pillars, AISection, etc.)
  pages/
    AlphaAccess.jsx | CheckIn.jsx | Dashboard.jsx
supabase/
  migrations/                 # Schéma + RLS (déjà appliqués via MCP)
  functions/                  # Edge Functions (déjà déployées)
```

### Flux quotidien du testeur

Check-in (`insert check_ins`, RLS) → `supabase.functions.invoke('generate-daily-program')` → la fonction vérifie JWT + statut alpha, appelle Claude (structured outputs), persiste `daily_programs` (idempotent, 1/jour) → Dashboard affiche les 3 piliers + alerte santé éventuelle.

### Approbation des testeurs

Manuelle (10 places) : Studio Supabase → `alpha_applications` → `status = 'approved'`. Les triggers synchronisent `profiles.is_alpha_tester`.

## Design System

### Couleurs (tailwind.config.js)

```js
accent            '#a78bfa'   // violet-400  — Mental / couleur principale
accent-dark       '#7c3aed'   // violet-600  — hover des boutons accent
accent-physical   '#34d399'   // emerald-400 — Pilier Physique
accent-nutrition  '#fbbf24'   // amber-400   — Pilier Nutrition
```

**Règle des 3 piliers :** Emerald → Physique · Amber → Nutrition · Violet → Mental. Respectée sur la landing ET les pages app (cartes du Dashboard, curseurs du CheckIn).

### Classes CSS custom (`src/index.css`)

`glass-card`, `pillar-physical/nutrition/mental` (hover glows), `shiny-cta`, `bg-grid-pattern`, `stars-sm/md/lg`. Les pages app réutilisent ces classes — pas de nouveau système de style.

## Conventions clés

- **Langue :** Tout le contenu UI est en **français** (tutoiement dans l'espace testeur). Variables/composants en anglais.
- **Icônes :** SVG inline + emojis expressifs. Pas de librairie d'icônes.
- **Sécurité :** clé Claude et service role **jamais** côté client ; validation serveur dans les Edge Functions ; honeypot `website` sur le formulaire public ; RLS sur toutes les tables.
- **Guardrails IA :** pas de diagnostic médical ; signaux préoccupants → champ `alerte` + SAMU 185 (Côte d'Ivoire) ; nutrition ancrée dans les aliments locaux ivoiriens.
- **Responsive :** Mobile-first, breakpoints Tailwind standard.

## Contenu & Contexte Produit

- **Fondatrice :** Grace Mexiale — Abidjan, Côte d'Ivoire
- **Contact réel :** gracemexiale@gmail.com
- **Phase Alpha :** 10 testeurs max, 7 jours, 100% gratuit
- **Cadre légal :** Loi n°2013-450 CI, contrôle ARTCI, Privacy by Design
- **Urgences médicales guardrail :** SAMU 185 (Côte d'Ivoire)

## Reste à faire

- [ ] Renseigner le secret `ANTHROPIC_API_KEY` dans le dashboard Supabase (seule étape manuelle bloquante)
- [ ] Déploiement (Vercel : `vercel.json` prêt ; Hostinger : prévoir `.htaccess`)
- [ ] En prod : `ALLOWED_ORIGINS`, Site URL + Redirect URLs dans Supabase Auth
- [ ] Plus tard : notifications WhatsApp, graphiques de progression, SMTP custom (Resend)
