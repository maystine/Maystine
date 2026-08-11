import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Parcours Esport',
  description: 'Résultats compétitifs de Maystine — MDI, The Great Push, Race to World First depuis Shadowlands.',
  openGraph: {
    title: 'Parcours Esport | Maystine',
    description: 'MDI, The Great Push, Race to World First — tous les résultats depuis Shadowlands.',
    url: 'https://maystine.vercel.app/parcours',
  },
}

const expansions = [
  {
    name: 'Midnight',
    image: '/images/addons/midnight.png',
    years: '2026 – …',
    color: '#a855f7',
    seasons: [
      {
        season: 'Saison 1',
        results: [
          { place: 2,  label: 'Race to World First - March on Quel\'Danas', boss: "/images/addons/L'ura.png" },
        ],
      },
    ],
  },
  {
    name: 'The War Within',
    image: '/images/addons/thewarwithin.png',
    years: '2024 – 2025',
    color: '#b45309',
    seasons: [
      {
        season: 'Saison 3',
        results: [
          { place: 4,  label: 'MDI Global Final' },
          { place: 2,  label: 'Race to World First - Manaforge Omega', boss: '/images/addons/Dimensius.png' },
        ],
      },
      {
        season: 'Saison 2',
        results: [
          { place: 2,  label: 'MDI Global Final' },
          { place: 2,  label: 'Race to World First - Liberation Of Undermine', boss: '/images/addons/Gallywix.png' },
        ],
      },
      {
        season: 'Saison 1',
        results: [
          { place: 1,  label: 'TGP Global Final' },
          { place: 1,  label: 'MDI Global Final' },
          { place: 2,  label: 'Race to World First - Nerub-ar Palace', boss: '/images/addons/Queen Ansurek.png' },
        ],
      },
    ],
  },
  {
    name: 'Dragonflight',
    image: '/images/addons/dragonflight.png',
    years: '2023 – 2024',
    color: '#f59e0b',
    seasons: [
      {
        season: 'Saison 4',
        results: [
          { place: 2,  label: 'TGP Global Final' },
        ],
      },
      {
        season: 'Saison 3',
        results: [
          { place: 1,  label: 'MDI Global Final' },
          { place: 1,  label: 'Race to World First - Amirdrassil, the Dream\'s Hope', boss: '/images/addons/Fyrakk.png' },
        ],
      },
      {
        season: 'Saison 2',
        results: [
          { place: 6,  label: 'TGP Global Final' },
          { place: 2,  label: 'Race to World First - Aberrus, the Shadowed Crucible', boss: '/images/addons/Sarkareth.png' },
        ],
      },
      {
        season: 'Saison 1',
        results: [
          { place: 2,  label: 'MDI Global Final' },
        ],
      },
    ],
  },
  {
    name: 'Shadowlands',
    image: '/images/addons/shadowland.png',
    years: '2020 – 2022',
    color: '#6b7fd7',
    seasons: [
      {
        season: 'Saison 4',
        results: [
          { place: 2,  label: 'TGP Global Final' },
          { place: 2,  label: 'TGP EU Qualifier' },
        ],
      },
      {
        season: 'Saison 3',
        results: [
          { place: 2,  label: 'MDI Global Final' },
          { place: 1,  label: 'MDI Group B' },
        ],
      },
      {
        season: 'Saison 2',
        results: [
          { place: 6,  label: 'The Great Push' },
        ],
      },
      {
        season: 'Saison 1',
        results: [
          { place: 1,  label: 'The Great Push' },
          { place: 8,  label: 'MDI Global Final' },
        ],
      },
    ],
  },
]

function placeBadge(place: number) {
  const config: Record<number, { label: string; bg: string; color: string }> = {
    1: { label: '1st', bg: 'rgba(234,179,8,0.15)',  color: '#facc15' },
    2: { label: '2nd', bg: 'rgba(148,163,184,0.15)', color: '#cbd5e1' },
    3: { label: '3rd', bg: 'rgba(180,83,9,0.15)',   color: '#d97706' },
  }
  const c = config[place] ?? { label: `${place}th`, bg: 'rgba(124,58,237,0.12)', color: 'var(--text-secondary)' }
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '42px',
      padding: '2px 8px',
      borderRadius: '4px',
      backgroundColor: c.bg,
      color: c.color,
      fontWeight: 600,
      fontSize: '0.75rem',
      letterSpacing: '0.04em',
      flexShrink: 0,
    }}>
      {c.label}
    </span>
  )
}

export default function ParcoursPage() {
  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', padding: '5rem 2rem 4rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* Header */}
        <div className="fade-up" style={{ marginBottom: '3.5rem' }}>
          <h1 style={{
            fontFamily: 'var(--font-cinzel), serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            letterSpacing: '0.08em',
            color: 'var(--text-bright)',
            marginBottom: '0.75rem',
          }}>
            Parcours Esport
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '520px', lineHeight: 1.7 }}>
            Compétitions Mythic+ & Race to World First depuis mes débuts.
          </p>
        </div>

        {/* Expansions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {expansions.map((exp, i) => (
            <div
              key={exp.name}
              className={`fade-up fade-up-delay-${Math.min(i + 1, 4)}`}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderLeft: `3px solid ${exp.color}`,
                borderRadius: '10px',
                overflow: 'visible',
              }}
            >
              {/* Expansion header */}
              <div style={{
                padding: '1.1rem 1.5rem',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={exp.image}
                    alt={exp.name}
                    style={{ height: '60px', width: 'auto', display: 'block', objectFit: 'contain' }}
                  />
                  <h2 style={{
                    fontFamily: 'var(--font-cinzel), serif',
                    fontSize: '1.3rem',
                    letterSpacing: '0.1em',
                    color: exp.color,
                    fontWeight: 600,
                  }}>
                    {exp.name}
                  </h2>
                </div>
                <span style={{
                  fontSize: '0.8rem',
                  color: '#bdbadb',
                  letterSpacing: '0.06em',
                  flexShrink: 0,
                }}>
                  {exp.years}
                </span>
              </div>

              {/* Seasons */}
              <div style={{ padding: '0.75rem 0' }}>
                {exp.seasons.map((s, si) => (
                  <div
                    key={s.season}
                    style={{
                      position: 'relative',
                      padding: '0.5rem 0',
                      borderBottom: si < exp.seasons.length - 1 ? '1px solid rgba(30,27,51,0.6)' : 'none',
                    }}
                  >
                    <div style={{
                      padding: '0.25rem 1.5rem',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: exp.color,
                      opacity: 0.85,
                    }}>
                      {s.season}
                    </div>
                    {s.results.map((r, j) => (
                      <div
                        key={j}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: `0.5rem ${'boss' in r && r.boss ? '6rem' : '1.5rem'} 0.5rem 2.25rem`,
                        }}
                      >
                        {placeBadge(r.place)}
                        <span style={{ fontSize: '0.875rem', color: 'var(--text)', letterSpacing: '0.02em' }}>
                          {r.label}
                        </span>
                        {'boss' in r && r.boss && (
                          <img
                            src={r.boss}
                            alt=""
                            style={{
                              position: 'absolute',
                              right: '1.5rem',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              height: '100px',
                              width: '100px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                              border: `2px solid ${exp.color}`,
                              zIndex: 1,
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
