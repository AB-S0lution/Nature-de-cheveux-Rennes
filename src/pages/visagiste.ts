import { boot } from '../core/boot'
import { pageHero, ctaBand, photoFig } from '../core/ui'
import { photo } from '../data/photos'
import { setHTML, $ } from '../core/dom'
import { lineage } from '../data/team'
import { mountVisagiste } from '../components/visagiste'

void boot((main) => {
  setHTML(main, `
  ${pageHero({ title: 'Visagiste', lead: 'La coupe qui vous ressemble : un diagnostic simple, quelques questions, une coupe sur mesure.', dye: 'violette', photo: 'sechoir' })}
  <section class="section">
    <div class="wrap">
      <h2 data-split>Qui êtes-vous ?</h2>
      <p class="lead">Répondez à quatre questions : la fiche se remplit. C’est un jeu d’illustration, qui donne l’esprit du diagnostic fait au salon.</p>
      <div id="visa-host" style="margin-top:2rem"></div>
    </div>
  </section>
  <section class="section tint-mint" data-dye="teal">
    <div class="wrap two-col">
      <div class="stack">
        <h2 data-split>La philosophie</h2>
        <p class="headline-italic" data-reveal>« Naturellement VOTRE coiffure. »</p>
        <p>Une coupe réussie tient compte de votre visage, de la nature de vos cheveux, de votre quotidien et de ce que vous aimez. Le conseil en image n’impose rien : il propose.</p>
      </div>
      <div class="stack">
        ${photoFig(photo('outils-brosses'), 'ph-landscape')}
        <h3>Formation</h3>
        <ul>${lineage.map((l) => `<li style="margin-bottom:.6rem">${l}</li>`).join('')}</ul>
      </div>
    </div>
  </section>
  ${ctaBand()}`)
  mountVisagiste($('#visa-host')!)
})
