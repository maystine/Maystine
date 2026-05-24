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

        {/* Badge */}
        <div
          className="fade-up fade-up-delay-1"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '100px',
            border: '1px solid var(--border-glow)',
            backgroundColor: 'rgba(124, 58, 237, 0.08)',
            marginBottom: '2rem',
          }}
        >
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#a855f7',
            boxShadow: '0 0 8px #a855f7',
            display: 'inline-block',
            animation: 'glowPulse 2s ease-in-out infinite',
          }} />
          <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-light)' }}>
            Joueur Pro · Mandatory · Echo
          </span>
        </div>

        {/* Name */}
        <h1
          className="fade-up fade-up-delay-2"
          style={{
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            lineHeight: 1.05,
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #f0ecff 0%, #a855f7 60%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Maystine
        </h1>

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
        </div>

        {/* Stats */}
        <div
          className="fade-up fade-up-delay-4"
          style={{
            display: 'flex',
            gap: '2.5rem',
            marginTop: '3.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border)',
          }}
        >
          {[
            { value: 'Pro', label: 'Joueur' },
            { value: 'CE', label: 'Cutting Edge' },
            { value: 'Echo', label: 'Guilde' },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{
                fontFamily: 'var(--font-cinzel), serif',
                fontSize: '1.6rem',
                color: 'var(--accent-light)',
                fontWeight: 600,
                lineHeight: 1,
                marginBottom: '4px',
              }}>{stat.value}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
