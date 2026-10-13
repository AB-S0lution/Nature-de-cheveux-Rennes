import { boot } from '../core/boot'
import { pageHero } from '../core/ui'
import { setHTML, u } from '../core/dom'
import { salon } from '../data/salon'

const bands: Record<string, string> = { 'mentions-legales': 'feuilles-sechees', confidentialite: 'savon-blanc', accessibilite: 'bol-ceramique', 'cgv-resume': 'outils-brosses' }

const pages: Record<string, { title: string; lead: string; body: () => string }> = {
  'mentions-legales': { title: 'Mentions légales', lead: 'Site de démonstration, non officiel.', body: () => `
    <h2>Éditeur</h2><p>Ce site est une démonstration indépendante, réalisée pour présenter une proposition de site. Il n’est pas le site officiel du salon. Directeur de la publication : à définir avec le salon.</p>
    <h2>Le salon présenté</h2><p>${salon.legalName}<br>${salon.address.street}, ${salon.address.postalCode} ${salon.address.city}<br>SIREN ${salon.siren} · SIRET ${salon.siret}<br>TVA intracommunautaire ${salon.vat}<br>Téléphone : ${salon.phone.display}</p>
    <h2>Hébergement</h2><p>GitHub Pages (GitHub, Inc.).</p>
    <h2>Contenus</h2><p>Les illustrations dessinées sont originales. Les photos sont des photos d’illustration Unsplash (licence Unsplash), pas des photos du salon. Les avis sont cités avec leur plateforme et leur date. Les articles, produits, questions et événements sont des exemples.</p>` },
  confidentialite: { title: 'Confidentialité', lead: 'Ce site n’utilise ni cookies ni traceurs.', body: () => `
    <p>Aucune donnée personnelle n’est collectée par ce site. Il n’y a ni formulaire, ni cookie, ni outil de mesure d’audience.</p>
    <p>Le choix du thème clair ou sombre est mémorisé dans votre navigateur, sur votre appareil seulement.</p>
    <p>Les liens vers la réservation en ligne, Google Maps et Instagram mènent à des services tiers, qui ont leur propre politique de confidentialité.</p>` },
  accessibilite: { title: 'Accessibilité', lead: 'Notre objectif : un site utilisable par tous.', body: () => `
    <p>Ce site vise le niveau AA des recommandations WCAG. Il respecte le réglage « réduire les animations » de votre système, se navigue au clavier et propose un thème sombre.</p>
    <p>Cette déclaration n’est pas un audit complet : le site n’a pas été testé avec des lecteurs d’écran. Pour signaler un problème, appelez le salon au ${salon.phone.display}.</p>` },
  'cgv-resume': { title: 'Conditions de réservation (résumé)', lead: 'Un résumé, pas les conditions officielles.', body: () => `
    <ul><li>Réservation par téléphone, au salon ou en ligne.</li><li>Première coloration ou mèches : un appel ou un diagnostic est nécessaire, sinon la réservation n’est pas validée.</li><li>Annulation au moins 24 h à l’avance.</li><li>En cas de gros retard, la prestation peut être raccourcie ou annulée ; des absences répétées peuvent conduire à refuser de nouvelles réservations.</li></ul>
    <p>Les conditions officielles figurent sur la <a href="${salon.bookingUrl}" target="_blank" rel="noopener">plateforme de réservation du salon</a>.</p>` },
}

void boot((main) => {
  const key = location.pathname.replace(u(), '').split('/')[0]
  const p = pages[key] ?? pages['mentions-legales']
  setHTML(main, `${pageHero({ title: p.title, lead: p.lead, dye: 'sauge', photo: bands[key] ?? 'feuilles-sechees' })}<section class="section"><div class="wrap-narrow prose stack">${p.body()}</div></section>`)
})
