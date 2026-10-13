import { photoImg, photoFig } from '../core/ui'
import { photos, photo } from '../data/photos'
import { boot } from '../core/boot'
import { pageHero, ctaBand, sampleBadge } from '../core/ui'
import { setHTML, $, $$, typo, normalize } from '../core/dom'
import { icon } from '../core/icons'
import { products, brands, formatLabels, needLabels, type Format, type Need } from '../data/products'
import { vrac } from '../data/vrac'
import { labels } from '../data/salon'

const prodPhotos = photos.filter((p) => ['produits', 'soins', 'plantes'].includes(p.category))

void boot((main) => {
  setHTML(main, `
  ${pageHero({ title: 'Les produits', lead: 'Cosmétiques bio, en vrac et solides, vendus au salon uniquement. Aucune vente en ligne ni livraison.', dye: 'sauge', photo: 'bol-poudre-table' })}

  <section class="section tint-mint" data-dye="sauge" id="vrac">
    <div class="wrap">
      <h2 data-split>La station de vrac</h2>
      <div class="two-col wide-left" style="align-items:center"><p class="lead">Venez avec votre flacon : quatre pompes Couleurs Gaïa, quatre usages. Les prix de recharge ne sont pas publiés ici.</p>${photoFig(photo('flacon-ambre'), 'ph-landscape')}</div>
      <div class="vrac-station" style="margin-top:2rem">${vrac.map((v) => `<div class="vrac-box" data-reveal><span class="pump" aria-hidden="true"></span><span class="etiquette">${v.name}</span><p><strong>${v.type}</strong></p><p>${v.hairNeed}</p></div>`).join('')}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <h2 data-split>Le catalogue</h2>
      ${sampleBadge('Catalogue d’exemple : gammes réelles des marques du salon, prix indicatifs et disponibilité à confirmer au salon.')}
      <div class="toolbar" style="margin-top:1.5rem">
        <div class="search"><span class="ico">${icon('search', 18)}</span><input class="input" id="p-q" type="search" placeholder="Rechercher un produit" aria-label="Rechercher un produit"></div>
        <div class="chips" role="group" aria-label="Marque" id="f-brand"><button class="chip" aria-pressed="true" data-v="">Toutes les marques</button>${brands.map((b) => `<button class="chip" aria-pressed="false" data-v="${b}">${b}</button>`).join('')}</div>
        <div class="chips" role="group" aria-label="Format" id="f-format"><button class="chip" aria-pressed="true" data-v="">Tous formats</button>${(Object.keys(formatLabels) as Format[]).map((f) => `<button class="chip" aria-pressed="false" data-v="${f}">${formatLabels[f]}</button>`).join('')}</div>
        <div class="chips" role="group" aria-label="Besoin" id="f-need"><button class="chip" aria-pressed="true" data-v="">Tous besoins</button>${(Object.keys(needLabels) as Need[]).map((n) => `<button class="chip" aria-pressed="false" data-v="${n}">${needLabels[n]}</button>`).join('')}</div>
      </div>
      <p class="mono muted" id="p-count" role="status" aria-live="polite"></p>
      <div class="prod-grid" id="p-grid"></div>
    </div>
  </section>

  <section class="section tint-indigo" data-dye="violette">
    <div class="wrap">
      <h2 data-split>Les marques</h2>
      <div class="grid-3" style="margin-top:2rem">${brands.map((b) => `<article class="stack" data-reveal><h3>${b}</h3><p style="color:#C9D6EA">${products.filter((p) => p.brand === b).length} références dans ce catalogue d’exemple.</p></article>`).join('')}</div>
      <h3 style="margin-top:2.5rem">Badges affichés par le salon</h3>
      <div class="badge-row" style="margin-top:.8rem">${labels.filter((l) => l.id === 'cosmos').map((l) => `<span class="badge" style="border-color:#fff">${icon('leaf', 18)}${l.title}</span>`).join('')}</div>
    </div>
  </section>
  ${ctaBand({ title: 'Un conseil produit ?', text: 'Demandez-nous au salon ou par téléphone : nous vous orienterons selon vos cheveux.' })}`)

  const st = { q: '', brand: '', format: '', need: '' }
  const grid = $('#p-grid')!
  const render = () => {
    const q = normalize(st.q)
    const list = products.filter((p) => (!st.brand || p.brand === st.brand) && (!st.format || p.format === st.format) && (!st.need || p.need === st.need) && (!q || normalize(`${p.name} ${p.type} ${p.brand}`).includes(q)))
    $('#p-count')!.textContent = typo(`${list.length} produit${list.length > 1 ? 's' : ''}`)
    setHTML(grid, list.length ? list.map((p, i) => `<article class="prod"><div class="ph-thumb">${photoImg(prodPhotos[i % prodPhotos.length])}<span class="ph-tag">Photo d’illustration</span></div><span class="brand">${p.brand}</span><h3>${p.name}</h3><p class="type">${p.type} · ${formatLabels[p.format]}</p>${p.price !== null ? `<p class="price">${p.price} € <small>(prix indicatif)</small></p>` : '<p class="note">Prix au salon</p>'}<p class="note">${p.stockStatus === 'vu-en-salon' ? 'Vu au salon' : 'Gamme de la marque'}, en salon uniquement${p.confirm ? ' · à confirmer' : ''}</p></article>`).join('') : '<p class="empty">Aucun produit ne correspond à cette recherche.</p>')
  }
  const group = (id: string, key: 'brand' | 'format' | 'need') => {
    $$('.chip', $(id)!).forEach((b) => b.addEventListener('click', () => {
      st[key] = b.dataset.v ?? ''
      $$('.chip', $(id)!).forEach((x) => x.setAttribute('aria-pressed', String(x === b)))
      render()
    }))
  }
  group('#f-brand', 'brand'); group('#f-format', 'format'); group('#f-need', 'need')
  $<HTMLInputElement>('#p-q')!.addEventListener('input', (e) => { st.q = (e.target as HTMLInputElement).value; render() })
  render()
})
