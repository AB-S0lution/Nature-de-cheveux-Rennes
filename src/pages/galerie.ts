import { boot } from '../core/boot'
import { pageHero, ctaBand, sampleBadge, photoFig, photoImg } from '../core/ui'
import { photos, photoCategoryLabels, type PhotoCategory } from '../data/photos'
import { setHTML, $, $$, typo } from '../core/dom'
import { icon } from '../core/icons'
import { gallery, galleryTypeLabels, type GalleryItem, type GalleryType } from '../data/gallery'
import { shades } from '../data/shades'
import { strandSvg, herbariumSvg, pigmentSvg, type Texture } from '../core/art'

const palette = [['#009CBB', '#00448E', '#504090'], ['#CE2A57', '#504090', '#00448E'], ['#C99A3B', '#A8432A', '#1E2A55'], ['#2F6E1A', '#009CBB', '#C99A3B']]

function visual(g: GalleryItem, big = false): string {
  if (g.photoSlot) {
    const ph = g.photo ? photos.find((x) => x.slug === g.photo) : undefined
    return ph ? `<span class="slot-ph">${photoImg(ph)}<span class="ph-tag">Photo d’illustration</span></span>` : `<span class="slot-txt">Emplacement photo<br>à fournir avec l’accord du salon</span>`
  }
  if (g.type === 'herbier' && g.plant) return herbariumSvg(g.plant, { id: 'g' + g.id + (big ? 'b' : '') })
  if (g.type === 'pigment') return pigmentSvg({ colors: palette[g.seed % 4], seed: g.seed, id: g.id + (big ? 'b' : ''), label: g.alt, mist: true })
  const hex = shades.find((s) => s.id === g.shade)?.hex ?? '#A8432A'
  return `<div style="padding:1rem;display:grid;place-items:center;background:var(--paper-2)">${strandSvg({ texture: (g.texture ?? 'ondulé') as Texture, from: hex, to: hex, w: 140, h: 230, seed: g.seed, width: 7, id: g.id + (big ? 'b' : ''), label: g.alt })}</div>`
}

void boot((main) => {
  const types = Object.keys(galleryTypeLabels) as GalleryType[]
  setHTML(main, `
  ${pageHero({ title: 'Galerie', lead: 'Photos d’illustration, mèches, herbier et champs de pigments, en attendant des photos réelles du salon.', dye: 'rhubarbe', photo: 'poudre-verte-surface' })}
  <section class="section tint-mint" data-dye="teal" aria-labelledby="ph-t">
    <div class="wrap">
      <h2 id="ph-t" data-split>Photos</h2>
      ${sampleBadge('Photos d’illustration Unsplash (licence Unsplash), pas des photos du salon ni de ses clientes.')}
      <div class="chips" role="group" aria-label="Filtrer les photos" id="ph-filter" style="margin:1.5rem 0"><button class="chip" aria-pressed="true" data-v="">Toutes (${photos.length})</button>${(Object.keys(photoCategoryLabels) as PhotoCategory[]).map((c) => `<button class="chip" aria-pressed="false" data-v="${c}">${photoCategoryLabels[c]}</button>`).join('')}</div>
      <div class="ph-grid" id="ph-grid">${photos.map((p) => photoFig(p).replace('<figure ', `<figure data-cat="${p.category}" `)).join('')}</div>
    </div>
  </section>
  <section class="section">
    <div class="wrap">
      ${sampleBadge('Illustrations originales générées pour la démonstration. Les emplacements marqués « en attendant » montrent une photo d’illustration, à remplacer par une vraie photo avec l’accord du salon.')}
      <div class="chips" role="group" aria-label="Filtrer la galerie" id="g-filter" style="margin:1.5rem 0"><button class="chip" aria-pressed="true" data-v="">Tout</button>${types.map((t) => `<button class="chip" aria-pressed="false" data-v="${t}">${galleryTypeLabels[t]}</button>`).join('')}</div>
      <div class="gal-grid" id="g-grid">${gallery.map((g) => `<button class="gal-item${g.photoSlot ? ' slot' : ''}" data-type="${g.type}" data-id="${g.id}" aria-label="Agrandir : ${g.title}"><span class="vis">${visual(g)}</span><span class="cap">${g.title}</span></button>`).join('')}</div>
    </div>
  </section>
  <dialog class="lightbox" id="lb" aria-label="Image agrandie"><div class="lb-body"><div class="lb-head"><strong id="lb-t"></strong><button class="icon-btn" id="lb-x" aria-label="Fermer">${icon('x', 22)}</button></div><div id="lb-v"></div><p id="lb-a" class="muted"></p></div></dialog>
  ${ctaBand()}`)

  $$('#g-filter .chip').forEach((b) => b.addEventListener('click', () => {
    $$('#g-filter .chip').forEach((x) => x.setAttribute('aria-pressed', String(x === b)))
    $$('#g-grid .gal-item').forEach((it) => { it.hidden = !!b.dataset.v && it.dataset.type !== b.dataset.v })
  }))
  $$('#ph-filter .chip').forEach((b) => b.addEventListener('click', () => {
    $$('#ph-filter .chip').forEach((x) => x.setAttribute('aria-pressed', String(x === b)))
    $$('#ph-grid .ph-fig').forEach((it) => { it.hidden = !!b.dataset.v && it.dataset.cat !== b.dataset.v })
  }))
  const dlg = $<HTMLDialogElement>('#lb')!
  $$('#g-grid .gal-item').forEach((it) => it.addEventListener('click', () => {
    const g = gallery.find((x) => x.id === it.dataset.id)!
    $('#lb-t')!.textContent = typo(g.title)
    setHTML($('#lb-v')!, visual(g, true))
    $('#lb-a')!.textContent = typo(g.alt)
    dlg.showModal()
  }))
  $('#lb-x')!.addEventListener('click', () => dlg.close())
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close() })
})
