import { boot } from '../core/boot'
import { pageHero } from '../core/ui'
import { setHTML, u } from '../core/dom'
import { icon } from '../core/icons'
import { salon } from '../data/salon'
import { openPill, liveOpen } from '../components/hoursPanel'

void boot((main) => {
  setHTML(main, `
  ${pageHero({ title: 'Réserver', lead: 'Trois façons de prendre rendez-vous. Pour une première coloration ou des mèches, un appel ou un diagnostic est nécessaire.', dye: 'framboise' })}
  <section class="section"><div class="wrap">
    ${openPill()}
    <div class="book-grid" style="margin-top:1.5rem">
      <article class="book-card" data-reveal><h3>En ligne</h3><p>La réservation s’ouvre sur la plateforme SmartBooker du salon.</p><a class="btn" data-magnetic href="${salon.bookingUrl}" target="_blank" rel="noopener">Réserver en ligne${icon('arrowUpRight', 18)}</a></article>
      <article class="book-card" data-reveal><h3>Par téléphone</h3><p>Le plus simple pour une première couleur.</p><a class="btn ghost" href="${salon.phone.tel}">${icon('phone', 18)}<span>${salon.phone.display}</span></a></article>
      <article class="book-card" data-reveal><h3>Au salon</h3><p>${salon.address.street}, ${salon.address.postalCode} ${salon.address.city}.</p><a class="btn ghost" href="${u('infos-pratiques/')}">Voir l’accès et les horaires</a></article>
    </div>
  </div></section>
  <section class="section tint-mint" data-dye="feuille"><div class="wrap">
    <h2 data-split>Première fois au salon ?</h2>
    <div class="first-time" style="margin-top:2rem">
      <div data-reveal><h3>Un appel ou un diagnostic</h3><p>Pour une première couleur ou des mèches, la réservation n’est validée qu’après un appel ou un diagnostic.</p></div>
      <div data-reveal><h3>Ce que comprend le prix</h3><p>Prix « à partir de », pour cheveux courts, TVA et service compris. Au shampooing, le massage est offert.</p></div>
      <div data-reveal><h3>La coupe à sec</h3><p>Sur cheveux texturés, nous coupons à sec. <a class="link" href="${u('cheveux-boucles/')}">En savoir plus</a></p></div>
      <div data-reveal><h3>Annulation</h3><p>Merci de prévenir au moins 24 h à l’avance. <a class="link" href="${u('cgv-resume/')}">Voir le résumé</a></p></div>
    </div>
  </div></section>`)
  liveOpen()
})
