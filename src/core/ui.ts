// Fragments d'interface partagés.
import { salon } from '../data/salon'
import { icon } from './icons'
import { u, fmtDate } from './dom'
import { pigmentSvg } from './art'
import type { Post } from '../data/posts'
import { photos, type Photo } from '../data/photos'

// Photo d'illustration (Unsplash) : img paresseuse, recadrée par object-fit.
export function photoImg(p: Photo, cls = ''): string {
  return `<img class="ph${cls ? ' ' + cls : ''}" src="${p.src}" alt="${p.alt}" width="${p.w}" height="${p.h}" loading="lazy" decoding="async">`
}

export function photoFig(p: Photo, cls = ''): string {
  return `<figure class="ph-fig${cls ? ' ' + cls : ''}" data-reveal>${photoImg(p)}<figcaption>Photo d’illustration</figcaption></figure>`
}

export function photoStrip(list: Photo[], title = ''): string {
  return `<div class="ph-strip" role="list"${title ? ` aria-label="${title}"` : ''}>${list.map((p) => `<figure class="ph-fig" role="listitem" data-reveal>${photoImg(p)}<figcaption>Photo d’illustration</figcaption></figure>`).join('')}</div>`
}

const postPhotos = ['bol-poudre-verte', 'boucles-brunes', 'savon-carre', 'herbes-sechees-mur', 'salon-fauteuils-miroirs', 'deux-bols-poudres', 'tresse', 'bocaux-herbes', 'cuillere-poudre', 'sechage-boucles', 'flacon-ambre', 'plantes-suspendues']


export function pageHero(opts: { title: string; lead: string; crumb?: string; dye?: string; art?: string }): string {
  return `<section class="page-hero" data-dye="${opts.dye ?? 'teal'}">
    <div class="wrap">
      <p class="crumb"><a href="${u()}">Accueil</a> / ${opts.crumb ?? opts.title}</p>
      <h1 data-split>${opts.title}</h1>
      <p class="lead" data-reveal>${opts.lead}</p>
      ${opts.art ?? ''}
    </div>
  </section>`
}

export function ctaBand(opts: { title?: string; text?: string } = {}): string {
  return `<section class="section tint-indigo" data-dye="framboise">
    <div class="wrap two-col wide-left" style="align-items:center">
      <div>
        <h2 data-split>${opts.title ?? 'Prendre le temps, <em>naturellement</em>.'}</h2>
        <p class="lead" style="color:#C9D6EA">${opts.text ?? 'Réservez en ligne, appelez-nous ou passez au salon, rue du Calvaire. Pour une première coloration, un appel ou un diagnostic suffit.'}</p>
      </div>
      <div class="btn-row" data-reveal>
        <a class="btn light" data-magnetic href="${u('reserver/')}">Réserver</a>
        <a class="btn light" style="--bg:transparent;--fg:#fff" href="${salon.phone.tel}">${icon('phone', 18)}<span>${salon.phone.display}</span></a>
      </div>
    </div>
  </section>`
}

export function postCard(p: Post, i = 0): string {
  const cols = [['#009CBB', '#00448E', '#CE2A57'], ['#A8432A', '#C99A3B', '#1E2A55'], ['#504090', '#009CBB', '#2F6E1A'], ['#CE2A57', '#504090', '#C99A3B']][i % 4]
  const h = [...p.slug].reduce((a, c) => a + c.charCodeAt(0), 0)
  const ph = photos.find((x) => x.slug === postPhotos[h % postPhotos.length])
  return `<article class="post-card" data-reveal>
    <div class="thumb">${ph ? photoImg(ph) + '<span class="ph-tag">Photo d’illustration</span>' : pigmentSvg({ colors: cols, seed: p.slug.length + i * 3, id: 'pc-' + p.slug, label: '', mist: i % 2 === 0 })}</div>
    <div class="body">
      <span class="meta">${p.category} · ${fmtDate(p.date)} · ${p.minutes} min</span>
      <h3><a href="${u('journal/' + p.slug + '/')}">${p.title}</a></h3>
      <p>${p.excerpt}</p>
    </div>
  </article>`
}

export function sampleBadge(text = 'Exemple : contenu fictif pour la démonstration.'): string {
  return `<p class="sample-note">${text}</p>`
}
