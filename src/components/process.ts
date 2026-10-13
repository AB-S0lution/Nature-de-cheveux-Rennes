// « De la poudre à la mèche » : six temps, épinglés et pilotés par le défilement (ou empilés sans mouvement).
import { icon } from '../core/icons'
import { typo, isDesktop } from '../core/dom'
import { gsap, ScrollTrigger, heavy } from '../core/motion'
import { $, $$ } from '../core/dom'
import { bowlPlants } from '../data/plants'

const beats = [
  { n: 'Temps 1', t: 'Les poudres', p: 'Henné, indigo, rhubarbe, avoine, guimauve, curcuma : des poudres de végétaux, rien d’autre.' },
  { n: 'Temps 2', t: 'L’eau', p: 'De l’eau seulement. La couleur est composée uniquement de poudres de végétaux et d’eau.' },
  { n: 'Temps 3', t: 'Le mélange', p: 'La pâte est préparée devant vous, au bol. Votre coloration est unique.' },
  { n: 'Temps 4', t: 'La pose', p: 'Sous la charlotte chauffante, avec un thé ou une infusion et du miel pendant que la couleur agit.' },
  { n: 'Temps 5', t: 'Le rinçage', p: 'Au shampooing, le massage est offert.' },
  { n: 'Temps 6', t: 'La mèche', p: 'La teinte se révèle : un cuivre, un brun, un blond doré. Chaque coloration végétale est unique.' },
]

function scene(): string {
  const jars = bowlPlants.map((p, i) => `<g class="pj" data-i="${i}"><rect x="-13" y="-17" width="26" height="30" rx="5" fill="#F1F4F1" fill-opacity=".92" stroke="#fff"/><rect x="-11" y="-3" width="22" height="14" rx="3" fill="${p.hex}"/><rect x="-14" y="14" width="28" height="9" rx="1" fill="#12141A"/><text y="21" text-anchor="middle" font-family="'Courier Prime', monospace" font-size="5.6" fill="#F1F4F1">${p.name.toUpperCase()}</text></g>`).join('')
  return `<svg viewBox="0 0 400 300" role="img" aria-label="Scène en six temps : poudres, eau, mélange, pose sous la charlotte, rinçage, mèche colorée">
    <g class="sc-jars" transform="translate(200 52)">${jars}</g>
    <g class="sc-bowl" transform="translate(200 200)">
      <ellipse cx="0" cy="62" rx="74" ry="7" fill="#000" opacity=".2"/>
      <path d="M-80 -4 Q-78 66 0 66 Q78 66 80 -4 Z" fill="#EFE7DC" stroke="#fff" stroke-opacity=".6"/>
      <ellipse cx="0" cy="-4" rx="84" ry="18" fill="#F4EEE4"/>
      <ellipse class="p-water" cx="0" cy="-3" rx="72" ry="13" fill="#CFE6F0" opacity="0"/>
      <ellipse class="p-paste" cx="0" cy="-3" rx="72" ry="13" fill="#A8432A" opacity="0"/>
      <path class="p-swirl" d="M0 -3 c 5 -4 13 -1 11 6 c -2 8 -18 8 -21 0 c -6 -11 8 -20 21 -17" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2.5" stroke-linecap="round" opacity="0"/>
      <ellipse class="p-ripple" cx="0" cy="-3" rx="8" ry="2.5" fill="none" stroke="#fff" stroke-width="2" opacity="0"/>
    </g>
    <g class="sc-jug" transform="translate(300 90)" opacity="0"><path d="M-22 -26 h 36 q 6 0 6 8 v 36 q 0 8 -8 8 h -24 q -8 0 -8 -8 z M14 -18 q 16 -2 18 8" fill="#CFE6F0" stroke="#fff"/><path class="drops" d="M-34 -4 q -8 8 -6 14" stroke="#CFE6F0" stroke-width="3" fill="none" stroke-linecap="round"/></g>
    <g class="sc-apply" opacity="0">
      <path class="a-strand-base" d="M300 36 C 270 90, 330 130, 300 190 S 270 250, 300 280" fill="none" stroke="#C8CED6" stroke-width="12" stroke-linecap="round"/>
      <path class="a-strand-paste" d="M300 36 C 270 90, 330 130, 300 190 S 270 250, 300 280" fill="none" stroke="#A8432A" stroke-width="16" stroke-linecap="round" opacity="0"/>
      <path class="a-strand-final" d="M300 36 C 270 90, 330 130, 300 190 S 270 250, 300 280" fill="none" stroke="#B8662E" stroke-width="12" stroke-linecap="round" opacity="0"/>
      <path class="a-cap" d="M262 70 q 38 -50 76 0 q -38 10 -76 0 z" fill="#CE2A57" opacity="0"/>
      <g class="a-cup" opacity="0" transform="translate(110 220)"><path d="M-22 -20 h44 v22 q 0 18 -22 18 q -22 0 -22 -18 z M22 -14 q 14 0 14 10 t -14 10" fill="#F1F4F1" stroke="#fff"/><path class="steam" d="M-8 -28 q -6 -10 0 -18 M6 -28 q -6 -10 0 -18" stroke="#fff" stroke-opacity=".7" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>
    </g>
    <g class="sc-rinse" opacity="0"><path d="M-20 300 C 40 260, 90 330, 150 290 S 260 270, 330 300 S 420 270, 440 300 V 340 H -20 Z" fill="#6E86D6" opacity=".75"/></g>
    <g class="sc-spark" opacity="0" fill="#F7B6C6"><circle cx="330" cy="60" r="3"/><circle cx="262" cy="150" r="2.4"/><circle cx="336" cy="236" r="3.2"/></g>
  </svg>`
}

export function mountProcess(host: HTMLElement): void {
  host.innerHTML = typo(`
  <section class="process" data-dye="indigo" aria-labelledby="process-title">
    <div class="process-stage">
      <div class="wrap">
        <h2 id="process-title" style="margin-bottom:2rem" data-reveal>De la poudre à la <em>mèche</em></h2>
        <div class="process-grid">
          <div>
            <div class="beats">${beats.map((b) => `<div class="beat"><span class="n">${b.n}</span><h3>${b.t}</h3><p>${b.p}</p></div>`).join('')}</div>
            <div class="process-bar" aria-hidden="true"><i></i></div>
          </div>
          <div class="process-scene">${scene()}</div>
        </div>
      </div>
    </div>
  </section>`)
  void icon

  if (!heavy || !isDesktop()) return
  const sec = $('.process', host)!
  const stage = $('.process-stage', host)!
  sec.classList.add('is-pinned')
  const q = (s: string) => $(s, host)!
  const bs = $$('.beat', host)
  const jars = $$('.pj', host)
  jars.forEach((j) => { gsap.set(j, { x: 0, y: 0, scale: 0.4, opacity: 0, rotation: 0, transformOrigin: '50% 50%' }) })

  const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' }, scrollTrigger: { trigger: stage, start: 'top top', end: '+=420%', pin: true, scrub: 0.8, anticipatePin: 1,
    onUpdate: (self) => { gsap.set($('.process-bar i', host)!, { scaleX: self.progress }) } } })
  const T = (i: number) => i * 1
  // Temps 1 : les poudres se déploient en éventail
  jars.forEach((j, i) => tl.to(j, { x: (i - 2.5) * 52, y: Math.abs(i - 2.5) * 6, scale: 1, opacity: 1, rotation: (i - 2.5) * 5, duration: 0.7 }, T(0) + i * 0.05))
  tl.to(bs[0], { opacity: 1, duration: 0.01 }, 0)
  // Temps 2 : l'eau
  tl.to(bs[0], { opacity: 0, y: -16, duration: 0.3 }, T(1) - 0.1).fromTo(bs[1], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3 }, T(1))
  tl.to(jars, { y: -24, opacity: 0.35, scale: 0.7, duration: 0.6 }, T(1))
  tl.to(q('.sc-jug'), { opacity: 1, rotation: -18, duration: 0.5, transformOrigin: '50% 50%' }, T(1))
  tl.to(q('.p-water'), { opacity: 0.85, duration: 0.6 }, T(1) + 0.2)
  tl.fromTo(q('.p-ripple'), { attr: { rx: 8, ry: 2.5 }, opacity: 0.9 }, { attr: { rx: 66, ry: 11 }, opacity: 0, duration: 0.8 }, T(1) + 0.3)
  // Temps 3 : le mélange
  tl.to(bs[1], { opacity: 0, y: -16, duration: 0.3 }, T(2) - 0.1).fromTo(bs[2], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3 }, T(2))
  tl.to(q('.sc-jug'), { opacity: 0, duration: 0.3 }, T(2)).to(jars, { opacity: 0, duration: 0.3 }, T(2))
  tl.to(q('.p-paste'), { opacity: 1, duration: 0.7 }, T(2)).to(q('.p-swirl'), { opacity: 0.9, rotation: 360, svgOrigin: '200 197', duration: 0.9 }, T(2))
  // Temps 4 : la pose (bol à gauche, mèche à droite)
  tl.to(bs[2], { opacity: 0, y: -16, duration: 0.3 }, T(3) - 0.1).fromTo(bs[3], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3 }, T(3))
  tl.to(q('.sc-bowl'), { x: -110, scale: 0.7, duration: 0.7 }, T(3)).to(q('.p-swirl'), { opacity: 0, duration: 0.2 }, T(3))
  tl.to(q('.sc-apply'), { opacity: 1, duration: 0.4 }, T(3)).to(q('.a-strand-paste'), { opacity: 1, duration: 0.7 }, T(3) + 0.1)
  tl.to(q('.a-cap'), { opacity: 0.95, duration: 0.5 }, T(3) + 0.3).to(q('.a-cup'), { opacity: 1, duration: 0.5 }, T(3) + 0.3)
  // Temps 5 : le rinçage
  tl.to(bs[3], { opacity: 0, y: -16, duration: 0.3 }, T(4) - 0.1).fromTo(bs[4], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3 }, T(4))
  tl.to(q('.a-cap'), { opacity: 0, duration: 0.3 }, T(4)).to(q('.a-cup'), { opacity: 0, duration: 0.3 }, T(4))
  tl.fromTo(q('.sc-rinse'), { opacity: 1, y: 40 }, { y: -320, duration: 0.9, ease: 'power1.inOut' }, T(4)).to(q('.a-strand-paste'), { opacity: 0, duration: 0.5 }, T(4) + 0.35)
  tl.to(q('.sc-rinse'), { opacity: 0, duration: 0.2 }, T(4) + 0.85)
  // Temps 6 : la mèche révélée
  tl.to(bs[4], { opacity: 0, y: -16, duration: 0.3 }, T(5) - 0.1).fromTo(bs[5], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.3 }, T(5))
  tl.to(q('.a-strand-final'), { opacity: 1, duration: 0.7 }, T(5)).to(q('.sc-bowl'), { opacity: 0.35, duration: 0.5 }, T(5)).to(q('.sc-spark'), { opacity: 1, duration: 0.5 }, T(5) + 0.3)
  tl.to({}, { duration: 0.5 }, T(5) + 0.7)
  ScrollTrigger.refresh()
}
