'use client'

import { useState, type CSSProperties, type ReactNode } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import DiscordIcon from '@/components/icons/DiscordIcon'
import UserChip from '@/components/coaching/UserChip'
import * as ui from '@/components/coaching/ui'
import { signInWithDiscord, signOutAction } from '@/lib/auth-actions'
import { submitCoachingRequest, type RequestState } from './actions'

type User = { username: string; name: string | null; image: string | null }

const initialState: RequestState = { status: 'idle' }

export default function CoachingContent({ user }: { user: User | null }) {
  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{
        position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.1) 0%, transparent 70%)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '820px', margin: '0 auto', padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1rem, 3vw, 2rem) 6rem', position: 'relative' }}>
        <div className="fade-up" style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.1rem', alignItems: 'flex-start' }}>
          <span style={ui.badge}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#a855f7', boxShadow: '0 0 8px #a855f7',
              display: 'inline-block', animation: 'glowPulse 2s ease-in-out infinite',
            }} />
            Joueur Pro · Mandatory · Echo
          </span>
          <h1 style={ui.pageTitle}>Réserve ta session</h1>
        </div>

        <div className="fade-up fade-up-delay-1" style={ui.card}>
          {user ? <RequestForm user={user} /> : <LoginGate />}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function LoginGate() {
  return (
    <div style={{ padding: 'clamp(1.75rem, 4vw, 2.75rem)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.1rem', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: '1.3rem', letterSpacing: '0.06em', color: 'var(--text-bright)' }}>
        Connecte-toi pour envoyer ta demande
      </h2>
      <p style={{ maxWidth: '460px', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
        La connexion Discord me permet de te recontacter directement et de retrouver ton suivi ensuite dans ton espace élève.
      </p>
      <form action={signInWithDiscord}>
        <input type="hidden" name="redirectTo" value="/coaching" />
        <button type="submit" style={ui.discordButton}>
          <DiscordIcon size={18} />
          Se connecter avec Discord
        </button>
      </form>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Seuls ton pseudo et ton avatar Discord sont utilisés.</p>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function RequestForm({ user }: { user: User }) {
  const [state, formAction] = useFormState(submitCoachingRequest, initialState)

  if (state.status === 'success') return <Success recap={state.recap} />

  return (
    <form action={formAction}>
      <div style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', display: 'flex', flexDirection: 'column', gap: '1.25rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
          <UserChip username={user.username} image={user.image} />
          <button type="submit" formAction={signOutAction} formNoValidate style={{ ...linkButton }}>
            Changer de compte
          </button>
        </div>

        <div style={grid(150)}>
          <Field id="character" label="Personnage">
            <input id="character" name="character" required maxLength={40} placeholder="Nom du perso" className="coaching-field" style={ui.input} />
          </Field>
          <Field id="realm" label="Serveur">
            <input id="realm" name="realm" required maxLength={40} placeholder="Ex. Hyjal" className="coaching-field" style={ui.input} />
          </Field>
          <Field id="spec" label="Spé">
            <input id="spec" name="spec" required maxLength={40} placeholder="Ex. Feral" className="coaching-field" style={ui.input} />
          </Field>
        </div>

        <Field id="goal" label="Ton objectif">
          <textarea id="goal" name="goal" rows={3} maxLength={1500} placeholder="Ex. timer mes clés plus haut, améliorer mes routes…" className="coaching-field" style={ui.textarea} />
        </Field>

        <div style={grid(240)}>
          <Field id="vodUrl" label="Lien VOD">
            <input id="vodUrl" name="vodUrl" type="url" placeholder="YouTube, ReviewTool…" className="coaching-field" style={ui.input} />
          </Field>
          <Field id="logsUrl" label="Lien Warcraft Logs">
            <input id="logsUrl" name="logsUrl" type="url" placeholder="https://www.warcraftlogs.com/…" className="coaching-field" style={ui.input} />
          </Field>
        </div>

        {state.status === 'error' && <p role="alert" style={ui.errorBox}>{state.message}</p>}
      </div>

      <div style={{ padding: 'clamp(1.25rem, 3vw, 1.5rem) clamp(1.25rem, 3vw, 2rem)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div style={{ flex: '1 1 260px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--text)' }}>On cale le créneau ensemble sur Discord.</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Tarifs et confirmation sur Discord.</p>
        </div>
        <SubmitButton />
      </div>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className="btn-primary" style={{ ...ui.primaryButton, opacity: pending ? 0.7 : 1, transition: 'all 0.2s ease' }}>
      <DiscordIcon size={16} />
      {pending ? 'Envoi…' : 'Envoyer ma demande'}
    </button>
  )
}

/* ------------------------------------------------------------------ */

function Success({ recap }: { recap: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(recap)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div role="status" style={{ padding: 'clamp(1.75rem, 4vw, 2.5rem)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <h2 style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: '1.4rem', letterSpacing: '0.06em', color: 'var(--text-bright)' }}>
        Demande envoyée
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
        Je l&apos;ai bien reçue. Rejoins le Discord : je te réponds en DM pour caler le créneau et te donner les tarifs.
      </p>
      <pre style={{
        margin: 0, padding: '14px 16px', borderRadius: '8px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)',
        color: 'var(--text)', fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.82rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
      }}>{recap}</pre>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        <a href={ui.DISCORD_INVITE} target="_blank" rel="noopener noreferrer" style={ui.discordButton}>
          <DiscordIcon size={16} />
          Rejoindre le Discord
        </a>
        <button type="button" onClick={copy} style={ui.secondaryButton}>
          {copied ? 'Récap copié' : 'Copier le récap'}
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 0 }}>
      <label htmlFor={id} style={ui.label}>{label}</label>
      {children}
    </div>
  )
}

function grid(min: number): CSSProperties {
  return { display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`, gap: '12px' }
}

const linkButton: CSSProperties = {
  background: 'none',
  border: 0,
  padding: '8px 0',
  color: 'var(--text-secondary)',
  fontSize: '0.75rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  fontFamily: 'var(--font-inter), sans-serif',
}
