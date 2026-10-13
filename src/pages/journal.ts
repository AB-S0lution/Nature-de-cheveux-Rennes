import { boot } from '../core/boot'
import { pageHero, ctaBand, postCard, sampleBadge } from '../core/ui'
import { setHTML, $, $$, typo, normalize } from '../core/dom'
import { icon } from '../core/icons'
import { posts, postCategories } from '../data/posts'

void boot((main) => {
  setHTML(main, `
  ${pageHero({ title: 'Journal', lead: 'Plantes, boucles, don de cheveux, vrac et vie du salon.', dye: 'indigo' })}
  <section class="section">
    <div class="wrap">
      ${sampleBadge('Articles d’exemple, rédigés pour la démonstration : ils ne sont pas signés par le salon.')}
      <div class="toolbar" style="margin-top:1.5rem">
        <div class="search"><span class="ico">${icon('search', 18)}</span><input class="input" id="j-q" type="search" placeholder="Rechercher un article" aria-label="Rechercher un article"></div>
        <div class="chips" role="group" aria-label="Catégorie" id="j-cat"><button class="chip" aria-pressed="true" data-v="">Tous</button>${postCategories.map((c) => `<button class="chip" aria-pressed="false" data-v="${c}">${c}</button>`).join('')}</div>
      </div>
      <p class="mono muted" id="j-count" role="status" aria-live="polite"></p>
      <div class="cards" id="j-grid"></div>
    </div>
  </section>
  ${ctaBand()}`)
  const st = { q: '', cat: '' }
  const render = () => {
    const q = normalize(st.q)
    const list = posts.filter((p) => (!st.cat || p.category === st.cat) && (!q || normalize(`${p.title} ${p.excerpt} ${p.tags.join(' ')}`).includes(q)))
    $('#j-count')!.textContent = typo(`${list.length} article${list.length > 1 ? 's' : ''}`)
    setHTML($('#j-grid')!, list.length ? list.map((p, i) => postCard(p, i)).join('') : '<p class="empty">Aucun article ne correspond.</p>')
  }
  $$('#j-cat .chip').forEach((b) => b.addEventListener('click', () => { st.cat = b.dataset.v ?? ''; $$('#j-cat .chip').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); render() }))
  $<HTMLInputElement>('#j-q')!.addEventListener('input', (e) => { st.q = (e.target as HTMLInputElement).value; render() })
  render()
})
