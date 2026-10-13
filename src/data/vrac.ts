// DONNÉES RÉELLES (noms) : la station Le Vrac de Couleurs Gaïa vue sur la photo du salon du 31/01/2026.
// Prix de recharge : null (la carte de prix n'est pas lisible, ne pas inventer).
export interface Vrac {
  id: string
  name: string
  type: string
  hairNeed: string
  price: number | null
}

export const vrac: Vrac[] = [
  { id: 'plume', name: 'Plume', type: 'Shampooing', hairNeed: 'Cheveux normaux et cuirs chevelus sensibles', price: null },
  { id: 'cocon', name: 'Cocon', type: 'Shampooing', hairNeed: 'Cheveux secs et abîmés', price: null },
  { id: 'purete', name: 'Pureté', type: 'Shampooing', hairNeed: 'Cheveux gras', price: null },
  { id: 'coton', name: 'Coton', type: 'Baume démêlant', hairNeed: 'Démêler et assouplir', price: null },
]
