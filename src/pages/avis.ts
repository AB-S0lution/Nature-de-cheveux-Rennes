import { boot } from '../core/boot'
import { pageHero, ctaBand } from '../core/ui'
import { setHTML, $, $$, typo } from '../core/dom'
import { icon } from '../core/icons'
import { ratings, googleDistribution } from '../data/ratings'
import { publicQuotes, themeLabels, type QuoteTheme } from '../data/quotes'
import { salon } from '../data/salon'

void boot((main) => {
  const total = googleDistribution.reduce((a, b) => a + b.count, 0)
  setHTML(main, `
  ${pageHero({ title: 'Avis', lead: '4,7/5 sur 99 avis Google (octobre 2026). Les mots des clientes, tels qu’ils ont été écrits, avec la plateforme et la date.', dye: 'framboise', photo: 'boucles-mur-rose' })}
  <section class="section">
    <div class="wrap">
      <h2 data-split>Les notes</h2>
      <div class="grid-3" style="margin-top:1.5rem">${ratings.map((r) => `<article class="book-card" data-reveal><h3>${r.platform}</h3><p class="headline-italic">${String(r.score).replace('.', ',')}/${r.outOf}</p><p>${r.count} · ${r.date}</p>${r.note ? `<p class="muted">${r.note}</p>` : ''}</article>`).join('')}</div>
      <h3 style="margin-top:2.5rem">Répartition des avis Google</h3>
      <div class="stack" style="margin-top:1rem;max-width:520px">${googleDistribution.map((d) => `<div style="display:grid;grid-template-columns:3rem 1fr 3rem;gap:.6rem;align-items:center" class="mono"><span>${d.stars} ★</span><span style="background:var(--paper-2);border-radius:99px;height:10px;overflow:hidden"><i style="display:block;height:100%;width:${Math.round((d.count / total) * 100)}%;background:var(--framboise)"></i></span><span>${d.count}</span></div>`).join('')}</div>
    </div>
  </section>
  <section class="section tint-mint" data-dye="teal">
    <div class="wrap">
      <h2 data-split>Ce que disent les clientes</h2>
      <div class="chips" role="group" aria-label="Filtrer par thème" id="a-f" style="margin:1.5rem 0"><button class="chip" aria-pressed="true" data-v="">Tous</button>${(Object.keys(themeLabels) as QuoteTheme[]).map((t) => `<button class="chip" aria-pressed="false" data-v="${t}">${themeLabels[t]}</button>`).join('')}</div>
      <p class="mono muted" id="a-count" role="status" aria-live="polite"></p>
      <div class="grid-3" id="a-grid"></div>
    </div>
  </section>
  <section class="section">
    <div class="wrap two-col">
      <div class="stack"><h2 data-split>Laisser un avis</h2><p>Vous êtes venue au salon ? Votre avis aide d’autres personnes à choisir.</p><a class="btn" data-magnetic href="${salon.mapsUrl}" target="_blank" rel="noopener">Ouvrir la fiche sur Google Maps${icon('arrowUpRight', 18)}</a></div>
      <p class="note-box">Lien direct vers le formulaire d’avis Google : à obtenir auprès du salon. En attendant, le bouton ouvre la recherche Google Maps du salon.</p>
    </div>
  </section>
  ${ctaBand()}`)
  const render = (t: string) => {
    const list = publicQuotes.filter((q) => !t || q.themes.includes(t as QuoteTheme))
    $('#a-count')!.textContent = typo(`${list.length} avis`)
    setHTML($('#a-grid')!, list.map((q) => `<figure class="owner-q"><blockquote>« ${q.text} »</blockquote><figcaption>Avis ${q.platform}${q.stars ? `, ${q.stars}/5` : ''}, ${q.date}</figcaption></figure>`).join(''))
  }
  $$('#a-f .chip').forEach((b) => b.addEventListener('click', () => { $$('#a-f .chip').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); render(b.dataset.v ?? '') }))
  render('')
})
