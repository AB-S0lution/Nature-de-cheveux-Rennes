// DONNÉES RÉELLES : notes par plateforme, avec nombre et date (PLAN.md §4.1).
export interface Rating {
  platform: string
  score: number
  outOf: number
  count: string
  date: string
  note?: string
  headline?: boolean
}

export const ratings: Rating[] = [
  { platform: 'Google', score: 4.7, outOf: 5, count: '99 avis', date: 'octobre 2026', headline: true },
  { platform: 'Couleurs Gaïa (Avis Garantis)', score: 4.9, outOf: 5, count: '263 avis', date: 'non datée', note: 'Plateforme du fournisseur' },
  { platform: 'PagesJaunes', score: 5, outOf: 5, count: '3 avis', date: 'octobre 2026' },
  { platform: 'Mappy', score: 5, outOf: 5, count: 'nombre d’avis non clair', date: 'octobre 2026' },
]

export const googleDistribution = [
  { stars: 5, count: 84 }, { stars: 4, count: 10 }, { stars: 3, count: 2 }, { stars: 2, count: 0 }, { stars: 1, count: 3 },
]
