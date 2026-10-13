import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

// GitHub Pages project site: https://ab-s0lution.github.io/Nature-de-cheveux-Rennes/
const root = __dirname
const skip = new Set(['node_modules', 'dist', '.git', '.github', 'public', 'src', 'scripts'])

function htmlInputs(dir = root, out: Record<string, string> = {}) {
  for (const name of readdirSync(dir)) {
    if (skip.has(name)) continue
    const full = join(dir, name)
    if (statSync(full).isDirectory()) htmlInputs(full, out)
    else if (name === 'index.html') out[dir === root ? 'index' : dir.slice(root.length + 1)] = full
  }
  return out
}

// Vite retire blocking="render" des scripts module ; on le remet pour les View Transitions
// entre documents (le contenu est rendu par le module, la capture doit l'attendre).
const blockingRender = (): Plugin => ({
  name: 'blocking-render',
  enforce: 'post',
  generateBundle(_o, bundle) {
    for (const f of Object.values(bundle)) {
      if (f.type === 'asset' && f.fileName.endsWith('.html') && typeof f.source === 'string') {
        f.source = f.source.replace(/<script type="module"( crossorigin)?/g, '<script type="module" blocking="render"$1')
      }
    }
  },
})

export default defineConfig({
  base: '/Nature-de-cheveux-Rennes/',
  plugins: [tailwindcss(), blockingRender()],
  build: { rollupOptions: { input: htmlInputs() } },
  resolve: { alias: { '@': resolve(root, 'src') } },
  preview: { port: 4181 },
})
