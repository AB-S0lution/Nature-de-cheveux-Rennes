// DONNÉES D'EXEMPLE : œuvres originales générées (SVG), sans photo ni reproduction de la fresque du salon.
export type GalleryType = 'mèche' | 'herbier' | 'pigment' | 'texture'

export interface GalleryItem {
  id: string
  type: GalleryType
  title: string
  alt: string
  shade?: string
  plant?: string
  texture?: 'lisse' | 'ondulé' | 'bouclé' | 'frisé'
  seed: number
  photoSlot?: boolean
}

export const gallery: GalleryItem[] = [
  { id: 'g1', type: 'mèche', title: 'Cuivre de henné', alt: 'Une mèche lisse aux reflets cuivrés qui s’enroule en boucle ouverte', shade: 'cuivre-henne', texture: 'lisse', seed: 1 },
  { id: 'g2', type: 'mèche', title: 'Brun indigo', alt: 'Une mèche ondulée brun bleuté sur fond d’eau claire', shade: 'brun-indigo', texture: 'ondulé', seed: 2 },
  { id: 'g3', type: 'mèche', title: 'Blond rhubarbe', alt: 'Une mèche bouclée dorée comme la racine de rhubarbe', shade: 'blond-rhubarbe', texture: 'bouclé', seed: 3 },
  { id: 'g4', type: 'mèche', title: 'Acajou doux', alt: 'Une mèche frisée acajou, en petites spirales serrées', shade: 'acajou-doux', texture: 'frisé', seed: 4 },
  { id: 'g5', type: 'mèche', title: 'Blond miel', alt: 'Une mèche ondulée couleur miel', shade: 'blond-miel', texture: 'ondulé', seed: 5 },
  { id: 'g6', type: 'mèche', title: 'Gris perle minéral', alt: 'Une mèche lisse gris perle au reflet nacré', shade: 'gris-perle-mineral', texture: 'lisse', seed: 6 },
  { id: 'h1', type: 'herbier', title: 'Henné', alt: 'Planche d’herbier : branche de henné étiquetée à la machine à écrire', plant: 'henne', seed: 11 },
  { id: 'h2', type: 'herbier', title: 'Indigo', alt: 'Planche d’herbier : rameau d’indigotier', plant: 'indigo', seed: 12 },
  { id: 'h3', type: 'herbier', title: 'Rhubarbe', alt: 'Planche d’herbier : feuille et racine de rhubarbe', plant: 'rhubarbe', seed: 13 },
  { id: 'h4', type: 'herbier', title: 'Avoine', alt: 'Planche d’herbier : épis d’avoine', plant: 'avoine', seed: 14 },
  { id: 'h5', type: 'herbier', title: 'Guimauve', alt: 'Planche d’herbier : fleur de guimauve', plant: 'guimauve', seed: 15 },
  { id: 'h6', type: 'herbier', title: 'Curcuma', alt: 'Planche d’herbier : rhizome et feuille de curcuma', plant: 'curcuma', seed: 16 },
  { id: 'p1', type: 'pigment', title: 'Sarcelle et indigo', alt: 'Une fleur d’encre sarcelle et indigo qui se diffuse dans l’eau', seed: 21 },
  { id: 'p2', type: 'pigment', title: 'Framboise dans l’eau', alt: 'Un nuage framboise et violet dans de l’eau claire', seed: 22 },
  { id: 'p3', type: 'pigment', title: 'Henné et sauge', alt: 'Un lavis cuivré qui rencontre un vert sauge', seed: 23 },
  { id: 'p4', type: 'pigment', title: 'Brume du matin', alt: 'Des lavis gris-bleu superposés, comme une brume', seed: 24 },
  { id: 't1', type: 'texture', title: 'Lisse', alt: 'Texture de cheveux lisses : cinq mèches parallèles', texture: 'lisse', seed: 31 },
  { id: 't2', type: 'texture', title: 'Ondulé', alt: 'Texture de cheveux ondulés : cinq mèches en vagues douces', texture: 'ondulé', seed: 32 },
  { id: 't3', type: 'texture', title: 'Bouclé', alt: 'Texture de cheveux bouclés : cinq mèches en boucles régulières', texture: 'bouclé', seed: 33 },
  { id: 't4', type: 'texture', title: 'Frisé', alt: 'Texture de cheveux frisés : cinq mèches en petites spirales', texture: 'frisé', seed: 34 },
  { id: 's1', type: 'mèche', title: 'Emplacement photo : devanture', alt: 'Emplacement réservé à une photo réelle de la devanture, avec l’accord du salon', seed: 41, photoSlot: true },
  { id: 's2', type: 'mèche', title: 'Emplacement photo : intérieur', alt: 'Emplacement réservé à une photo réelle de l’intérieur (miroirs dorés, fauteuil de barbier), avec l’accord du salon', seed: 42, photoSlot: true },
  { id: 's3', type: 'mèche', title: 'Emplacement photo : bols de henné', alt: 'Emplacement réservé à une photo réelle de bols de pâte de henné, avec l’accord du salon', seed: 43, photoSlot: true },
  { id: 's4', type: 'mèche', title: 'Emplacement photo : étagère de bocaux', alt: 'Emplacement réservé à une photo réelle du mur de bocaux de poudres, avec l’accord du salon', seed: 44, photoSlot: true },
]
export const galleryTypeLabels: Record<GalleryType, string> = { mèche: 'Mèches', herbier: 'Herbier', pigment: 'Pigments', texture: 'Textures' }
