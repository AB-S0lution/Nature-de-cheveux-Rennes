// DONNÉES RÉELLES (approximatives) : arrêts STAR à vol d'oiseau autour du salon (données ouvertes STAR, 13/10/2026).
// Distances à vol d'oiseau, pas à pied. Métro : non vérifié, trajet « bus puis métro » = inférence.
export interface Stop {
  id: string
  kind: 'bus' | 'ter' | 'metro' | 'velo' | 'parking'
  name: string
  distance: string
  lines?: string
  approx: boolean
  verify: boolean
}

export const transport: Stop[] = [
  { id: 'vilaine', kind: 'bus', name: 'Arrêt Vilaine', distance: 'environ 175 m', lines: 'C6, E4, 206', approx: true, verify: false },
  { id: 'muguet', kind: 'bus', name: 'Arrêt Muguet', distance: 'environ 285 m', lines: 'C6, E4', approx: true, verify: false },
  { id: 'chalotais', kind: 'bus', name: 'Arrêt Chalotais', distance: 'environ 350 m', lines: 'C6, E4, 34, 214, Ts61', approx: true, verify: false },
  { id: 'ter', kind: 'ter', name: 'Gare de Cesson-Sévigné (TER)', distance: 'environ 350 à 390 m', lines: 'Cesson Gare : 11, 14, 34, 67, 214', approx: true, verify: false },
  { id: 'metro', kind: 'metro', name: 'Métro ligne B, Cesson-ViaSilva', distance: 'environ 1,9 km', lines: 'à rejoindre en bus (C2, E4, 34)', approx: true, verify: true },
  { id: 'parking', kind: 'parking', name: 'Parking gratuit', distance: 'Place du Marché, environ 120 m', lines: 'Stationnements nombreux et gratuits ; place PMR', approx: true, verify: false },
]
