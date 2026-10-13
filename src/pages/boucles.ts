import { boot } from '../core/boot'
import { pageHero, ctaBand, photoFig } from '../core/ui'
import { photo } from '../data/photos'
import { setHTML, u } from '../core/dom'
import { icon } from '../core/icons'
import { strandSvg } from '../core/art'
import { curlQuotes } from '../data/quotes'
import { products } from '../data/products'
import { salon } from '../data/salon'

const textures = [
  { t: 'lisse', label: 'Lisses', text: 'Une coupe nette, qui retombe d’elle-même.', c: '#1E2A55' },
  { t: 'ondulé', label: 'Ondulés', text: 'Le mouvement se révèle quand la longueur est juste.', c: '#A8432A' },
  { t: 'bouclé', label: 'Bouclés', text: 'On voit chaque boucle telle qu’elle tombe : coupe à sec.', c: '#C99A3B' },
  { t: 'frisé', label: 'Frisés', text: 'Des spirales serrées, qui demandent un geste patient.', c: '#504090' },
] as const

void boot((main) => {
  const kalia = products.filter((p) => p.brand === 'Kalia Nature')
  setHTML(main, `
  ${pageHero({ title: 'Cheveux bouclés et texturés', lead: 'Ondulés, bouclés, frisés, locks : une coupe sur cheveux secs, pensée pour la forme naturelle de vos cheveux.', dye: 'indigo', photo: 'boucles-volume' })}

  <section class="section">
    <div class="wrap two-col">
      <div class="stack">
        <h2 data-split>La coupe sur cheveux secs</h2>
        <p>Mouillés, les cheveux bouclés s’allongent et cachent leur forme. Coupés à sec, ils tombent comme ils vivront : le geste suit chaque boucle.</p>
        <p>Cela prend le temps qu’il faut. Dites-nous à la réservation que vos cheveux sont texturés, et nous prévoyons l’espace nécessaire.</p>
        <a class="link" href="${u('prestations/')}">Voir les tarifs${icon('arrowRight', 18)}</a>
      </div>
      <div class="stack">${photoFig(photo('boucles-brunes'), 'ph-landscape')}<div class="note-box"><p>« Enfin un salon qui sait couper et coiffer des cheveux bouclés et naturels ! »</p><p class="mono" style="font-size:.85rem">Avis Google, 18/02/2025</p></div></div>
    </div>
  </section>

  <section class="section tint-mint" data-dye="curcuma">
    <div class="wrap">
      <h2 data-split>Quatre textures, un même soin</h2>
      <div class="grid-3" style="margin-top:2rem;grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">${textures.map((t) => `<figure style="margin:0;text-align:center" data-reveal><div style="height:230px;display:grid;place-items:center">${strandSvg({ texture: t.t, from: t.c, to: t.c, w: 120, h: 220, seed: 5, width: 6, id: 'tx-' + t.t, label: `Mèche ${t.label.toLowerCase()}` })}</div><figcaption><strong>${t.label}</strong><br><span class="muted">${t.text}</span></figcaption></figure>`).join('')}</div>
      <p class="muted" style="margin-top:1.5rem">Les locks sont aussi accueillies au salon : parlez-en à la réservation.</p>
    </div>
  </section>

  <section class="section" data-dye="feuille">
    <div class="wrap">
      <h2 data-split>La gamme Kalia Nature</h2>
      <p class="lead">Des soins pensés pour les cheveux bouclés, vendus au salon uniquement. Fiches d’exemple ; prix indicatifs et stock à confirmer avec le salon.</p>
      <div class="prod-grid" style="margin-top:1.5rem">${kalia.map((p) => `<article class="prod" data-reveal><span class="brand">${p.brand}</span><h3>${p.name}</h3><p class="type">${p.type}</p>${p.price !== null ? `<p class="price">${p.price} € <small>(prix indicatif)</small></p>` : ''}</article>`).join('')}</div>
    </div>
  </section>

  <section class="section tint-indigo" data-dye="framboise">
    <div class="wrap">
      <h2 data-split>Ce qu’elles en disent</h2>
      <div class="grid-3" style="margin-top:2rem">${curlQuotes.map((q) => `<figure class="owner-q" style="border-color:rgb(255 255 255 / .25)" data-reveal><blockquote>« ${q.text} »</blockquote><figcaption style="color:#C9D6EA">Avis ${q.platform}, ${q.date}</figcaption></figure>`).join('')}</div>
    </div>
  </section>

  <section class="section" data-dye="rhubarbe" id="enfants">
    <div class="wrap two-col">
      <div class="stack">
        <h2 data-split>Les petites boucles</h2>
        <p class="lead">Une première coupe en douceur, aussi pour les enfants aux cheveux ondulés ou bouclés.</p>
        <p>Nous coupons à sec, nous expliquons chaque geste, et nous gardons le temps de rassurer. Les tarifs enfants sont sur la page des prestations.</p>
        <a class="btn ghost" href="${u('prestations/#enfants')}">Tarifs enfants</a>
      </div>
      <div class="note-box"><p>« Pour une première expérience en duo mère/fille aux cheveux ondulés, nous avons passé un très bon moment ! »</p><p class="mono" style="font-size:.85rem">Avis Google, 23/02/2023</p></div>
    </div>
  </section>
  ${ctaBand({ text: `Précisez la texture de vos cheveux à la réservation. Téléphone : ${salon.phone.display}.` })}`)
})
