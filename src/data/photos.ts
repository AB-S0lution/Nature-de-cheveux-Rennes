// Photos d'illustration Unsplash (licence Unsplash), pas des photos du commerce.
// Images génériques (salon, gestes, poudres végétales, soins) téléchargées dans public/photos/.
// À remplacer par de vraies photos du salon, avec son accord.
export type PhotoCategory = 'salon' | 'gestes' | 'cheveux' | 'plantes' | 'soins' | 'produits'

export interface Photo {
  slug: string
  src: string
  alt: string
  credit: string
  url: string
  category: PhotoCategory
  w: number
  h: number
}

export const photoCategoryLabels: Record<PhotoCategory, string> = {
  salon: 'Le lieu',
  gestes: 'Les gestes',
  cheveux: 'Les cheveux',
  plantes: 'Les poudres',
  soins: 'Les plantes',
  produits: 'Les produits',
}

const raw: { slug: string; category: PhotoCategory; w: number; h: number; alt: string; unsplashId: string }[] = [
  { slug: 'salon-fauteuils-miroirs', category: 'salon', w: 1200, h: 2133, alt: 'Salon de coiffure lumineux et vide, fauteuils et miroirs arrondis, en noir et blanc', unsplashId: '1781450090585-1a511b7066d9' },
  { slug: 'salon-comptoir', category: 'salon', w: 1200, h: 800, alt: 'Fauteuils de coiffure alignés devant un long comptoir et un grand miroir', unsplashId: '1521590832167-7bcbfaa6381f' },
  { slug: 'salon-bacs', category: 'salon', w: 1200, h: 1800, alt: 'Rangée de bacs à shampooing, en noir et blanc', unsplashId: '1637777269327-c4d5c7944d7b' },
  { slug: 'salon-brique', category: 'salon', w: 1200, h: 800, alt: 'Salon de coiffure avec fauteuils, miroirs ronds et mur de briques', unsplashId: '1633681926022-84c23e8cb2d6' },
  { slug: 'outils-brosses', category: 'gestes', w: 1200, h: 801, alt: 'Mains tenant brosses, ciseaux et pinceau de coloration sur fond blanc', unsplashId: '1595475884562-073c30d45670' },
  { slug: 'coupe-ciseaux', category: 'gestes', w: 1200, h: 800, alt: 'Une coiffeuse rince les cheveux d’une cliente au bac', unsplashId: '1634449571010-02389ed0f9b0' },
  { slug: 'brushing', category: 'gestes', w: 1200, h: 801, alt: 'Brushing au séchoir et à la brosse ronde', unsplashId: '1580618672591-eb180b1a973f' },
  { slug: 'bigoudi', category: 'gestes', w: 1200, h: 2136, alt: 'Une coiffeuse met en forme de longs cheveux bruns au fer', unsplashId: '1560869713-7d0a29430803' },
  { slug: 'sechoir', category: 'gestes', w: 1200, h: 801, alt: 'Une coiffeuse sèche au séchoir les cheveux d’une cliente', unsplashId: '1562322140-8baeececf3df' },
  { slug: 'boucles-brunes', category: 'cheveux', w: 900, h: 1350, alt: 'Gros plan sur des cheveux bruns et noirs bouclés', unsplashId: '1560264641-1b5191cc63e2' },
  { slug: 'boucles-volume', category: 'cheveux', w: 1200, h: 801, alt: 'Une chevelure bouclée pleine de volume qui couvre le visage', unsplashId: '1579119159780-51419861f69f' },
  { slug: 'tresse', category: 'cheveux', w: 1200, h: 800, alt: 'Une longue tresse épaisse, vue de dos', unsplashId: '1665923148259-3340e61d3ff2' },
  { slug: 'sechage-boucles', category: 'cheveux', w: 1200, h: 806, alt: 'Longue chevelure brune ondulée, vue de dos', unsplashId: '1596911647169-7085321c81b8' },
  { slug: 'boucles-mur-rose', category: 'cheveux', w: 1200, h: 800, alt: 'Cheveux bouclés naturels devant un mur rose', unsplashId: '1500917293891-ef795e70e1f6' },
  { slug: 'poudre-verte-gros-plan', category: 'plantes', w: 700, h: 1052, alt: 'Gros plan sur une poudre végétale verte', unsplashId: '1704079698754-5e621edb610b' },
  { slug: 'poudre-tas', category: 'plantes', w: 1200, h: 800, alt: 'Un petit tas de poudre végétale sur une table blanche', unsplashId: '1704650312022-ed1a76dbed1b' },
  { slug: 'cuillere-poudre', category: 'plantes', w: 1200, h: 1800, alt: 'Une cuillère pleine de poudre de plante posée sur un plan blanc', unsplashId: '1632001605599-54f8b1c3fe3a' },
  { slug: 'bol-poudre-verte', category: 'plantes', w: 1200, h: 800, alt: 'Un bol blanc rempli de poudre verte sur une table en bois', unsplashId: '1652757359639-575cbb557a38' },
  { slug: 'poudre-brune-bol', category: 'plantes', w: 1200, h: 800, alt: 'Poudre brune dans un bol rond en métal', unsplashId: '1603122612817-2fe0e0631a93' },
  { slug: 'bol-bois-poudre', category: 'plantes', w: 1200, h: 800, alt: 'Poudre verte dans un bol en bois', unsplashId: '1781377012601-93162be3a433' },
  { slug: 'deux-bols-poudres', category: 'plantes', w: 1200, h: 800, alt: 'Deux bols de poudres, l’une verte, l’autre jaune', unsplashId: '1710983162916-ab61ccc885c1' },
  { slug: 'poudre-verte-surface', category: 'plantes', w: 1200, h: 800, alt: 'Fleurs d’hibiscus séchées, en gros plan', unsplashId: '1713084874678-9154f939f51f' },
  { slug: 'bol-poudre-table', category: 'produits', w: 1200, h: 801, alt: 'Brosse en bois, bougie et savons solides posés sur des branches vertes', unsplashId: '1580618864180-f6d7d39b8ff6' },
  { slug: 'mortier', category: 'soins', w: 1200, h: 776, alt: 'Une main écrase des plantes au pilon dans un mortier en pierre', unsplashId: '1492552181161-62217fc3076d' },
  { slug: 'bocaux-herbes', category: 'soins', w: 900, h: 1350, alt: 'Bocaux en verre et boîtes en cuivre remplis d’herbes séchées', unsplashId: '1545840716-c82e9eec6930' },
  { slug: 'bocaux-plantes', category: 'soins', w: 1200, h: 1500, alt: 'Fleurs et fruits séchés dans un bol en verre, vus du dessus', unsplashId: '1788963704657-ed5bf1064976' },
  { slug: 'herbes-sechees-mur', category: 'soins', w: 900, h: 1348, alt: 'Bouquets d’herbes séchées suspendus au mur près d’un miroir', unsplashId: '1725823934061-7a2529cf3d7a' },
  { slug: 'bol-fleurs-sechees', category: 'soins', w: 1200, h: 1000, alt: 'Un bol rempli de fleurs et de feuilles séchées', unsplashId: '1740250136478-de138c6b9f41' },
  { slug: 'plantes-suspendues', category: 'soins', w: 1200, h: 800, alt: 'Plantes séchées suspendues à des crochets de métal', unsplashId: '1509156396595-449e10c5cd3e' },
  { slug: 'feuilles-sechees', category: 'soins', w: 900, h: 600, alt: 'Feuilles séchées vertes et violettes', unsplashId: '1566792505656-e82d93abac30' },
  { slug: 'epices-marche', category: 'soins', w: 900, h: 1603, alt: 'Bols d’herbes séchées et d’épices sur un étal', unsplashId: '1759064716219-ba8c60a7ce07' },
  { slug: 'flacon-ambre', category: 'produits', w: 1200, h: 801, alt: 'Un flacon en verre ambré posé sur un tissu brun', unsplashId: '1624454002302-36b824d7bd0a' },
  { slug: 'bol-ceramique', category: 'produits', w: 1200, h: 800, alt: 'Un bol rond en céramique verte sur une table blanche', unsplashId: '1626783416763-67a92e5e7266' },
  { slug: 'savon-blanc', category: 'produits', w: 1200, h: 1800, alt: 'Un pain solide blanc posé sur une table blanche', unsplashId: '1607006344152-62699f97b42c' },
  { slug: 'savon-carre', category: 'produits', w: 1200, h: 846, alt: 'Un pain solide carré, blanc sur blanc', unsplashId: '1607006483224-73ce0729e22a' },
  { slug: 'barre-main', category: 'produits', w: 1200, h: 800, alt: 'Une main tient un pain solide', unsplashId: '1650543679355-0fcf8a621d1a' },
]

export const photos: Photo[] = raw.map((r) => ({
  slug: r.slug,
  src: import.meta.env.BASE_URL + 'photos/' + r.slug + '.jpg',
  alt: r.alt,
  credit: 'Unsplash (licence Unsplash)',
  url: 'https://images.unsplash.com/photo-' + r.unsplashId,
  category: r.category,
  w: r.w,
  h: r.h,
}))

export const photo = (slug: string): Photo => photos.find((p) => p.slug === slug) ?? photos[0]
export const photosBy = (c: PhotoCategory): Photo[] => photos.filter((p) => p.category === c)
