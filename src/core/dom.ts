// Utilitaires DOM et typographie française.
const NBSP = ' '

/** Espaces insécables avant ? ! ; : et à l'intérieur des guillemets français. */
export function typo(s: string): string {
  // Seules les portions de texte sont traitées : jamais l'intérieur d'une balise (attributs, tracés SVG).
  return s
    .split(/(<[^>]*>)/)
    .map((part) => (part.startsWith('<') ? part : part
      .replace(/ ([?!;:»€%])/g, `${NBSP}$1`)
      .replace(/« /g, `«${NBSP}`)
      .replace(/(\d) (h|km|cm|min|m|ans|€|%)\b/g, `$1${NBSP}$2`)
      .replace(/(\d) (\d{2}) (\d{2}) (\d{2}) (\d{2})/g, `$1${NBSP}$2${NBSP}$3${NBSP}$4${NBSP}$5`)))
    .join('')
}

export function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** URL absolue au site, compatible avec le chemin de base GitHub Pages. */
export function u(path = ''): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}

export const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document): T | null => root.querySelector<T>(sel)
export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document): T[] => Array.from(root.querySelectorAll<T>(sel))

export function setHTML(el: Element, html: string): void {
  el.innerHTML = typo(html)
}

export const prefersReduced = (): boolean => document.documentElement.classList.contains('reduce')
export const isLite = (): boolean => document.documentElement.classList.contains('lite')
export const isDesktop = (): boolean => window.matchMedia('(min-width: 900px) and (hover: hover)').matches

export function fmtDate(iso: string): string {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))
}

export function debounce<T extends (...a: never[]) => void>(fn: T, ms = 150): (...a: Parameters<T>) => void {
  let t: number | undefined
  return (...a) => {
    window.clearTimeout(t)
    t = window.setTimeout(() => fn(...a), ms)
  }
}

export function normalize(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}
