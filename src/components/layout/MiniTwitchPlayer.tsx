'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function MiniTwitchPlayer() {
  const pathname = usePathname()
  const [minimized, setMinimized] = useState(false)

  // On the home page, the big Twitch embed is shown instead
  if (pathname === '/') return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 40,
      borderRadius: '10px',
      overflow: 'hidden',
      border: '1px solid var(--border-glow)',
      boxShadow: '0 0 32px rgba(124, 58, 237, 0.2)',
      transition: 'all 0.3s ease',
      width: minimized ? '160px' : '280px',
    }}>
      {/* Header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 10px',
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--accent-light)">
            <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
          </svg>
          <span style={{ fontSize: '0.65rem', color: 'var(--accent-light)', letterSpacing: '0.08em' }}>Maystine</span>
        </div>
        <button
          onClick={() => setMinimized(!minimized)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--muted)',
            fontSize: '0.7rem',
            padding: '2px 4px',
          }}
        >
          {minimized ? '▲' : '▼'}
        </button>
      </div>

      {/* Iframe */}
      {!minimized && (
        <iframe
          src="https://player.twitch.tv/?channel=Maystine&parent=maystine.vercel.app&muted=true"
          height="158"
          width="280"
          style={{ display: 'block', backgroundColor: '#000' }}
          allowFullScreen
        />
      )}
    </div>
  )
}
