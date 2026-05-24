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
    years: '2026 – …',
    color: '#a855f7',
    results: [
      { place: 2,  label: 'Race to World First' },
    ],
  },
  {
    name: 'The War Within',
    years: '2024 – 2025',
    color: '#b45309',
    results: [
      { place: 2,  label: 'Race to World First' },
      { place: 1,  label: 'MDI Global Final — Season 1' },
      { place: 1,  label: 'TGP Global Final — Season 1' },
      { place: 2,  label: 'Race to World First' },
      { place: 2,  label: 'MDI Global Final — Season 2' },
      { place: 2,  label: 'Race to World First' },
      { place: 4,  label: 'MDI Global Final — Season 3' },
    ],
  },
  {
    name: 'Dragonflight',
    years: '2023 – 2024',
    color: '#f59e0b',
    results: [
      { place: 2,  label: 'MDI Global Final — Season 1' },
      { place: 2,  label: 'Race to World First' },
      { place: 6,  label: 'TGP Global Final — Season 2' },
      { place: 1,  label: 'Race to World First' },
      { place: 1,  label: 'MDI Global Final — Season 3' },
      { place: 2,  label: 'TGP Global Final — Season 4' },
    ],
  },
  {
    name: 'Shadowlands',
    years: '2020 – 2022',
    color: '#6b7fd7',
    results: [
      { place: 8,  label: 'MDI Global Final — Season 1' },
      { place: 1,  label: 'The Great Push — Season 1' },
      { place: 6,  label: 'The Great Push — Season 2' },
      { place: 1,  label: 'MDI Group B — Season 3' },
      { place: 2,  label: 'MDI Global Final — Season 3' },
      { place: 2,  label: 'TGP EU Qualifier — Season 4' },
      { place: 2,  label: 'TGP Global Final — Season 4' },
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
                overflow: 'hidden',
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
                <h2 style={{
                  fontFamily: 'var(--font-cinzel), serif',
                  fontSize: '1rem',
                  letterSpacing: '0.1em',
                  color: exp.color,
                  fontWeight: 600,
                }}>
                  {exp.name}
                </h2>
                <span style={{
                  fontSize: '0.75rem',
                  color: 'var(--muted)',
                  letterSpacing: '0.06em',
                  flexShrink: 0,
                }}>
                  {exp.years}
                </span>
              </div>

              {/* Results list */}
              <div style={{ padding: '0.5rem 0' }}>
                {exp.results.map((r, j) => (
                  <div
                    key={j}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.6rem 1.5rem',
                      borderBottom: j < exp.results.length - 1 ? '1px solid rgba(30,27,51,0.6)' : 'none',
                    }}
                  >
                    {placeBadge(r.place)}
                    <span style={{ fontSize: '0.875rem', color: 'var(--text)', letterSpacing: '0.02em' }}>
                      {r.label}
                    </span>
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
