// DONNÉES D'EXEMPLE : articles du Journal (rédigés pour la démonstration ; dates fictives en 2025-2026).
// Les faits cités (prix, 10 cm, horaires, noms de marques) sont ceux du salon ; le reste est illustratif.
export type PostCategory = 'Couleur' | 'Boucles' | 'Engagements' | 'Au salon' | 'Produits'

export interface PostSection {
  h?: string
  p: string
}

export interface Post {
  slug: string
  title: string
  category: PostCategory
  date: string // ISO
  tags: string[]
  minutes: number
  excerpt: string
  author: string
  sections: PostSection[]
}

export const posts: Post[] = [
  {
    slug: 'passer-au-vegetal',
    title: 'Passer au végétal : les trois premiers rendez-vous',
    category: 'Couleur',
    date: '2026-09-18',
    tags: ['henné', 'indigo', 'diagnostic'],
    minutes: 4,
    excerpt: 'Un appel, un diagnostic, puis la première couleur préparée devant vous : voici comment se passe le changement.',
    author: 'L’équipe Nature de cheveux',
    sections: [
      { p: 'Quitter la coloration chimique pour les plantes n’est pas un interrupteur. C’est un chemin, et nous le faisons avec vous. Le salon prépare la couleur uniquement avec des poudres de végétaux et de l’eau, mélangées devant la cliente.' },
      { h: 'D’abord, un appel ou un diagnostic', p: 'Pour une première coloration ou des mèches, nous demandons un appel ou un diagnostic au salon. Sans lui, la réservation n’est pas validée. Nous regardons votre base, vos cheveux blancs, vos couleurs précédentes, et ce que vous espérez.' },
      { h: 'Ensuite, la première couleur', p: 'Les poudres sont dosées et mélangées à l’eau sous vos yeux. Pendant que la couleur se pose, il y a du thé, du miel, un bonnet chauffant, et des magazines choisis. Au shampooing, le massage est offert.' },
      { h: 'Enfin, le suivi', p: 'Chaque coloration végétale est unique. Nous ajustons les proportions d’un rendez-vous à l’autre, selon ce que votre chevelure a pris. Dites-nous aussi ce qui vous a plu ou non : cela guide le mélange suivant.' },
    ],
  },
  {
    slug: 'henne-indigo-rhubarbe',
    title: 'Henné, indigo, rhubarbe : qui fait quoi ?',
    category: 'Couleur',
    date: '2026-08-04',
    tags: ['henné', 'indigo', 'rhubarbe', 'curcuma'],
    minutes: 5,
    excerpt: 'Les six plantes du bol, ce qu’elles apportent, et pourquoi on ne les mélange jamais au hasard.',
    author: 'L’équipe Nature de cheveux',
    sections: [
      { p: 'Six plantes composent la palette du salon : le henné, l’indigo, la rhubarbe, l’avoine, la guimauve et le curcuma. Chacune a son rôle, et c’est leur dosage qui fait votre nuance.' },
      { h: 'Le henné et l’indigo', p: 'Le henné donne des reflets cuivrés à roux. L’indigo apporte un bleu profond qui assombrit et refroidit. Ensemble, ils dessinent les bruns et les châtains.' },
      { h: 'La rhubarbe et le curcuma', p: 'La rhubarbe réchauffe un blond d’une dorure douce. Le curcuma ajoute une chaleur plus ambrée, qu’on dose avec délicatesse.' },
      { h: 'L’avoine et la guimauve', p: 'Elles ne colorent pas : elles adoucissent le mélange, apaisent le cuir chevelu et rendent la pâte souple à appliquer.' },
      { p: 'Essayez le bol sur la page Coloration végétale. C’est un jeu : les proportions ne sont pas nos recettes, et le résultat reste indicatif.' },
    ],
  },
  {
    slug: 'cheveux-blancs-coloration-minerale',
    title: 'Cheveux blancs et coloration minérale',
    category: 'Couleur',
    date: '2026-06-12',
    tags: ['minérale', 'cheveux blancs', 'Mineral Colours'],
    minutes: 4,
    excerpt: 'Une couverture à 100 % des cheveux blancs, sans ammoniaque ni PPD, avec les pigments Mineral Colours.',
    author: 'L’équipe Nature de cheveux',
    sections: [
      { p: 'Pour les cheveux blancs, le salon propose aussi la coloration minérale Mineral Colours, de Rodolphe & Co. Elle couvre à 100 % les cheveux blancs, sans ammoniaque ni PPD.' },
      { h: 'Comment elle agit', p: 'Selon le fabricant, les pigments minéraux enrobent la cuticule au lieu de pénétrer la fibre. La formule contient de la nacre de Bretagne, des huiles de ricin et de macadamia, du thé vert.' },
      { h: 'Ce qu’elle ne fait pas', p: 'La coloration minérale n’éclaircit pas. Pour éclaircir, nous utilisons une poudre éclaircissante minérale à l’argile, dans un second temps.' },
      { h: 'Un nuancier de 29 teintes', p: 'Le nuancier du fabricant propose des bases, des pigments purs, des tons et des patines. Nous les mélangeons pour obtenir votre nuance.' },
    ],
  },
  {
    slug: 'couper-les-boucles-a-sec',
    title: 'Pourquoi on coupe vos boucles à sec',
    category: 'Boucles',
    date: '2026-05-20',
    tags: ['boucles', 'coupe à sec', 'texture'],
    minutes: 4,
    excerpt: 'Une boucle mouillée s’allonge. Couper à sec, c’est couper ce que vous verrez vraiment.',
    author: 'L’équipe Nature de cheveux',
    sections: [
      { p: 'Sur cheveux mouillés, une boucle se détend et s’allonge. On coupe alors une longueur qui n’existe pas au séchage. La coupe sur cheveux secs répond à ce problème : on voit la boucle telle qu’elle tombe.' },
      { h: 'Chaque boucle est regardée', p: 'Nous travaillons mèche par mèche, en observant la direction, le volume et la densité de chaque zone. La coupe suit votre texture au lieu de la contrarier.' },
      { h: 'Et le shampooing ?', p: 'Un client nous l’a fait remarquer un jour : le prix d’une coupe à sec n’inclut pas toujours un shampooing. Nous préférons le dire clairement : les tarifs du salon sont affichés, avec ce qu’ils comprennent, sur la page Prestations.' },
      { h: 'Les produits pour la suite', p: 'À la maison, nous aimons la gamme Kalia Nature, pensée pour les cheveux bouclés à crépus. Elle est visible au salon.' },
    ],
  },
  {
    slug: 'don-de-cheveux-10-cm',
    title: 'Don de cheveux : pourquoi 10 cm ?',
    category: 'Engagements',
    date: '2026-04-09',
    tags: ['don de cheveux', 'Fake Hair Don’t Care', 'Capillum'],
    minutes: 3,
    excerpt: 'Au-delà de 10 cm, vos cheveux peuvent devenir une perruque. En dessous, ils ont une seconde vie.',
    author: 'L’équipe Nature de cheveux',
    sections: [
      { p: 'Faire une bonne action avec le don de cheveux : voilà ce que propose le salon. Les cheveux de plus de 10 cm sont confiés à Fake Hair Don’t Care, qui fabrique des perruques pour des personnes en traitement contre le cancer.' },
      { h: 'Et en dessous de 10 cm ?', p: 'Les cheveux plus courts ne sont pas jetés. Ils sont recyclés avec Capillum, notamment pour dépolluer et pailler les sols.' },
      { h: 'Comment faire ?', p: 'Parlez-en à l’équipe à la prise de rendez-vous. Sur la page Engagements, une petite règle vous montre où vos cheveux iraient selon la longueur coupée. C’est un jeu, pas un engagement.' },
    ],
  },
  {
    slug: 'capillum-seconde-vie',
    title: 'Capillum : la seconde vie des cheveux coupés',
    category: 'Engagements',
    date: '2026-03-12',
    tags: ['Capillum', 'recyclage', 'zéro déchet'],
    minutes: 3,
    excerpt: 'Aucun cheveu ne part à la poubelle : ce que devient une coupe quand elle ne devient pas une perruque.',
    author: 'L’équipe Nature de cheveux',
    sections: [
      { p: 'Dans un salon, les cheveux coupés sont d’ordinaire des déchets. Ici, ils sont collectés. Selon le salon, il est membre de Capillum depuis 2019.' },
      { h: 'Un matériau étonnant', p: 'Le cheveu absorbe les hydrocarbures et retient l’eau. Il peut servir de paillage, ou à dépolluer. Plusieurs clientes nous le disent dans leurs avis : « ce salon récupère les cheveux coupés au lieu de les jeter ».' },
      { h: 'Ce que vous pouvez faire', p: 'Rien de plus que venir vous faire couper. Le tri se fait ensuite avec nous.' },
    ],
  },
  {
    slug: 'ruche-et-miel',
    title: 'Notre ruche et le miel de vos pauses',
    category: 'Au salon',
    date: '2026-02-17',
    tags: ['ruche', 'abeilles', 'miel'],
    minutes: 3,
    excerpt: 'Une ruche parrainée près de Nantes, des abeilles essentielles, et une cuillère de miel dans votre thé.',
    author: 'L’équipe Nature de cheveux',
    sections: [
      { p: 'Les abeilles sont essentielles à notre monde, alors préservons-les ! Le salon parraine une ruche du Rucher du Champoivre, à Héric, près de Nantes. Elle n’est donc pas dans le jardin du salon.' },
      { h: 'Un projet solidaire', p: 'Les ruches sont construites par des ESAT, des associations de personnes en situation de handicap et des écoles. La mise en pot est assurée par des détenus de la prison de Nantes.' },
      { h: 'Le miel, pendant la couleur', p: 'Pendant que la couleur pose, nous servons des thés, cafés et infusions biologiques, avec du miel et parfois quelques en-cas bio.' },
    ],
  },
  {
    slug: 'ecocert-bien-etre-durable',
    title: 'Ecocert bien-être durable : ce que veulent dire trois étoiles',
    category: 'Engagements',
    date: '2025-12-05',
    tags: ['Ecocert', 'label', 'RSE'],
    minutes: 5,
    excerpt: 'Un dossier, un audit, trois niveaux. Retour sur le label obtenu en 2024.',
    author: 'L’équipe Nature de cheveux',
    sections: [
      { p: 'Au printemps 2024, le salon a obtenu le label Ecocert « Établissement bien-être durable », niveau 3. Le label compte trois niveaux : engagement dans la démarche, confirmation de l’effort accompli, établissement exemplaire.' },
      { h: 'Un travail de fond', p: 'Yohann Hubert le résume ainsi : « Nous avons établi un dossier pour présenter la démarche du salon, suivi d’un audit : cela représente des mois de travail. »' },
      { h: 'Une démarche qui se vérifie', p: 'Ecocert précise que la certification est valable un an et se renouvelle après un audit. Nous présentons donc ce label comme obtenu en 2024. Sa validité actuelle est à confirmer avec le salon.' },
    ],
  },
  {
    slug: 'le-vrac-au-salon',
    title: 'Le vrac au salon : mode d’emploi',
    category: 'Produits',
    date: '2026-01-22',
    tags: ['vrac', 'Couleurs Gaïa', 'Plume', 'Cocon'],
    minutes: 3,
    excerpt: 'Plume, Cocon, Pureté, Coton : quatre pompes, des flacons à remplir, zéro emballage de plus.',
    author: 'L’équipe Nature de cheveux',
    sections: [
      { p: 'Au salon, une station de vrac Couleurs Gaïa propose quatre produits : Plume pour les cheveux normaux et les cuirs chevelus sensibles, Cocon pour les cheveux secs et abîmés, Pureté pour les cheveux gras, et Coton, un baume démêlant.' },
      { h: 'Comment ça marche', p: 'Apportez un flacon propre, ou prenez-en un au salon. L’équipe vous aide à choisir selon vos cheveux. Les prix de recharge sont affichés au salon.' },
      { h: 'Uniquement en salon', p: 'Aucune vente en ligne ni livraison : les produits se choisissent sur place, avec conseil.' },
    ],
  },
  {
    slug: 'lessive-cendre-de-cheminee',
    title: 'Une lessive à la cendre de cheminée',
    category: 'Engagements',
    date: '2025-11-14',
    tags: ['zéro déchet', 'lessive', 'peignoirs'],
    minutes: 3,
    excerpt: 'Le linge du salon est lavé avec une lessive faite maison à partir de la cendre de nos cheminées.',
    author: 'L’équipe Nature de cheveux',
    sections: [
      { p: 'C’est l’un de ces détails qui disent la manière de travailler : la lessive du salon est faite avec la cendre des cheminées de l’équipe.' },
      { h: 'Du linge qui dure', p: 'Les peignoirs lavables sont fabriqués en France. Les papiers de couleur sont lavables aussi, et ce sont les mêmes depuis l’ouverture en 2011.' },
      { h: 'Moins de déchets', p: 'Pas d’aluminium, pas de plastique à usage unique, du tri et du compostage : l’UNEC a salué ces pratiques dans son Prix RSE 2024.' },
    ],
  },
  {
    slug: 'enfants-premiere-coupe',
    title: 'Enfants : une première coupe en douceur',
    category: 'Au salon',
    date: '2025-10-08',
    tags: ['enfants', 'première coupe', 'ados'],
    minutes: 3,
    excerpt: 'Prendre le temps, expliquer chaque geste, et couper selon la texture, des plus petits aux ados.',
    author: 'L’équipe Nature de cheveux',
    sections: [
      { p: 'Une première coupe, c’est un petit événement. Chez nous, elle se fait en douceur, à hauteur d’enfant, avec le temps nécessaire. Des mamans nous racontent aussi des rendez-vous réussis avec des adolescentes inquiètes pour leurs boucles.' },
      { h: 'Les tarifs enfants', p: 'Enfant de moins de 6 ans : à partir de 21 €. Demoiselle de moins de 12 ans : à partir de 32 €. Garçon de moins de 12 ans : à partir de 28 €.' },
      { h: 'Les boucles aussi', p: 'Nous coupons les boucles des enfants sur cheveux secs, comme celles des adultes, pour respecter leur mouvement.' },
    ],
  },
  {
    slug: 'marche-du-samedi',
    title: 'Le marché du samedi, à deux pas du salon',
    category: 'Au salon',
    date: '2025-09-24',
    tags: ['Cesson-Sévigné', 'marché', 'quartier'],
    minutes: 3,
    excerpt: 'Un marché le samedi, un marché bio le mercredi : le salon est au cœur du Bourg.',
    author: 'L’équipe Nature de cheveux',
    sections: [
      { p: 'Le salon se trouve dans le Bourg, le vieux centre de Cesson-Sévigné, à côté de l’église Saint-Martin. Le samedi, le marché a lieu place du Marché, de 6 h à 13 h 30, avec environ 80 commerçants.' },
      { h: 'Le mercredi, le marché bio', p: 'Un marché bio se tient place de l’Église le mercredi après-midi, de 14 h 30 à 18 h 45. Le salon est fermé le mercredi après-midi : c’est le bon moment pour faire un tour.' },
      { h: 'Se garer', p: 'Stationnement gratuit et nombreux à proximité. La place du Marché est à environ 120 m du salon.' },
    ],
  },
]

export const postCategories: PostCategory[] = ['Couleur', 'Boucles', 'Engagements', 'Au salon', 'Produits']
export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug)
