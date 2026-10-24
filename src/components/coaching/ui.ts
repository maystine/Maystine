import type { CSSProperties } from 'react'

/** Styles partagés par les pages coaching / espace élève / admin (inline, comme le reste du site). */

export const DISCORD_INVITE = 'https://discord.gg/AnJ7x4jpGG'
export const DISCORD_BLUE = '#5865F2'

export const card: CSSProperties = {
  backgroundColor: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: '12px',
  boxShadow: '0 0 24px rgba(124, 58, 237, 0.08)',
}

export const sectionTitle: CSSProperties = {
  fontFamily: 'var(--font-cinzel), serif',
  fontSize: '0.9rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--text-secondary)',
  fontWeight: 600,
}

export const label: CSSProperties = {
  fontSize: '0.82rem',
  fontWeight: 400,
  letterSpacing: '0.04em',
  color: 'var(--text)',
}

export const input: CSSProperties = {
  width: '100%',
  minHeight: '46px',
  padding: '0 14px',
  backgroundColor: 'var(--bg)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  color: 'var(--text-bright)',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 300,
  fontSize: '1rem',
  outline: 'none',
}

export const textarea: CSSProperties = {
  ...input,
  minHeight: 'auto',
  padding: '12px 14px',
  lineHeight: 1.5,
  resize: 'vertical',
}

export const primaryButton: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  minHeight: '50px',
  padding: '0 32px',
  border: 0,
  borderRadius: '8px',
  background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
  color: '#fff',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 500,
  fontSize: '0.9rem',
  letterSpacing: '0.08em',
  cursor: 'pointer',
  boxShadow: '0 0 32px rgba(124, 58, 237, 0.4)',
}

export const secondaryButton: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  minHeight: '42px',
  padding: '0 16px',
  borderRadius: '8px',
  border: '1px solid var(--border-glow)',
  backgroundColor: 'rgba(124, 58, 237, 0.08)',
  color: 'var(--text)',
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 400,
  fontSize: '0.82rem',
  letterSpacing: '0.04em',
  cursor: 'pointer',
}

export const discordButton: CSSProperties = {
  ...primaryButton,
  background: DISCORD_BLUE,
  boxShadow: '0 0 24px rgba(88, 101, 242, 0.35)',
}

export const badge: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '5px 14px',
  borderRadius: '100px',
  border: '1px solid var(--border-glow)',
  backgroundColor: 'rgba(124, 58, 237, 0.08)',
  fontSize: '0.68rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'var(--accent-light)',
}

export const pageTitle: CSSProperties = {
  fontFamily: 'var(--font-cinzel), serif',
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  letterSpacing: '0.08em',
  color: 'var(--text-bright)',
  lineHeight: 1.1,
}

export const errorBox: CSSProperties = {
  padding: '12px 14px',
  borderRadius: '8px',
  border: '1px solid rgba(248, 113, 113, 0.5)',
  backgroundColor: 'rgba(248, 113, 113, 0.08)',
  color: '#fecaca',
  fontSize: '0.88rem',
  lineHeight: 1.5,
}
