import { boot } from '../core/boot'
import { salon } from '../data/salon'
import { needs } from '../data/needs'
import { plants } from '../data/plants'
import { posts } from '../data/posts'
import { stats } from '../data/stats'
import { transport } from '../data/transport'
import { $, setHTML, u } from '../core/dom'
import { icon } from '../core/icons'
import { herbariumSvg, pigmentSvg, strandSvg, strandPath } from '../core/art'
import { postCard, photoFig, photoStrip } from '../core/ui'
import { photo, photos } from '../data/photos'
import { mountBowl } from '../components/bowl'
import { mountProcess } from '../components/process'
import { mountQuotes } from '../components/quotesCarousel'
import { hoursTable, openPill, liveOpen } from '../components/hoursPanel'
import { mapSvg, vilaineWave } from '../components/map'
import { gsap, ScrollTrigger, heroTitle, reduced, mm, MQ } from '../core/motion'

const proofs = [
  { big: '4,7/5', sm: '99 avis Google (octobre 2026)' },
  { big: 'Depuis 2011', sm: 'à Cesson-Sévigné' },
  { big: 'Prix RSE UNEC 2024', sm: 'Initiative Développement Durable' },
  { big: 'Ecocert 3★', sm: 'bien-être durable, obtenu en 2024' },
]

const marqueeWords = plants.filter((p) => p.inBowl).map((p) => `${p.name} <i>${p.caption.split(',')[0].split('.')[0].toLowerCase()}</i>`)

function hero(): string {
  const d = strandPath('bouclé', 400, 520, 7)
  return `<section class="hero" data-dye="teal">
    <div class="wrap hero-grid">
      <div>
        ${openPill()}
        <h1 id="hero-title" style="margin-top:1rem">Naturellement <span class="vote">VOTRE</span> coiffure.</h1>
        <p class="lead">Coiffeur bio et coloriste végétal à Cesson-Sévigné, aux portes de Rennes. Plantes, eau et écoute, depuis 2011.</p>
        <div class="btn-row">
          <a class="btn" data-magnetic href="${u('reserver/')}">Réserver</a>
          <a class="btn ghost" href="${salon.phone.tel}">${icon('phone', 18)}<span>Appeler le salon</span></a>
        </div>
      </div>
      <div class="hero-art" data-hero-art>
        ${pigmentSvg({ colors: ['#009CBB', '#00448E', '#A8432A', '#CE2A57'], seed: 5, id: 'hero', label: 'Encres teal, indigo, henné et framboise qui se diffusent dans l’eau', mist: true })}
        <svg class="hero-strand" viewBox="0 0 400 520" aria-hidden="true">
          <defs><linearGradient id="hs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#009CBB"/><stop offset=".5" stop-color="#00448E"/><stop offset="1" stop-color="#CE2A57"/></linearGradient></defs>
          <path class="strand-draw" d="${d}" stroke="url(#hs)" stroke-width="9"/>
          <path d="${d}" stroke="#fff" stroke-opacity=".35" stroke-width="2" transform="translate(-2 0)"/>
        </svg>
      </div>
    </div>
  </section>`
}

function bento(): string {
  const bee = `<svg class="bee" viewBox="0 0 40 40" aria-hidden="true"><g class="bee-g"><ellipse cx="20" cy="22" rx="9" ry="6.5" fill="#D7A21E"/><path d="M15 17 v10 M20 16 v12 M25 17 v10" stroke="#12141A" stroke-width="2.4"/><ellipse cx="14" cy="14" rx="6" ry="3.4" fill="#fff" opacity=".8"/><ellipse cx="25" cy="14" rx="6" ry="3.4" fill="#fff" opacity=".8"/></g></svg>`
  return `<div class="bento">
    <article class="cell feuille c1" data-reveal>${icon('lightning', 36)}<h3>Une électricité renouvelable</h3><p>Le salon a choisi Enercoop : « évident et cohérent avec notre démarche écologique ».</p></article>
    <article class="cell pigment c2" data-reveal>
      <div class="cell-art" aria-hidden="true">${pigmentSvg({ colors: ['#CE2A57', '#504090', '#009CBB'], seed: 9, id: 'bento1', label: '' })}</div>
      ${icon('scissors', 36)}<span class="big">10 cm</span><h3>Don de cheveux</h3>
      <p>Au-delà de 10 cm, une perruque avec Fake Hair Don’t Care. En dessous, une seconde vie avec Capillum.</p>
      <a class="link more" href="${u('engagements/#don')}">Essayer la règle${icon('arrowRight', 18)}</a>
    </article>
    <article class="cell herb c3" data-reveal>${bee}<h3>La ruche</h3><p>Une ruche parrainée près de Nantes, et du miel pour vos pauses.</p></article>
    <article class="cell indigo c4" data-reveal><span class="big">50&nbsp;%</span><p>d’eau économisée<br><small>chiffre du salon</small></p></article>
    <article class="cell nacre c5" data-reveal>${icon('recycle', 36)}<h3>Zéro déchet</h3><p>Une lessive faite avec la cendre des cheminées, des papiers de couleur lavables depuis 2011, du compost. <a class="link" href="${u('engagements/')}">Tous les engagements</a></p></article>
  </div>`
}

function textures(): string {
  const tx = [['lisse', '#7C6A5E'], ['ondulé', '#8A5A34'], ['bouclé', '#A8432A'], ['frisé', '#33283A']] as const
  return tx.map(([t, c], i) => `<figure style="margin:0;text-align:center">${strandSvg({ texture: t, from: c, to: c, w: 120, h: 220, seed: i + 3, width: 6, id: 'tx' + i, label: 'Mèche ' + t })}<figcaption class="mono" style="font-size:.85rem">${t}</figcaption></figure>`).join('')
}

void boot(async (main) => {
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
  setHTML(main, `
  ${hero()}
  <section class="proof" aria-label="Nos repères"><div class="wrap"><ul>${proofs.map((p) => `<li data-reveal><span class="big">${p.big}</span><span class="sm">${p.sm}</span></li>`).join('')}</ul></div></section>

  <section class="section" data-dye="henne" aria-label="Le salon en images">
    <div class="wrap">
      <div class="ph-band">
        ${photoFig(photo('bol-poudre-verte'), 'wide')}
        ${photoFig(photo('boucles-brunes'))}
        ${photoFig(photo('salon-fauteuils-miroirs'))}
      </div>
      <p class="mono muted" style="font-size:.82rem;margin-top:.8rem">Photos d’illustration (Unsplash), en attendant les photos du salon.</p>
    </div>
  </section>

  <section class="section" data-dye="framboise">
    <div class="wrap">
      <h2 data-split>Je viens pour…</h2>
      <div class="needs-row" role="list">${needs.map((n) => `<a class="need" role="listitem" href="${u(n.href)}" data-reveal><span class="sw" aria-hidden="true"><svg viewBox="0 0 200 46" width="100%" height="46"><path d="M0 23 C 40 0, 60 46, 100 23 S 160 0, 200 23" fill="none" stroke="${n.plant}" stroke-width="9" stroke-linecap="round"/></svg></span><h3>${n.label}</h3><p>${n.blurb}</p></a>`).join('')}</div>
      <p class="swipe-hint needs-hint" aria-hidden="true">Faites glisser</p>
    </div>
  </section>

  <section class="section tint-mint" data-dye="henne">
    <div class="wrap two-col wide-left">
      <div class="stack">
        <h2 data-split>Notre spécialité : la coloration <em>végétale</em></h2>
        <p class="lead">Composée uniquement de poudres de végétaux et d’eau, préparée devant vous : votre coloration est unique.</p>
        <p>Rhubarbe, avoine, henné, indigo, guimauve, curcuma. Pas de blond polaire, pas de rose ni de bleu : des nuances naturelles, qui n’abîment pas la fibre.</p>
        <div class="btn-row"><a class="btn" href="${u('coloration-vegetale/')}">Découvrir la coloration</a><a class="link" href="${u('prestations/')}">Voir les tarifs${icon('arrowRight', 18)}</a></div>
      </div>
      <div class="herb-grid" style="grid-template-columns:repeat(3,minmax(0,1fr))" data-reveal>
        ${['henne', 'indigo', 'rhubarbe'].map((id, i) => `<figure data-parallax style="margin-top:${i * 22}px;--par:${14 + i * 10}px">${herbariumSvg(id, { id: 'h-' + id })}</figure>`).join('')}
      </div>
    </div>
  </section>

  <div id="process-host"></div>

  <div class="marquee" aria-label="Les plantes du salon" data-reveal>
    <div class="marquee-track" aria-hidden="false">
      <span>${marqueeWords.join('</span><span>')}</span><span aria-hidden="true">${marqueeWords.join('</span><span aria-hidden="true">')}</span>
    </div>
  </div>

  <section class="section" data-dye="curcuma" id="bol">
    <div class="wrap">
      <h2 data-split>Le bol : composez <em>votre</em> mélange</h2>
      <p class="lead" style="margin-bottom:2rem">Un jeu pour comprendre comment les plantes se combinent. Les proportions ne sont pas nos recettes.</p>
      <div id="bol-host"></div>
    </div>
  </section>

  <section class="section tint-violet" data-dye="violette">
    <div class="wrap two-col">
      <div class="stack">
        <h2 data-split>Cheveux bouclés et <em>coupe à sec</em></h2>
        <p class="lead">« Enfin un salon qui sait couper et coiffer des cheveux bouclés et naturels ! » <span class="mono" style="font-size:.9rem">(avis Google, 18/02/2025)</span></p>
        <p>On coupe sec pour voir la boucle telle qu’elle tombe : la forme suit votre texture, au lieu de la contrarier.</p>
        <a class="btn light" href="${u('cheveux-boucles/')}">Voir les cheveux bouclés</a>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.5rem" data-reveal>${textures()}</div>
    </div>
  </section>

  <section class="section" data-dye="teal">
    <div class="wrap">
      <h2 data-split>Un rituel, pas une corvée</h2>
      <div class="grid-3" style="margin-top:2rem">
        ${[['handHeart', 'Le massage offert', 'Au shampooing, le massage est offert.'], ['coffee', 'Thé, café, infusion', 'Boissons bio servies avec le miel de la ruche parrainée.'], ['sparkle', 'La charlotte chauffante', 'Une chaleur douce pendant la pose de la couleur.'], ['wind', 'Un lieu calme', 'Musique douce, téléphones en silencieux, magazines choisis.']].map(([i, t, p]) => `<div data-reveal>${icon(i as 'coffee', 34)}<h3 style="margin-top:.8rem">${t}</h3><p class="muted">${p}</p></div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section tint-mint" data-dye="feuille">
    <div class="wrap">
      <h2 data-split>Nos engagements</h2>
      <p class="lead" style="margin-bottom:2rem">Concilier beauté des cheveux, respect de l’homme et de l’environnement.</p>
      ${bento()}
    </div>
  </section>

  <section class="section" data-dye="framboise">
    <div class="wrap-narrow" style="width:min(100% - 2rem, 1000px)">
      <h2 data-split style="font-size:clamp(1.4rem,2vw,1.8rem);font-family:var(--font-fiche)">Ce que disent les clientes</h2>
      <div id="quotes-host"></div>
      <p style="margin-top:1.5rem"><a class="link" href="${u('avis/')}">Tous les avis${icon('arrowRight', 18)}</a></p>
    </div>
  </section>

  <section class="section" data-dye="feuille" aria-labelledby="ph-strip-t">
    <div class="wrap">
      <h2 id="ph-strip-t" data-split>Poudres, gestes et <em>boucles</em></h2>
      <p class="lead" style="margin-bottom:2rem">Des plantes broyées, de l’eau, des ciseaux qui suivent la boucle. <a class="link" href="${u('galerie/')}">Toute la galerie${icon('arrowRight', 18)}</a></p>
      ${photoStrip(photos.filter((p) => ['plantes', 'gestes', 'cheveux'].includes(p.category)).slice(0, 14), 'Photos d’illustration')}
    </div>
  </section>

  <section class="section tint-mint" data-dye="rhubarbe">
    <div class="wrap">
      <h2 data-split>Au journal</h2>
      <div class="cards" style="margin-top:2rem">${latest.map((p, i) => postCard(p, i)).join('')}</div>
      <p style="margin-top:1.5rem"><a class="link" href="${u('journal/')}">Tous les articles${icon('arrowRight', 18)}</a></p>
    </div>
  </section>

  <section class="section" data-dye="indigo" id="infos">
    <div class="wrap">
      <h2 data-split>Venir au salon</h2>
      <div class="info-grid" style="margin-top:2rem">
        <div class="stack">
          ${hoursTable()}
          <p>${icon('mapPin', 20)} ${salon.address.street}, ${salon.address.postalCode} ${salon.address.city}, dans le Bourg, à côté de l’église Saint-Martin.</p>
          <p>${icon('car', 20)} Stationnement gratuit et nombreux. ${icon('bus', 20)} Bus à environ 175 m (${transport[0].lines}).</p>
          <a class="link" href="${u('infos-pratiques/')}">Tous les détails d’accès${icon('arrowRight', 18)}</a>
        </div>
        ${mapSvg()}
      </div>
    </div>
    ${vilaineWave}
  </section>

  <section class="section tint-indigo" data-dye="framboise">
    <div class="wrap" style="text-align:left">
      <h2 data-split style="max-width:18ch">Prendre rendez-vous</h2>
      <p class="lead" style="color:#C9D6EA">Pour une première coloration ou des mèches, un appel ou un diagnostic au salon est nécessaire.</p>
      <div class="btn-row"><a class="btn light" data-magnetic href="${u('reserver/')}">Réserver</a><a class="btn light" style="--bg:transparent;--fg:#fff" href="${salon.phone.tel}">${icon('phone', 18)}<span>${salon.phone.display}</span></a></div>
      <p class="mono" style="margin-top:2rem;font-size:.9rem;color:#C9D6EA">${stats.map((s) => s.value + ' ' + s.label).slice(0, 3).join(' · ')}</p>
    </div>
  </section>`)

  mountProcess($('#process-host')!)
  mountBowl($('#bol-host')!, { compact: true })
  mountQuotes($('#quotes-host')!)
  liveOpen()

  // Bandeau des plantes : l'animation CSS ne tourne que lorsqu'il est visible.
  const mq = $('.marquee')
  if (mq && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => mq.classList.toggle('is-off', !e.isIntersecting)).observe(mq)
  }

  // Hero : le titre prend la couleur, la mèche se dessine, le pigment réagit au pointeur.
  heroTitle($('#hero-title')!)
  if (!reduced) {
    const strand = $<SVGPathElement>('.strand-draw')!
    const len = strand.getTotalLength()
    gsap.set(strand, { strokeDasharray: len, strokeDashoffset: len })
    gsap.to(strand, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', delay: 0.3 })
    const art = $('[data-hero-art]')!
    const blobs = gsap.utils.toArray<SVGElement>('.hero-art .blob')
    mm.add(MQ.desktop, () => {
      // Bureau : les encres respirent en boucle, en pause dès que le héros sort de l'écran.
      const loops = blobs.map((b, i) => gsap.to(b, { scale: 1.12 + i * 0.03, opacity: 0.9, duration: 5 + i, yoyo: true, repeat: -1, ease: 'sine.inOut' }))
      ScrollTrigger.create({ trigger: art, start: 'top bottom', end: 'bottom top', onToggle: (self) => loops.forEach((l) => (self.isActive ? l.resume() : l.pause())) })
    })
    mm.add(MQ.touch, () => {
      // Tactile : une seule respiration (le filtre de turbulence est trop coûteux à animer en continu).
      gsap.fromTo(blobs, { scale: 0.86 }, { scale: 1.06, duration: 2.4, ease: 'sine.out', stagger: 0.15 })
    })
    const qx = gsap.quickTo(art.querySelector('.art-pigment'), 'x', { duration: 1.2, ease: 'power3.out' })
    const qy = gsap.quickTo(art.querySelector('.art-pigment'), 'y', { duration: 1.2, ease: 'power3.out' })
    art.addEventListener('pointermove', (e) => { const r = art.getBoundingClientRect(); qx(((e as PointerEvent).clientX - r.left) / r.width * 28 - 14); qy(((e as PointerEvent).clientY - r.top) / r.height * 28 - 14) })
    // L'abeille : une seule boucle en huit à l'entrée.
    const bee = $('.bee-g')
    if (bee) {
      const o = { t: 0 }
      gsap.to(o, { t: 1, duration: 4, ease: 'sine.inOut', scrollTrigger: { trigger: bee, start: 'top 85%', once: true },
        onUpdate: () => { const a = o.t * Math.PI * 2; gsap.set(bee, { x: Math.sin(a) * 22, y: Math.sin(a * 2) * 10 }) } })
    }
  }
})
