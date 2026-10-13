// DONNÉES D'EXEMPLE : noms de teintes et hex fictifs, tous INDICATIFS (chaque coloration végétale est unique).
export type ShadeFamily = 'blond' | 'chatain' | 'brun' | 'cuivre' | 'roux' | 'mineral'

export interface Shade {
  id: string
  name: string
  family: ShadeFamily
  plants: string[]
  hex: string
  possible: boolean
  whiteHairCoverage?: string
  note?: string
}

export const familyLabels: Record<ShadeFamily, string> = {
  blond: 'Blonds', chatain: 'Châtains', brun: 'Bruns', cuivre: 'Cuivrés', roux: 'Roux', mineral: 'Minéral',
}

export const shades: Shade[] = [
  { id: 'blond-sable', name: 'Blond sable', family: 'blond', plants: ['avoine', 'guimauve', 'rhubarbe'], hex: '#D8C08E', possible: true },
  { id: 'blond-rhubarbe', name: 'Blond rhubarbe', family: 'blond', plants: ['rhubarbe'], hex: '#C99A3B', possible: true },
  { id: 'blond-miel', name: 'Blond miel', family: 'blond', plants: ['rhubarbe', 'curcuma'], hex: '#C58F2E', possible: true },
  { id: 'blond-dore', name: 'Blond doré', family: 'blond', plants: ['curcuma', 'rhubarbe'], hex: '#D2A640', possible: true },
  { id: 'chatain-noisette', name: 'Châtain noisette', family: 'chatain', plants: ['henne', 'curcuma'], hex: '#8A5A34', possible: true },
  { id: 'chatain-cuivre', name: 'Châtain cuivré', family: 'chatain', plants: ['henne', 'indigo'], hex: '#7A4430', possible: true },
  { id: 'chatain-fonce', name: 'Châtain profond', family: 'chatain', plants: ['henne', 'indigo'], hex: '#4C3226', possible: true },
  { id: 'chatain-perle', name: 'Châtain perlé', family: 'chatain', plants: ['nacre'], hex: '#7C6A5E', possible: true, whiteHairCoverage: '100 %', note: 'Gamme minérale' },
  { id: 'brun-indigo', name: 'Brun indigo', family: 'brun', plants: ['indigo', 'henne'], hex: '#33283A', possible: true },
  { id: 'noir-encre', name: 'Noir d’encre', family: 'brun', plants: ['indigo', 'henne'], hex: '#1E2233', possible: true },
  { id: 'brun-chocolat', name: 'Brun chocolat', family: 'brun', plants: ['henne', 'indigo'], hex: '#46281E', possible: true },
  { id: 'brun-cendre', name: 'Brun cendré', family: 'brun', plants: ['indigo'], hex: '#40383A', possible: true },
  { id: 'cuivre-henne', name: 'Cuivre de henné', family: 'cuivre', plants: ['henne'], hex: '#A8432A', possible: true },
  { id: 'acajou-doux', name: 'Acajou doux', family: 'cuivre', plants: ['henne', 'indigo'], hex: '#6E2E28', possible: true },
  { id: 'cuivre-dore', name: 'Cuivre doré', family: 'cuivre', plants: ['henne', 'curcuma'], hex: '#B8662E', possible: true },
  { id: 'roux-braise', name: 'Roux braise', family: 'roux', plants: ['henne'], hex: '#B04A22', possible: true },
  { id: 'roux-ambre', name: 'Roux ambré', family: 'roux', plants: ['henne', 'rhubarbe'], hex: '#B8742E', possible: true },
  { id: 'roux-flamme', name: 'Roux flamme', family: 'roux', plants: ['henne', 'curcuma'], hex: '#C0561E', possible: true },
  { id: 'gris-perle-mineral', name: 'Gris perle minéral', family: 'mineral', plants: ['nacre', 'argile'], hex: '#B4B4BA', possible: true, whiteHairCoverage: '100 %', note: 'Gamme minérale' },
  { id: 'mineral-brun-lumiere', name: 'Brun lumière minéral', family: 'mineral', plants: ['nacre'], hex: '#8A6A4C', possible: true, whiteHairCoverage: '100 %', note: 'Gamme minérale' },
  { id: 'mineral-chatain-clair', name: 'Châtain clair minéral', family: 'mineral', plants: ['nacre'], hex: '#A8815A', possible: true, whiteHairCoverage: '100 %', note: 'Gamme minérale' },
  { id: 'rose', name: 'Rose', family: 'blond', plants: [], hex: '#E58FB0', possible: false, note: 'Non réalisable en coloration végétale' },
  { id: 'bleu', name: 'Bleu électrique', family: 'brun', plants: [], hex: '#2D6AE0', possible: false, note: 'Non réalisable en coloration végétale' },
  { id: 'blond-polaire', name: 'Blond polaire', family: 'blond', plants: [], hex: '#F4F1E4', possible: false, note: 'Non réalisable en coloration végétale ni minérale' },
]
