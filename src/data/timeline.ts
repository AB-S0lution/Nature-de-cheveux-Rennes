// DONNÉES RÉELLES : repères de l'histoire du salon (PLAN.md §2). selfReported : « selon le salon ».
export interface TimelineEntry {
  year: string
  title: string
  text: string
  selfReported?: boolean
}

export const timeline: TimelineEntry[] = [
  { year: '2011', title: 'Ouverture rue du Calvaire', text: 'Yohann Hubert immatricule son salon le 22 novembre 2011, au 3 bis rue du Calvaire à Cesson-Sévigné. Le nom et l’adresse n’ont pas changé depuis.' },
  { year: '2013', title: 'Annuaire Bio et Bien-être', text: 'Le salon rejoint l’annuaire Bio et Bien-être, à la recherche d’une clientèle sensible à la démarche.' },
  { year: '2019', title: 'Membre Capillum', text: 'Un badge « Membre Capillum depuis 2019 » figure sur le site du salon. Les cheveux coupés prennent une seconde vie.', selfReported: true },
  { year: '2022', title: 'Éco-défis de la CMA Bretagne', text: 'Le salon se présente comme lauréat du challenge éco-défis de la CMA Bretagne.', selfReported: true },
  { year: '2024', title: 'Ecocert, 3 étoiles', text: 'Au printemps 2024, le salon obtient le label Ecocert « Établissement bien-être durable », niveau 3, le plus élevé. Un dossier, puis un audit sur place.' },
  { year: '2024', title: 'La presse en parle', text: 'Le CIM de Cesson-Sévigné, Enercoop, Profession Bien-Être et Biblond racontent la démarche du salon.' },
  { year: '2025', title: 'Prix RSE de l’UNEC', text: 'Prix Initiative Développement Durable, première édition du Prix RSE de l’UNEC (annoncé fin avril 2025).' },
  { year: '2026', title: 'Réservation en ligne', text: 'Nouvelle liste de prix en janvier, puis réservation en ligne au printemps. Une première couleur se prépare toujours par un appel ou un diagnostic.' },
]
