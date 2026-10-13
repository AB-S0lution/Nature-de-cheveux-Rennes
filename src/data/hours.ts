// DONNÉES RÉELLES : horaires affichés sur la vitrine du salon (vérifiés sur plusieurs sources).
export interface DayHours {
  day: number // 0 = dimanche (convention JS)
  label: string
  open: string | null // "09:00"
  close: string | null
  note?: string
}

export const hours: DayHours[] = [
  { day: 1, label: 'Lundi', open: null, close: null },
  { day: 2, label: 'Mardi', open: '09:00', close: '18:30' },
  { day: 3, label: 'Mercredi', open: '09:00', close: '12:00', note: 'Fermé l’après-midi' },
  { day: 4, label: 'Jeudi', open: '09:00', close: '18:30' },
  { day: 5, label: 'Vendredi', open: '09:00', close: '19:00' },
  { day: 6, label: 'Samedi', open: '08:00', close: '17:00' },
  { day: 0, label: 'Dimanche', open: null, close: null },
]

// TODO : fermetures exceptionnelles (jours fériés, congés) à demander au salon.
export const exceptions: { date: string; label: string }[] = []

export interface OpenStatus {
  open: boolean
  text: string
  todayLabel: string
}

const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3))
const fmt = (t: string) => t.replace(':', ' h ').replace(' h 00', ' h')

export function openStatus(now = new Date()): OpenStatus {
  const parts = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(now)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const name = get('weekday')
  const minutes = Number(get('hour')) * 60 + Number(get('minute'))
  const today = hours.find((h) => h.label.toLowerCase() === name) ?? hours[0]
  if (today.open && today.close && minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    return { open: true, text: `Ouvert maintenant, jusqu’à ${fmt(today.close)}`, todayLabel: today.label }
  }
  // prochaine ouverture
  const order = [1, 2, 3, 4, 5, 6, 0]
  const idx = order.indexOf(today.day)
  for (let i = 0; i < 8; i++) {
    const d = hours.find((h) => h.day === order[(idx + i) % 7])!
    if (!d.open) continue
    if (i === 0 && minutes >= toMin(d.open)) continue
    const when = i === 0 ? 'aujourd’hui' : i === 1 ? 'demain' : d.label.toLowerCase()
    return { open: false, text: `Fermé maintenant, ouverture ${when} à ${fmt(d.open)}`, todayLabel: today.label }
  }
  return { open: false, text: 'Fermé maintenant', todayLabel: today.label }
}

export const hoursSummary = 'Mar., jeu. 9 h à 18 h 30 · mer. 9 h à 12 h · ven. 9 h à 19 h · sam. 8 h à 17 h'
