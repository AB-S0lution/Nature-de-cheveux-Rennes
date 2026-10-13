// Le nuancier : des mèches suspendues, comme l'anneau de teintes de tout salon, avec les plantes de chaque teinte.
import { shades, familyLabels, type Shade, type ShadeFamily } from '../data/shades'
import { plantById } from '../data/plants'
import { strandSvg } from '../core/art'
import { $, $$, typo } from '../core/dom'
import { gsap, ScrollTrigger, heavy } from '../core/motion'
import { isDesktop } from '../core/dom'

function card(s: Shade, i: number): string {
  const tex = (['lisse', 'ondulé', 'bouclé', 'ondulé'] as const)[i % 4]
  const names = s.plants.map((id) => plantById(id)?.name ?? id).join(', ')
  return `<article class="strand-card${s.possible ? '' : ' nope'}" data-family="${s.family}">
    ${strandSvg({ texture: tex, from: s.hex, to: s.hex, w: 76, h: 200, seed: i + 2, width: 7, id: 'n' + s.id, label: `Mèche ${s.name}` })}
    <div class="label">
      <span class="etiquette">${s.name}<small>${s.possible ? names : 'non réalisable'}</small></span>
      ${s.whiteHairCoverage ? `<small class="mono">couvre ${s.whiteHairCoverage} des blancs</small>` : ''}
    </div>
  </article>`
}

export function mountNuancier(host: HTMLElement, opts: { filters?: boolean; limit?: number } = {}): void {
  let family: ShadeFamily | 'all' = 'all'
  const list = (opts.limit ? shades.filter((s) => s.possible).slice(0, opts.limit) : shades)
  const families = Array.from(new Set(list.map((s) => s.family)))
  host.innerHTML = typo(`
  ${opts.filters ? `<div class="family-tabs chips" role="group" aria-label="Filtrer par famille de teintes"><button class="chip" aria-pressed="true" data-f="all">Toutes</button>${families.map((f) => `<button class="chip" aria-pressed="false" data-f="${f}">${familyLabels[f]}</button>`).join('')}</div>` : ''}
  <div class="nuancier-wrap"><div class="nuancier" tabindex="0" role="region" aria-label="Nuancier, défiler horizontalement">${list.map(card).join('')}</div></div>
  <p class="muted mono" style="font-size:.85rem;margin-top:.5rem">Teintes d’exemple, à titre indicatif : chaque coloration végétale est unique.</p>`)

  const track = $('.nuancier', host)!
  const wrap = $('.nuancier-wrap', host)!
  const apply = () => $$('.strand-card', host).forEach((c) => { c.classList.toggle('hide', family !== 'all' && c.dataset.family !== family) })
  $$('.chip', host).forEach((b) => b.addEventListener('click', () => {
    family = b.dataset.f as ShadeFamily | 'all'
    $$('.chip', host).forEach((x) => x.setAttribute('aria-pressed', String(x === b)))
    apply()
    ScrollTrigger.refresh()
  }))

  if (heavy && isDesktop() && !opts.filters) {
    // Panoramique horizontal épinglé
    track.classList.add('pinned')
    const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 64)
    const tween = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: wrap, start: 'top 18%', end: () => `+=${dist()}`, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
      onUpdate: (self) => { const v = gsap.utils.clamp(-4, 4, self.getVelocity() / -400); gsap.to($$('.strand-card', host), { rotation: v, duration: 0.6, ease: 'power3.out', overwrite: 'auto' }) } } })
    void tween
  }
}
