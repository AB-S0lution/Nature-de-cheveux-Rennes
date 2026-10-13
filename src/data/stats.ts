// DONNÉES RÉELLES : chiffres vérifiés (PLAN.md §1 et §5). Les chiffres de la brochure sont « selon le salon ».
export interface Stat {
  id: string
  value: string
  label: string
  note?: string
}

export const stats: Stat[] = [
  { id: 'since', value: '2011', label: 'depuis 2011, à Cesson-Sévigné' },
  { id: 'google', value: '4,7/5', label: '99 avis Google', note: 'octobre 2026' },
  { id: 'ecocert', value: '3 ★', label: 'Ecocert bien-être durable', note: 'obtenu en 2024' },
  { id: 'energie', value: '100 %', label: 'énergie renouvelable', note: 'chiffre du salon' },
  { id: 'eau', value: '50 %', label: 'd’économies d’eau', note: 'chiffre du salon' },
  { id: 'don', value: '10 cm', label: 'pour donner vos cheveux' },
]
