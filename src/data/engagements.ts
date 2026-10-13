// DONNÉES RÉELLES : engagements du salon (PLAN.md §5). selfReported : chiffre ou déclaration du salon, non vérifié par un tiers.
export type EngagementTheme = 'energie' | 'don' | 'ruche' | 'eau' | 'dechet' | 'label' | 'social' | 'produits'

export interface Engagement {
  id: string
  theme: EngagementTheme
  title: string
  text: string
  source: string
  selfReported: boolean
}

export const engagements: Engagement[] = [
  { id: 'ecocert', theme: 'label', title: 'Label Ecocert, Établissement bien-être durable', text: 'Niveau 3 (trois étoiles), obtenu en 2024. Les niveaux : engagement dans la démarche, confirmation de l’effort accompli, établissement exemplaire. Le label se renouvelle chaque année après un audit.', source: 'Attestation du salon, 22/03/2024 ; Enercoop', selfReported: false },
  { id: 'unec', theme: 'label', title: 'Prix RSE de l’UNEC 2024', text: 'Prix Initiative Développement Durable : pas d’aluminium ni de plastiques à usage unique, tri et compostage, tableaux de bord eau et énergie, intéressement, plans de formation individuels.', source: 'Communiqué UNEC, 29 avril 2025', selfReported: false },
  { id: 'enercoop', theme: 'energie', title: 'Électricité Enercoop', text: 'Une électricité renouvelable, « locale et citoyenne », choisie parce qu’elle paraissait « évidente et cohérente ».', source: 'Enercoop Bretagne, 26 juin 2024', selfReported: false },
  { id: 'don', theme: 'don', title: 'Don de cheveux, dès 10 cm', text: 'Les cheveux de plus de 10 cm partent à Fake Hair Don’t Care, qui fabrique des perruques pour des personnes en traitement contre le cancer.', source: 'Site du salon', selfReported: false },
  { id: 'capillum', theme: 'don', title: 'Capillum', text: 'Les cheveux plus courts sont recyclés avec Capillum, notamment pour dépolluer l’eau et pailler les sols. Le salon est membre depuis 2019 selon son site.', source: 'Site du salon (selon le salon)', selfReported: true },
  { id: 'ruche', theme: 'ruche', title: 'Une ruche parrainée', text: 'Le salon parraine une ruche du Rucher du Champoivre (Héric, près de Nantes). Les ruches sont construites par des ESAT, des associations et des écoles ; la mise en pot est faite par des détenus de la prison de Nantes. Le miel accompagne vos pauses.', source: 'Page La démarche du salon', selfReported: true },
  { id: 'eau', theme: 'eau', title: 'Eau et énergie économisées', text: 'Pommeaux de douche économes (Ecoheads), panneaux LED, pas d’éclairage de nuit ni de veille, affiches de sensibilisation pour les clientes. Chiffre du salon : 50 % d’économies d’eau.', source: 'Enercoop ; brochure du salon', selfReported: true },
  { id: 'dechet', theme: 'dechet', title: 'Zéro déchet', text: 'Papiers de couleur lavables, les mêmes depuis 2011, peignoirs lavables fabriqués en France, lessive faite avec la cendre des cheminées de l’équipe, compostage.', source: 'Enercoop ; UNEC', selfReported: true },
  { id: 'produits', theme: 'produits', title: 'Cosmétiques bio, vrac et solides', text: 'Gammes biologiques, en vrac, en solide, avec les badges Cosmos Organic, Cosmos Natural et Vegan. Fournisseurs de matières premières en Normandie, Morbihan, Loire-Atlantique et Maine-et-Loire.', source: 'Page Les produits ; Enercoop', selfReported: true },
  { id: 'social', theme: 'social', title: 'Un cadre de travail humain', text: 'Formation de l’équipe en continu, apprentis formés sur place, intéressement, horaires pensés pour la vie de famille (selon le salon et la presse).', source: 'Enercoop ; UNEC ; Biblond', selfReported: true },
]

export const brochureFigures = [
  { value: '100 %', label: 'énergie renouvelable' },
  { value: '0', label: 'déchets' },
  { value: '50 %', label: 'd’économies d’eau' },
]
