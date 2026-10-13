// « Le bol » : composer sa couleur végétale. Les proportions sont un jeu, pas des recettes du salon.
import { bowlPlants } from '../data/plants'
import { shades } from '../data/shades'
import { salon } from '../data/salon'
import { $, $$, esc, typo } from '../core/dom'
import { gsap, reduced } from '../core/motion'
import { deltaE, hexToLab, labToHex, lch, mix, type Lab } from './color'
import { icon } from '../core/icons'

const MAX_SPOONS = 8
const MAX_WATER = 3

const mound = (i: number, hex: string) => {
  const a = (i * 137.5 * Math.PI) / 180
  const r = 14 + (i % 4) * 14
  return `<ellipse cx="${150 + Math.cos(a) * r * 2}" cy="${123 + Math.sin(a) * r * 0.35}" rx="13" ry="5.5" fill="${hex}"/>`
}

export function mountBowl(host: HTMLElement, opts: { compact?: boolean } = {}): void {
  const uid = Math.random().toString(36).slice(2, 7)
  const spoons: Record<string, number> = {}
  let water = 0
  let mixing = 0
  let swirlAngle = 0
  const jarHtml = bowlPlants.map((p) => `
    <button class="jar" type="button" data-plant="${p.id}" data-n="0" aria-label="Ajouter une cuillère de ${p.name}">
      <span class="glass" aria-hidden="true"><i style="background:${p.hex}"></i></span>
      <span class="bocal" aria-hidden="true">${p.name}</span>
      <span class="count" aria-hidden="true">0</span>
    </button>`).join('')

  host.innerHTML = typo(`
  <div class="bol">
    <div>
      <div class="bol-stage">
        <svg class="bol-svg" viewBox="0 0 300 260" role="img" aria-label="Un bol en céramique dans lequel les poudres de plantes et l’eau se mélangent">
          <defs>
            <radialGradient id="rim-${uid}" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#FBF6EE"/><stop offset="1" stop-color="#D8CDBF"/></radialGradient>
            <clipPath id="in-${uid}"><ellipse cx="150" cy="122" rx="106" ry="19"/></clipPath>
          </defs>
          <ellipse cx="150" cy="240" rx="84" ry="9" fill="#12203A" opacity=".13"/>
          <path d="M28 118 Q30 236 150 236 Q270 236 272 118 Z" fill="url(#rim-${uid})" stroke="#12203A" stroke-opacity=".5"/>
          <path d="M60 170 Q150 210 240 170" fill="none" stroke="#009CBB" stroke-width="3" opacity=".55"/>
          <ellipse cx="150" cy="118" rx="122" ry="25" fill="#F4EEE4" stroke="#12203A" stroke-opacity=".5"/>
          <ellipse cx="150" cy="121" rx="108" ry="20" fill="#C9B9A3"/>
          <g clip-path="url(#in-${uid})">
            <ellipse class="water" cx="150" cy="122" rx="108" ry="20" fill="#CFE6F0" opacity="0"/>
            <g class="mounds"></g>
            <ellipse class="paste" cx="150" cy="122" rx="108" ry="20" fill="#C9B9A3" opacity="0"/>
            <g class="swirl" opacity="0"><path d="M150 122 m0 0 c 6 -6 18 -2 16 8 c -2 12 -24 12 -30 0 c -8 -16 12 -30 30 -24 c 22 8 24 34 0 40" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="3" stroke-linecap="round"/></g>
            <ellipse class="ripple" cx="150" cy="122" rx="10" ry="3" fill="none" stroke="#fff" stroke-width="2" opacity="0"/>
          </g>
          <g class="puffs"></g>
        </svg>
      </div>
      <div class="bol-jars" role="group" aria-label="Pots de poudres de plantes">${jarHtml}</div>
      <div class="bol-controls">
        <button class="btn ghost small" type="button" data-act="water">${icon('drop', 18)}<span>Verser de l’eau</span></button>
        <button class="btn small" type="button" data-act="stir">Mélanger</button>
        <button class="btn ghost small" type="button" data-act="reset">Vider le bol</button>
      </div>
      <p class="bol-hint" id="bol-help-${uid}">Touchez un pot pour ajouter une cuillère (8 au maximum). Versez de l’eau, puis mélangez : bouton, barre d’espace, ou cercles à la souris ou au doigt dans le bol.</p>
    </div>
    <div class="bol-side">
      <svg class="bol-strand" viewBox="0 0 300 150" role="img" aria-label="Une mèche de cheveux qui prend la teinte du mélange">
        <path class="s-base" d="M10 75 C 60 20, 90 130, 150 75 S 240 20, 290 75" fill="none" stroke="#C8CED6" stroke-width="12" stroke-linecap="round"/>
        <path class="s-dye" d="M10 75 C 60 20, 90 130, 150 75 S 240 20, 290 75" fill="none" stroke="#C8CED6" stroke-width="12" stroke-linecap="round" opacity="0"/>
        <path d="M10 75 C 60 20, 90 130, 150 75 S 240 20, 290 75" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="2.5" stroke-linecap="round" transform="translate(0 -2)"/>
      </svg>
      <div class="fiche" aria-live="polite" aria-atomic="true" data-out></div>
    </div>
  </div>`)

  const svg = $<SVGSVGElement>('.bol-svg', host)!
  const moundsG = $('.mounds', host)!
  const pasteEl = $('.paste', host)!
  const waterEl = $('.water', host)!
  const swirlEl = $('.swirl', host)!
  const rippleEl = $('.ripple', host)!
  const dye = $('.s-dye', host)!
  const out = $('[data-out]', host)!

  const total = () => Object.values(spoons).reduce((a, b) => a + b, 0)

  function result(): { hex: string; lab: Lab } | null {
    const parts = bowlPlants.filter((p) => spoons[p.id]).map((p) => ({ hex: p.hex, w: spoons[p.id] }))
    if (!parts.length) return null
    const base = mix(parts)
    const dilution = Math.min(2, water / Math.max(1, total() / 2)) / 2
    const lab: Lab = { L: base.L + (0.9 - base.L) * 0.28 * dilution, a: base.a * (1 - 0.3 * dilution), b: base.b * (1 - 0.3 * dilution) }
    return { hex: labToHex(lab), lab }
  }

  function nearest(lab: Lab) {
    let best = shades[0]
    let bd = Infinity
    for (const s of shades) {
      if (!s.possible) continue
      const d = deltaE(lab, hexToLab(s.hex))
      if (d < bd) { bd = d; best = s }
    }
    return { shade: best, d: bd }
  }

  function draw(announce = false): void {
    // jars
    $$('.jar', host).forEach((j) => {
      const n = spoons[j.dataset.plant!] ?? 0
      j.dataset.n = String(n)
      $('.count', j)!.textContent = String(n)
    })
    // mounds
    const items: string[] = []
    let k = 0
    bowlPlants.forEach((p) => { for (let i = 0; i < (spoons[p.id] ?? 0); i++) items.push(mound(k++, p.hex)) })
    moundsG.innerHTML = items.join('')
    moundsG.setAttribute('opacity', String(1 - mixing))
    const r = result()
    waterEl.setAttribute('opacity', String((water / MAX_WATER) * 0.75 * (1 - mixing * 0.8)))
    pasteEl.setAttribute('opacity', String(Math.min(1, mixing * (water > 0 ? 1 : 0.6))))
    if (r) {
      pasteEl.setAttribute('fill', r.hex)
      dye.setAttribute('stroke', r.hex)
      dye.setAttribute('opacity', String(Math.min(1, mixing)))
    } else {
      dye.setAttribute('opacity', '0')
    }
    swirlEl.setAttribute('opacity', String(mixing > 0.02 && mixing < 0.98 ? 0.9 : 0))
    swirlEl.setAttribute('transform', `rotate(${swirlAngle} 150 122)`)

    // fiche
    let html = '<h3>Résultat du bol</h3>'
    if (!r) html += '<p>Le bol est vide. Ajoutez une première cuillère de poudre.</p>'
    else if (water === 0) html += `<p>${summary()}.</p><p>Il manque l’eau : versez-en avec le bouton « Verser de l’eau ».</p>`
    else if (mixing < 0.6) html += `<p>${summary()}, ${water} verse${water > 1 ? 's' : ''} d’eau.</p><p>Mélangez pour obtenir la pâte.</p>`
    else {
      const { shade, d } = nearest(r.lab)
      const c = lch(r.lab)
      const notes: string[] = []
      if (c.C > 0.05 && c.h >= 200 && c.h < 285) notes.push('Ce mélange tire vers le bleu : la coloration végétale ne fait pas de bleu, il s’assombrit en brun profond.')
      if (c.L > 0.9) notes.push('Un blond très clair, polaire, n’est pas réalisable avec les plantes.')
      if (c.C > 0.12 && (c.h > 335 || c.h < 20) && c.L > 0.55) notes.push('Les plantes ne font pas de rose.')
      html += `<p><span class="swatch" style="background:${r.hex}"></span>Teinte la plus proche au salon : <strong>${esc(shade.name)}</strong>${d > 0.12 ? ' (assez éloignée de votre mélange)' : ''}.</p>`
      html += `<p>${summary()}, ${water} verse${water > 1 ? 's' : ''} d’eau.</p>`
      notes.forEach((n) => { html += `<p class="warn">${n}</p>` })
      html += `<p class="disclaimer">Résultat indicatif : chaque coloration végétale est unique. Pour une première coloration, un diagnostic au salon ou par téléphone est indispensable.</p>`
      html += `<a class="btn small" href="${salon.phone.tel}">${icon('phone', 18)}<span>Appeler le salon</span></a>`
    }
    out.innerHTML = typo(html)
    if (announce) out.setAttribute('aria-live', 'polite')
  }

  function summary(): string {
    return 'Poudres : ' + bowlPlants.filter((p) => spoons[p.id]).map((p) => `${p.name.toLowerCase()} ×${spoons[p.id]}`).join(', ')
  }

  function puff(hex: string): void {
    if (reduced) return
    const g = $('.puffs', host)!
    for (let i = 0; i < 7; i++) {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      c.setAttribute('r', String(2 + Math.random() * 2.5))
      c.setAttribute('fill', hex)
      c.setAttribute('cx', String(110 + Math.random() * 80))
      c.setAttribute('cy', '10')
      g.appendChild(c)
      gsap.to(c, { attr: { cy: 112 + Math.random() * 14 }, opacity: 0.2, duration: 0.5 + Math.random() * 0.25, ease: 'power2.in', delay: i * 0.025, onComplete: () => c.remove() })
    }
  }

  host.addEventListener('click', (e) => {
    const t = e.target as HTMLElement
    const jar = t.closest<HTMLElement>('.jar')
    const act = t.closest<HTMLElement>('[data-act]')?.dataset.act
    if (jar) {
      if (total() >= MAX_SPOONS) { out.innerHTML = typo('<h3>Résultat du bol</h3><p>Le bol est plein : 8 cuillères au maximum.</p>'); return }
      const id = jar.dataset.plant!
      spoons[id] = (spoons[id] ?? 0) + 1
      mixing = Math.max(0, mixing - 0.5)
      puff(bowlPlants.find((p) => p.id === id)!.hex)
      draw()
    } else if (act === 'water') {
      if (!total()) { out.innerHTML = typo('<h3>Résultat du bol</h3><p>Ajoutez d’abord une poudre.</p>'); return }
      water = Math.min(MAX_WATER, water + 1)
      mixing = Math.max(0, mixing - 0.3)
      if (!reduced) { gsap.fromTo(rippleEl, { attr: { rx: 10, ry: 3 }, opacity: 0.9 }, { attr: { rx: 100, ry: 17 }, opacity: 0, duration: 0.9, ease: 'power2.out' }) }
      draw()
    } else if (act === 'stir') {
      if (!total()) return
      stirBy(0.4, 200)
    } else if (act === 'reset') {
      Object.keys(spoons).forEach((k) => delete spoons[k])
      water = 0; mixing = 0; swirlAngle = 0
      draw(true)
    }
  })

  function stirBy(amount: number, degrees: number): void {
    const target = Math.min(1, mixing + amount)
    const from = mixing
    const a0 = swirlAngle
    if (reduced) { mixing = target; swirlAngle = a0 + degrees; draw(true); return }
    const o = { p: 0 }
    gsap.to(o, { p: 1, duration: 0.7, ease: 'power2.out', onUpdate: () => { mixing = from + (target - from) * o.p; swirlAngle = a0 + degrees * o.p; draw() }, onComplete: () => draw(true) })
  }

  // Mélanger au pointeur : cercles dans le bol.
  let last: number | null = null
  const angleAt = (e: PointerEvent) => {
    const r = svg.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 300 - 150
    const y = ((e.clientY - r.top) / r.height) * 260 - 122
    return Math.atan2(y * 2.2, x)
  }
  svg.addEventListener('pointerdown', (e) => { svg.setPointerCapture(e.pointerId); last = angleAt(e) })
  svg.addEventListener('pointermove', (e) => {
    if (last === null || !total()) return
    const a = angleAt(e)
    let d = a - last
    if (d > Math.PI) d -= 2 * Math.PI
    if (d < -Math.PI) d += 2 * Math.PI
    last = a
    swirlAngle += (d * 180) / Math.PI
    mixing = Math.min(1, mixing + Math.abs(d) / (Math.PI * 2 * 3))
    draw()
  })
  const end = () => { if (last !== null) { last = null; draw(true) } }
  svg.addEventListener('pointerup', end)
  svg.addEventListener('pointercancel', end)
  // Barre d'espace : mélanger quand le focus est dans la zone du bol.
  host.addEventListener('keydown', (e) => {
    const ke = e as KeyboardEvent
    if (ke.code === 'Space' && !(ke.target as HTMLElement).closest('button')) { ke.preventDefault(); if (total()) stirBy(0.12, 60) }
  })
  svg.setAttribute('tabindex', '0')
  svg.setAttribute("aria-describedby", "bol-help-" + uid)
  draw()
  if (opts.compact) host.classList.add('compact')
}
