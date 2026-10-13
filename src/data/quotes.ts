// DONNÉES RÉELLES : avis clients cités mot pour mot (PLAN.md §4.5), attribués à la plateforme et à la date seulement.
// Aucun nom de client. Orthographe des clientes conservée. namesStaff : citation qui nomme un membre de l'équipe,
// non affichée tant que l'équipe 2026 n'est pas confirmée.
export type QuoteTheme = 'ecoute' | 'couleur' | 'boucles' | 'rituel' | 'engagement' | 'accueil'

export interface Quote {
  id: number
  text: string
  platform: 'Google' | 'PagesJaunes' | 'unboncoiffeur.fr' | 'meilleurcoiffeur.com'
  stars: number | null
  date: string
  themes: QuoteTheme[]
  namesStaff?: boolean
}

export const themeLabels: Record<QuoteTheme, string> = {
  ecoute: 'Écoute', couleur: 'Couleur', boucles: 'Bouclés', rituel: 'Rituel', engagement: 'Engagement', accueil: 'Accueil',
}

export const quotes: Quote[] = [
  { id: 1, text: 'Adresse incontournable si vous recherchez un coiffeur pro … cliente depuis 13 ans et toujours aussi satisfaite', platform: 'Google', stars: 5, date: '06/12/2025', themes: ['accueil'] },
  { id: 2, text: 'J\'ai enfin trouvé LE salon parfait !', platform: 'Google', stars: 5, date: '20/08/2025', themes: ['accueil'] },
  { id: 3, text: 'Petit plus qui fait la différence : j\'ai pu faire don de mes cheveux à une association.', platform: 'Google', stars: 5, date: '20/08/2025', themes: ['engagement'] },
  { id: 4, text: 'Enfin un salon qui sait couper et coiffer des cheveux bouclés et naturels !', platform: 'Google', stars: 5, date: '18/02/2025', themes: ['boucles'] },
  { id: 5, text: 'c\'est la première fois que je ressors en étant à 100% satisfaite du résultat.', platform: 'Google', stars: 5, date: '18/02/2025', themes: ['boucles', 'accueil'] },
  { id: 6, text: 'Yohann a été très attentif à ce qu\'elle voulait et lui a donné beaucoup de conseils', platform: 'Google', stars: 5, date: '31/05/2025', themes: ['ecoute'], namesStaff: true },
  { id: 7, text: 'Un salon qui respire le vrai lien à la nature et aux gens. Décor et ambiance Zen', platform: 'Google', stars: 5, date: '13/07/2024', themes: ['rituel', 'accueil'] },
  { id: 8, text: 'Fidèle cliente depuis si longtemps je ne changerai pas de coiffeur pour rien au monde.', platform: 'Google', stars: 5, date: '13/03/2024', themes: ['accueil'] },
  { id: 9, text: 'un réel savoir-faire, de la douceur dans les gestes et le temps de prendre le temps.', platform: 'Google', stars: 5, date: '13/02/2024', themes: ['rituel', 'ecoute'] },
  { id: 10, text: 'La charlotte chauffante et le massage crânien étaient également très agréables.', platform: 'Google', stars: 5, date: '03/02/2024', themes: ['rituel'] },
  { id: 11, text: 'Enfin un salon de coiffure qui propose des couleurs qui n\'abîme pas vos cheveux.', platform: 'Google', stars: 5, date: '09/12/2023', themes: ['couleur'] },
  { id: 12, text: 'Contrairement aux idées reçues sur les couleurs végétales et minérales, le salon propose une large palette de couleurs.', platform: 'Google', stars: 5, date: '09/12/2023', themes: ['couleur'] },
  { id: 13, text: 'Mention spéciale pour ma coiffeuse Mélanie qui m\'a trouvé la coupe parfaite!', platform: 'Google', stars: null, date: '04/11/2023', themes: ['ecoute'], namesStaff: true },
  { id: 14, text: 'J\'ai été accueillie comme une princesse et les produits sont très doux pour les cheveux.', platform: 'Google', stars: 5, date: '18/05/2018', themes: ['accueil'] },
  { id: 15, text: 'toujours a l\'écoute. très bon coloriste', platform: 'PagesJaunes', stars: 5, date: '01/04/2020', themes: ['ecoute', 'couleur'] },
  { id: 16, text: 'Accueil au top !! Très à l\'écoute , très sympathique, de très bons conseils et une super coupe !!!', platform: 'unboncoiffeur.fr', stars: 5, date: '12/09/2021', themes: ['ecoute', 'accueil'] },
  { id: 17, text: 'enfin un coiffeur à l\'écoute des clientes … petit massage lors du shampoing', platform: 'meilleurcoiffeur.com', stars: null, date: '05/10/2012', themes: ['ecoute', 'rituel'] },
  { id: 18, text: 'La coiffeuse qui s\'est occupée de nous a été très sympa et très douce avec elle.', platform: 'Google', stars: null, date: '19/11/2025', themes: ['accueil'] },
  { id: 19, text: 'Elle a pris le temps de s\'occuper de moi avec beaucoup de soin et d\'expertise', platform: 'Google', stars: 5, date: '20/08/2025', themes: ['ecoute'] },
  { id: 20, text: 'J\'ai testé plusieurs salons de coiffure sur Rennes et ses alentours depuis 5 ans', platform: 'Google', stars: 5, date: '18/02/2025', themes: ['boucles'] },
  { id: 21, text: 'Ambiance générale très agréable, c\'est joli et bien décoré.', platform: 'Google', stars: 5, date: '14/02/2025', themes: ['rituel'] },
  { id: 22, text: 'Tout est pensé dans les moindres détails pour garantir un vrai moment de détente pendant la pose de la couleur, du choix des magazines proposés aux téléphones en mode silencieux en passant par la qualité des boissons chaudes offertes.', platform: 'Google', stars: 5, date: '13/02/2024', themes: ['rituel', 'couleur'] },
  { id: 23, text: 'Son salon est à son image avec une équipe formidable. On s\'y sent si bien.', platform: 'Google', stars: 5, date: '13/03/2024', themes: ['accueil'] },
  { id: 24, text: 'ce salon récupère les cheveux coupés au lieu de les jeter !', platform: 'Google', stars: 5, date: '11/11/2023', themes: ['engagement'] },
  { id: 25, text: 'Celles-ci ont d\'ailleurs un rendu magnifique grâce à l\'écoute attentive des coiffeurs lors du diagnostic !', platform: 'Google', stars: 5, date: '11/11/2023', themes: ['couleur', 'ecoute'] },
  { id: 26, text: 'Bonne maîtrise des colorations naturelles , végétales et minérales, et bons conseils sur les coupes et soins du cheveu au naturel.', platform: 'Google', stars: 5, date: '05/11/2023', themes: ['couleur', 'ecoute'] },
  { id: 27, text: 'Engagé écologiquement (recyclage des cheveux coupés, vente de shampooing en vrac...).', platform: 'Google', stars: 5, date: '04/11/2023', themes: ['engagement'] },
  { id: 28, text: 'le don des cheveux coupés pour créer du paillage eco-responsable !', platform: 'Google', stars: null, date: '27/06/2023', themes: ['engagement'] },
  { id: 29, text: 'Pour une première expérience en duo mère/fille aux cheveux ondulés, nous avons passé un très bon moment ! … une attention particulière aux cheveux ondulés/bouclés (coupe sur cheveux secs notamment)', platform: 'Google', stars: null, date: '23/02/2023', themes: ['boucles'] },
  { id: 30, text: 'l\'équipe est très sympathique, à l\'écoute et compétente. Les produits proposés sont naturels, le cadre très agréable, petit plus un massage top après le shampoing.', platform: 'Google', stars: null, date: '23/09/2022', themes: ['ecoute', 'rituel', 'accueil'] },
  { id: 31, text: 'Toutes les personnes qui travaillent ici sont adorables et apportent un petit thé pendant le temps de pause :)', platform: 'Google', stars: 5, date: '18/05/2018', themes: ['rituel', 'accueil'] },
  { id: 32, text: 'Je n\'en peux plus car mes cheveux sont toujours trop bien coupés.', platform: 'PagesJaunes', stars: 5, date: '12/2024', themes: ['accueil'] },
]

/** Citations affichables (hors celles qui nomment du personnel). */
export const publicQuotes = quotes.filter((q) => !q.namesStaff)
export const curlQuotes = publicQuotes.filter((q) => q.themes.includes('boucles'))
export const featuredQuoteIds = [2, 11, 4, 9, 7, 3, 12, 24]
