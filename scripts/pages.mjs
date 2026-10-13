// Liste des pages (une page = un HTML + un module src/pages/<module>.ts).
// Les articles du Journal sont lus dans src/data/posts.ts (champ slug).
export const pages = [
  { path: '', module: 'home', title: 'Coiffeur bio et coloriste végétal à Cesson-Sévigné', desc: 'Nature de cheveux, salon de coiffure bio et coloration végétale à Cesson-Sévigné, aux portes de Rennes. Poudres de plantes et eau, depuis 2011.', jsonld: true },
  { path: 'le-salon', module: 'salon', title: 'Le salon', desc: 'L’histoire de Nature de cheveux depuis 2011, la parole de Yohann Hubert, l’équipe, le lieu et la presse.' },
  { path: 'prestations', module: 'prestations', title: 'Prestations et tarifs', desc: 'Tous les tarifs de Nature de cheveux (à partir de, cheveux courts, TVA et service compris, janvier 2026) : coupes, colorations, soins, enfants.' },
  { path: 'coloration-vegetale', module: 'coloration', title: 'Coloration végétale et minérale', desc: 'Poudres de plantes et d’eau, préparées devant vous : henné, indigo, rhubarbe, avoine, guimauve, curcuma. Coloration minérale et éclaircissement à l’argile.' },
  { path: 'cheveux-boucles', module: 'boucles', title: 'Cheveux bouclés et texturés', desc: 'Coupe sur cheveux secs, cheveux ondulés, bouclés, frisés et locks : le savoir-faire de Nature de cheveux à Cesson-Sévigné.' },
  { path: 'visagiste', module: 'visagiste', title: 'Visagiste', desc: 'Qui êtes-vous ? Le diagnostic visagiste de Nature de cheveux : la coupe qui vous ressemble.' },
  { path: 'produits', module: 'produits', title: 'Les produits', desc: 'Produits bio, en vrac et solides, vendus au salon uniquement : Couleurs Gaïa, Mineral Colours, Kalia Nature, Sativa.' },
  { path: 'engagements', module: 'engagements', title: 'Engagements', desc: 'Ecocert Établissement bien-être durable (2024), Prix RSE de l’UNEC 2024, Enercoop, don de cheveux, ruche, eau et zéro déchet.' },
  { path: 'galerie', module: 'galerie', title: 'Galerie', desc: 'Mèches, herbier et champs de pigments : la galerie d’illustrations originales de Nature de cheveux.' },
  { path: 'journal', module: 'journal', title: 'Journal', desc: 'Le journal de Nature de cheveux : plantes, boucles, don de cheveux, vrac et vie du salon.' },
  { path: 'avis', module: 'avis', title: 'Avis', desc: '4,7/5 sur 99 avis Google (octobre 2026) et les mots des clientes, tels qu’ils ont été écrits.' },
  { path: 'faq', module: 'faq', title: 'Questions fréquentes', desc: 'Coloration végétale, première visite, réservation, annulation, don de cheveux, accès : les réponses de Nature de cheveux.' },
  { path: 'infos-pratiques', module: 'infos', title: 'Infos pratiques et contact', desc: 'Horaires, adresse, accès en bus, TER, vélo, parking gratuit : 3 bis rue du Calvaire, Cesson-Sévigné.', jsonld: true },
  { path: 'reserver', module: 'reserver', title: 'Réserver', desc: 'Réserver chez Nature de cheveux : en ligne, par téléphone ou au salon. Première coloration : un appel ou un diagnostic.' },
  { path: 'mentions-legales', module: 'legal', title: 'Mentions légales', desc: 'Mentions légales du site de démonstration de Nature de cheveux.' },
  { path: 'confidentialite', module: 'legal', title: 'Confidentialité', desc: 'Ce site n’utilise ni cookies ni traceurs.' },
  { path: 'accessibilite', module: 'legal', title: 'Accessibilité', desc: 'Déclaration d’accessibilité du site de démonstration de Nature de cheveux.' },
  { path: 'cgv-resume', module: 'legal', title: 'Conditions de réservation (résumé)', desc: 'Résumé des conditions de réservation de Nature de cheveux, avec renvoi vers les CGV officielles.' },
]
