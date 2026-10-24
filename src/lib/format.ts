const TZ = 'Europe/Paris'

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/** « mercredi 28 octobre · 20:00 » */
export function formatSessionDateTime(date: Date): string {
  const day = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: TZ }).format(date)
  const time = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: TZ }).format(date)
  return capitalize(`${day} · ${time}`)
}

/** « 28 oct. 2026 » à partir d'une date SQL (YYYY-MM-DD) ou d'un Date. */
export function formatShortDate(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(`${value}T12:00:00Z`) : value
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: TZ }).format(date)
}

function parisParts(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ, hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00'
  return { year: get('year'), month: get('month'), day: get('day'), hour: get('hour') === '24' ? '00' : get('hour'), minute: get('minute') }
}

/** Convertit une date + heure saisies à l'heure de Paris (champs date/time) en instant UTC. */
export function parisLocalToDate(date: string, time: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) return null
  const guess = new Date(`${date}T${time}:00Z`)
  if (Number.isNaN(guess.getTime())) return null
  const p = parisParts(guess)
  const parisAsUtc = Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), Number(p.hour), Number(p.minute))
  return new Date(guess.getTime() - (parisAsUtc - guess.getTime()))
}

/** Valeurs par défaut des champs date/time (heure de Paris) pour un instant donné. */
export function dateToParisInputs(date: Date | null): { date: string; time: string } {
  if (!date) return { date: '', time: '' }
  const p = parisParts(date)
  return { date: `${p.year}-${p.month}-${p.day}`, time: `${p.hour}:${p.minute}` }
}

/** « octobre 2026 » */
export function formatMonthYear(date: Date): string {
  return capitalize(new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: TZ }).format(date))
}
