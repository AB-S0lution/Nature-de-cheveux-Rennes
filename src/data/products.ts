// DONNÉES D'EXEMPLE : catalogue. Les NOMS viennent des catalogues officiels des marques (PLAN.md §3.5) ;
// la présence en rayon n'est confirmée que pour stockStatus "vu-en-salon". Prix fictifs (prixIndicatif).
// Vente au salon uniquement : aucune vente en ligne ni livraison.
export type Brand = 'Couleurs Gaïa' | 'Mineral Colours' | 'Rodolphe & Co' | 'Kalia Nature' | 'Sativa' | 'Laboratoires Science et Équilibre' | 'Capiplante' | 'Cailleau Herboristerie' | 'Chamarrel'
export type Format = 'vrac' | 'solide' | 'liquide' | 'cabine' | 'accessoire'
export type ProductTag = 'vrac' | 'solide' | 'bio' | 'vegan' | 'bouclés' | 'cuir chevelu sensible' | 'cheveux blancs'
export type Need = 'laver' | 'soigner' | 'coiffer' | 'colorer' | 'boucles' | 'accessoire'

export interface Product {
  id: string
  brand: Brand
  name: string
  type: string
  format: Format
  need: Need
  tags: ProductTag[]
  price: number | null
  prixIndicatif: boolean
  stockStatus: 'vu-en-salon' | 'gamme-de-la-marque'
  confirm?: boolean
}

let n = 0
function p(brand: Brand, name: string, type: string, format: Format, need: Need, tags: ProductTag[], price: number | null, stockStatus: Product['stockStatus'] = 'gamme-de-la-marque', confirm = false): Product {
  n += 1
  return { id: `p${n}`, brand, name, type, format, need, tags, price, prixIndicatif: price !== null, stockStatus, confirm: confirm || undefined }
}

export const products: Product[] = [
  // Couleurs Gaïa, Le Vrac (vu en salon, prix de recharge inconnus)
  p('Couleurs Gaïa', 'Plume', 'shampooing cheveux normaux et cuirs chevelus sensibles', 'vrac', 'laver', ['vrac', 'bio', 'cuir chevelu sensible'], null, 'vu-en-salon'),
  p('Couleurs Gaïa', 'Cocon', 'shampooing cheveux secs et abîmés', 'vrac', 'laver', ['vrac', 'bio'], null, 'vu-en-salon'),
  p('Couleurs Gaïa', 'Pureté', 'shampooing cheveux gras', 'vrac', 'laver', ['vrac', 'bio'], null, 'vu-en-salon'),
  p('Couleurs Gaïa', 'Coton', 'baume démêlant', 'vrac', 'soigner', ['vrac', 'bio'], null, 'vu-en-salon'),
  // Couleurs Gaïa, gamme
  p('Couleurs Gaïa', 'Néroli', 'brume démêlante thermo-protectrice', 'liquide', 'coiffer', ['bio'], 17),
  p('Couleurs Gaïa', 'Source d’Argile', 'masque purifiant', 'liquide', 'soigner', ['bio', 'cuir chevelu sensible'], 22),
  p('Couleurs Gaïa', 'Velours', 'masque nutritif', 'liquide', 'soigner', ['bio'], 24),
  p('Couleurs Gaïa', 'Shanti', 'masque ayurvédique', 'liquide', 'soigner', ['bio'], 26),
  p('Couleurs Gaïa', 'Pondichéry', 'shampooing solide ayurvédique', 'solide', 'laver', ['solide', 'bio', 'vegan'], 12),
  p('Couleurs Gaïa', 'Nomade', 'shampooing sec', 'liquide', 'laver', ['bio'], 15),
  p('Couleurs Gaïa', 'Instant Présent', 'huile de soin', 'liquide', 'soigner', ['bio'], 28),
  p('Couleurs Gaïa', 'Baume au Cœur', 'soin réparateur karité-argan', 'liquide', 'soigner', ['bio'], 21),
  p('Couleurs Gaïa', 'Ô Zen', 'sérum protection et finition', 'liquide', 'coiffer', ['bio'], 23),
  p('Couleurs Gaïa', 'Embruns', 'spray salin', 'liquide', 'coiffer', ['bio'], 16),
  p('Couleurs Gaïa', 'Volupté', 'mousse coiffante', 'liquide', 'coiffer', ['bio'], 18),
  p('Couleurs Gaïa', 'Graphiste', 'spray fixant', 'liquide', 'coiffer', ['bio'], 17),
  p('Couleurs Gaïa', 'Cire de coiffage', 'cire de coiffage', 'liquide', 'coiffer', ['bio'], 19),
  p('Couleurs Gaïa', 'Expertise Boucles, leave-in hydratant', 'soin sans rinçage pour boucles', 'liquide', 'boucles', ['bio', 'bouclés'], 21),
  p('Couleurs Gaïa', 'Expertise Boucles, spray dynamisant', 'spray pour relancer les boucles', 'liquide', 'boucles', ['bio', 'bouclés'], 18),
  p('Couleurs Gaïa', 'Expertise Boucles, gelée bouclante', 'gelée de définition', 'liquide', 'boucles', ['bio', 'bouclés'], 20),
  // Couleurs Gaïa, colorations végétales (cabine)
  p('Couleurs Gaïa', 'Herbal Henna', 'coloration végétale, cuivre intense sur cheveux blancs', 'cabine', 'colorer', ['bio', 'cheveux blancs'], null),
  p('Couleurs Gaïa', 'Blond Indien', 'coloration végétale', 'cabine', 'colorer', ['bio'], null),
  p('Couleurs Gaïa', 'Havana', 'coloration végétale, châtain cuivré', 'cabine', 'colorer', ['bio'], null),
  p('Couleurs Gaïa', 'Blond Kashmir', 'coloration végétale', 'cabine', 'colorer', ['bio'], null),
  p('Couleurs Gaïa', 'Moka', 'coloration végétale', 'cabine', 'colorer', ['bio'], null),
  p('Couleurs Gaïa', 'Nuance Rouge', 'coloration végétale', 'cabine', 'colorer', ['bio'], null),
  p('Couleurs Gaïa', 'Nuance Or', 'coloration végétale', 'cabine', 'colorer', ['bio'], null),
  // Mineral Colours / Rodolphe & Co
  p('Mineral Colours', 'Mineral Colours, nuancier de 29 teintes', 'coloration minérale, sans ammoniaque ni PPD', 'cabine', 'colorer', ['cheveux blancs'], null, 'vu-en-salon'),
  p('Rodolphe & Co', 'Brume', 'brume coiffante (vue sur l’étagère du salon)', 'liquide', 'coiffer', [], 19, 'vu-en-salon'),
  p('Rodolphe & Co', 'Shampooing', 'shampooing (vu sur l’étagère du salon)', 'liquide', 'laver', [], 18, 'vu-en-salon'),
  // Kalia Nature
  p('Kalia Nature', 'Shampoing à l’Hibiscus, liquide', 'shampoing pour cheveux bouclés à crépus', 'liquide', 'laver', ['bouclés', 'bio'], 14),
  p('Kalia Nature', 'Shampoing à l’Hibiscus, solide', 'shampoing solide pour cheveux bouclés à crépus', 'solide', 'laver', ['bouclés', 'solide', 'bio'], 11),
  p('Kalia Nature', 'Shampoing à l’Ortie Piquante, liquide', 'shampoing purifiant', 'liquide', 'laver', ['bouclés', 'bio'], 14),
  p('Kalia Nature', 'Shampoing à l’Ortie Piquante, solide', 'shampoing solide purifiant', 'solide', 'laver', ['bouclés', 'solide', 'bio'], 11),
  p('Kalia Nature', 'Shampoing à la Bay Saint-Thomas', 'shampoing pour cuir chevelu', 'liquide', 'laver', ['bouclés', 'cuir chevelu sensible'], 15),
  p('Kalia Nature', 'Après-Shampoing à la Sapote', 'après-shampoing', 'liquide', 'soigner', ['bouclés'], 16),
  p('Kalia Nature', 'Masque Coco-Spiruline', 'masque hydratant', 'liquide', 'soigner', ['bouclés'], 23),
  p('Kalia Nature', 'Masque au Murumuru', 'masque nourrissant', 'liquide', 'soigner', ['bouclés'], 24),
  p('Kalia Nature', 'Lait Capillaire à l’Hibiscus', 'lait de soin', 'liquide', 'boucles', ['bouclés'], 19),
  p('Kalia Nature', 'Crème d’Hibiscus', 'crème coiffante', 'liquide', 'boucles', ['bouclés'], 20),
  p('Kalia Nature', 'Gelée d’Hibiscus', 'gelée de définition', 'liquide', 'boucles', ['bouclés'], 18),
  p('Kalia Nature', 'Gel au Miel', 'gel coiffant', 'liquide', 'boucles', ['bouclés'], 17),
  p('Kalia Nature', 'Baume Fondant à l’Hibiscus', 'baume de soin', 'liquide', 'boucles', ['bouclés'], 22),
  p('Kalia Nature', 'Sérum au Murumuru', 'sérum de finition', 'liquide', 'boucles', ['bouclés'], 25),
  // Sativa (types génériques, aucun nom vérifié)
  p('Sativa', 'Shampooing solide cheveux secs', 'cosmétique solide, zéro déchet', 'solide', 'laver', ['solide', 'bio'], 10),
  p('Sativa', 'Shampooing solide cheveux normaux', 'cosmétique solide, zéro déchet', 'solide', 'laver', ['solide', 'bio'], 10),
  p('Sativa', 'Après-shampoing solide', 'cosmétique solide, zéro déchet', 'solide', 'soigner', ['solide', 'bio'], 12),
  p('Sativa', 'Savon pour le corps', 'cosmétique solide, zéro déchet', 'solide', 'accessoire', ['solide', 'bio'], 6),
  // Laboratoires Science et Équilibre (types génériques)
  p('Laboratoires Science et Équilibre', 'Huile de soin', 'huile végétale pour les longueurs', 'liquide', 'soigner', ['bio'], 27),
  p('Laboratoires Science et Équilibre', 'Soin capillaire', 'soin de la gamme Val de Loire', 'liquide', 'soigner', ['bio'], 29),
  p('Laboratoires Science et Équilibre', 'Shampooing doux', 'shampooing de la gamme Val de Loire', 'liquide', 'laver', ['bio', 'cuir chevelu sensible'], 16),
  // À confirmer
  p('Capiplante', 'Gamme Capiplante', 'vu en salon, à confirmer', 'liquide', 'soigner', ['bio'], 32, 'vu-en-salon', true),
  p('Cailleau Herboristerie', 'Gamme Cailleau', 'brochure 2024, à confirmer', 'liquide', 'soigner', ['bio'], 24, 'gamme-de-la-marque', true),
  p('Chamarrel', 'Porte-savon minimaliste aimanté', 'accessoire pour cosmétiques solides', 'accessoire', 'accessoire', ['solide'], 14, 'vu-en-salon'),
]

export const brands = Array.from(new Set(products.map((x) => x.brand)))
export const formatLabels: Record<Format, string> = { vrac: 'Vrac', solide: 'Solide', liquide: 'Flacon', cabine: 'En cabine', accessoire: 'Accessoire' }
export const needLabels: Record<Need, string> = { laver: 'Laver', soigner: 'Soigner', coiffer: 'Coiffer', colorer: 'Colorer', boucles: 'Boucles', accessoire: 'Accessoire' }
