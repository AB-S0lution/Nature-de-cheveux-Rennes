import { boot } from '../core/boot'
import { pageHero, ctaBand } from '../core/ui'
import { setHTML } from '../core/dom'
import { icon, type IconName } from '../core/icons'
import { salon } from '../data/salon'
import { transport } from '../data/transport'
import { hoursTable, liveOpen } from '../components/hoursPanel'
import { mapSvg } from '../components/map'

const kindIcon: Record<string, IconName> = { bus: 'bus', ter: 'train', metro: 'train', velo: 'bicycle', parking: 'car' }

void boot((main) => {
  setHTML(main, `
  ${pageHero({ title: 'Infos pratiques et contact', lead: `${salon.address.street}, ${salon.address.postalCode} ${salon.address.city}. Aux portes de Rennes, dans le Bourg.`, dye: 'teal' })}
  <section class="section"><div class="wrap info-grid">
    <div class="stack">
      ${hoursTable()}
      <div class="contact-card">
        <a class="big-phone" href="${salon.phone.tel}">${icon('phone', 32)}${salon.phone.display}</a>
        <p>Nous ne gérons pas les rendez-vous par mail : appelez-nous, ou réservez en ligne.</p>
        <div class="btn-row"><a class="btn" data-magnetic href="${salon.bookingUrl}" target="_blank" rel="noopener">Réserver en ligne</a><a class="btn ghost" href="${salon.instagram}" target="_blank" rel="noopener">${icon('instagram', 18)}<span>Instagram</span></a></div>
      </div>
    </div>
    <div class="stack">
      <div class="map-box">${mapSvg()}<p class="cap">Plan schématique, non à l’échelle. <a class="link" href="${salon.mapsUrl}" target="_blank" rel="noopener">Ouvrir dans Google Maps</a></p></div>
      <address style="font-style:normal"><strong>${salon.name}</strong><br>${salon.address.street}<br>${salon.address.postalCode} ${salon.address.city}</address>
    </div>
  </div></section>
  <section class="section tint-mint" data-dye="feuille"><div class="wrap">
    <h2 data-split>Venir au salon</h2>
    <p class="lead">Distances à vol d’oiseau, à titre indicatif.</p>
    <ul class="transport-list" style="margin-top:1.5rem">${transport.map((t) => `<li data-reveal>${icon(kindIcon[t.kind] ?? 'mapPin', 26)}<div><strong>${t.name}</strong><span>${t.distance}${t.lines ? ` · ${t.lines}` : ''}${t.verify ? ' · à vérifier' : ''}</span></div></li>`).join('')}</ul>
  </div></section>
  <section class="section"><div class="wrap two-col">
    <div class="stack"><h2 data-split>Dans le quartier</h2><p>Le salon se trouve dans le Bourg, le vieux centre de Cesson-Sévigné. L’église Saint-Martin est à environ 50 m et la place du Marché à environ 120 m.</p><p>Un marché bio a lieu le mercredi après-midi, place de l’Église. Le salon est alors fermé l’après-midi.</p></div>
    <div class="note-box"><p><strong>Accessibilité.</strong> Une place de stationnement pour personnes à mobilité réduite est signalée près de la place du Marché. Pour toute question, appelez le salon.</p></div>
  </div></section>
  ${ctaBand()}`)
  liveOpen()
})
