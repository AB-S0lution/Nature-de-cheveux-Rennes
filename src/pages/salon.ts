import { boot } from '../core/boot'
import { salon } from '../data/salon'
import { timeline } from '../data/timeline'
import { ownerQuotes } from '../data/ownerQuotes'
import { team, lineage } from '../data/team'
import { pageHero, ctaBand } from '../core/ui'
import { setHTML, u } from '../core/dom'
import { photoFig } from '../core/ui'
import { photo } from '../data/photos'
import { icon } from '../core/icons'
import { pigmentSvg } from '../core/art'

const press = [
  { name: 'Le CIM, magazine de Cesson-Sévigné', date: '1er juin 2024', url: 'https://www.ville-cesson-sevigne.fr/wp-content/uploads/2025/06/Cim-du-1er-juin-2024.pdf' },
  { name: 'Enercoop Bretagne', date: '26 juin 2024', url: 'http://web.archive.org/web/20260214200441/https://www.enercoop.fr/blog/actualites/bretagne/nature-de-cheveux-a-choisi-enercoop' },
  { name: 'Profession Bien-Être', date: '16 juillet 2024', url: 'https://www.professionbienetre.fr/coiffure/le-premier-salon-de-coiffure-eco-responsable-labellise-ecocert/' },
  { name: 'Biblond', date: '1er août 2024', url: 'https://www.biblond.com/environnement-nature-de-cheveux-le-premier-salon-bien-etre-durable/' },
  { name: 'UNEC, Prix RSE 2024', date: '29 avril 2025', url: 'https://unec.fr/wp-content/uploads/2025/06/cp-prix-rse-de-lunec-2024-1.pdf' },
]

void boot((main) => {
  setHTML(main, `
  ${pageHero({ title: 'Le salon', lead: 'Un salon de village, ouvert en 2011 par Yohann Hubert : de la haute coiffure dans une ambiance chaleureuse, décontractée et apaisante.', dye: 'teal' })}

  <section class="section tint-mint" data-dye="henne">
    <div class="wrap two-col wide-left">
      <div>
        <h2 data-split>Depuis 2011</h2>
        <ol class="timeline">${timeline.map((t) => `<li data-reveal><span class="yr">${t.year}</span><h3>${t.title}</h3><p>${t.text}</p>${t.selfReported ? '<span class="self">selon le salon</span>' : ''}</li>`).join('')}</ol>
      </div>
      <aside class="stack" style="position:sticky;top:calc(var(--header-h) + 1.5rem)">
        <div class="photo-slot"><!-- TODO: photo réelle de la devanture, avec l'accord du salon -->Emplacement photo : devanture du salon<br>à fournir avec l’accord du salon</div>
        <p class="muted mono" style="font-size:.88rem">${salon.address.street}, ${salon.address.postalCode} ${salon.address.city}. Dans le Bourg, à environ 50 m de l’église Saint-Martin.</p>
      </aside>
    </div>
  </section>

  <section class="section" data-dye="teal" aria-labelledby="ambiance-t">
    <div class="wrap">
      <h2 id="ambiance-t" data-split>Une ambiance, en <em>images</em></h2>
      <p class="lead" style="margin-bottom:2rem">Le calme d’un salon de village, des plantes, des gestes précis. Photos d’illustration, pas des photos du salon.</p>
      <div class="ph-mosaic">${['salon-comptoir', 'salon-bacs', 'outils-brosses', 'herbes-sechees-mur', 'bocaux-herbes', 'coupe-ciseaux', 'bol-fleurs-sechees', 'salon-brique', 'mortier'].map((s) => photoFig(photo(s))).join('')}</div>
    </div>
  </section>

  <section class="section" data-dye="indigo">
    <div class="wrap">
      <h2 data-split>Les mots de Yohann</h2>
      <p class="lead">Extraits de la presse, avec le média et la date.</p>
      <div style="margin-top:2rem">${ownerQuotes.map((q) => `<figure class="owner-q" data-reveal><blockquote>« ${q.text} »</blockquote><figcaption>Yohann Hubert, ${q.outlet}, ${q.date}${q.url ? ` · <a href="${q.url}" rel="noopener" target="_blank">lire la source</a>` : ''}</figcaption></figure>`).join('')}</div>
    </div>
  </section>

  <section class="section tint-leaf" data-dye="feuille">
    <div class="wrap">
      <h2 data-split>L’équipe</h2>
      <p class="lead">Une petite équipe de trois à cinq personnes, qui se forme en continu. Seuls les rôles sont indiqués ici : la composition de l’équipe 2026 reste à confirmer avec le salon.</p>
      <div class="team-grid" style="margin-top:2rem">${team.map((t) => `<article class="team-card" data-reveal style="background:rgb(255 255 255 / .1);border-color:rgb(255 255 255 / .3)"><h3>${t.name ?? t.role}</h3>${t.name ? `<p><strong>${t.role}</strong></p>` : ''}<p style="color:#E4F0DE">${t.text}</p></article>`).join('')}</div>
      <h3 style="margin-top:3rem">Formation</h3>
      <ul style="max-width:65ch">${lineage.map((l) => `<li>${l}</li>`).join('')}</ul>
    </div>
  </section>

  <section class="section" data-dye="framboise" id="rejoindre">
    <div class="wrap two-col">
      <div class="stack">
        <h2 data-split>Rejoindre l’équipe</h2>
        <p class="lead">Le salon forme ses apprenties en brevet professionnel sur place, et figure sur missioncoiffeur.fr.</p>
        <p>Selon le salon et la presse : un plan de formation individuel, un intéressement et des horaires pensés pour la vie de famille. Aucune offre d’emploi n’est publiée ici ; pour en parler, appelez le salon.</p>
        <a class="btn ghost" href="${salon.phone.tel}">${icon('phone', 18)}<span>${salon.phone.display}</span></a>
      </div>
      <div class="note-box"><p><strong>À noter.</strong> Ce site est une démonstration. Le salon n’a pas encore confirmé la liste de son équipe 2026 : aucun prénom, nom de famille ni portrait n’est affiché.</p></div>
    </div>
  </section>

  <section class="section tint-mint" data-dye="curcuma">
    <div class="wrap">
      <h2 data-split>Le lieu</h2>
      <div class="two-col wide-left" style="margin-top:2rem">
        <div class="stack">
          <p class="lead">Des miroirs dorés, un fauteuil de barbier d’époque, du mobilier de seconde main, un mur de bocaux de poudres sur des étagères en métal noir, beaucoup de plantes vertes.</p>
          <p>Les murs accueillent une grande fresque aquarellée. Sur ce site, elle n’est pas reproduite : nos illustrations sont originales, en attendant des photos réelles, avec l’accord du salon.</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
          <div class="photo-slot">Emplacement photo : miroirs dorés et fauteuil de barbier</div>
          <div class="photo-slot">Emplacement photo : mur de bocaux de poudres</div>
          <div style="grid-column:1/-1;border-radius:var(--r-card);overflow:hidden;aspect-ratio:16/6">${pigmentSvg({ colors: ['#009CBB', '#504090', '#CE2A57'], seed: 14, id: 'lieu', label: 'Lavis d’encre grise et bleutée', mist: true })}</div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" data-dye="teal">
    <div class="wrap">
      <h2 data-split>Dans la presse</h2>
      <ul class="stack" style="list-style:none;padding:0;margin-top:1.5rem">${press.map((p) => `<li data-reveal style="display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;border-top:1px solid var(--line);padding-top:1rem"><a class="link" href="${p.url}" target="_blank" rel="noopener">${p.name}${icon('arrowUpRight', 18)}</a><span class="mono">${p.date}</span></li>`).join('')}</ul>
      <p class="muted" style="margin-top:1.5rem;max-width:70ch">Label Ecocert obtenu en 2024 ; sa validité actuelle reste à confirmer avec le salon.</p>
      <p><a class="link" href="${u('engagements/')}">Voir les engagements${icon('arrowRight', 18)}</a></p>
    </div>
  </section>
  ${ctaBand()}`)
})
