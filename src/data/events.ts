// DONNÉES D'EXEMPLE : idées d'événements. AUCUNE date réelle, statut « à confirmer ».
export interface SalonEvent {
  id: string
  title: string
  text: string
  status: 'à confirmer'
}

export const events: SalonEvent[] = [
  { id: 'decouverte', title: 'Matinée découverte du végétal', text: 'Voir les poudres, sentir les plantes, poser vos questions avant une première couleur.', status: 'à confirmer' },
  { id: 'collecte', title: 'Collecte de dons de cheveux', text: 'Une matinée pour préparer vos 10 cm et les confier à Fake Hair Don’t Care.', status: 'à confirmer' },
  { id: 'boucles', title: 'Atelier routine boucles', text: 'Définir, hydrater, rafraîchir : une routine simple pour vos boucles.', status: 'à confirmer' },
  { id: 'miel', title: 'Pause miel de la ruche', text: 'Une dégustation de miel de la ruche parrainée, avec un thé.', status: 'à confirmer' },
  { id: 'vrac', title: 'Atelier vrac', text: 'Venir avec ses flacons pour apprendre à remplir ses shampooings et baumes.', status: 'à confirmer' },
]
