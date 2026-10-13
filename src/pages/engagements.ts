import { boot } from '../core/boot'
import { pageHero, ctaBand } from '../core/ui'
import { setHTML, $, u } from '../core/dom'
import { icon } from '../core/icons'
import { engagements, brochureFigures, type Engagement } from '../data/engagements'
import { labels } from '../data/salon'
import { mountRuler } from '../components/ruler'

const by = (t: Engagement['theme']) => engagements.filter((e) => e.theme === t)
const block = (e: Engagement) => `<article class="stack" data-reveal><h3>${e.title}</h3><p>${e.text}</p><p class="mono muted" style="font-size:.8rem">Source : ${e.source}${e.selfReported ? ' · selon le salon' : ''}</p></article>`

void boot((main) => {
  setHTML(main, `
  ${pageHero({ title: 'Engagements', lead: 'Un salon qui cherche à concilier beauté des cheveux, respect de l’homme et de l’environnement. Chaque affirmation indique sa source.', dye: 'feuille' })}

  <section class="section">
    <div class="wrap">
      <h2 data-split>Labels et prix</h2>
      <div class="grid-3" style="margin-top:2rem">${by('label').map(block).join('')}</div>
      <div class="badge-row" style="margin-top:2rem">${labels.map((l) => `<span class="badge">${icon('sealCheck', 18)}${l.title}${l.year ? ` (${l.year})` : ''}</span>`).join('')}</div>
      <p class="muted" style="margin-top:1rem;max-width:70ch">Le label Ecocert a été obtenu en 2024 ; sa validité actuelle reste à confirmer avec le salon.</p>
    </div>
  </section>

  <section class="section tint-mint" data-dye="teal">
    <div class="wrap two-col">${by('energie').map(block).join('')}<div class="stack" data-reveal><h3>Eau et énergie</h3>${by('eau').map((e) => `<p>${e.text}</p>`).join('')}</div></div>
  </section>

  <section class="section tint-indigo" data-dye="framboise" id="don">
    <div class="wrap">
      <h2 data-split>Don de cheveux</h2>
      <p class="lead" style="color:#C9D6EA">Dès 10 cm, vos cheveux peuvent devenir une perruque. Déplacez la règle pour voir ce qui part, et ce qui reste.</p>
      <div id="ruler-host" style="margin-top:1.5rem"></div>
      <div class="grid-3" style="margin-top:2.5rem">${by('don').map((e) => `<article class="stack"><h3>${e.title}</h3><p style="color:#DCE5F3">${e.text}</p></article>`).join('')}</div>
    </div>
  </section>

  <section class="section" data-dye="curcuma">
    <div class="wrap two-col">${by('ruche').map(block).join('')}${by('dechet').map(block).join('')}</div>
  </section>

  <section class="section tint-leaf" data-dye="feuille">
    <div class="wrap">
      <h2 data-split>Chiffres du salon</h2>
      <p class="lead">Trois chiffres tirés de la brochure du salon : des déclarations du salon, non vérifiées par un tiers.</p>
      <div class="rating-strip" style="border-color:rgb(255 255 255 / .3)">${brochureFigures.map((f) => `<span><b>${f.value}</b> ${f.label}</span>`).join('')}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap two-col">${by('social').map(block).join('')}${by('produits').map(block).join('')}</div>
    <div class="wrap" style="margin-top:2rem"><a class="link" href="${u('produits/')}">Les produits${icon('arrowRight', 18)}</a></div>
  </section>
  ${ctaBand()}`)
  mountRuler($('#ruler-host')!)
})
