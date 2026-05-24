import type { Metadata } from 'next'
import CoachingContent from './CoachingContent'

export const metadata: Metadata = {
  title: 'Coaching WoW',
  description: 'Sessions de coaching World of Warcraft par Maystine — joueur pro Mandatory & Echo. Mythic+, Raid, UI/Addons, VOD Review.',
  openGraph: {
    title: 'Coaching WoW | Maystine',
    description: 'Sessions de coaching World of Warcraft par Maystine — joueur pro Mandatory & Echo.',
    url: 'https://maystine.vercel.app/coaching',
  },
}

export default function CoachingPage() {
  return <CoachingContent />
}
