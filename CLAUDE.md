# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**"My New Body"** — Plateforme de bien-être holistique et hyper-personnalisée propulsée par l'IA. Un coach quotidien bienveillant basé à Abidjan, Côte d'Ivoire, qui écoute le corps de l'utilisateur chaque matin et recalcule ses recommandations en temps réel selon trois piliers : Physique, Nutrition et Mental. Site vitrine React SPA présentant le concept, le fonctionnement technique et la phase Alpha.

## Commandes

```bash
npm run dev       # Dev server sur le port 3000
npm run build     # Build de production Vite
npm run preview   # Aperçu du build prod sur le port 3000
npm run lint      # ESLint
```

Pas de suite de tests configurée.

## Stack

- **Frontend :** React 18.3 + Vite 5.4, Tailwind CSS 3.4
- **Animations :** CSS keyframes + état React (pas de framer-motion)
- **Fonts :** Google Fonts — Manrope (titres), Inter (corps de texte)
- **Pas de backend, pas de router** — SPA one-page avec ancres `#section`

## Architecture

```
src/
  main.jsx              # Entry point React
  App.jsx               # Root : scroll progress bar + composition de toutes les sections
  index.css             # Tailwind directives + classes utilitaires globales (glass-card, shiny-cta…)
  components/
    Background.jsx      # Étoiles (box-shadow JS), dégradés, grille CSS
    Navbar.jsx          # Nav fixe responsive avec menu mobile
    Hero.jsx            # Hero + CheckInMock animé (3 phases cycliques)
    HowItWorks.jsx      # 4 étapes du processus IA
    Pillars.jsx         # Bento grid des 3 piliers (Physique · Nutrition · Mental)
    AISection.jsx       # System prompt, JSON output, guardrails
    Comparison.jsx      # Tableau comparatif My New Body vs alternatives
    Legal.jsx           # Cadre légal ARTCI, Privacy by Design, SAMU 185
    Alpha.jsx           # MVP no-code : workflow Tally → Make.com → LLM → WhatsApp
    Contact.jsx         # Formulaire d'inscription alpha (état local, success state)
    Footer.jsx          # Logo, liens, watermark, copyright
```

## Design System

### Couleurs (tailwind.config.js)

```js
accent            '#a78bfa'   // violet-400  — Mental / couleur principale
accent-dark       '#7c3aed'   // violet-600  — hover des boutons accent
accent-physical   '#34d399'   // emerald-400 — Pilier Physique
accent-nutrition  '#fbbf24'   // amber-400   — Pilier Nutrition
```

**Règle des 3 piliers :** chaque couleur est associée à son pilier dans toute l'UI :
- Emerald → Physique
- Amber → Nutrition
- Violet/Purple → Mental

### Classes CSS custom (`src/index.css`)

| Classe | Usage |
|---|---|
| `.glass-card` | Carte glassmorphism (fond sombre, backdrop-blur, bordure subtile) |
| `.glass-card:hover` | Élève la carte + glow violet |
| `.pillar-physical:hover` | Override du hover avec glow emerald |
| `.pillar-nutrition:hover` | Override avec glow amber |
| `.pillar-mental:hover` | Override avec glow violet |
| `.shiny-cta` | Bouton bordure animée (border-shine keyframe) |
| `.bg-grid-pattern` | Grille de fond (lignes 1px) |
| `.stars-sm/md/lg` | Étoiles animées (box-shadow généré en JS) |

### Composant `CheckInMock` (dans `Hero.jsx`)

Animation cyclique en 3 phases gérée par `useState` + `setTimeout` :
1. **CheckInPhase** (5s) — Formulaire check-in avec barres de progression
2. **LoadingPhase** (3s) — Indicateur d'analyse IA avec progress bar animée
3. **ProgramPhase** (5.5s) — Cartes résultat des 3 piliers

Transition : fondu + translateY entre chaque phase. Dots de navigation en bas.

## Conventions clés

- **Langue :** Tout le contenu UI est en **français**. Les noms de variables/composants restent en anglais (convention React).
- **Icônes :** SVG inline (pas de librairie externe). Quelques emojis pour l'expressivité dans les sections de contenu.
- **Commentaires :** Pas de commentaires superficiels. Uniquement pour les logiques non-évidentes (ex : la génération des étoiles).
- **Responsive :** Mobile-first. Breakpoints Tailwind standard (`sm`, `md`, `lg`). Navbar avec menu hamburger sur mobile.
- **Scroll :** Liens `href="#section"` avec `scroll-smooth` sur `<html>`. Barre de progression en haut de page (gérée dans `App.jsx`).
- **Forms :** Le formulaire Contact (`Contact.jsx`) est en état local uniquement — pas encore connecté à un backend. Le `sent` state affiche un success message.

## Contenu & Contexte Produit

- **Fondatrice :** Grace Mexiale — Abidjan, Côte d'Ivoire
- **Contact réel :** gracemexiale@gmail.com
- **Phase Alpha :** 10 testeurs max, 7 jours, 100% gratuit, livraison via WhatsApp/Email
- **LLM ciblé :** Claude (Anthropic) ou GPT-4o selon disponibilité API
- **Cadre légal :** Loi n°2013-450 CI, contrôle ARTCI, Privacy by Design
- **Urgences médicales guardrail :** SAMU 185 (Côte d'Ivoire)

## À faire (prochaines étapes)

- [ ] Connecter le formulaire Contact à un webhook Make.com ou Supabase
- [ ] Ajouter la page bilan ou dashboard testeur
- [ ] Intégrer la vraie API IA pour le check-in live
- [ ] Déploiement sur Hostinger ou Vercel
