import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coaching WoW',
  description: 'Sessions de coaching World of Warcraft par Maystine — joueur pro Mandatory & Echo.',
  openGraph: {
    title: 'Coaching WoW | Maystine',
    description: 'Sessions de coaching World of Warcraft par Maystine.',
    url: 'https://maystine.vercel.app/coaching',
  },
}

export default function CoachingPage() {
  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Coaching</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Page en construction — bientôt disponible.</p>
      </div>
    </div>
  )
}
