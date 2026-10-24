import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import DiscordIcon from '@/components/icons/DiscordIcon'
import * as ui from '@/components/coaching/ui'
import { signInWithDiscord } from '@/lib/auth-actions'

export const metadata: Metadata = {
  title: 'Espace élève',
  robots: { index: false },
}

export default async function ConnexionPage({ searchParams }: { searchParams: { error?: string } }) {
  const session = await auth()
  if (session?.user) redirect(session.user.isAdmin ? '/admin' : '/espace')

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', padding: 'clamp(4rem, 10vw, 7.5rem) 1rem' }}>
      <div aria-hidden style={{
        position: 'absolute', top: '15%', left: '50%', width: '600px', height: '600px', marginLeft: '-300px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.14) 0%, transparent 70%)', pointerEvents: 'none',
      }} />

      <div className="fade-up" style={{
        ...ui.card, position: 'relative', width: '100%', maxWidth: '440px', alignSelf: 'flex-start',
        padding: 'clamp(1.75rem, 5vw, 2.75rem)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', textAlign: 'center',
        boxShadow: '0 0 40px rgba(124, 58, 237, 0.12)',
      }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '14px',
          border: '1px solid var(--border-glow)', backgroundColor: 'rgba(124, 58, 237, 0.1)', color: 'var(--accent-light)',
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
          </svg>
        </span>
        <h1 style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: '1.75rem', letterSpacing: '0.08em', color: 'var(--text-bright)' }}>Espace élève</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
          Connecte-toi avec ton compte Discord pour retrouver tes objectifs, ton plan de travail et l&apos;historique de tes sessions.
        </p>

        {searchParams.error && (
          <p role="alert" style={{ ...ui.errorBox, width: '100%' }}>La connexion a échoué. Réessaie, et si ça persiste, préviens-moi sur Discord.</p>
        )}

        <form action={signInWithDiscord} style={{ width: '100%' }}>
          <input type="hidden" name="redirectTo" value="/espace" />
          <button type="submit" style={{ ...ui.discordButton, width: '100%' }}>
            <DiscordIcon size={18} />
            Se connecter avec Discord
          </button>
        </form>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Seuls ton pseudo et ton avatar Discord sont utilisés.</p>
        <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--border)' }} />
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Pas encore élève ? <Link href="/coaching" style={{ color: 'var(--accent-light)' }}>Réserve une session</Link>
        </p>
      </div>
    </div>
  )
}
