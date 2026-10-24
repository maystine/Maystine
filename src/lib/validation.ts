/** Petits utilitaires de validation partagés par les actions serveur. */

export function cleanText(value: FormDataEntryValue | null, max: number): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

/** Renvoie l'URL si elle est en http(s), une chaîne vide si le champ est vide, ou null si elle est invalide. */
export function cleanUrl(value: FormDataEntryValue | null): string | null {
  const raw = cleanText(value, 500)
  if (!raw) return ''
  try {
    const url = new URL(raw)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null
    return url.toString()
  } catch {
    return null
  }
}
