// « 10 cm » : la règle du don de cheveux. Faits exacts (site du salon, UNEC) ; le curseur est un jeu.
import { $, typo } from '../core/dom'
import { icon } from '../core/icons'
import { strandPath } from '../core/art'

const TIP_Y = 400
const PX = 9 // pixels par cm
const MAX = 40

export function mountRuler(host: HTMLElement): void {
  let cut = 12
  const ticks: string[] = []
  for (let cm = 0; cm <= MAX; cm++) {
    const y = TIP_Y - cm * PX
    const big = cm % 5 === 0
    ticks.push(`<line x1="${big ? 224 : 232}" x2="252" y1="${y}" y2="${y}" stroke="${cm === 10 ? '#CE2A57' : '#12203A'}" stroke-width="${cm === 10 ? 2.5 : 1}"/>`)
    if (big) ticks.push(`<text x="218" y="${y + 4}" text-anchor="end" font-family="'Courier Prime', monospace" font-size="11" fill="#12203A">${cm}</text>`)
  }
  const full = strandPath('lisse', 120, 380, 3)
  host.innerHTML = typo(`
  <div class="ruler">
    <div class="ruler-stage">
      <svg class="ruler-svg" viewBox="0 0 300 420" role="img" aria-label="Une mèche de cheveux de 40 centimètres le long d’une règle, avec des ciseaux à la hauteur de la coupe">
        <rect x="224" y="10" width="40" height="${TIP_Y - 8}" rx="4" fill="#F6E9C8" stroke="#12203A" stroke-opacity=".6" class="ruler-body"/>
        <g class="ticks" style="--tick:1">${ticks.join('')}</g>
        <g transform="translate(10 ${TIP_Y - 372})">
          <path class="kept" d="${full}" fill="none" stroke="#6E2E28" stroke-width="7" stroke-linecap="round"/>
          <g class="fall"><path class="dropped" d="${full}" fill="none" stroke="#CE2A57" stroke-width="7" stroke-linecap="round"/></g>
        </g>
        <g class="scissors" tabindex="-1" style="cursor:ns-resize">
          <line class="cutline" x1="40" x2="222" y1="0" y2="0" stroke="#CE2A57" stroke-dasharray="5 4" stroke-width="1.5"/>
          <circle cx="40" cy="0" r="17" fill="#fff" stroke="#12203A"/>
          <g transform="translate(28 -12)" color="#12203A">${icon('scissors', 24)}</g>
        </g>
      </svg>
    </div>
    <div>
      <label class="lab" for="ruler-range" style="font-weight:600">Longueur coupée : <output class="tnum" for="ruler-range">${cut}</output> cm</label>
      <input id="ruler-range" class="ruler-range" type="range" min="0" max="30" step="1" value="${cut}" aria-describedby="ruler-out">
    </div>
    <div class="fiche ruler-out" id="ruler-out" aria-live="polite"></div>
  </div>`)

  const range = $<HTMLInputElement>('#ruler-range', host)!
  const outEl = $('output', host)!
  const out = $('.ruler-out', host)!
  const svg = $<SVGSVGElement>('.ruler-svg', host)!
  const scissors = $('.scissors', host)!
  const kept = $<SVGPathElement>('.kept', host)!
  const dropped = $<SVGPathElement>('.dropped', host)!
  const fall = $('.fall', host)!
  const len = kept.getTotalLength()
  kept.style.strokeDasharray = `${len}`
  dropped.style.strokeDasharray = `${len}`
  // Le tracé va de la racine (haut) à la pointe (bas) sur 380 px pour 40 cm.
  const pxPerLen = len / 40

  function update(): void {
    outEl.textContent = String(cut)
    const keptLen = (MAX - cut) * pxPerLen
    kept.style.strokeDashoffset = '0'
    kept.style.strokeDasharray = `${keptLen} ${len}`
    dropped.style.strokeDasharray = `0 ${keptLen} ${len - keptLen} ${len}`
    dropped.style.strokeDashoffset = '0'
    const y = TIP_Y - cut * PX
    scissors.setAttribute('transform', `translate(0 ${y})`)
    scissors.style.display = cut === 0 ? 'none' : ''
    fall.setAttribute('transform', `translate(${cut >= 10 ? 18 : -2} ${cut >= 10 ? 6 : 2})`)
    let html = '<p><strong>Résultat</strong></p>'
    if (cut === 0) html += '<p>Déplacez les ciseaux pour choisir la longueur à couper.</p>'
    else if (cut >= 10) html += `<p><span class="where">${cut} cm : vers Fake Hair Don’t Care.</span> Au-delà de 10 cm, vos cheveux peuvent devenir une perruque pour une personne en traitement contre le cancer.</p>`
    else html += `<p><span class="where">${cut} cm : vers Capillum.</span> En dessous de 10 cm, les cheveux sont recyclés plutôt que jetés (paillage, dépollution).</p>`
    html += '<p class="disclaimer">Faites une bonne action avec le don de cheveux ! Parlez-en à l’équipe lors de la prise de rendez-vous.</p>'
    out.innerHTML = typo(html)
  }
  range.addEventListener('input', () => { cut = Number(range.value); update() })

  let drag = false
  const setFromPointer = (e: PointerEvent) => {
    const r = svg.getBoundingClientRect()
    const y = ((e.clientY - r.top) / r.height) * 420
    const cm = Math.round((TIP_Y - y) / PX)
    cut = Math.max(0, Math.min(30, cm))
    range.value = String(cut)
    update()
  }
  scissors.addEventListener('pointerdown', (e) => { drag = true; svg.setPointerCapture((e as PointerEvent).pointerId) })
  svg.addEventListener('pointermove', (e) => { if (drag) setFromPointer(e) })
  svg.addEventListener('pointerup', () => { drag = false })
  svg.addEventListener('pointercancel', () => { drag = false })
  update()
}
