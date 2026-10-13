// Plan schématique du Bourg de Cesson-Sévigné. Position approximative, non à l'échelle.
import { salon } from '../data/salon'

export function mapSvg(): string {
  return `<div class="map-box">
  <svg viewBox="0 0 600 400" role="img" aria-label="Plan schématique du Bourg : le salon rue du Calvaire, l’église Saint-Martin, la place du Marché, la Vilaine et la gare">
    <rect width="600" height="400" fill="var(--paper-2)"/>
    <path d="M-10 70 C 120 40, 200 120, 320 90 S 520 40, 610 90 L 610 130 C 520 90, 420 150, 320 135 S 130 90, -10 115 Z" fill="#7FC9DA" opacity=".55"/>
    <text x="30" y="60" font-family="'Courier Prime', monospace" font-size="13" fill="var(--ink)" font-style="italic">la Vilaine</text>
    <path d="M180 400 C 190 300, 240 240, 300 205 S 420 150, 470 120" stroke="var(--line)" stroke-width="16" fill="none" stroke-linecap="round"/>
    <path d="M60 280 L 560 300" stroke="var(--line)" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path d="M300 205 L 300 400" stroke="var(--line)" stroke-width="10" fill="none" stroke-linecap="round"/>
    <text x="140" y="372" font-family="'Courier Prime', monospace" font-size="12" fill="var(--ink-soft)" transform="rotate(-62 140 372)">rue du Calvaire</text>
    <g font-family="'Courier Prime', monospace" font-size="13" fill="var(--ink)">
      <rect x="352" y="224" width="26" height="26" rx="3" fill="var(--indigo)"/><path d="M365 214 l-6 10 h12 z" fill="var(--indigo)"/>
      <text x="386" y="242">église Saint-Martin</text>
      <rect x="402" y="288" width="64" height="22" rx="3" fill="var(--feuille)" opacity=".85"/><text x="410" y="304" fill="#fff" font-size="11">marché</text>
      <rect x="62" y="322" width="70" height="26" rx="3" fill="var(--violette)"/><text x="68" y="339" fill="#fff" font-size="11">gare TER</text>
    </g>
    <g transform="translate(262 236)">
      <circle r="22" fill="var(--framboise)" opacity=".22"/><circle r="11" fill="var(--framboise)" stroke="#fff" stroke-width="3"/>
    </g>
    <text x="236" y="283" font-family="'Courier Prime', monospace" font-size="14" font-weight="700" fill="var(--ink)">Nature de cheveux</text>
  </svg>
  <p class="cap">Plan schématique, non à l’échelle. Position approximative (${salon.geo.lat.toFixed(4)}, ${salon.geo.lng.toFixed(4)}). <a class="link" href="${salon.mapsUrl}" target="_blank" rel="noopener">Ouvrir dans Google Maps</a></p>
</div>`
}

export const vilaineWave = `<svg class="vilaine" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40 C 150 0, 300 80, 450 40 S 750 0, 900 40 S 1100 70, 1200 30 L1200 80 L0 80 Z" fill="currentColor" opacity=".22"/><path d="M0 40 C 150 0, 300 80, 450 40 S 750 0, 900 40 S 1100 70, 1200 30" fill="none" stroke="currentColor" stroke-width="3"/></svg>`
