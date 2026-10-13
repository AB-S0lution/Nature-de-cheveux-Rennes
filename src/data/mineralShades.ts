// Codes RÉELS du nuancier Mineral Colours (Rodolphe & Co). Teintes hex = APPROXIMATIONS D'EXEMPLE.
// Nuancier du fabricant, à titre indicatif ; le salon personnalise chaque mélange.
export type MineralGroup = 'base' | 'pigment' | 'ton' | 'patine'

export interface MineralShade {
  code: string
  group: MineralGroup
  name?: string
  hex: string
  source: string
}

const source = 'https://rodolphe-co.com/pro/produits/nuancier-mineral-colours'

export const mineralShades: MineralShade[] = [
  // 7 bases 3.0 à 9.0
  { code: '3.0', group: 'base', hex: '#3B2A22', source },
  { code: '4.0', group: 'base', hex: '#52392B', source },
  { code: '5.0', group: 'base', hex: '#6B4A37', source },
  { code: '6.0', group: 'base', hex: '#85603F', source },
  { code: '7.0', group: 'base', hex: '#A07B50', source },
  { code: '8.0', group: 'base', hex: '#BC9A68', source },
  { code: '9.0', group: 'base', hex: '#D4BA8B', source },
  // 3 pigments purs
  { code: 'Lazurite', group: 'pigment', name: 'Bleu', hex: '#2C4A9A', source },
  { code: 'Gold', group: 'pigment', name: 'Or', hex: '#C99A2E', source },
  { code: 'Ruby', group: 'pigment', name: 'Rouge', hex: '#A8203A', source },
  // 16 tons
  { code: '4.77', group: 'ton', hex: '#4A2D35', source },
  { code: '6.77', group: 'ton', hex: '#7A4A55', source },
  { code: '7.73', group: 'ton', hex: '#9A6A58', source },
  { code: '4.4', group: 'ton', hex: '#6A3A26', source },
  { code: '6.4', group: 'ton', hex: '#8E5232', source },
  { code: '8.4', group: 'ton', hex: '#B87848', source },
  { code: '6.43', group: 'ton', hex: '#8A5030', source },
  { code: '4.3', group: 'ton', hex: '#5A3A20', source },
  { code: '6.3', group: 'ton', hex: '#8A6330', source },
  { code: '8.3', group: 'ton', hex: '#B8904A', source },
  { code: '5.35', group: 'ton', hex: '#704428', source },
  { code: '4.6', group: 'ton', hex: '#5E2A28', source },
  { code: '6.6', group: 'ton', hex: '#8A3E30', source },
  { code: '4.1', group: 'ton', hex: '#443C3A', source },
  { code: '6.1', group: 'ton', hex: '#6E6560', source },
  { code: '8.1', group: 'ton', hex: '#A39B94', source },
  // 3 patines
  { code: '11.11', group: 'patine', hex: '#C9CDD4', source },
  { code: '11.22', group: 'patine', hex: '#D6CCE0', source },
  { code: '11.33', group: 'patine', hex: '#E3DBC4', source },
]

export const mineralGroups: { id: MineralGroup; label: string }[] = [
  { id: 'base', label: 'Bases' },
  { id: 'pigment', label: 'Pigments purs' },
  { id: 'ton', label: 'Tons' },
  { id: 'patine', label: 'Patines' },
]
