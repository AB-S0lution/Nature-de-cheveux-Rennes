// Mouvement : GSAP + ScrollTrigger + SplitText, Lenis (défilement doux), animations CSS pilotées par le défilement.
// Tout est dégradé proprement sous prefers-reduced-motion, saveData et faible hardwareConcurrency (classes html.reduce / html.lite).
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
import { $, $$, isDesktop } from './dom'

gsap.registerPlugin(ScrollTrigger, SplitText)
export { gsap, ScrollTrigger, SplitText }

const root = document.documentElement
export const reduced = root.classList.contains('reduce')
export const lite = root.classList.contains('lite')
/** Épinglage et mouvements lourds autorisés. */
export const heavy = !reduced && !lite

export let lenis: Lenis | null = null

const dyes: Record<string, string> = {
  teal: '#009CBB', henne: '#A8432A', indigo: '#1E2A55', rhubarbe: '#C99A3B', curcuma: '#D7A21E', framboise: '#CE2A57', feuille: '#2F6E1A', violette: '#504090',
}
const dyesDark: Record<string, string> = { ...dyes, indigo: '#6E86D6', teal: '#3CC2DC', feuille: '#6BBE4B', violette: '#9A88E0' }

function dyeColor(name: string): string {
  const dark = root.getAttribute('data-theme') === 'dark' || (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches)
  return (dark ? dyesDark : dyes)[name] ?? dyes.teal
}

function initStrandPath(): SVGPathElement | null {
  const path = $<SVGPathElement>('#strand-path')
  if (!path) return null
  const vertical = false
  const pts: string[] = []
  const n = 80
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const wave = Math.sin(t * Math.PI * 18) * 3
    pts.push(vertical ? `${i ? 'L' : 'M'}${(7 + wave).toFixed(1)} ${(t * 1000).toFixed(1)}` : `${i ? 'L' : 'M'}${(t * 1000).toFixed(1)} ${(6 + wave).toFixed(1)}`)
  }
  path.setAttribute('d', pts.join(' '))
  const svg = path.ownerSVGElement!
  svg.setAttribute('viewBox', vertical ? '0 0 14 1000' : '0 0 1000 12')
  return path
}

export function initMotion(): void {
  const strand = initStrandPath()
  const len = strand ? strand.getTotalLength() : 0
  if (strand) {
    strand.style.strokeDasharray = String(len)
    strand.style.strokeDashoffset = reduced ? '0' : String(len)
  }

  // Couleur de teinture du fil : une plante par section.
  $$('[data-dye]').forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec, start: 'top 55%', end: 'bottom 55%',
      onToggle: (self) => { if (self.isActive) root.style.setProperty('--strand', dyeColor(sec.dataset.dye ?? 'teal')) },
    })
  })
  root.style.setProperty('--strand', dyeColor('teal'))

  if (reduced) return

  if (heavy) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((t) => lenis!.raf(t * 1000))
    gsap.ticker.lagSmoothing(0)
    document.addEventListener('click', (e) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]')
      if (!a || !lenis) return
      const url = new URL(a.href)
      if (url.pathname !== location.pathname || !url.hash) return
      const el = document.getElementById(url.hash.slice(1))
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -80 }); history.replaceState(null, '', url.hash) }
    })
  }

  if (strand) {
    gsap.to(strand, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.4 } })
  }

  // Révélations en lot
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%', once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true, clearProps: 'transform' }),
  })

  // Titres : lignes masquées qui montent
  $$('[data-split]').forEach((el) => {
    const split = SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true,
      onSplit: (self) => gsap.from(self.lines, { yPercent: 108, duration: 1.1, ease: 'power4.out', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 88%', once: true } }) })
    void split
  })

  if (isDesktop()) {
    // Boutons magnétiques
    $$('[data-magnetic]').forEach((b) => {
      const xTo = gsap.quickTo(b, 'x', { duration: 0.5, ease: 'power3.out' })
      const yTo = gsap.quickTo(b, 'y', { duration: 0.5, ease: 'power3.out' })
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect()
        xTo(((e as PointerEvent).clientX - (r.left + r.width / 2)) * 0.25)
        yTo(((e as PointerEvent).clientY - (r.top + r.height / 2)) * 0.3)
      })
      b.addEventListener('pointerleave', () => { xTo(0); yTo(0) })
    })
    // Fiches tarifs : inclinaison de 2° maximum
    $$('.fiche-tarif').forEach((c) => {
      c.addEventListener('pointermove', (e) => {
        const r = c.getBoundingClientRect()
        const px = ((e as PointerEvent).clientX - r.left) / r.width - 0.5
        const py = ((e as PointerEvent).clientY - r.top) / r.height - 0.5
        c.style.transform = `perspective(900px) rotateY(${px * 3}deg) rotateX(${-py * 3}deg)`
      })
      c.addEventListener('pointerleave', () => { c.style.transform = '' })
    })
  }
}

/** Titre du hero : chaque lettre « prend la couleur » en tombant d'un gris d'encre vers l'indigo. */
export function heroTitle(el: HTMLElement): void {
  if (reduced) return
  SplitText.create(el, { type: 'words,chars', autoSplit: true,
    onSplit: (self) => {
      const ink = getComputedStyle(root).getPropertyValue('--ink').trim() || '#12203A'
      const fram = getComputedStyle(root).getPropertyValue('--framboise').trim() || '#CE2A57'
      self.words.forEach((w) => { (w as HTMLElement).style.display = 'inline-block'; (w as HTMLElement).style.whiteSpace = 'nowrap' })
      self.chars.forEach((c) => { (c as HTMLElement).style.display = 'inline-block' })
      return gsap.fromTo(self.chars, { yPercent: 40, opacity: 0, color: '#9AA6B6' }, {
        yPercent: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.04, delay: 0.15,
        color: (_i: number, t: HTMLElement) => (t.closest('.vote') ? fram : ink),
        onComplete: () => gsap.set(self.chars, { clearProps: 'color,transform' }),
      })
    } })
}

export function refreshAll(): void {
  ScrollTrigger.refresh()
}
