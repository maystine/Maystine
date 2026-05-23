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
    : `https://wow.zamimg.com/images/wow/icons/medium/classicon_${cls}.jpg`

const SPEC_ICON_NAMES: Record<string, string> = {
  druid_feral:              'ability_druid_catform',
  druid_balance:            'spell_nature_starfall',
  druid_guardian:           'ability_racial_bearform',
  druid_restoration:        'spell_nature_healingtouch',
  deathknight_unholy:       'spell_deathknight_unholypresence',
  deathknight_blood:        'ability_deathknight_bloodpresence',
  deathknight_frost:        'spell_deathknight_frostpresence',
  warlock_affliction:       'spell_shadow_deathcoil',
  warlock_demonology:       'spell_shadow_metamorphosis',
  warlock_destruction:      'spell_shadow_rainoffire',
  mage_arcane:              'spell_holy_magicalsentry',
  mage_fire:                'spell_fire_firebolt02',
  mage_frost:               'spell_frost_frostbolt02',
  paladin_holy:             'spell_holy_holybolt',
  paladin_protection:       'ability_paladin_shieldofthetemplar',
  paladin_retribution:      'spell_holy_auraoflight',
  priest_discipline:        'spell_holy_powerwordshield',
  priest_holy:              'spell_holy_guardianspirit',
  priest_shadow:            'spell_shadow_shadowwordpain',
  shaman_elemental:         'spell_nature_lightning',
  shaman_enhancement:       'spell_shaman_improvedstormstrike',
  shaman_restoration:       'spell_nature_magicimmunity',
  hunter_beastmastery:      'ability_hunter_beasttaming',
  hunter_marksmanship:      'ability_marksmanship',
  hunter_survival:          'ability_hunter_camouflage',
  rogue_assassination:      'ability_rogue_eviscerate',
  rogue_outlaw:             'ability_backstab',
  rogue_subtlety:           'ability_stealth',
  warrior_arms:             'ability_warrior_savageblow',
  warrior_fury:             'ability_warrior_innerrage',
  warrior_protection:       'ability_warrior_defensivestance',
  monk_brewmaster:          'monk_stance_drunkenox',
  monk_mistweaver:          'monk_stance_wiseserpent',
  monk_windwalker:          'monk_stance_whitetiger',
  demonhunter_havoc:        'ability_demonhunter_specdps',
  demonhunter_vengeance:    'ability_demonhunter_spectank',
}

const SPEC_ICON_URL = (cls: string, spec: string) => {
  if (cls === 'all' || !spec || spec === 'all') return null
  const key = `${cls}_${spec}`
  const iconName = SPEC_ICON_NAMES[key] || `classicon_${cls}_${spec}`
  return `https://wow.zamimg.com/images/wow/icons/medium/${iconName}.jpg`
}

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
  hideProfileIcon?: boolean
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
  const [imageError, setImageError] = useState(false)

  return (
    <>
      {/* CARD */}
      <div
        style={{
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
        {/* Image */}
        <div style={{
          height: '160px',
          background: 'linear-gradient(135deg, #1a1035 0%, #0e0d1a 100%)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid var(--border)',
          overflow: 'hidden',
        }}>
          {addon.image && !imageError ? (
            <img
              src={addon.image}
              alt={addon.name}
              onError={() => setImageError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <div style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '2rem',
              color: 'rgba(124,58,237,0.3)',
              letterSpacing: '0.1em',
            }}>{addon.name[0]}</div>
          )}

        </div>

        {/* Content */}
        <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '6px', letterSpacing: '0.05em' }}>{addon.name}</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{addon.description}</p>
          </div>

          {/* Spec icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: '4px' }}>Specs</span>
            {addon.profiles.map((p, i) => {
              const specUrl = SPEC_ICON_URL(p.class, p.spec)
              const classUrl = CLASS_ICON_URL(p.class)
              const color = CLASS_COLORS[p.class] || '#fff'
              if (specUrl) return (
                <img
                  key={i}
                  src={specUrl}
                  alt={p.label}
                  title={p.label}
                  width={20}
                  height={20}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = classUrl || '' }}
                  style={{
                    borderRadius: '4px',
                    border: `1px solid ${color}44`,
                    boxShadow: `0 0 6px ${color}44`,
                    display: 'block',
                  }}
                />
              )
              if (classUrl) return (
                <img
                  key={i}
                  src={classUrl}
                  alt={p.label}
                  title={p.label}
                  width={20}
                  height={20}
                  style={{
                    borderRadius: '4px',
                    border: `1px solid ${color}44`,
                    boxShadow: `0 0 6px ${color}44`,
                    display: 'block',
                  }}
                />
              )
              return (
                <div key={i} style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  border: `1px solid ${color}44`,
                  backgroundColor: `${color}11`,
                  fontSize: '0.65rem',
                  color,
                  letterSpacing: '0.05em',
                }}>
                  {p.label}
                </div>
              )
            })}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                if (addon.profiles.length === 1) {
                  handleCopy()
                } else {
                  setModalOpen(true); setSelectedProfile(0); setCopied(false); setShowFullString(false)
                }
              }}
              style={{
                flex: 1,
                padding: '9px 16px',
                borderRadius: '7px',
                background: addon.profiles.length === 1 && copied
                  ? 'rgba(0,200,100,0.15)'
                  : 'linear-gradient(135deg, var(--accent), var(--accent-light))',
                border: addon.profiles.length === 1 && copied ? '1px solid rgba(0,200,100,0.4)' : 'none',
                color: addon.profiles.length === 1 && copied ? '#00c864' : '#fff',
                fontSize: '0.78rem',
                letterSpacing: '0.06em',
                cursor: 'pointer',
                fontWeight: 500,
                boxShadow: addon.profiles.length === 1 && copied ? 'none' : '0 0 16px rgba(124,58,237,0.3)',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {addon.profiles.length === 1 && copied ? 'Copié !' : 'Copier le profil'}
            </button>

            <div style={{ display: 'flex', gap: '6px' }}>
              {addon.links.curseforge && (
                <a href={addon.links.curseforge} target="_blank" rel="noopener noreferrer"
                  title="CurseForge"
                  style={{
                    padding: '9px 12px',
                    borderRadius: '7px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'transparent',
                    transition: 'border-color 0.2s, opacity 0.2s',
                    display: 'flex', alignItems: 'center',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#F16436'; (e.currentTarget as HTMLAnchorElement).style.opacity = '0.8' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}
                >
                  <img src="https://cdn.simpleicons.org/curseforge/F16436" alt="CurseForge" style={{ height: '14px', width: 'auto', display: 'block' }} />
                </a>
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
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', letterSpacing: '0.05em' }}>{addon.name}</h3>
              <button onClick={() => setModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1 }}>×</button>
            </div>

            {/* Profile selector */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                Choisir un profil
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {addon.profiles.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (!p.string) return
                      setSelectedProfile(i)
                      navigator.clipboard.writeText(p.string)
                      setCopied(true)
                      setTimeout(() => setCopied(false), 2000)
                    }}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: `1px solid ${selectedProfile === i && copied ? 'rgba(0,200,100,0.5)' : selectedProfile === i ? CLASS_COLORS[p.class] + '66' : 'var(--border)'}`,
                      backgroundColor: selectedProfile === i && copied ? 'rgba(0,200,100,0.08)' : selectedProfile === i ? `${CLASS_COLORS[p.class]}11` : 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                      width: '100%',
                    }}
                  >
                    {!addon.hideProfileIcon && (() => {
                      const specUrl = SPEC_ICON_URL(p.class, p.spec)
                      const classUrl = CLASS_ICON_URL(p.class)
                      const iconUrl = specUrl || classUrl
                      if (iconUrl) return (
                        <img
                          src={iconUrl}
                          alt={p.label}
                          width={22}
                          height={22}
                          onError={(e) => { if (specUrl && classUrl) (e.currentTarget as HTMLImageElement).src = classUrl }}
                          style={{ borderRadius: '4px', flexShrink: 0 }}
                        />
                      )
                      return (
                        <div style={{
                          width: 22, height: 22, borderRadius: '4px',
                          backgroundColor: `${CLASS_COLORS[p.class]}22`,
                          border: `1px solid ${CLASS_COLORS[p.class]}44`,
                          flexShrink: 0,
                        }} />
                      )
                    })()}
                    <span style={{ fontSize: '0.82rem', color: selectedProfile === i && copied ? '#00c864' : !p.string ? 'var(--muted)' : selectedProfile === i ? CLASS_COLORS[p.class] : 'var(--text)', fontWeight: selectedProfile === i ? 500 : 300, flex: 1 }}>
                      {selectedProfile === i && copied ? 'Copié !' : !p.string ? `${p.label} — bientôt` : p.label}
                    </span>
                    {selectedProfile === i && copied && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#00c864"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ fontSize: '0.68rem', color: 'var(--muted)', textAlign: 'center', marginTop: '0.5rem' }}>
              Cliquer sur un profil pour copier la string
            </div>
          </div>
        </div>
      )}
    </>
  )
}
