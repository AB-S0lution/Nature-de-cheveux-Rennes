// Imagerie originale (SVG procédural) : mèches, herbier, champs de pigments. Aucune photo, aucun logo du salon.
import { plantById } from '../data/plants'

export type Texture = 'lisse' | 'ondulé' | 'bouclé' | 'frisé'

function rng(seed: number) {
  let s = seed * 9301 + 49297
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

/** Trajet d'une mèche selon la texture, du haut vers le bas dans un cadre w x h. */
export function strandPath(texture: Texture, w: number, h: number, seed = 1): string {
  const r = rng(seed)
  const cx = w / 2 + (r() - 0.5) * w * 0.1
  const pts: string[] = []
  const n = 160
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const y0 = 8 + t * (h - 16)
    let x = cx
    let y = y0
    if (texture === 'lisse') x = cx + Math.sin(t * Math.PI * 1.2 + seed) * w * 0.07 * t
    if (texture === 'ondulé') x = cx + Math.sin(t * Math.PI * 4 + seed) * w * 0.13
    if (texture === 'bouclé') {
      const a = t * Math.PI * 2 * 4.2 + seed
      x = cx + Math.cos(a) * w * 0.14 * (0.5 + t)
      y = y0 + Math.sin(a) * w * 0.14 * (0.5 + t)
    }
    if (texture === 'frisé') {
      const a = t * Math.PI * 2 * 11 + seed
      x = cx + Math.cos(a) * w * 0.08 + Math.sin(t * 9) * w * 0.05
      y = y0 + Math.sin(a) * w * 0.08
    }
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return pts.join(' ')
}

/** Mèche colorée (dégradé de racine à pointe). */
export function strandSvg(opts: { texture: Texture; from: string; to?: string; w?: number; h?: number; seed?: number; width?: number; id: string; label?: string }): string {
  const { texture, from, to = from, w = 200, h = 320, seed = 1, width = 7, id, label } = opts
  const d = strandPath(texture, w, h, seed)
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${label ?? 'Mèche de cheveux'}" class="art-strand">
  <defs><linearGradient id="sg-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs>
  <path d="${d}" fill="none" stroke="url(#sg-${id})" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${d}" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="${Math.max(1.2, width / 5)}" stroke-linecap="round" stroke-linejoin="round" transform="translate(-1.6 0)"/>
</svg>`
}

/** Champ de pigments : encre dans l'eau (feTurbulence + déplacement), couleurs au choix. */
export function pigmentSvg(opts: { colors: string[]; seed?: number; id: string; label?: string; mist?: boolean }): string {
  const { colors, seed = 1, id, label = 'Encres de couleur diffusées dans l’eau', mist = false } = opts
  const r = rng(seed)
  const blobs = colors
    .map((c, i) => {
      const x = 30 + r() * 140
      const y = 30 + r() * 140
      const rad = 48 + r() * 34
      return `<radialGradient id="pg-${id}-${i}"><stop offset="0" stop-color="${c}" stop-opacity=".85"/><stop offset=".55" stop-color="${c}" stop-opacity=".45"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient><circle class="blob b${i}" cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${rad.toFixed(0)}" fill="url(#pg-${id}-${i})" opacity="${(0.7 + r() * 0.25).toFixed(2)}"/>`
    })
    .join('')
  return `<svg viewBox="0 0 200 200" role="img" aria-label="${label}" class="art-pigment" preserveAspectRatio="xMidYMid slice">
  <defs>
    <filter id="pf-${id}" filterUnits="userSpaceOnUse" x="-40" y="-40" width="280" height="280"><feTurbulence type="fractalNoise" baseFrequency="${(0.012 + r() * 0.012).toFixed(4)}" numOctaves="2" seed="${seed}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="14"/><feGaussianBlur stdDeviation="1.2"/></filter>
    <linearGradient id="pm-${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#C9D3DC"/><stop offset="1" stop-color="#9FAEC4"/></linearGradient>
  </defs>
  <rect width="200" height="200" fill="${mist ? 'url(#pm-' + id + ')' : 'var(--paper-2)'}"/>
  <g filter="url(#pf-${id})">${blobs}</g>
</svg>`
}

const leaf = (x: number, y: number, rot: number, len: number, wid: number, fill: string) =>
  `<path d="M0 0 C ${wid} ${-len * 0.3}, ${wid} ${-len * 0.8}, 0 ${-len} C ${-wid} ${-len * 0.8}, ${-wid} ${-len * 0.3}, 0 0 Z" fill="${fill}" fill-opacity=".85" stroke="#12203A" stroke-opacity=".55" stroke-width="1" transform="translate(${x} ${y}) rotate(${rot})"/><path d="M${x} ${y} L${x + Math.sin((rot * Math.PI) / 180) * len * 0.9} ${y - Math.cos((rot * Math.PI) / 180) * len * 0.9}" stroke="#12203A" stroke-opacity=".35" stroke-width=".8"/>`

/** Planche d'herbier d'une plante : dessin au trait + étiquette « bocal » (Courier Prime). */
export function herbariumSvg(plantId: string, opts: { id?: string } = {}): string {
  const p = plantById(plantId)
  if (!p) return ''
  const c = p.hex
  const g = '#4E7A5A'
  let drawing = ''
  switch (plantId) {
    case 'henne':
      drawing = `<path d="M100 232 C 98 180, 104 130, 100 60" stroke="${g}" stroke-width="2" fill="none"/>` +
        [0, 1, 2, 3, 4].map((i) => leaf(100, 210 - i * 28, i % 2 ? 38 : -38, 34, 10, g)).join('') +
        [0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${92 + (i % 3) * 8}" cy="${66 + Math.floor(i / 3) * 8}" r="3" fill="${c}"/>`).join('')
      break
    case 'indigo':
      drawing = `<path d="M100 232 C 96 180, 104 120, 100 50" stroke="${g}" stroke-width="2" fill="none"/>` +
        [0, 1, 2, 3, 4, 5].map((i) => leaf(100, 214 - i * 26, i % 2 ? 62 : -62, 26, 5, '#34507A') + leaf(100, 208 - i * 26, i % 2 ? 40 : -40, 22, 4, '#34507A')).join('')
      break
    case 'rhubarbe':
      drawing = `<path d="M100 232 L100 120" stroke="${c}" stroke-width="5" stroke-linecap="round"/><path d="M100 120 C 40 110, 30 60, 70 40 C 90 30, 110 30, 130 40 C 170 60, 160 110, 100 120 Z" fill="${g}" fill-opacity=".8" stroke="#12203A" stroke-opacity=".55"/><path d="M100 118 L100 48 M100 100 L64 62 M100 100 L136 62 M100 90 L78 50 M100 90 L122 50" stroke="#12203A" stroke-opacity=".35"/>`
      break
    case 'avoine':
      drawing = `<path d="M100 232 L100 70" stroke="${g}" stroke-width="2"/>` +
        [0, 1, 2, 3, 4, 5].map((i) => `<path d="M100 ${88 + i * 14} q ${i % 2 ? 20 : -20} -8 ${i % 2 ? 24 : -24} 14" stroke="${g}" fill="none"/><ellipse cx="${100 + (i % 2 ? 26 : -26)}" cy="${104 + i * 14}" rx="4" ry="8" fill="${c}" stroke="#12203A" stroke-opacity=".5" transform="rotate(${i % 2 ? -20 : 20} ${100 + (i % 2 ? 26 : -26)} ${104 + i * 14})"/>`).join('')
      break
    case 'guimauve':
      drawing = `<path d="M100 232 C 100 180, 100 150, 100 118" stroke="${g}" stroke-width="2" fill="none"/>` +
        leaf(100, 200, -50, 40, 14, g) + leaf(100, 176, 50, 36, 12, g) +
        [0, 1, 2, 3, 4].map((i) => `<ellipse cx="100" cy="92" rx="14" ry="26" fill="${c}" stroke="#12203A" stroke-opacity=".45" transform="rotate(${i * 72} 100 108)"/>`).join('') + `<circle cx="100" cy="108" r="6" fill="#C99A3B"/>`
      break
    case 'curcuma':
      drawing = `<path d="M70 200 q 20 -22 50 -8 q 22 10 36 -4 q -4 24 -36 30 q -30 4 -50 -18 z" fill="${c}" stroke="#12203A" stroke-opacity=".5"/><path d="M92 196 C 80 150, 82 100, 100 60" stroke="${g}" stroke-width="2" fill="none"/>` + leaf(92, 190, -18, 110, 24, g) + leaf(100, 196, 24, 96, 20, g)
      break
    case 'argile':
      drawing = `<path d="M50 200 q 10 -50 50 -56 q 44 6 50 56 z" fill="${c}" fill-opacity=".8" stroke="#12203A" stroke-opacity=".5"/><path d="M70 190 q 30 -14 60 0 M62 176 q 38 -16 76 0" stroke="#12203A" stroke-opacity=".35" fill="none"/>`
      break
    case 'algues':
      drawing = [0, 1, 2, 3].map((i) => `<path d="M${70 + i * 20} 232 C ${50 + i * 22} 190, ${96 + i * 14} 160, ${70 + i * 20} 90" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/>`).join('')
      break
    case 'huiles':
      drawing = `<path d="M100 70 C 70 120, 66 150, 100 170 C 134 150, 130 120, 100 70 Z" fill="${c}" fill-opacity=".8" stroke="#12203A" stroke-opacity=".5"/><path d="M88 128 C 92 144, 98 150, 106 152" stroke="#fff" stroke-opacity=".5" fill="none"/>`
      break
    default:
      drawing = `<path d="M100 90 C 60 90, 50 150, 100 190 C 150 150, 140 90, 100 90 Z" fill="url(#nac-${opts.id ?? plantId})" stroke="#12203A" stroke-opacity=".4"/>`
  }
  const id = opts.id ?? plantId
  return `<svg viewBox="0 0 200 280" role="img" aria-label="Planche d’herbier : ${p.name}" class="art-herb">
  <defs><linearGradient id="nac-${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E9EEF2"/><stop offset=".5" stop-color="#D9D3E8"/><stop offset="1" stop-color="#CFE6E4"/></linearGradient></defs>
  <rect x="6" y="6" width="188" height="268" rx="10" fill="#FBFCFA" stroke="#12203A" stroke-opacity=".18"/>
  <g>${drawing}</g>
  <rect x="26" y="238" width="148" height="30" rx="3" fill="#12141A"/>
  <text x="100" y="254" text-anchor="middle" fill="#F1F4F1" font-family="'Courier Prime', monospace" font-size="11" letter-spacing=".6">${p.name.toUpperCase()}</text>
  <text x="100" y="263" text-anchor="middle" fill="#F1F4F1" fill-opacity=".7" font-family="'Courier Prime', monospace" font-size="7.5" font-style="italic">${p.latin}</text>
</svg>`
}

/** Fleur du logo « N » : volute calligraphique du trait de mèche (usage décoratif, non le logo du salon). */
export const swashPath = 'M6 78 C 30 78, 34 8, 56 8 C 78 8, 70 70, 52 70 C 38 70, 40 40, 54 40'
