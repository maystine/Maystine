import type { Metadata } from 'next'
import AddonCard from '@/components/addons/AddonCard'

export const metadata: Metadata = {
  title: 'Addons & Profils WoW',
  description: 'Configurations prêtes à importer pour vos addons World of Warcraft. Profils par classe et spécialisation, créés par Maystine.',
  openGraph: {
    title: 'Addons & Profils WoW | Maystine',
    description: 'Configurations prêtes à importer pour vos addons World of Warcraft.',
    url: 'https://maystine.vercel.app/addons',
  },
}
import addons from '../../../data/addons.json'

export default function AddonsPage() {
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
        background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 12px',
            borderRadius: '100px',
            border: '1px solid var(--border-glow)',
            backgroundColor: 'rgba(124, 58, 237, 0.08)',
            marginBottom: '1rem',
          }}>
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-light)' }}>
              World of Warcraft
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '0.75rem' }}>Addons & Profils</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '500px', lineHeight: 1.7 }}>
            Sélectionne ton addon, choisis ta classe et copie le string directement dans le jeu.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {addons.map((addon) => (
            <AddonCard key={addon.id} addon={addon} />
          ))}
        </div>
      </div>
    </div>
  )
}

