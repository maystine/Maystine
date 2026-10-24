'use server'

import { and, eq } from 'drizzle-orm'
import { auth } from '@/auth'
import { getDb, schema } from '@/lib/db'
import { cleanText, cleanUrl } from '@/lib/validation'

export type RequestState =
  | { status: 'idle' }
  | { status: 'error'; message: string }
  | { status: 'success'; recap: string }

export async function submitCoachingRequest(_prev: RequestState, formData: FormData): Promise<RequestState> {
  // Connexion Discord obligatoire : bloque les bots et les envois anonymes.
  const session = await auth()
  if (!session?.user?.discordId) {
    return { status: 'error', message: 'Connecte-toi avec Discord pour envoyer ta demande.' }
  }

  const character = cleanText(formData.get('character'), 40)
  const realm = cleanText(formData.get('realm'), 40)
  const spec = cleanText(formData.get('spec'), 40)
  const goal = cleanText(formData.get('goal'), 1500)
  const vodUrl = cleanUrl(formData.get('vodUrl'))
  const logsUrl = cleanUrl(formData.get('logsUrl'))

  if (!character || !realm || !spec) {
    return { status: 'error', message: 'Renseigne ton personnage, ton serveur et ta spé.' }
  }
  if (vodUrl === null || logsUrl === null) {
    return { status: 'error', message: 'Un des liens est invalide : colle une adresse complète commençant par https://' }
  }

  const { discordId, username, image } = session.user
  const db = getDb()

  // Une seule demande en attente par compte Discord.
  const pending = await db
    .select({ id: schema.coachingRequests.id })
    .from(schema.coachingRequests)
    .where(and(eq(schema.coachingRequests.discordId, discordId), eq(schema.coachingRequests.status, 'new')))
    .limit(1)
  if (pending.length > 0) {
    return {
      status: 'error',
      message: 'Tu as déjà une demande en attente. Je reviens vers toi sur Discord dès que possible.',
    }
  }

  await db.insert(schema.coachingRequests).values({
    discordId,
    discordUsername: username,
    discordAvatar: image ?? null,
    character,
    realm,
    spec,
    goal,
    vodUrl: vodUrl || null,
    logsUrl: logsUrl || null,
  })

  const recap = [
    `Demande de coaching — @${username}`,
    `Perso : ${character} (${realm}) · ${spec}`,
    goal ? `Objectif : ${goal}` : null,
    vodUrl ? `VOD : ${vodUrl}` : null,
    logsUrl ? `Logs : ${logsUrl}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  await notifyCoach(recap)

  return { status: 'success', recap }
}

/** Ping optionnel sur un salon Discord privé via webhook (COACHING_WEBHOOK_URL). */
async function notifyCoach(recap: string) {
  const url = process.env.COACHING_WEBHOOK_URL
  if (!url) return
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `**Nouvelle demande de coaching**\n${recap}`.slice(0, 1900),
        allowed_mentions: { parse: [] },
      }),
    })
  } catch (err) {
    console.error('Webhook coaching injoignable', err)
  }
}
