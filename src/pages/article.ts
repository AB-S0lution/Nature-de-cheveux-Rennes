import { boot } from '../core/boot'
import { pageHero, ctaBand, postCard, sampleBadge } from '../core/ui'
import { setHTML, fmtDate, u } from '../core/dom'
import { icon } from '../core/icons'
import { posts, postBySlug } from '../data/posts'

void boot((main) => {
  const slug = document.body.dataset.slug ?? ''
  const p = postBySlug(slug)
  if (!p) {
    setHTML(main, `${pageHero({ title: 'Article introuvable', lead: 'Cet article n’existe pas.', crumb: 'Journal' })}<section class="section"><div class="wrap"><a class="link" href="${u('journal/')}">Retour au journal</a></div></section>`)
    return
  }
  const related = posts.filter((x) => x.slug !== p.slug && (x.category === p.category || x.tags.some((t) => p.tags.includes(t)))).slice(0, 3)
  setHTML(main, `
  <section class="page-hero" data-dye="teal"><div class="wrap article-head">
    <p class="crumb"><a href="${u()}">Accueil</a> / <a href="${u('journal/')}">Journal</a> / ${p.category}</p>
    <h1 data-split>${p.title}</h1>
    <p class="lead" data-reveal>${p.excerpt}</p>
    <p class="mono muted">${fmtDate(p.date)} · ${p.minutes} min de lecture · ${p.author}</p>
  </div></section>
  <section class="section"><div class="wrap-narrow">
    ${sampleBadge('Article d’exemple, rédigé pour la démonstration.')}
    <div class="article-body prose">${p.sections.map((s) => `${s.h ? `<h2>${s.h}</h2>` : ''}<p>${s.p}</p>`).join('')}</div>
    <div class="badge-row" style="margin-top:2rem">${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
    <p style="margin-top:2rem"><a class="link" href="${u('journal/')}">${icon('arrowLeft', 18)}Tous les articles</a></p>
  </div></section>
  ${related.length ? `<section class="section tint-mint"><div class="wrap"><h2 data-split>À lire aussi</h2><div class="cards" style="margin-top:1.5rem">${related.map((r, i) => postCard(r, i)).join('')}</div></div></section>` : ''}
  ${ctaBand()}`)
})
