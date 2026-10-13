# Nature de cheveux, Cesson-Sévigné (site de démonstration)

Site vitrine de démonstration pour le salon de coiffure bio **Nature de cheveux** (3 bis rue du Calvaire, Cesson-Sévigné). Ce n'est pas le site officiel du salon : contenus d'exemple signalés comme tels, illustrations originales (aucune photo ni logo repris).

## Pile technique

- Vite 8, TypeScript, Tailwind CSS v4 (reset), CSS maison à jetons (`src/style.css`)
- GSAP 3 (ScrollTrigger, SplitText) pour les scènes épinglées, révélations de texte et le bol
- Lenis pour le défilement fluide
- View Transitions inter-documents (« le rinçage ») et animations CSS pilotées par le défilement (parallaxe)
- Polices auto-hébergées (Fontsource) : Bodoni Moda, Hanken Grotesk, Courier Prime ; icônes Phosphor (light)

## Pages

Accueil, Le salon, Prestations et tarifs, Coloration végétale et minérale, Cheveux bouclés, Visagiste, Produits, Engagements, Galerie, Journal (12 articles), Avis, FAQ, Infos pratiques, Réserver, quatre pages légales et une 404 « Mèche perdue ».

## Interactions signature

Le bol (mélange de couleurs), la règle du don de cheveux (10 cm), la fiche visagiste « Qui êtes-vous ? », la scène épinglée « De la poudre à la mèche », le nuancier à défilement horizontal, le fil de mèche qui change de teinte selon la section.

Le mouvement respecte `prefers-reduced-motion` (états statiques) et se simplifie sur appareil modeste (`saveData`, peu de cœurs).

## Données

`src/data/*.ts`. Chaque fichier est annoté : **RÉEL** (prix de janvier 2026, 29 teintes Mineral Colours, avis cités mot pour mot avec plateforme et date, horaires, adresse) ou **exemple** (produits, articles, FAQ, galerie, événements, nuancier de teintes).

## Commandes

```bash
npm install
npm run dev          # développement
npm run typecheck
npm run build        # tsc + vite build, sortie dans dist/
npm run preview      # http://localhost:4173/Nature-de-cheveux-Rennes/ (ou --port 4181)
npm run pages        # régénère les HTML depuis scripts/pages.mjs et src/data/posts.ts
```

Déploiement : GitHub Pages, base `/Nature-de-cheveux-Rennes/`. La CI vérifie qu'aucune URL absolue à la racine n'est présente dans `dist/*.html`.

## Points à confirmer avec le salon

Validité actuelle du label Ecocert (obtenu en 2024), équipe 2026 (aucun nom affiché), lien direct d'avis Google, e-mail de contact (non publié), photos réelles et autorisation de les utiliser, durées des prestations, prix du vrac, éditeur du site (mentions légales).
