// Mouvement : GSAP + ScrollTrigger + SplitText, Lenis (défilement doux), animations CSS pilotées par le défilement.
// Tout est dégradé proprement sous prefers-reduced-motion, saveData et faible hardwareConcurrency (classes html.reduce / html.lite).
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
import { $, $$ } from './dom'

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

/** Requêtes partagées : bureau (souris, grand écran) contre tactile / petit écran. */
export const MQ = {
  desktop: '(min-width: 900px) and (hover: hover) and (pointer: fine)',
  touch: '(max-width: 899px), (hover: none), (pointer: coarse)',
}
export const isTouchLayout = (): boolean => matchMedia(MQ.touch).matches
export const mm = gsap.matchMedia()

/* Révélations à l'épreuve des pannes : le contenu est visible par défaut. Il n'est masqué
   qu'après l'ajout de html.reveal-ready (ci-dessous), et un IntersectionObserver le montre.
   Filets de sécurité : nouvel élément observé automatiquement (MutationObserver), contrôle
   au défilement, et minuterie qui montre tout ce qui est déjà passé ou à l'écran. */
let io: IntersectionObserver | null = null
const pending = new Set<Element>()

function show(el: Element, delay = 0): void {
  if (!pending.has(el)) return
  pending.delete(el)
  io?.unobserve(el)
  ;(el as HTMLElement).style.transitionDelay = delay ? `${delay}ms` : ''
  el.classList.add('is-in')
}

function track(el: Element): void {
  if (pending.has(el) || el.classList.contains('is-in')) return
  pending.add(el)
  io?.observe(el)
}

function sweep(all = false): void {
  const h = window.innerHeight
  pending.forEach((el) => {
    const r = el.getBoundingClientRect()
    if (all || r.top < h * 1.05 || (r.width === 0 && r.height === 0)) show(el)
  })
}

function initReveals(): void {
  if (reduced || !('IntersectionObserver' in window)) { root.classList.remove('reveal-ready'); return }
  io = new IntersectionObserver((entries) => {
    let n = 0
    entries.forEach((e) => { if (e.isIntersecting) show(e.target, Math.min(n++, 6) * 70) })
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 })
  // Ce qui est déjà à l'écran reste affiché tel quel (pas de clignotement), le reste attend.
  const h = window.innerHeight
  $$('[data-reveal]').forEach((el) => { if (el.getBoundingClientRect().top < h) el.classList.add('is-in'); else track(el) })
  root.classList.add('reveal-ready')
  // Contenu rendu plus tard (filtres, cartes du journal, catalogue) : observé aussi.
  new MutationObserver((muts) => {
    muts.forEach((m) => m.addedNodes.forEach((n) => {
      if (!(n instanceof Element)) return
      if (n.matches('[data-reveal]')) track(n)
      n.querySelectorAll('[data-reveal]').forEach(track)
    }))
  }).observe(document.getElementById('main') ?? document.body, { childList: true, subtree: true })
  let t: number | undefined
  window.addEventListener('scroll', () => { window.clearTimeout(t); t = window.setTimeout(() => sweep(), 180) }, { passive: true })
  window.setTimeout(() => sweep(), 2500)
  window.addEventListener('pageshow', () => sweep())
  // Dernier recours : rien ne doit rester invisible plus de 8 s.
  window.setTimeout(() => sweep(true), 8000)
}

export function initMotion(): void {
  ScrollTrigger.config({ ignoreMobileResize: true })
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

  try { initReveals() } catch { root.classList.remove('reveal-ready') }
  if (reduced) return

  if (strand) {
    gsap.to(strand, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.4 } })
  }

  // Bureau : défilement doux, titres en lignes masquées, boutons magnétiques, fiches inclinables.
  mm.add(MQ.desktop, () => {
    if (heavy) {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95, smoothWheel: true })
      lenis.on('scroll', ScrollTrigger.update)
      const raf = (t: number) => lenis?.raf(t * 1000)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]')
        if (!a || !lenis) return
        const url = new URL(a.href)
        if (url.pathname !== location.pathname || !url.hash) return
        const el = document.getElementById(url.hash.slice(1))
        if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -80 }); history.replaceState(null, '', url.hash) }
      }
      document.addEventListener('click', onClick)
      return () => { gsap.ticker.remove(raf); document.removeEventListener('click', onClick); lenis?.destroy(); lenis = null }
    }
  })
  mm.add(MQ.desktop, () => {
    $$('[data-split]').forEach((el) => {
      SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true,
        onSplit: (self) => gsap.from(self.lines, { yPercent: 108, duration: 1.1, ease: 'power4.out', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 88%', once: true } }) })
    })
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
    $$('.fiche-tarif').forEach((c) => {
      c.addEventListener('pointermove', (e) => {
        const r = c.getBoundingClientRect()
        const px = ((e as PointerEvent).clientX - r.left) / r.width - 0.5
        const py = ((e as PointerEvent).clientY - r.top) / r.height - 0.5
        c.style.transform = `perspective(900px) rotateY(${px * 3}deg) rotateX(${-py * 3}deg)`
      })
      c.addEventListener('pointerleave', () => { c.style.transform = '' })
    })
  })
  // Tactile / petit écran : pas de SplitText (coûteux), les titres montent d'un bloc.
  mm.add(MQ.touch, () => {
    const h = window.innerHeight
    $$('[data-split]').forEach((el) => {
      if (el.hasAttribute('data-reveal') || el.getBoundingClientRect().top < h) return
      el.setAttribute('data-reveal', '')
      track(el)
    })
  })
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
