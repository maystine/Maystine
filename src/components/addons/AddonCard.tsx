'use client'

import { useState } from 'react'

const CLASS_COLORS: Record<string, string> = {
  mage: '#69CCF0',
  deathknight: '#C41E3A',
  warrior: '#C79C6E',
  paladin: '#F58CBA',
  hunter: '#ABD473',
  rogue: '#FFF569',
  priest: '#FFFFFF',
  shaman: '#0070DE',
  warlock: '#9482C9',
  druid: '#FF7D0A',
  monk: '#00FF96',
  demonhunter: '#A330C9',
  evoker: '#33937F',
  all: '#a855f7',
}

const CLASS_LABELS: Record<string, string> = {
  mage: 'Mage',
  deathknight: 'Death Knight',
  warrior: 'Guerrier',
  paladin: 'Paladin',
  hunter: 'Chasseur',
  rogue: 'Voleur',
  priest: 'Prêtre',
  shaman: 'Chaman',
  warlock: 'Démoniste',
  druid: 'Druide',
  monk: 'Moine',
  demonhunter: 'Démon Hunter',
  evoker: 'Évocateur',
  all: 'Universel',
}

const CLASS_ICON_URL = (cls: string) =>
  cls === 'all'
    ? null
    : `https://wow.zamimg.com/images/wow/icons/medium/classicon_${cls.replace('deathknight', 'deathknight').replace('demonhunter', 'demonhunter')}.jpg`

interface Profile {
  label: string
  class: string
  spec: string
  string: string
}

interface Addon {
  id: string
  name: string
  description: string
  version: string
  wowVersion: string
  image: string
  profiles: Profile[]
  links: {
    curseforge?: string
    wago?: string
    github?: string
  }
}

export default function AddonCard({ addon }: { addon: Addon }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState(0)
  const [copied, setCopied] = useState(false)
  const [showFullString, setShowFullString] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(addon.profiles[selectedProfile].string)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const profile = addon.profiles[selectedProfile]
  const uniqueClasses = [...new Set(addon.profiles.map((p) => p.class))]

  return (
    <>
      {/* CARD */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-glow)'
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 24px rgba(124,58,237,0.15)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'
          ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
        }}
      >
        {/* Image placeholder */}
        <div style={{
          height: '160px',
          background: 'linear-gradient(135deg, #1a1035 0%, #0e0d1a 100%)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '2rem',
            color: 'rgba(124,58,237,0.3)',
            letterSpacing: '0.1em',
          }}>{addon.name[0]}</div>

          {/* Version badge */}
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            padding: '3px 8px',
            borderRadius: '4px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            border: '1px solid var(--border)',
            fontSize: '0.65rem',
            color: 'var(--muted)',
            letterSpacing: '0.05em',
          }}>v{addon.version}</div>
        </div>

        {/* Content */}
        <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Name */}
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '6px', letterSpacing: '0.05em' }}>{addon.name}</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{addon.description}</p>
          </div>

          {/* Class icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: '4px' }}>Classes</span>
            {uniqueClasses.map((cls) => (
              <div key={cls} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {CLASS_ICON_URL(cls) ? (
                  <img
                    src={CLASS_ICON_URL(cls)!}
                    alt={CLASS_LABELS[cls] || cls}
                    title={CLASS_LABELS[cls] || cls}
                    width={20}
                    height={20}
                    style={{
                      borderRadius: '4px',
                      border: `1px solid ${CLASS_COLORS[cls] || '#fff'}44`,
                      boxShadow: `0 0 6px ${CLASS_COLORS[cls] || '#fff'}44`,
                    }}
                  />
                ) : (
                  <div style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    border: `1px solid ${CLASS_COLORS[cls] || '#fff'}44`,
                    backgroundColor: `${CLASS_COLORS[cls] || '#fff'}11`,
                    fontSize: '0.65rem',
                    color: CLASS_COLORS[cls] || '#fff',
                    letterSpacing: '0.05em',
                  }}>
                    {CLASS_LABELS[cls] || cls}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setModalOpen(true); setSelectedProfile(0) }}
              style={{
                flex: 1,
                padding: '9px 16px',
                borderRadius: '7px',
                background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
                border: 'none',
                color: '#fff',
                fontSize: '0.78rem',
                letterSpacing: '0.06em',
                cursor: 'pointer',
                fontWeight: 500,
                boxShadow: '0 0 16px rgba(124,58,237,0.3)',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              📋 Copier le profil
            </button>

            {/* External links */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {addon.links.curseforge && (
                <a href={addon.links.curseforge} target="_blank" rel="noopener noreferrer"
                  title="CurseForge"
                  style={{
                    padding: '9px 12px',
                    borderRadius: '7px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'transparent',
                    color: 'var(--text-secondary)',
                    fontSize: '0.72rem',
                    transition: 'border-color 0.2s, color 0.2s',
                    display: 'flex', alignItems: 'center',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border-glow)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-light)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)' }}
                >CF</a>
              )}
              {addon.links.wago && (
                <a href={addon.links.wago} target="_blank" rel="noopener noreferrer"
                  title="Wago"
                  style={{
                    padding: '9px 12px',
                    borderRadius: '7px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'transparent',
                    color: 'var(--text-secondary)',
                    fontSize: '0.72rem',
                    transition: 'border-color 0.2s, color 0.2s',
                    display: 'flex', alignItems: 'center',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border-glow)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-light)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)' }}
                >Wago</a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            backgroundColor: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-glow)',
              borderRadius: '14px',
              padding: '2rem',
              width: '100%',
              maxWidth: '480px',
              boxShadow: '0 0 48px rgba(124,58,237,0.25)',
            }}
          >
            {/* Modal header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', letterSpacing: '0.05em' }}>{addon.name}</h3>
              <button onClick={() => setModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1 }}>×</button>
            </div>

            {/* Profile selector */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                Sélectionner un profil
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {addon.profiles.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedProfile(i); setShowFullString(false); setCopied(false) }}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: `1px solid ${selectedProfile === i ? CLASS_COLORS[p.class] + '66' : 'var(--border)'}`,
                      backgroundColor: selectedProfile === i ? `${CLASS_COLORS[p.class]}11` : 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {CLASS_ICON_URL(p.class) ? (
                      <img src={CLASS_ICON_URL(p.class)!} alt={CLASS_LABELS[p.class]} width={22} height={22} style={{ borderRadius: '4px' }} />
                    ) : (
                      <div style={{
                        width: 22, height: 22, borderRadius: '4px',
                        backgroundColor: `${CLASS_COLORS[p.class]}22`,
                        border: `1px solid ${CLASS_COLORS[p.class]}44`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.6rem', color: CLASS_COLORS[p.class],
                      }}>✦</div>
                    )}
                    <span style={{ fontSize: '0.82rem', color: selectedProfile === i ? CLASS_COLORS[p.class] : 'var(--text)', fontWeight: selectedProfile === i ? 500 : 300 }}>
                      {p.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* String preview */}
            <div style={{
              padding: '10px 14px',
              borderRadius: '8px',
              backgroundColor: 'rgba(0,0,0,0.3)',
              border: '1px solid var(--border)',
              marginBottom: '1rem',
              fontFamily: 'monospace',
              fontSize: '0.72rem',
              color: 'var(--muted)',
              wordBreak: 'break-all',
              maxHeight: showFullString ? '200px' : '40px',
              overflow: showFullString ? 'auto' : 'hidden',
              transition: 'max-height 0.3s ease',
            }}>
              {profile.string}
            </div>

            <button
              onClick={() => setShowFullString(!showFullString)}
              style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '0.72rem', cursor: 'pointer', marginBottom: '1rem', padding: 0 }}
            >
              {showFullString ? '▲ Réduire' : '▼ Voir la string complète'}
            </button>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: copied ? 'rgba(0,200,100,0.15)' : 'linear-gradient(135deg, var(--accent), var(--accent-light))',
                border: copied ? '1px solid rgba(0,200,100,0.4)' : 'none',
                color: copied ? '#00c864' : '#fff',
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: copied ? 'none' : '0 0 20px rgba(124,58,237,0.35)',
              }}
            >
              {copied ? '✓ Copié dans le presse-papier !' : '📋 Copier le profil'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
