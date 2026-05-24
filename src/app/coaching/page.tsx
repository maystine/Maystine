import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coaching WoW',
  description: 'Sessions de coaching World of Warcraft par Maystine — joueur pro Mandatory & Echo. Mythic+, Raid, UI/Addons, VOD Review.',
  openGraph: {
    title: 'Coaching WoW | Maystine',
    description: 'Sessions de coaching World of Warcraft par Maystine — joueur pro Mandatory & Echo.',
    url: 'https://maystine.vercel.app/coaching',
  },
}

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Coaching Mythic+',
    tag: 'Live 1-on-1',
    description: 'Analyse de ton gameplay en temps réel. Routes, comp, keybinds, positionnement — on casse les mauvaises habitudes et on optimise ta performance.',
    price: '50€',
    unit: '/ heure',
    color: '#a855f7',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="10 8 16 12 10 16 10 8"/>
      </svg>
    ),
    title: 'Coaching Raid',
    tag: 'Live 1-on-1',
    description: 'Optimisation de ton rôle en progression ou en farm. Placement, cooldowns, parsing — que tu vises le Cutting Edge ou le top parse.',
    price: '50€',
    unit: '/ heure',
    color: '#a855f7',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Coaching Débutant',
    tag: 'Toutes classes',
    description: 'Tu débutes ou tu reprends WoW ? On pose les bases : mécaniques, stats, spec, interface. Un accompagnement adapté à ton rythme.',
    price: '40€',
    unit: '/ heure',
    color: '#7c3aed',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: 'VOD / Logs Review',
    tag: 'Analyse écrite ou vocal',
    description: 'Tu m\'envoies ta VOD ou tes logs Warcraft Logs, je les analyse et te donne un retour détaillé sur ce qui te coûte de la performance.',
    price: '35€',
    unit: '/ session',
    color: '#7c3aed',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2"/>
        <path d="M7 12h10M12 7v10"/>
      </svg>
    ),
    title: 'Setup UI / Addons',
    tag: 'Config personnalisée',
    description: 'Installation et configuration de mes addons (WeakAuras, ElvUI, etc.) adaptés à ta classe et ton style de jeu. Interface optimale garantie.',
    price: '35€',
    unit: '/ session',
    color: '#7c3aed',
  },
]

const steps = [
  { num: '01', title: 'Contact Discord', text: 'Rejoins mon Discord et envoie-moi un DM. Dis-moi ce que tu veux travailler et ton niveau actuel.' },
  { num: '02', title: 'On cale un créneau', text: 'On convient ensemble d\'une date et d\'un horaire. Paiement à l\'avance via PayPal ou Stripe.' },
  { num: '03', title: 'Session en live', text: 'On se retrouve sur Discord. Je partage mon écran ou tu partages le tien selon le format choisi.' },
]

export default function CoachingPage() {
  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', position: 'relative', overflow: 'hidden' }}>

      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '-5%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(168, 85, 247, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 2rem 6rem' }}>

        {/* Header */}
        <div className="fade-up" style={{ marginBottom: '4rem', maxWidth: '640px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            borderRadius: '100px',
            border: '1px solid var(--border-glow)',
            backgroundColor: 'rgba(124, 58, 237, 0.08)',
            marginBottom: '1.25rem',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              backgroundColor: '#a855f7', boxShadow: '0 0 8px #a855f7',
              display: 'inline-block', animation: 'glowPulse 2s ease-in-out infinite',
            }} />
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-light)' }}>
              Joueur Pro · Mandatory · Echo
            </span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-cinzel), serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            letterSpacing: '0.08em',
            color: 'var(--text-bright)',
            marginBottom: '1rem',
            lineHeight: 1.1,
          }}>
            Coaching WoW
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8 }}>
            Des années de compétition MDI, Race to World First et Cutting Edge au sein de structures comme
            Mandatory et Echo. Je t&apos;aide à progresser avec la même exigence que le haut niveau — à ton rythme.
          </p>
        </div>

        {/* Services grid */}
        <div className="fade-up fade-up-delay-1" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}>
          {services.map((s) => (
            <div
              key={s.title}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-glow)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 24px rgba(124,58,237,0.12)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
              }}
            >
              {/* Icon */}
              <div style={{
                width: '52px', height: '52px', borderRadius: '10px',
                backgroundColor: `${s.color}18`,
                border: `1px solid ${s.color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: s.color,
              }}>
                {s.icon}
              </div>

              {/* Title + tag */}
              <div>
                <h2 style={{ fontSize: '1rem', marginBottom: '4px', letterSpacing: '0.04em' }}>{s.title}</h2>
                <span style={{
                  fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: s.color, opacity: 0.8,
                }}>{s.tag}</span>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
                {s.description}
              </p>

              {/* Price */}
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: '4px',
                paddingTop: '0.75rem', borderTop: '1px solid var(--border)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-cinzel), serif',
                  fontSize: '1.6rem', fontWeight: 700,
                  color: 'var(--text-bright)',
                }}>{s.price}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{s.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Offre combinée */}
        <div className="fade-up fade-up-delay-2" style={{
          marginBottom: '3rem',
          padding: '1.75rem 2rem',
          borderRadius: '12px',
          border: '1px solid var(--border-glow)',
          backgroundColor: 'rgba(124, 58, 237, 0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '8px',
            backgroundColor: 'rgba(168,85,247,0.15)',
            border: '1px solid rgba(168,85,247,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: '220px' }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-bright)', marginBottom: '4px' }}>
              Offre combinée — <span style={{ color: '#a855f7' }}>−15%</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Tu combines 2 services différents ? Je t&apos;offre 15% de réduction sur le total.
              Exemple : Coaching Mythic+ (50€) + VOD Review (35€) = <s style={{ opacity: 0.5 }}>85€</s>{' '}
              <strong style={{ color: 'var(--text-bright)' }}>72€</strong>.
            </p>
          </div>
        </div>

        {/* Comment ça se passe */}
        <div className="fade-up fade-up-delay-3" style={{ marginBottom: '3.5rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-cinzel), serif',
            fontSize: '1.1rem', letterSpacing: '0.08em',
            color: 'var(--text-secondary)', marginBottom: '1.5rem',
            textTransform: 'uppercase',
          }}>
            Comment ça se passe ?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {steps.map((step) => (
              <div key={step.num} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{
                  fontFamily: 'var(--font-cinzel), serif',
                  fontSize: '1.5rem', color: 'var(--border-glow)',
                  lineHeight: 1, flexShrink: 0, fontWeight: 700,
                }}>{step.num}</span>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-bright)', marginBottom: '4px' }}>{step.title}</div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="fade-up fade-up-delay-4" style={{ textAlign: 'center' }}>
          <a
            href="https://discord.gg/AnJ7x4jpGG"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
              color: '#fff',
              fontSize: '0.9rem',
              letterSpacing: '0.08em',
              fontWeight: 500,
              boxShadow: '0 0 32px rgba(124, 58, 237, 0.4)',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
            Réserver une session
          </a>
          <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--muted)' }}>
            Envoie-moi un DM sur Discord — je réponds sous 24h.
          </p>
        </div>

      </div>
    </div>
  )
}
