// Génère les fichiers HTML (un par page) à partir de scripts/pages.mjs.
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pages } from './pages.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://ab-s0lution.github.io/Nature-de-cheveux-Rennes/'

const posts = [...readFileSync(join(root, 'src/data/posts.ts'), 'utf8').matchAll(/slug: '([a-z0-9-]+)'[\s\S]*?title: '((?:[^'\\]|\\.)*)'/g)]
  .map((m) => ({ slug: m[1], title: m[2].replace(/\\'/g, '’') }))

const jsonld = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'HairSalon',
  name: 'Nature de cheveux',
  url: 'https://www.naturedecheveux.com/',
  telephone: '+33299839009',
  priceRange: '€€',
  slogan: 'Naturellement VOTRE coiffure.',
  foundingDate: '2011-11-22',
  address: { '@type': 'PostalAddress', streetAddress: '3 bis rue du Calvaire', postalCode: '35510', addressLocality: 'Cesson-Sévigné', addressCountry: 'FR' },
  geo: { '@type': 'GeoCoordinates', latitude: 48.11698, longitude: -1.605175 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Thursday'], opens: '09:00', closes: '18:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '09:00', closes: '12:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '09:00', closes: '19:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '17:00' },
  ],
  sameAs: ['https://www.instagram.com/naturedecheveux/'],
})

function esc(s) { return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;') }

function html({ path, module, title, desc, jsonld: withLd, slug }) {
  const depth = path ? path.split('/').length : 0
  const full = path ? `${esc(title)} | Nature de cheveux` : `${esc(title)} | Nature de cheveux`
  const url = SITE + (path ? path + '/' : '')
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>${full}</title>
    <meta name="description" content="${esc(desc)}" />
    <meta name="theme-color" media="(prefers-color-scheme: light)" content="#F1F4F1" />
    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0D1730" />
    <meta name="color-scheme" content="light dark" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="og:site_name" content="Nature de cheveux" />
    <meta property="og:title" content="${full}" />
    <meta property="og:description" content="${esc(desc)}" />
    <meta property="og:url" content="${url}" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <script>
      (function () {
        var d = document.documentElement;
        try { var t = localStorage.getItem('ndc-theme'); if (t === 'dark' || t === 'light') d.setAttribute('data-theme', t); } catch (e) {}
        var m = window.matchMedia;
        var reduce = m && m('(prefers-reduced-motion: reduce)').matches;
        var lite = reduce || (navigator.connection && navigator.connection.saveData) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);
        d.classList.add(reduce ? 'reduce' : 'full');
        if (!reduce) d.classList.add('js-motion');
        if (lite) d.classList.add('lite');
      })();
    </script>${withLd ? `\n    <script type="application/ld+json">${jsonld}</script>` : ''}
  </head>
  <body data-page="${module}"${slug ? ` data-slug="${slug}"` : ''}>
    <a class="skip" href="#main">Aller au contenu</a>
    <div id="site-header"></div>
    <main id="main" tabindex="-1"></main>
    <div id="site-footer"></div>
    <noscript>
      <p style="padding:2rem;max-width:40rem;margin:auto">Nature de cheveux, coiffeur bio et coloriste végétal, 3 bis rue du Calvaire, 35510 Cesson-Sévigné. Téléphone : 02&nbsp;99&nbsp;83&nbsp;90&nbsp;09. Ce site demande JavaScript pour afficher son contenu.</p>
    </noscript>
    <script type="module" src="${'/src/pages/' + module + '.ts'}"></script>
  </body>
</html>
`
}

function write(rel, content) {
  const f = join(root, rel)
  mkdirSync(dirname(f), { recursive: true })
  writeFileSync(f, content)
}

for (const p of pages) write(p.path ? `${p.path}/index.html` : 'index.html', html(p))
for (const post of posts) {
  write(`journal/${post.slug}/index.html`, html({ path: `journal/${post.slug}`, module: 'article', title: post.title, desc: `Journal de Nature de cheveux : ${post.title}`, slug: post.slug }))
}
console.log(`${pages.length} pages + ${posts.length} articles`)
