// Panneau d'horaires « autocollant de vitrine » : jour courant en évidence, « Ouvert / Fermé maintenant » (Europe/Paris).
import { hours, openStatus } from '../data/hours'
import { typo } from '../core/dom'

const fmt = (t: string) => t.replace(':', ' h ').replace(' h 00', ' h')

export function hoursTable(): string {
  const st = openStatus()
  return `<div class="hours-panel" data-hours>
    <h3>Horaires du salon</h3>
    <table class="hours-table"><caption class="sr">Horaires d’ouverture</caption><tbody>
      ${hours.map((h) => `<tr class="${h.label === st.todayLabel ? 'today' : ''}"><th scope="row">${h.label}</th><td>${h.open ? `${fmt(h.open)} à ${fmt(h.close!)}` : 'Fermé'}${h.note ? `<br><small>${h.note}</small>` : ''}</td></tr>`).join('')}
    </tbody></table>
    <p class="open-pill" data-open="${st.open}" role="status">${st.text}</p>
  </div>`
}

export function openPill(): string {
  const st = openStatus()
  return `<p class="open-pill" data-open="${st.open}" data-live-open role="status">${st.text}</p>`
}

/** Met à jour tous les statuts d'ouverture de la page chaque minute. */
export function liveOpen(root: ParentNode = document): void {
  const tick = () => {
    const st = openStatus()
    root.querySelectorAll<HTMLElement>('.open-pill').forEach((el) => { el.dataset.open = String(st.open); el.textContent = typo(st.text) })
    root.querySelectorAll<HTMLElement>('.hours-table tr').forEach((tr) => tr.classList.toggle('today', tr.querySelector('th')?.textContent === st.todayLabel))
  }
  tick()
  window.setInterval(tick, 60000)
}
