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

      {/* Main layout: Hero left + Twitch right */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 2rem',
        display: 'grid',
        gridTemplateColumns: '1fr 480px',
        gap: '4rem',
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px)',
      }}>

        {/* LEFT — Hero content */}
        <div>
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
              Addon Developer · World of Warcraft
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
              maxWidth: '480px',
              marginBottom: '2.5rem',
            }}
          >
            Développeur d'addons World of Warcraft & streamer. Je crée des outils pour optimiser ton gameplay — des cooldowns aux WeakAuras.
          </p>

          {/* CTA buttons */}
          <div
            className="fade-up fade-up-delay-4"
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <a
              href="/addons"
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
              { value: '3+', label: 'Addons publiés' },
              { value: 'CE', label: 'Cutting Edge' },
              { value: 'M+', label: 'Haut niveau' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: 'Cinzel, serif',
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

        {/* RIGHT — Twitch Embed */}
        <div
          className="fade-up fade-up-delay-3"
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--border-glow)',
            boxShadow: '0 0 48px rgba(124, 58, 237, 0.2)',
            backgroundColor: '#000',
            animation: 'float 6s ease-in-out infinite',
          }}
        >
          {/* Twitch header */}
          <div style={{
            padding: '10px 16px',
            backgroundColor: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent-light)">
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
            </svg>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '0.08em' }}>
              twitch.tv/<span style={{ color: 'var(--accent-light)' }}>Maystine</span>
            </span>
          </div>

          {/* Iframe */}
          <iframe
            src="https://player.twitch.tv/?channel=Maystine&parent=maystine-cxlj8xltw-maystines-projects.vercel.app"
            height="270"
            width="100%"
            style={{ display: 'block' }}
            allowFullScreen
          />

          {/* Chat */}
          <iframe
            src="https://www.twitch.tv/embed/Maystine/chat?parent=maystine-cxlj8xltw-maystines-projects.vercel.app&darkpopout"
            height="220"
            width="100%"
            style={{ display: 'block', borderTop: '1px solid var(--border)' }}
          />
        </div>
      </div>
    </div>
  )
}
