# Nature de cheveux, Cesson-Sévigné (démo)

- **Concept**: « Poudres et eau » : encres du logo sur eau de rinçage. Palette: paper #F1F4F1, ink #12203A, indigo #00448E, framboise #CE2A57 (seul accent des boutons), teal #009CBB, feuille #2F6E1A, violette #504090, sauge #576C59. Mode sombre « indigo de nuit » (paper #0D1730). Polices: Bodoni Moda (titres), Hanken Grotesk (texte), Courier Prime (voix « fiche » seulement).
- **Source de vérité**: `PLAN.md`. Ne jamais publier: label Ecocert comme valide (dire « obtenu en 2024 »), « premier au monde », noms de famille ou prénoms de l'équipe, les deux e-mails (téléphone ou SmartBooker à la place). Dire Cesson-Sévigné.
- **Lancer**: `npm run dev`. **Vérifier**: `npm run typecheck && npm run build`, puis `npm run preview` (base `/Nature-de-cheveux-Rennes/`, port 4181).
- **Pages**: `scripts/pages.mjs` liste les pages; `npm run pages` (node scripts/gen-pages.mjs) génère les HTML, y compris `journal/<slug>/` depuis `src/data/posts.ts`. Un module par page dans `src/pages/`, qui appelle `boot()`.
- **Particularité**: le plugin `blockingRender` de `vite.config.ts` remet `blocking="render"` sur les scripts (nécessaire aux View Transitions inter-documents, car le contenu est rendu par JS).
- **Typographie**: `typo()` de `src/core/dom.ts` (espaces insécables avant `? ! ; :` et dans « »). Pas de tiret cadratin.
- **Mouvement**: GSAP (ScrollTrigger, SplitText) + Lenis; classes `reduce`/`lite`/`js-motion` posées par un script inline; pin et défilement fluide seulement hors réduction de mouvement et appareil modeste. Transform et opacité uniquement.
- **Interactions signature**: le bol (mélange OKLab), la règle du don de cheveux (10 cm), la fiche visagiste « Qui êtes-vous ? », la scène épinglée « De la poudre à la mèche », le nuancier.
- **Données**: `src/data/*.ts`, chaque fichier indique exemple ou RÉEL (prix janvier 2026, 29 teintes Mineral Colours, avis cités mot pour mot).
- **Art**: tout est SVG original (`src/core/art.ts`); aucune photo ni logo du salon.
- **Git**: ne jamais committer ni pousser sans demande.
