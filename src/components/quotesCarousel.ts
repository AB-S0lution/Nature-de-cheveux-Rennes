// Citations réelles : une grande à la fois, avec plateforme et date. Pas de lecture automatique sous mouvement réduit.
import { publicQuotes, featuredQuoteIds, type Quote } from '../data/quotes'
import { ratings } from '../data/ratings'
import { $, typo } from '../core/dom'
import { icon } from '../core/icons'
import { reduced, gsap } from '../core/motion'

export function mountQuotes(host: HTMLElement): void {
  const list: Quote[] = featuredQuoteIds.map((id) => publicQuotes.find((q) => q.id === id)).filter((q): q is Quote => !!q)
  let i = 0
  let playing = !reduced
  let timer: number | undefined
  const g = ratings.filter((r) => r.platform === 'Google' || r.platform.startsWith('Couleurs'))
  host.innerHTML = typo(`
  <div class="quote-stage">
    <div role="group" aria-roledescription="carrousel" aria-label="Citations d’avis clients">
      <blockquote style="margin:0">
        <p class="q-main" data-q></p>
        <footer class="q-meta" data-meta></footer>
      </blockquote>
    </div>
    <div class="q-progress" aria-hidden="true"><i></i></div>
    <div class="q-ctrl">
      <button class="icon-btn" type="button" data-act="prev" aria-label="Citation précédente">${icon('arrowLeft')}</button>
      <button class="icon-btn" type="button" data-act="next" aria-label="Citation suivante">${icon('arrowRight')}</button>
      <button class="icon-btn" type="button" data-act="play" aria-label="${playing ? 'Mettre en pause' : 'Lancer le défilement'}">${icon(playing ? 'pause' : 'play')}</button>
      <span class="q-meta" data-count></span>
    </div>
    <div class="rating-strip">
      ${g.map((r) => `<span><b>${String(r.score).replace('.', ',')}</b>${r.platform.startsWith('Couleurs') ? 'Couleurs Gaïa' : r.platform} · ${r.count}${r.headline ? ' (' + r.date + ')' : ''}</span>`).join('')}
    </div>
  </div>`)
  const q = $('[data-q]', host)!
  const meta = $('[data-meta]', host)!
  const count = $('[data-count]', host)!
  const bar = $<HTMLElement>('.q-progress i', host)!
  const playBtn = $('[data-act="play"]', host)!

  function show(n: number, animate = true): void {
    i = (n + list.length) % list.length
    const cur = list[i]
    const apply = () => {
      q.textContent = typo(`« ${cur.text} »`)
      q.classList.toggle('long', cur.text.length > 110)
      meta.textContent = `Avis ${cur.platform}, ${cur.date}${cur.stars ? ', ' + cur.stars + ' étoiles' : ''}`
      count.textContent = `${i + 1} / ${list.length}`
    }
    if (reduced || !animate) { apply() } else {
      gsap.to(q, { opacity: 0, y: -10, duration: 0.2, onComplete: () => { apply(); gsap.fromTo(q, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }) } })
    }
    restart()
  }
  function restart(): void {
    window.clearTimeout(timer)
    gsap.killTweensOf(bar)
    gsap.set(bar, { scaleX: 0 })
    if (playing) {
      gsap.to(bar, { scaleX: 1, duration: 8, ease: 'none' })
      timer = window.setTimeout(() => show(i + 1), 8000)
    }
  }
  host.addEventListener('click', (e) => {
    const act = (e.target as HTMLElement).closest<HTMLElement>('[data-act]')?.dataset.act
    if (act === 'next') show(i + 1)
    if (act === 'prev') show(i - 1)
    if (act === 'play') {
      playing = !playing
      playBtn.setAttribute('aria-label', playing ? 'Mettre en pause' : 'Lancer le défilement')
      playBtn.innerHTML = icon(playing ? 'pause' : 'play')
      restart()
    }
  })
  host.addEventListener('focusin', () => { if (playing) { playing = false; playBtn.innerHTML = icon('play'); playBtn.setAttribute('aria-label', 'Lancer le défilement'); restart() } })
  show(0, false)
}
