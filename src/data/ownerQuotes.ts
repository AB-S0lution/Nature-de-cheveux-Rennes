// DONNÉES RÉELLES : citations vérifiées de Yohann Hubert, avec média et date (PLAN.md §2).
export interface OwnerQuote {
  id: string
  text: string
  outlet: string
  date: string
  url?: string
}

export const ownerQuotes: OwnerQuote[] = [
  { id: 'q1', text: 'On peut faire autrement dans la coiffure !', outlet: 'Profession Bien-Être', date: '16 juillet 2024', url: 'https://www.professionbienetre.fr/coiffure/le-premier-salon-de-coiffure-eco-responsable-labellise-ecocert/' },
  { id: 'q2', text: 'J’adore mon métier, car il regroupe plein de passions. Je suis un coupeur. J’adore couper les cheveux, j’adore le faire dans mon jardin, mais j’adore aussi les arbres et les plantes, tout comme la colorimétrie !', outlet: 'Profession Bien-Être', date: '16 juillet 2024', url: 'https://www.professionbienetre.fr/coiffure/le-premier-salon-de-coiffure-eco-responsable-labellise-ecocert/' },
  { id: 'q3', text: 'On nous dit souvent que ça sent le jardin ou les foins chez nous, mais pas le coiffeur…', outlet: 'Profession Bien-Être', date: '16 juillet 2024', url: 'https://www.professionbienetre.fr/coiffure/le-premier-salon-de-coiffure-eco-responsable-labellise-ecocert/' },
  { id: 'q4', text: 'C’est en faisant des erreurs qu’on apprend.', outlet: 'Profession Bien-Être', date: '16 juillet 2024', url: 'https://www.professionbienetre.fr/coiffure/le-premier-salon-de-coiffure-eco-responsable-labellise-ecocert/' },
  { id: 'q5', text: 'J’ai privilégié le label Ecocert car il est plus exigeant, plus qualitatif à mes yeux et reconnu par tous ceux qui sont sensibles à la démarche RSE.', outlet: 'Biblond', date: '1er août 2024', url: 'https://www.biblond.com/environnement-nature-de-cheveux-le-premier-salon-bien-etre-durable/' },
  { id: 'q6', text: 'Nous avons établi un dossier pour présenter la démarche du salon, suivi d’un audit : cela représente des mois de travail.', outlet: 'Le CIM, magazine de Cesson-Sévigné', date: '1er juin 2024', url: 'https://www.ville-cesson-sevigne.fr/wp-content/uploads/2025/06/Cim-du-1er-juin-2024.pdf' },
  { id: 'q7', text: 'Nous sommes engagé·es depuis la création du salon pour une pratique durable de notre métier en plaçant en priorité l’humain, l’écologie et la qualité.', outlet: 'Enercoop Bretagne', date: '26 juin 2024', url: 'http://web.archive.org/web/20260214200441/https://www.enercoop.fr/blog/actualites/bretagne/nature-de-cheveux-a-choisi-enercoop' },
  { id: 'q8', text: 'Choisir Enercoop pour notre électricité nous paraissait évident et cohérent avec notre démarche écologique.', outlet: 'Enercoop Bretagne', date: '26 juin 2024', url: 'http://web.archive.org/web/20260214200441/https://www.enercoop.fr/blog/actualites/bretagne/nature-de-cheveux-a-choisi-enercoop' },
  { id: 'q9', text: 'Offrir à notre clientèle des prestations de haute coiffure dans une ambiance chaleureuse, décontractée et apaisante.', outlet: 'Enercoop Bretagne', date: '26 juin 2024', url: 'http://web.archive.org/web/20260214200441/https://www.enercoop.fr/blog/actualites/bretagne/nature-de-cheveux-a-choisi-enercoop' },
]
