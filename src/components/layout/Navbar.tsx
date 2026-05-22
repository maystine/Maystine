'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/addons', label: 'Addons' },
  { href: '/parcours', label: 'Parcours' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      borderBottom: '1px solid var(--border)',
      backgroundColor: 'rgba(8, 8, 16, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo avec avatar Twitch */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            overflow: 'hidden',
            boxShadow: '0 0 16px rgba(124, 58, 237, 0.5)',
            border: '1px solid var(--border-glow)',
            flexShrink: 0,
          }}>
            <img
              src="https://unavatar.io/twitch/Maystine"
              alt="Maystine"
              width={32}
              height={32}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          <span style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '1rem',
            letterSpacing: '0.1em',
            color: 'var(--text-bright)',
            fontWeight: 600,
          }}>Maystine</span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--accent-light)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 500 : 300,
                  transition: 'color 0.2s ease',
                  position: 'relative',
                  paddingBottom: '2px',
                  borderBottom: isActive ? '1px solid var(--accent-light)' : '1px solid transparent',
                }}
              >
                {link.label}
              </Link>
            )
          })}

          {/* YouTube button */}
          <a
            href="https://www.youtube.com/@MaystineTv"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid var(--border-glow)',
              backgroundColor: 'rgba(124, 58, 237, 0.08)',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              color: 'var(--accent-light)',
              transition: 'all 0.2s ease',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
          </a>

          {/* Twitch button */}
          <a
            href="https://twitch.tv/Maystine"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid var(--border-glow)',
              backgroundColor: 'rgba(124, 58, 237, 0.08)',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              color: 'var(--accent-light)',
              transition: 'all 0.2s ease',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
            </svg>
            Twitch
          </a>
        </div>
      </div>
    </nav>
  )
}
