// DONNÉES D'EXEMPLE : fiches d'herbier (noms de plantes réels cités par le salon ; descriptions et teintes à titre indicatif).
export type PlantId = 'henne' | 'indigo' | 'rhubarbe' | 'avoine' | 'guimauve' | 'curcuma' | 'argile' | 'algues' | 'huiles' | 'nacre'

export interface Plant {
  id: PlantId
  name: string
  latin: string
  part: string
  role: 'reflets' | 'soin' | 'brillance'
  hex: string
  caption: string
  inBowl: boolean
  usedForShades: string[]
}

export const plants: Plant[] = [
  { id: 'henne', name: 'Henné', latin: 'Lawsonia inermis', part: 'feuille séchée', role: 'reflets', hex: '#A8432A', caption: 'Des reflets cuivrés à roux, qui s’installent sur la fibre.', inBowl: true, usedForShades: ['cuivre-henne', 'acajou-doux', 'roux-braise', 'chatain-cuivre'] },
  { id: 'indigo', name: 'Indigo', latin: 'Indigofera tinctoria', part: 'feuille', role: 'reflets', hex: '#1E2A55', caption: 'Le bleu profond qui assombrit et refroidit un brun.', inBowl: true, usedForShades: ['brun-indigo', 'noir-encre', 'chatain-fonce'] },
  { id: 'rhubarbe', name: 'Rhubarbe', latin: 'Rheum palmatum', part: 'racine', role: 'reflets', hex: '#C99A3B', caption: 'Une dorure douce, pour des blonds chauds.', inBowl: true, usedForShades: ['blond-rhubarbe', 'blond-miel', 'blond-dore'] },
  { id: 'avoine', name: 'Avoine', latin: 'Avena sativa', part: 'grain', role: 'soin', hex: '#E6D8B8', caption: 'Elle adoucit le mélange et apaise le cuir chevelu.', inBowl: true, usedForShades: ['blond-sable'] },
  { id: 'guimauve', name: 'Guimauve', latin: 'Althaea officinalis', part: 'racine', role: 'soin', hex: '#E8D7DA', caption: 'Une texture souple, qui démêle et fait glisser la pâte.', inBowl: true, usedForShades: ['blond-sable'] },
  { id: 'curcuma', name: 'Curcuma', latin: 'Curcuma longa', part: 'rhizome', role: 'reflets', hex: '#D7A21E', caption: 'Une chaleur dorée, à doser avec délicatesse.', inBowl: true, usedForShades: ['blond-dore', 'blond-miel', 'chatain-noisette'] },
  { id: 'argile', name: 'Argile', latin: 'argile blanche et verte', part: 'minéral', role: 'soin', hex: '#B98A5A', caption: 'Purifie le cuir chevelu et porte la poudre éclaircissante minérale.', inBowl: false, usedForShades: ['gris-perle-mineral'] },
  { id: 'algues', name: 'Algues', latin: 'algues de Bretagne', part: 'thalle', role: 'soin', hex: '#4E7A5A', caption: 'Minéraux et oligo-éléments, pour les soins apaisants.', inBowl: false, usedForShades: [] },
  { id: 'huiles', name: 'Huiles bio', latin: 'huiles végétales biologiques', part: 'graines et fruits', role: 'brillance', hex: '#C9B25A', caption: 'Nourrissent les longueurs et font briller sans alourdir.', inBowl: false, usedForShades: [] },
  { id: 'nacre', name: 'Nacre de Bretagne', latin: 'nacre', part: 'coquille', role: 'brillance', hex: '#D9D3E8', caption: 'Un voile nacré dans la gamme Mineral Colours.', inBowl: false, usedForShades: ['gris-perle-mineral', 'chatain-perle'] },
]

export const bowlPlants = plants.filter((p) => p.inBowl)
export const plantById = (id: string) => plants.find((p) => p.id === id)
