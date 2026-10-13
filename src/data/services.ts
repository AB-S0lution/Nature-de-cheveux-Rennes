// Prix RÉELS (liste du salon, janvier 2026, tous « à partir de », cheveux courts, TVA 20 % et service compris).
// Descriptions et "includes" : DONNÉES D'EXEMPLE à remplacer. Durées : inconnues (duration: null).
export type ServiceCategory = 'coupes' | 'coloration' | 'soins' | 'techniques' | 'enfants'

export interface Service {
  id: string
  category: ServiceCategory
  name: string
  priceFrom: number
  note?: string
  description: string
  includes: string[]
  duration: number | null
}

export const categories: { id: ServiceCategory; title: string; blurb: string }[] = [
  { id: 'coupes', title: 'Coupes et coiffages', blurb: 'Sur mesure, sur cheveux secs si votre texture le demande.' },
  { id: 'coloration', title: 'Coloration', blurb: 'Plantes et eau, ou pigments minéraux. Un diagnostic avant la première fois.' },
  { id: 'soins', title: 'Soins', blurb: 'Argiles, algues et huiles bio, ou vapeur douce.' },
  { id: 'techniques', title: 'Techniques et occasions', blurb: 'Éclaircissement, chignons, permanente.' },
  { id: 'enfants', title: 'Enfants', blurb: 'Une première coupe en douceur, à tout âge.' },
]

const massage = 'Massage au shampooing offert'

export const services: Service[] = [
  { id: 'shampooing-coupe-coiffage', category: 'coupes', name: 'Shampooing Coupe Coiffage', priceFrom: 54, description: 'Une coupe personnalisée, facile à vivre et à recoiffer selon vos habitudes, suivie d’un coiffage.', includes: [massage, 'Shampooing', 'Coupe', 'Coiffage'], duration: null },
  { id: 'shampooing-coupe-brushing', category: 'coupes', name: 'Shampooing Coupe Brushing', priceFrom: 57, description: 'La coupe, puis un brushing soigné qui met en valeur le mouvement naturel de vos cheveux.', includes: [massage, 'Shampooing', 'Coupe', 'Brushing'], duration: null },
  { id: 'shampooing-coupe-homme', category: 'coupes', name: 'Shampooing Coupe Homme', priceFrom: 34, description: 'Une coupe nette et pensée pour votre quotidien, shampooing compris.', includes: [massage, 'Shampooing', 'Coupe'], duration: null },
  { id: 'shampooing-brushing', category: 'coupes', name: 'Shampooing Brushing', priceFrom: 36, description: 'Un shampooing tout en douceur et un brushing pour retrouver du volume et de la brillance.', includes: [massage, 'Shampooing', 'Brushing'], duration: null },
  { id: 'shampooing-mise-en-plis', category: 'coupes', name: 'Shampooing Mise en plis', priceFrom: 36, description: 'Une mise en plis à l’ancienne, souple et tenue, sans excès de produit.', includes: [massage, 'Shampooing', 'Mise en plis'], duration: null },
  { id: 'coloration-vegetale-application', category: 'coloration', name: 'Coloration végétale (l’application)', priceFrom: 58, description: 'Le mélange de poudres de plantes et d’eau, préparé devant vous et appliqué avec soin.', includes: ['Préparation devant vous', 'Application'], duration: null },
  { id: 'coloration-vegetale-coiffage', category: 'coloration', name: 'Coloration végétale Coiffage', priceFrom: 82, description: 'La coloration végétale suivie du shampooing et d’un coiffage.', includes: [massage, 'Coloration végétale', 'Shampooing', 'Coiffage'], duration: null },
  { id: 'coloration-vegetale-coupe-coiffage', category: 'coloration', name: 'Coloration végétale Coupe Coiffage', priceFrom: 92, description: 'Le forfait complet : coloration végétale, coupe sur mesure et coiffage.', includes: [massage, 'Coloration végétale', 'Coupe', 'Coiffage'], duration: null },
  { id: 'coloration-minerale-coupe-coiffage', category: 'coloration', name: 'Coloration minérale Coupe Coiffage', priceFrom: 92, description: 'Des pigments minéraux, sans ammoniaque ni PPD, pour couvrir les cheveux blancs, avec coupe et coiffage.', includes: [massage, 'Coloration minérale', 'Coupe', 'Coiffage'], duration: null },
  { id: 'soin-hydratant-instantane', category: 'soins', name: 'Soin hydratant instantané', priceFrom: 6, description: 'Un geste rapide pour redonner de la souplesse à la fibre.', includes: ['Soin express'], duration: null },
  { id: 'soin-hydratant-couleur', category: 'soins', name: 'Soin hydratant couleur', priceFrom: 10, description: 'Un soin pensé pour prolonger l’éclat d’une coloration.', includes: ['Soin adapté à la couleur'], duration: null },
  { id: 'soin-hydratant-vapeur', category: 'soins', name: 'Soin hydratant profond à la vapeur', priceFrom: 35, description: 'Une hydratation en profondeur, aidée par la chaleur douce de la vapeur.', includes: ['Soin profond', 'Chaleur douce'], duration: null },
  { id: 'soin-apaisant-argiles', category: 'soins', name: 'Soin apaisant aux argiles, algues et huiles bio', priceFrom: 35, description: 'Un rituel pour le cuir chevelu et les longueurs, aux argiles, algues et huiles biologiques.', includes: ['Argiles', 'Algues', 'Huiles bio'], duration: null },
  { id: 'chignon', category: 'techniques', name: 'Chignon', priceFrom: 58, description: 'Une coiffure de fête ou d’occasion, attachée avec soin pour tenir toute la journée.', includes: ['Coiffure d’occasion'], duration: null },
  { id: 'flash', category: 'techniques', name: 'Flash', priceFrom: 30, description: 'Quelques touches de lumière, avec des produits respectueux de votre chevelure.', includes: ['Éclaircissement ponctuel'], duration: null },
  { id: 'balayage', category: 'techniques', name: 'Balayage', priceFrom: 92, description: 'Un éclaircissement progressif et naturel, réalisé à la poudre éclaircissante minérale à l’argile.', includes: ['Éclaircissement à l’argile'], duration: null },
  { id: 'meches', category: 'techniques', name: 'Mèches', priceFrom: 92, description: 'Des mèches placées selon votre visage et votre couleur de base.', includes: ['Éclaircissement à l’argile'], duration: null },
  { id: 'permanente', category: 'techniques', name: 'Permanente', priceFrom: 77, description: 'Du volume et de la boucle durables, après un diagnostic de votre fibre.', includes: ['Diagnostic', 'Permanente'], duration: null },
  { id: 'enfant-6', category: 'enfants', name: 'Enfant –6 ans', priceFrom: 21, description: 'Une première coupe en douceur, à hauteur d’enfant.', includes: ['Coupe'], duration: null },
  { id: 'demoiselle-12', category: 'enfants', name: 'Demoiselle –12 ans', priceFrom: 32, description: 'Une coupe adaptée à la longueur et à la texture, pour les demoiselles.', includes: ['Coupe'], duration: null },
  { id: 'garcon-12', category: 'enfants', name: 'Garçon –12 ans', priceFrom: 28, description: 'Une coupe nette qui se coiffe toute seule.', includes: ['Coupe'], duration: null },
]

export const priceFootnotes = [
  'Tous les prix sont « à partir de ».',
  'Tarifs pour cheveux courts, susceptibles d’évoluer suivant longueur et/ou épaisseur.',
  'Nos prix sont indiqués T.V.A (20 %) et service compris.',
]
export const priceHeadline = 'Au shampooing, le massage est offert'
export const priceListDate = 'Liste de janvier 2026'

export function euro(n: number): string {
  return `${n} €`
}
