import '../style.css'
import { $ } from './dom'
import { renderChrome } from './layout'
import { initMotion, refreshAll } from './motion'

/** Démarre une page : en-tête/pied, contenu, puis mouvement une fois les polices prêtes. */
export async function boot(render: (main: HTMLElement) => void | Promise<void>): Promise<void> {
  renderChrome()
  const main = $('#main')!
  await render(main)
  try { await document.fonts.ready } catch { /* ignoré */ }
  initMotion()
  refreshAll()
  window.addEventListener('load', refreshAll)
}
