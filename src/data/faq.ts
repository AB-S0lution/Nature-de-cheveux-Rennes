// DONNÉES D'EXEMPLE (rédaction) ; les faits qu'elles contiennent sont ceux du salon (PLAN.md).
export interface Faq {
  id: string
  topic: 'Couleur' | 'Réserver' | 'Prix' | 'Au salon' | 'Engagements' | 'Venir'
  q: string
  a: string
}

export const faqs: Faq[] = [
  { id: 'vegetal-peut', topic: 'Couleur', q: 'Que peut faire la coloration végétale, et que ne peut-elle pas faire ?', a: 'Elle donne des nuances naturelles, du blond foncé au noir en passant par les cuivres et les roux, avec des plantes et de l’eau. Elle ne fait pas de rose, de bleu, de multicolore ni de blond très clair (polaire). Ce sont des choix assumés du salon.' },
  { id: 'blancs', topic: 'Couleur', q: 'Couvre-t-elle les cheveux blancs ?', a: 'La coloration minérale Mineral Colours couvre à 100 % les cheveux blancs, selon le fabricant, sans ammoniaque ni PPD. Le henné donne aussi un cuivre intense sur cheveux blancs. Nous en parlons lors du diagnostic.' },
  { id: 'duree', topic: 'Couleur', q: 'Combien de temps dure une coloration ?', a: 'La durée dépend de vos cheveux et de la prestation choisie. Nous ne l’affichons pas ici : demandez-la au moment du rendez-vous.' },
  { id: 'diagnostic', topic: 'Réserver', q: 'Pourquoi un diagnostic avant une première couleur ?', a: 'Chaque coloration végétale est unique et dépend de votre base et de votre historique. Pour une première coloration ou des mèches, un appel ou un diagnostic au salon est indispensable, sinon la réservation n’est pas validée.' },
  { id: 'en-ligne', topic: 'Réserver', q: 'Puis-je réserver en ligne ?', a: 'Oui, via la page de réservation du salon (SmartBooker) pour les prestations qui s’y prêtent. Les réservations se font aussi par téléphone ou au salon.' },
  { id: 'mail', topic: 'Réserver', q: 'Puis-je réserver par e-mail ?', a: 'Non. Le salon ne gère pas les demandes de rendez-vous par e-mail. Appelez le 02 99 83 90 09 ou passez par la réservation en ligne.' },
  { id: 'annulation', topic: 'Réserver', q: 'Comment annuler un rendez-vous ?', a: 'Merci de prévenir au moins 24 h à l’avance. En cas de gros retard, la prestation peut être raccourcie ou annulée, et des absences répétées peuvent conduire à refuser de nouvelles réservations.' },
  { id: 'paiement', topic: 'Prix', q: 'Quels moyens de paiement sont acceptés ?', a: 'Les moyens affichés au salon. Carte bancaire et sans contact sont indiqués par les annuaires ; pour les espèces et les chèques, demandez à l’équipe.' },
  { id: 'a-partir-de', topic: 'Prix', q: 'Pourquoi les prix sont-ils « à partir de » ?', a: 'Les tarifs sont indiqués pour cheveux courts, TVA (20 %) et service compris, et peuvent évoluer selon la longueur ou l’épaisseur. Au shampooing, le massage est offert.' },
  { id: 'coupe-sec', topic: 'Au salon', q: 'Qu’est-ce qu’une coupe à sec ? Le shampooing est-il compris ?', a: 'On coupe les cheveux secs pour voir la forme réelle de la boucle ou de la mèche. Les formules « Shampooing Coupe… » incluent le shampooing. Dites-nous votre souhait à la réservation pour éviter toute surprise.' },
  { id: 'enfants', topic: 'Prix', q: 'Quels sont les tarifs enfants ?', a: 'À partir de 21 € pour un enfant de moins de 6 ans, 32 € pour une demoiselle de moins de 12 ans, 28 € pour un garçon de moins de 12 ans.' },
  { id: 'don', topic: 'Engagements', q: 'Comment donner mes cheveux ?', a: 'Au-delà de 10 cm, vos cheveux peuvent être confiés à Fake Hair Don’t Care pour des perruques. Plus courts, ils sont recyclés avec Capillum. Parlez-en à l’équipe à la réservation.' },
  { id: 'parking', topic: 'Venir', q: 'Où se garer, et le salon est-il accessible ?', a: 'Le stationnement est gratuit et nombreux à proximité, avec une place PMR. L’entrée de plain-pied mesure au moins 80 cm de large.' },
  { id: 'transport', topic: 'Venir', q: 'Comment venir en transports en commun ?', a: 'Plusieurs lignes de bus (C6, E4, 206 à l’arrêt Vilaine, à environ 175 m à vol d’oiseau), la gare TER de Cesson à environ 350 m, et le métro ligne B (Cesson-ViaSilva) à environ 1,9 km, à rejoindre en bus.' },
  { id: 'en-ligne-vente', topic: 'Au salon', q: 'Vendez-vous vos produits en ligne ?', a: 'Non. Aucune vente en ligne ni livraison : les produits bio, en vrac et solides se choisissent au salon.' },
  { id: 'fermeture', topic: 'Venir', q: 'Quand le salon est-il fermé ?', a: 'Le lundi et le dimanche, ainsi que le mercredi après-midi. Les éventuelles fermetures exceptionnelles seront à confirmer auprès du salon.' },
  { id: 'ecocert', topic: 'Engagements', q: 'Le salon est-il labellisé Ecocert ?', a: 'Il a obtenu en 2024 le label Ecocert « Établissement bien-être durable », niveau 3. Sa validité actuelle est à confirmer avec le salon.' },
]
