import { boot } from '../core/boot'
import { pageHero, ctaBand, sampleBadge } from '../core/ui'
import { setHTML, $, u } from '../core/dom'
import { icon } from '../core/icons'
import { plants } from '../data/plants'
import { mineralShades, mineralGroups } from '../data/mineralShades'
import { faqs } from '../data/faq'
import { herbariumSvg, pigmentSvg } from '../core/art'
import { mountProcess } from '../components/process'
import { mountNuancier } from '../components/nuancier'
import { mountBowl } from '../components/bowl'

const cant = [
  'Éclaircir fortement un brun foncé : le végétal dépose de la couleur, il ne décolore pas.',
  'Passer d’un noir à un blond en une séance.',
  'Promettre une teinte identique à une photo : chaque chevelure réagit différemment.',
]

void boot((main) => {
  const herb = plants.filter((p) => p.inBowl)
  setHTML(main, `
  ${pageHero({ title: 'Coloration végétale et minérale', lead: 'Des poudres de plantes et de l’eau, préparées devant vous. Sans ammoniaque, sans PPD, sans résorcine : une couleur qui respecte le cuir chevelu.', dye: 'henne' })}

  <section class="section">
    <div class="wrap two-col wide-left">
      <div class="stack">
        <h2 data-split>Le manifeste</h2>
        <p class="headline-italic" data-reveal>« Des poudres de végétaux et d’eau. »</p>
        <p>La coloration végétale se compose de poudres de plantes séchées, mélangées à l’eau au moment de la pose. Chaque plante a son rôle : le henné pour les cuivres, l’indigo pour les bruns profonds, la rhubarbe et le curcuma pour les dorés, l’avoine et la guimauve pour adoucir.</p>
        <p>Contrairement aux idées reçues, la palette est large : le salon propose du blond foncé au noir, en passant par les cuivres et les roux. La couleur est personnalisée à chaque visite.</p>
      </div>
      <div style="border-radius:var(--r-card);overflow:hidden;aspect-ratio:4/5" data-parallax>${pigmentSvg({ colors: ['#A8432A', '#1E2A55', '#C99A3B'], seed: 21, id: 'col-hero', label: 'Poudres de henné, d’indigo et de rhubarbe diffusées dans l’eau', mist: true })}</div>
    </div>
  </section>

  <div id="process-host"></div>

  <section class="section tint-mint" data-dye="feuille" id="herbier">
    <div class="wrap">
      <h2 data-split>L’herbier</h2>
      <p class="lead">Les six plantes du bol, dessinées à la manière d’une planche d’herbier. Illustrations originales, à titre indicatif.</p>
      <div class="herb-grid" style="margin-top:2rem">${herb.map((p) => `<figure data-reveal>${herbariumSvg(p.id)}<figcaption><strong>${p.name}</strong> · <em>${p.latin}</em><br>${p.caption}</figcaption></figure>`).join('')}</div>
    </div>
  </section>

  <section class="section" data-dye="indigo" id="nuancier">
    <div class="wrap">
      <h2 data-split>Le nuancier</h2>
      <p class="lead">Vingt-quatre teintes d’exemple, avec les plantes de chacune. Trois sont signalées comme non réalisables : l’honnêteté fait partie du métier.</p>
      <div id="nuancier-host" style="margin-top:1.5rem"></div>
    </div>
  </section>

  <section class="section tint-violet" data-dye="violette" id="bol">
    <div class="wrap">
      <h2 data-split>Le bol</h2>
      <p class="lead" style="color:#DDD6F2">Composez votre mélange : dosez les plantes, regardez la couleur se former. C’est un jeu d’illustration, pas une promesse de résultat.</p>
      <div id="bol-host" style="margin-top:1.5rem"></div>
    </div>
  </section>

  <section class="section" data-dye="teal" id="mineral">
    <div class="wrap">
      <h2 data-split>La couleur minérale</h2>
      <div class="two-col" style="margin:1.5rem 0 2.5rem">
        <div class="nacre-sheen stack" data-reveal>
          <h3>Nacre de Bretagne</h3>
          <p>La gamme Mineral Colours (Rodolphe &amp; Co) couvre à 100 % les cheveux blancs, selon le fabricant, sans ammoniaque ni PPD. La nacre apporte un voile lumineux aux nuances claires.</p>
          <p>Pour éclaircir, le salon utilise une poudre éclaircissante à l’argile, sans chlore ni persulfate.</p>
        </div>
        <div class="stack">
          <p class="lead">Vingt-neuf références du nuancier du fabricant : sept bases, des pigments purs, des tons et des patines.</p>
          <p class="muted">Les teintes affichées sont des approximations d’écran. Le salon personnalise chaque mélange.</p>
        </div>
      </div>
      ${mineralGroups.map((g) => `<h3 style="margin-top:1.6rem">${g.label}</h3><div class="mineral-grid" style="margin-top:.8rem">${mineralShades.filter((s) => s.group === g.id).map((s) => `<div class="mineral-chip"><i style="background:${s.hex}"></i><span>${s.code}</span>${s.name ? `<small>${s.name}</small>` : ''}</div>`).join('')}</div>`).join('')}
      <p class="mono muted" style="font-size:.8rem;margin-top:1rem">${mineralShades.length} références. Source : nuancier Mineral Colours du fabricant ; teintes à titre indicatif.</p>
    </div>
  </section>

  <section class="section tint-mint" data-dye="framboise">
    <div class="wrap two-col">
      <div class="stack">
        <h2 data-split>Ce que le végétal ne fait pas</h2>
        <div class="stack">${cant.map((c) => `<p class="cant" data-reveal>${c}</p>`).join('')}</div>
      </div>
      <div class="note-box stack" id="diagnostic">
        <h3>Première couleur : un appel ou un diagnostic</h3>
        <p>Pour une première coloration ou des mèches, la réservation n’est validée qu’après un appel ou un diagnostic au salon. C’est la règle du salon, pour vous proposer la bonne couleur.</p>
        <div class="btn-row"><a class="btn" data-magnetic href="tel:+33299839009">${icon('phone', 18)}<span>02 99 83 90 09</span></a><a class="btn ghost" href="${u('reserver/')}">Réserver</a></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap-narrow">
      <h2 data-split>Questions sur la couleur</h2>
      <div class="faq-list" style="margin-top:1.5rem">${faqs.filter((f) => f.topic === 'Couleur').map((f) => `<details><summary><span>${f.q}</span>${icon('caretDown', 20)}</summary><div class="ans">${f.a}</div></details>`).join('')}</div>
      <p style="margin-top:1.5rem"><a class="link" href="${u('faq/')}">Toutes les questions${icon('arrowRight', 18)}</a></p>
      ${sampleBadge()}
    </div>
  </section>
  ${ctaBand()}`)
  mountProcess($('#process-host')!)
  mountNuancier($('#nuancier-host')!, { filters: true })
  mountBowl($('#bol-host')!)
})
