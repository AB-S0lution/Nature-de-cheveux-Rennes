// « Qui êtes-vous ? » : les quatre vraies questions du diagnostic visagiste, une par une, puis une fiche à la machine à écrire.
// Rien n'est enregistré ni envoyé : la fiche peut être copiée ou imprimée.
import { $, $$, esc, typo } from '../core/dom'
import { icon } from '../core/icons'
import { reduced } from '../core/motion'
import { gsap } from '../core/motion'

interface Q { id: string; q: string; short: string; options: string[]; multi?: boolean }

const questions: Q[] = [
  { id: 'qui', q: 'Qui êtes-vous ?', short: 'Qui êtes-vous', options: ['Plutôt discrète', 'Plutôt expressive', 'Un peu des deux', 'Je cherche encore'] },
  { id: 'aise', q: 'Êtes-vous à l’aise avec votre coiffure ?', short: 'À l’aise avec ma coiffure', options: ['Oui, je l’aime', 'À moitié', 'Pas vraiment', 'J’ai envie de changer'] },
  { id: 'perso', q: 'Vos cheveux reflètent-ils votre personnalité ?', short: 'Mes cheveux me ressemblent', options: ['Oui', 'En partie', 'Plus vraiment', 'Je ne sais pas'] },
  { id: 'routine', q: 'Quelles sont vos routines capillaires ?', short: 'Mes routines', options: ['Peu de temps le matin', 'J’aime prendre du temps', 'Produits naturels', 'Cheveux bouclés à entretenir', 'Je n’ai pas de routine'], multi: true },
]

function hint(answers: Record<string, string[]>): string[] {
  const out: string[] = []
  const r = answers.routine ?? []
  if (r.includes('Peu de temps le matin')) out.push('une coupe facile à vivre, qui se recoiffe en quelques gestes')
  if (r.includes('J’aime prendre du temps')) out.push('une coiffure qui se travaille, avec un brushing ou une mise en plis')
  if (r.includes('Produits naturels')) out.push('des produits bio, en vrac ou solides, à voir au salon')
  if (r.includes('Cheveux bouclés à entretenir')) out.push('une coupe sur cheveux secs, qui suit le mouvement de vos boucles')
  if ((answers.aise ?? [])[0] === 'J’ai envie de changer' || (answers.aise ?? [])[0] === 'Pas vraiment') out.push('un temps d’échange sur vos envies avant de couper')
  if ((answers.perso ?? [])[0] === 'Plus vraiment') out.push('un regard sur la forme de votre visage (visagisme)')
  if (!out.length) out.push('une coupe personnalisée, pensée avec vous')
  return out
}

export function mountVisagiste(host: HTMLElement): void {
  let step = 0
  const answers: Record<string, string[]> = {}

  function renderStep(): void {
    const q = questions[step]
    const sel = answers[q.id] ?? []
    host.innerHTML = typo(`
    <div class="diag-grid">
      <div>
        <div class="step-dots" aria-hidden="true">${questions.map((_, i) => `<i class="${i <= step ? 'on' : ''}"></i>`).join('')}</div>
        <fieldset class="q-step" style="border:0;padding:0;margin:0">
          <legend>${q.q}</legend>
          <p class="muted" style="margin:0 0 .5rem">Question ${step + 1} sur ${questions.length}${q.multi ? ' · plusieurs réponses possibles' : ''}</p>
          <div class="chips" role="${q.multi ? 'group' : 'radiogroup'}" aria-label="${q.q}">
            ${q.options.map((o) => `<button class="chip" type="button" ${q.multi ? 'aria-pressed' : 'role="radio" aria-checked'}="${sel.includes(o)}" data-v="${esc(o)}">${o}</button>`).join('')}
          </div>
        </fieldset>
        <div class="btn-row" style="margin-top:1.6rem">
          ${step > 0 ? `<button class="btn ghost small" type="button" data-nav="prev">${icon('arrowLeft', 18)}<span>Précédente</span></button>` : ''}
          <button class="btn small" type="button" data-nav="next"${sel.length ? '' : ' disabled style="opacity:.5"'}>${step === questions.length - 1 ? 'Voir ma fiche' : 'Suivante'}${icon('arrowRight', 18)}</button>
        </div>
      </div>
      ${card(false)}
    </div>`)
    $$('.chip', host).forEach((c) => c.addEventListener('click', () => {
      const v = c.dataset.v!
      if (q.multi) {
        const cur = new Set(answers[q.id] ?? [])
        if (cur.has(v)) cur.delete(v); else cur.add(v)
        answers[q.id] = [...cur]
      } else answers[q.id] = [v]
      renderStep()
      $$('.chip', host).find((x) => x.dataset.v === v)?.focus()
    }))
    $('[data-nav="next"]', host)?.addEventListener('click', () => { if (!(answers[q.id] ?? []).length) return; if (step === questions.length - 1) renderFinal(); else { step++; renderStep() } })
    $('[data-nav="prev"]', host)?.addEventListener('click', () => { step--; renderStep() })
  }

  function card(final: boolean): string {
    const lines = questions.filter((q) => (answers[q.id] ?? []).length).map((q) => `<p><strong>${q.short}</strong><br>→ ${answers[q.id].join(', ')}</p>`).join('')
    return `<div class="fiche tilt${final ? ' final' : ''}" ${final ? 'tabindex="-1"' : ''} data-fiche>
      <h3>Votre nature de cheveux</h3>
      ${lines || '<p class="muted">Vos réponses s’écriront ici, au fil des questions.</p>'}
      ${final ? `<p><strong>Pistes à discuter avec nous</strong></p><ul style="margin:0 0 .8rem;padding-left:1.1rem">${hint(answers).map((h) => `<li>${h}</li>`).join('')}</ul><p class="disclaimer">Cette fiche reste dans votre navigateur : rien n’est enregistré ni envoyé. Les pistes sont indicatives, le diagnostic se fait au salon.</p><p><em style="font-family:var(--font-display);font-size:1.3rem">Naturellement <b>VOTRE</b> coiffure.</em></p>
      <div class="btn-row no-print"><button class="btn small" type="button" data-act="copy">${icon('copy', 18)}<span>Copier</span></button><button class="btn ghost small" type="button" data-act="print">${icon('printer', 18)}<span>Imprimer</span></button><button class="btn ghost small" type="button" data-act="again">Recommencer</button></div>` : ''}
    </div>`
  }

  function renderFinal(): void {
    host.innerHTML = typo(`<div class="wrap-narrow" style="margin:0">${card(true)}</div><p class="sr" aria-live="polite">Votre fiche est prête.</p>`)
    const fiche = $('[data-fiche]', host)!
    fiche.focus()
    if (!reduced) {
      const paras = $$('p, li, h3', fiche)
      gsap.from(paras, { opacity: 0, y: 6, duration: 0.5, stagger: 0.12, ease: 'power2.out' })
    }
    $('[data-act="print"]', host)!.addEventListener('click', () => window.print())
    $('[data-act="again"]', host)!.addEventListener('click', () => { step = 0; for (const k of Object.keys(answers)) delete answers[k]; renderStep() })
    $('[data-act="copy"]', host)!.addEventListener('click', async (e) => {
      const text = ['VOTRE NATURE DE CHEVEUX', ...questions.filter((q) => (answers[q.id] ?? []).length).map((q) => `${q.short} : ${answers[q.id].join(', ')}`), 'Pistes : ' + hint(answers).join(' ; '), 'Naturellement VOTRE coiffure.'].join('\n')
      const btn = e.currentTarget as HTMLElement
      try { await navigator.clipboard.writeText(text); btn.querySelector('span')!.textContent = 'Copié' } catch { btn.querySelector('span')!.textContent = 'Copie impossible' }
    })
  }
  renderStep()
}
