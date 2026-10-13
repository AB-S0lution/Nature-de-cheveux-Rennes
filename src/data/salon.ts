// DONNÉES RÉELLES (vérifiées, voir PLAN.md §1). Ne pas modifier sans source.
export interface Salon {
  name: string
  legalName: string
  siren: string
  siret: string
  vat: string
  address: { street: string; postalCode: string; city: string; place: string }
  geo: { lat: number; lng: number }
  phone: { display: string; tel: string }
  bookingUrl: string
  instagram: string
  ownSite: string
  founded: number
  owner: string
  slogan: string
  tagline: string
  mapsUrl: string
}

export const salon: Salon = {
  name: 'Nature de cheveux',
  legalName: 'YOHANN HUBERT (NATURE DE CHEVEUX), entrepreneur individuel',
  siren: '538 323 312',
  siret: '538 323 312 00016',
  vat: 'FR70 538323312',
  address: { street: '3 bis rue du Calvaire', postalCode: '35510', city: 'Cesson-Sévigné', place: 'Saozon-Sevigneg' },
  geo: { lat: 48.11698, lng: -1.605175 },
  phone: { display: '02 99 83 90 09', tel: 'tel:+33299839009' },
  bookingUrl: 'https://naturedecheveux.smartbooker.fr/',
  instagram: 'https://www.instagram.com/naturedecheveux/',
  ownSite: 'https://www.naturedecheveux.com/',
  founded: 2011,
  owner: 'Yohann Hubert',
  slogan: 'Naturellement VOTRE coiffure.',
  tagline: 'Concilier beauté des cheveux, respect de l’homme et de l’environnement',
  // Lien de recherche construit à partir de l'adresse (le lien Maps officiel reste à obtenir).
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nature+de+cheveux+3+bis+rue+du+Calvaire+35510+Cesson-S%C3%A9vign%C3%A9',
}

export interface Label {
  id: string
  title: string
  year: number
  note: string
}

// Les labels sont présentés avec leur année : aucune validité 2026 n'est affirmée.
export const labels: Label[] = [
  { id: 'ecocert', title: 'Ecocert, Établissement bien-être durable, 3 étoiles', year: 2024, note: 'Obtenu en 2024. La validité actuelle reste à confirmer avec le salon.' },
  { id: 'unec', title: 'Prix RSE de l’UNEC, Prix Initiative Développement Durable', year: 2024, note: 'Annoncé en avril 2025 (première édition).' },
  { id: 'cosmos', title: 'Cosmos Organic, Cosmos Natural, Vegan', year: 0, note: 'Badges affichés par le salon pour ses gammes de produits.' },
]
