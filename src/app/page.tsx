import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Maystine — Joueur Pro WoW | Mandatory & Echo',
  description: 'Portfolio de Maystine, joueur professionnel World of Warcraft au sein de Mandatory et Echo. Addons, parcours esport et stream.',
  openGraph: {
    title: 'Maystine — Joueur Pro WoW',
    description: 'Joueur professionnel WoW, développeur d\'addons et streamer Twitch.',
    url: 'https://maystine.vercel.app',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', position: 'relative', overflow: 'hidden' }}>

      {/* Background arcane glow */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '30%',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        animation: 'glowPulse 6s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(168, 85, 247, 0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Main layout: centered hero */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '4rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: 'calc(100vh - 64px)',
        justifyContent: 'center',
      }}>

        {/* Name */}
        <h1
          className="fade-up fade-up-delay-1"
          style={{
            fontFamily: 'var(--font-caveat), cursive',
            fontSize: 'clamp(4rem, 8vw, 7rem)',
            lineHeight: 1.1,
            marginBottom: '1rem',
            paddingBottom: '0.1em',
            background: 'linear-gradient(135deg, #f0ecff 0%, #a855f7 60%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Maystine
        </h1>

        {/* Guild logos */}
        <div
          className="fade-up fade-up-delay-2"
          style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem', justifyContent: 'center' }}
        >
          <img src="/images/addons/mandatory-logo.png" alt="Mandatory" style={{ height: '24px', objectFit: 'contain', opacity: 0.8 }} />
          <span style={{ width: '1px', height: '16px', backgroundColor: 'var(--border-glow)' }} />
          <img src="/images/addons/echo-logo.png" alt="Echo" style={{ height: '24px', objectFit: 'contain', opacity: 0.8 }} />
        </div>

        {/* Description */}
        <p
          className="fade-up fade-up-delay-3"
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
            maxWidth: '520px',
            marginBottom: '2.5rem',
          }}
        >
          Joueur professionnel World of Warcraft au sein de la structure esport Mandatory et de la guilde Echo.
        </p>

        {/* CTA buttons */}
        <div
          className="fade-up fade-up-delay-4"
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <a
            href="/addons"
            className="btn-primary"
            style={{
              padding: '12px 28px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
              color: '#fff',
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              fontWeight: 500,
              boxShadow: '0 0 24px rgba(124, 58, 237, 0.4)',
              transition: 'all 0.2s ease',
              display: 'inline-block',
            }}
          >
            Voir les Addons
          </a>
          <a
            href="/parcours"
            className="btn-secondary"
            style={{
              padding: '12px 28px',
              borderRadius: '8px',
              border: '1px solid var(--border-glow)',
              backgroundColor: 'rgba(124, 58, 237, 0.06)',
              color: 'var(--text)',
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              transition: 'all 0.2s ease',
              display: 'inline-block',
            }}
          >
            Mon Parcours
          </a>
          <a
            href="/coaching"
            className="btn-secondary"
            style={{
              padding: '12px 28px',
              borderRadius: '8px',
              border: '1px solid var(--border-glow)',
              backgroundColor: 'rgba(124, 58, 237, 0.06)',
              color: 'var(--text)',
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              transition: 'all 0.2s ease',
              display: 'inline-block',
            }}
          >
            Coaching
          </a>
        </div>
      </div>
    </div>
  )
}
