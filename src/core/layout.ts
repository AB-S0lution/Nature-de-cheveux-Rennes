// En-tête, menu, pied de page et fil de mèche communs à toutes les pages.
import { salon } from '../data/salon'
import { hoursSummary } from '../data/hours'
import { icon } from './icons'
import { $, $$, setHTML, typo, u } from './dom'

interface NavItem { href: string; label: string; primary?: boolean }

export const nav: NavItem[] = [
  { href: 'le-salon/', label: 'Le salon', primary: true },
  { href: 'prestations/', label: 'Prestations', primary: true },
  { href: 'coloration-vegetale/', label: 'Coloration végétale', primary: true },
  { href: 'cheveux-boucles/', label: 'Cheveux bouclés', primary: true },
  { href: 'visagiste/', label: 'Visagiste' },
  { href: 'produits/', label: 'Produits', primary: true },
  { href: 'engagements/', label: 'Engagements', primary: true },
  { href: 'galerie/', label: 'Galerie' },
  { href: 'journal/', label: 'Journal', primary: true },
  { href: 'avis/', label: 'Avis' },
  { href: 'faq/', label: 'Questions fréquentes' },
  { href: 'infos-pratiques/', label: 'Infos pratiques', primary: true },
]

const legal: NavItem[] = [
  { href: 'mentions-legales/', label: 'Mentions légales' },
  { href: 'confidentialite/', label: 'Confidentialité' },
  { href: 'accessibilite/', label: 'Accessibilité' },
  { href: 'cgv-resume/', label: 'Conditions de réservation' },
]

function current(): string {
  const p = location.pathname.replace(u(), '')
  return p.split('/')[0]
}

const wordmark = (cls = '') => `<a class="wordmark ${cls}" href="${u()}" aria-label="Nature de cheveux, accueil"><b>Nature</b> <em>de</em> <b>cheveux</b></a>`

function link(n: NavItem, i?: number): string {
  const cur = current() === n.href.replace('/', '')
  return `<a href="${u(n.href)}"${cur ? ' aria-current="page"' : ''}${i !== undefined ? ` style="--i:${i}"` : ''}>${n.label}</a>`
}

export function renderChrome(): void {
  const header = $('#site-header')!
  header.innerHTML = typo(`
  <header class="site-header" id="top">
    <div class="wrap">
      ${wordmark()}
      <nav class="nav" aria-label="Navigation principale">${nav.filter((n) => n.primary).map((n) => link(n)).join('')}</nav>
      <div class="header-tools">
        <a class="header-phone btn ghost small" href="${salon.phone.tel}">${icon('phone', 18)}<span>${salon.phone.display}</span></a>
        <a class="btn small" data-magnetic href="${u('reserver/')}">Réserver</a>
        <button class="icon-btn theme-toggle" type="button" aria-label="Changer de thème (clair ou sombre)"><span class="sun">${icon('sun')}</span><span class="moon">${icon('moon')}</span></button>
        <button class="icon-btn burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="menu">${icon('list', 22)}</button>
      </div>
    </div>
  </header>
  <div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu" inert>
    <div class="menu-top">${wordmark()}<button class="icon-btn menu-close" type="button" aria-label="Fermer le menu">${icon('x', 22)}</button></div>
    <nav aria-label="Menu complet">${nav.map((n, i) => link(n, i)).join('')}<a href="${u('reserver/')}" style="--i:${nav.length}"${current() === 'reserver' ? ' aria-current="page"' : ''}>Réserver</a></nav>
    <p class="menu-foot">${salon.address.street}, ${salon.address.postalCode} ${salon.address.city}<br><a href="${salon.phone.tel}">${salon.phone.display}</a></p>
  </div>
  <div class="strand-progress" aria-hidden="true"><svg preserveAspectRatio="none"><path id="strand-path" d=""/></svg></div>
  <a class="btn sticky-cta" href="${salon.phone.tel}" aria-label="Appeler le salon">${icon('phone', 18)}<span>Appeler</span></a>`)

  $('#site-footer')!.innerHTML = typo(`
  <footer class="footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          ${wordmark()}
          <p class="slogan">${salon.slogan.replace('VOTRE', '<em>VOTRE</em>')}</p>
          <p>${salon.address.street}<br>${salon.address.postalCode} ${salon.address.city} <span lang="br">(${salon.address.place})</span><br><span class="muted" style="color:#AFC2DE">Rennes Métropole, aux portes de Rennes</span></p>
        </div>
        <div>
          <h2>Venir, appeler</h2>
          <ul>
            <li><a href="${salon.phone.tel}">${salon.phone.display}</a></li>
            <li><a href="${u('infos-pratiques/')}">Horaires et accès</a></li>
            <li><a href="${salon.mapsUrl}" rel="noopener" target="_blank">Itinéraire sur Google Maps</a></li>
            <li><a href="${salon.instagram}" rel="noopener" target="_blank">Instagram @naturedecheveux</a></li>
          </ul>
          <p style="font-size:.9rem;margin-top:1rem;color:#C9D6EA">${hoursSummary}. Fermé lundi et dimanche.</p>
        </div>
        <div>
          <h2>Le salon</h2>
          <ul>${nav.slice(0, 6).map((n) => `<li>${link(n)}</li>`).join('')}</ul>
        </div>
        <div>
          <h2>Plus</h2>
          <ul>${nav.slice(6).map((n) => `<li>${link(n)}</li>`).join('')}<li><a href="${u('reserver/')}">Réserver</a></li></ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>Labellisé Ecocert Établissement bien-être durable, 3 étoiles, en 2024. Prix RSE de l’UNEC 2024.</p>
        <p>${legal.map((n) => link(n)).join(' · ')}</p>
        <p>Site de démonstration réalisé par AB Solution, non officiel. Les informations réelles (adresse, horaires, tarifs de janvier 2026) viennent du salon ; le reste est un exemple.</p>
      </div>
    </div>
  </footer>`)

  initHeader()
}

function initHeader(): void {
  const header = $('.site-header')!
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  // Thème : clair ou sombre, mémorisé si le navigateur l'autorise.
  const toggle = $('.theme-toggle')!
  toggle.addEventListener('click', () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark' || (!document.documentElement.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches)
    const next = dark ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem('ndc-theme', next) } catch { /* stockage indisponible */ }
  })

  // Menu plein écran
  const menu = $('#menu')!
  const burger = $('.burger')!
  const open = (state: boolean) => {
    menu.classList.toggle('open', state)
    if (state) menu.removeAttribute('inert'); else menu.setAttribute('inert', '')
    burger.setAttribute('aria-expanded', String(state))
    document.documentElement.classList.toggle('menu-open', state)
    document.body.style.overflow = state ? 'hidden' : ''
    if (state) $('.menu-close')!.focus(); else burger.focus()
  }
  burger.addEventListener('click', () => open(true))
  $('.menu-close')!.addEventListener('click', () => open(false))
  menu.addEventListener('keydown', (e) => { if ((e as KeyboardEvent).key === 'Escape') open(false) })
  $$('a', menu).forEach((a) => a.addEventListener('click', () => open(false)))
}

/** Remplit un conteneur avec du HTML typographié. */
export function render(main: HTMLElement, html: string): void {
  setHTML(main, html)
}
