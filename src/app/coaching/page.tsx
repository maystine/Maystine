import type { Metadata } from 'next'
import { auth } from '@/auth'
import CoachingContent from './CoachingContent'

export const metadata: Metadata = {
  title: 'Coaching WoW',
  description: 'Réserve une session de coaching World of Warcraft avec Maystine — joueur pro Mandatory & Echo. VOD review, Mythic+ et suivi personnalisé.',
  openGraph: {
    title: 'Coaching WoW | Maystine',
    description: 'Sessions de coaching World of Warcraft par Maystine — joueur pro Mandatory & Echo.',
    url: 'https://maystine.vercel.app/coaching',
  },
}

export default async function CoachingPage() {
  const session = await auth()
  const user = session?.user
    ? { username: session.user.username, name: session.user.name ?? null, image: session.user.image ?? null }
    : null
  return <CoachingContent user={user} />
}
