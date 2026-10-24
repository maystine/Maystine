'use client'

import { useState } from 'react'
import * as ui from '@/components/coaching/ui'

export type StudentSession = {
  id: number
  dateLabel: string
  title: string
  vodUrl: string | null
  logsUrl: string | null
  sharedNote: string
}

export default function SessionList({ sessions }: { sessions: StudentSession[] }) {
  const [openId, setOpenId] = useState<number | null>(sessions[0]?.id ?? null)

  if (sessions.length === 0) {
    return (
      <div style={{ ...ui.card, padding: '24px', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
        Aucune session pour l&apos;instant. Tes comptes rendus apparaîtront ici après chaque session.
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {sessions.map((s, i) => {
        const open = openId === s.id
        const num = String(sessions.length - i).padStart(2, '0')
        return (
          <article key={s.id} style={{ ...ui.card, boxShadow: 'none', borderColor: open ? 'var(--border-glow)' : 'var(--border)', overflow: 'hidden' }}>
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : s.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 20px',
                border: 0, background: 'transparent', color: 'var(--text)', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-inter), sans-serif',
              }}
            >
              <span style={{ flexShrink: 0, minWidth: '34px', fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: '1.35rem', color: 'var(--border-glow)' }}>{num}</span>
              <span style={{ flex: '1 1 auto', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-bright)' }}>{s.title}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{s.dateLabel}</span>
              </span>
              <span aria-hidden style={{ flexShrink: 0, fontFamily: 'var(--font-cinzel), serif', fontSize: '1.4rem', lineHeight: 1, color: 'var(--accent-light)' }}>{open ? '–' : '+'}</span>
            </button>

            {open && (
              <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {s.sharedNote && (
                  <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-light)' }}>Note du coach</span>
                    <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'var(--text)', whiteSpace: 'pre-wrap' }}>{s.sharedNote}</p>
                  </div>
                )}
                {(s.vodUrl || s.logsUrl) && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {s.vodUrl && <a href={s.vodUrl} target="_blank" rel="noopener noreferrer" style={ui.secondaryButton}>VOD</a>}
                    {s.logsUrl && <a href={s.logsUrl} target="_blank" rel="noopener noreferrer" style={ui.secondaryButton}>Warcraft Logs</a>}
                  </div>
                )}
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
