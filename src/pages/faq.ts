import { boot } from '../core/boot'
import { pageHero, ctaBand, sampleBadge } from '../core/ui'
import { setHTML, $, typo, normalize } from '../core/dom'
import { icon } from '../core/icons'
import { faqs } from '../data/faq'

void boot((main) => {
  setHTML(main, `
  ${pageHero({ title: 'Questions fréquentes', lead: 'Coloration végétale, première visite, réservation, annulation, don de cheveux, accès.', dye: 'violette', photo: 'bocaux-plantes' })}
  <section class="section"><div class="wrap-narrow">
    ${sampleBadge('Réponses rédigées à partir des informations publiques du salon ; à relire avec lui.')}
    <div class="toolbar" style="margin-top:1.5rem"><div class="search"><span class="ico">${icon('search', 18)}</span><input class="input" id="f-q" type="search" placeholder="Rechercher une question" aria-label="Rechercher une question"></div></div>
    <p class="mono muted" id="f-count" role="status" aria-live="polite"></p>
    <div class="faq-list" id="f-list"></div>
  </div></section>
  ${ctaBand({ title: 'Une autre question ?', text: 'Appelez le salon : nous répondons volontiers.' })}`)
  const render = (q: string) => {
    const n = normalize(q)
    const list = faqs.filter((f) => !n || normalize(f.q + ' ' + f.a).includes(n))
    $('#f-count')!.textContent = typo(`${list.length} question${list.length > 1 ? 's' : ''}`)
    setHTML($('#f-list')!, list.length ? list.map((f) => `<details><summary><span><span class="topic">${f.topic}</span>${f.q}</span>${icon('caretDown', 20)}</summary><div class="ans">${f.a}</div></details>`).join('') : '<p class="empty">Aucune question ne correspond.</p>')
  }
  $<HTMLInputElement>('#f-q')!.addEventListener('input', (e) => render((e.target as HTMLInputElement).value))
  render('')
})
