// Conversions OKLab / OKLCH pour mélanger les teintes du bol en perception uniforme.
export type Lab = { L: number; a: number; b: number }

export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255]
}
const toLin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const toGam = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055)

export function hexToLab(hex: string): Lab {
  const [r, g, b] = hexToRgb(hex).map(toLin) as [number, number, number]
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  return { L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s }
}

export function labToHex({ L, a, b }: Lab): string {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  const lin = [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s]
  return '#' + lin.map((c) => Math.round(Math.min(1, Math.max(0, toGam(Math.min(1, Math.max(0, c))))) * 255).toString(16).padStart(2, '0')).join('')
}

export function lch(lab: Lab): { L: number; C: number; h: number } {
  return { L: lab.L, C: Math.hypot(lab.a, lab.b), h: ((Math.atan2(lab.b, lab.a) * 180) / Math.PI + 360) % 360 }
}

export function deltaE(x: Lab, y: Lab): number {
  return Math.hypot(x.L - y.L, x.a - y.a, x.b - y.b)
}

/** Moyenne pondérée dans l'espace OKLab. */
export function mix(parts: { hex: string; w: number }[]): Lab {
  const total = parts.reduce((s, p) => s + p.w, 0) || 1
  return parts.reduce((acc, p) => {
    const lab = hexToLab(p.hex)
    return { L: acc.L + (lab.L * p.w) / total, a: acc.a + (lab.a * p.w) / total, b: acc.b + (lab.b * p.w) / total }
  }, { L: 0, a: 0, b: 0 })
}
