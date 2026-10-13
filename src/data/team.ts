// DONNÉES D'EXEMPLE (rôles tirés de la description Enercoop de juin 2024). Équipe 2026 NON confirmée :
// aucun prénom ni portrait affiché, aucun nom de famille. Seul le fondateur est public.
export interface TeamRole {
  id: string
  role: string
  name: string | null
  text: string
}

export const team: TeamRole[] = [
  { id: 'fondateur', role: 'Fondateur et gérant', name: 'Yohann Hubert', text: 'Coupeur avant tout, passionné de plantes et de colorimétrie. Il a ouvert le salon en 2011 et se forme sans cesse.' },
  { id: 'seconde', role: 'Coiffeuse, seconde du gérant', name: null, text: 'Elle partage l’organisation du salon et suit les clientes depuis des années.' },
  { id: 'cm', role: 'Coiffeuse formée au salon, community manager', name: null, text: 'Formée sur place, elle est restée. Elle anime aussi le compte Instagram.' },
  { id: 'bp', role: 'Coiffeuse en fin de brevet professionnel', name: null, text: 'Elle termine son BP et continue l’aventure avec l’équipe.' },
  { id: 'apprentie', role: 'Apprentie en début de formation', name: null, text: 'Elle découvre le métier avec une équipe qui prend le temps de transmettre.' },
]

export const lineage = [
  'Formée aux techniques les plus novatrices par les plus grands coiffeurs (S. Amaru, Alexandre de Paris, J.-M. Faretra, C. Nicolas Biot…), selon le salon.',
  'Visagisme et conseil en image, avec C. Juillard.',
  'Formation continue, « même avec des produits chimiques », pour suivre l’évolution des tendances.',
]
