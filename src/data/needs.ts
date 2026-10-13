// DONNÉES D'EXEMPLE : entrées « Je viens pour… » (liens vers les pages réelles du site).
export interface NeedEntry {
  id: string
  label: string
  blurb: string
  href: string
  plant: string
}

export const needs: NeedEntry[] = [
  { id: 'blancs', label: 'cheveux blancs', blurb: 'Couverture à 100 % avec la coloration minérale, ou cuivre intense au henné.', href: 'coloration-vegetale/#mineral', plant: '#A8432A' },
  { id: 'boucles', label: 'cheveux bouclés', blurb: 'Coupe sur cheveux secs, produits dédiés, geste doux.', href: 'cheveux-boucles/', plant: '#1E2A55' },
  { id: 'vegetal', label: 'passer au végétal', blurb: 'Un appel ou un diagnostic, puis la couleur préparée devant vous.', href: 'coloration-vegetale/', plant: '#C99A3B' },
  { id: 'sensible', label: 'cuir chevelu sensible', blurb: 'Soin aux argiles, algues et huiles bio, shampooing en vrac.', href: 'prestations/#soins', plant: '#4E7A5A' },
  { id: 'ressemble', label: 'une coupe qui me ressemble', blurb: 'Le diagnostic visagiste : quatre questions, une coupe sur mesure.', href: 'visagiste/', plant: '#504090' },
  { id: 'enfant', label: 'mon enfant', blurb: 'De la première coupe à l’adolescence, en douceur.', href: 'prestations/#enfants', plant: '#CE2A57' },
]
