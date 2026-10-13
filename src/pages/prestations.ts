import { boot } from '../core/boot'
import { services, categories, euro, priceFootnotes, priceHeadline, priceListDate } from '../data/services'
import { salon } from '../data/salon'
import { pageHero, ctaBand, photoImg } from '../core/ui'
import { photo } from '../data/photos'

// Photo d'illustration par famille de prestations.
const catPhotos: Record<string, string> = { coupes: 'coupe-ciseaux', coloration: 'bol-poudre-verte', soins: 'bol-fleurs-sechees', techniques: 'bigoudi', enfants: 'outils-brosses' }
import { setHTML, u } from '../core/dom'
import { icon } from '../core/icons'

const rules = [
  'Réservation par téléphone, au salon ou en ligne (SmartBooker).',
  'Première coloration ou mèches : un appel ou un diagnostic est nécessaire, sinon la réservation n’est pas validée.',
  'Annulation au moins 24 h à l’avance. En cas de gros retard, la prestation peut être raccourcie ou annulée ; des absences répétées peuvent conduire à refuser de nouvelles réservations.',
]

void boot((main) => {
  setHTML(main, `
  ${pageHero({ title: 'Prestations et tarifs', lead: 'Tous les prix sont lisibles ici, en texte. Ils sont « à partir de », pour cheveux courts.', dye: 'rhubarbe', photo: 'brushing' })}
  <section class="section tight">
    <div class="wrap">
      <p class="headline-italic" data-reveal>${priceHeadline}</p>
      <p class="mono muted" style="font-size:.9rem">${priceListDate}</p>
      <div class="tarif-grid" style="margin-top:2rem">
        ${categories.map((c) => `<article class="fiche-tarif" id="${c.id}" data-reveal>
          <div class="ft-ph">${photoImg(photo(catPhotos[c.id] ?? 'brushing'))}<span class="ph-tag">Photo d’illustration</span></div>
          <h3>${c.title}</h3><p class="blurb">${c.blurb}</p>
          <ul>${services.filter((s) => s.category === c.id).map((s) => `<li class="row"><span class="nm">${s.name}</span><span class="pr">${euro(s.priceFrom)}<small>à partir de</small></span><span class="ds">${s.description}</span><span class="inc">${s.includes.map((i) => `<span class="tag">${i}</span>`).join('')}</span></li>`).join('')}</ul>
        </article>`).join('')}
      </div>
      <div class="footnotes" data-reveal>${priceFootnotes.map((f) => `<span>* ${f}</span>`).join('')}</div>
      <p class="muted mono" style="font-size:.85rem;margin-top:.8rem">Les durées des prestations ne sont pas publiées ici : elles dépendent de vos cheveux. Demandez-les à la réservation.</p>
    </div>
  </section>

  <section class="section tint-mint" data-dye="feuille">
    <div class="wrap two-col">
      <div class="stack">
        <h2 data-split>Ce que comprend le prix</h2>
        <p class="lead">Au shampooing, le massage est offert.</p>
        <p>Les formules « Shampooing Coupe… » comprennent le shampooing, la coupe et le coiffage ou le brushing. Les prix s’entendent TVA (20 %) et service compris.</p>
      </div>
      <div class="stack">
        <h3>La coupe sur cheveux secs, expliquée</h3>
        <p>Sur cheveux texturés ou bouclés, nous coupons à sec : on voit la boucle telle qu’elle tombe. Le geste n’est pas le même qu’une coupe sur cheveux mouillés. Si vous hésitez sur ce que comprend votre rendez-vous, demandez-le-nous à la réservation, nous vous le dirons simplement.</p>
        <a class="link" href="${u('cheveux-boucles/')}">Les cheveux bouclés${icon('arrowRight', 18)}</a>
      </div>
    </div>
  </section>

  <section class="section" data-dye="curcuma" id="enfants">
    <div class="wrap two-col">
      <div class="stack">
        <h2 data-split>Les enfants</h2>
        <p class="lead">Une première coupe en douceur, à tout âge.</p>
        <p>Enfant de moins de 6 ans, demoiselle ou garçon de moins de 12 ans : les tarifs sont dans la fiche « Enfants » ci-dessus. L’équipe prend le temps d’expliquer chaque geste, et coupe les boucles des petits sur cheveux secs.</p>
      </div>
      <div class="note-box"><p><strong>À savoir.</strong> Pour une première coupe, dites-le-nous à la réservation : nous prévoyons le temps qu’il faut et nous expliquons chaque geste.</p></div>
    </div>
  </section>

  <section class="section tint-indigo" data-dye="indigo" id="reservation">
    <div class="wrap two-col">
      <div class="stack">
        <h2 data-split>Règles de réservation</h2>
        <ul style="padding-left:1.1rem">${rules.map((r) => `<li style="margin-bottom:.6rem">${r}</li>`).join('')}</ul>
        <p style="font-size:.9rem;color:#C9D6EA">Résumé des conditions officielles (mai 2026). <a class="link" href="${u('cgv-resume/')}">Voir le résumé</a></p>
      </div>
      <div class="btn-row" style="align-self:center"><a class="btn light" data-magnetic href="${u('reserver/')}">Réserver</a><a class="btn light" style="--bg:transparent;--fg:#fff" href="${salon.phone.tel}">${icon('phone', 18)}<span>${salon.phone.display}</span></a></div>
    </div>
  </section>
  ${ctaBand({ title: 'Une question sur un tarif ?', text: 'Appelez-nous : nous répondons volontiers, sans engagement.' })}`)
})
