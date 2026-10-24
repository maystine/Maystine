import type { CSSProperties } from 'react'
import { DiscordAvatar } from '@/components/coaching/UserChip'
import * as ui from '@/components/coaching/ui'
import type { CoachingRequest } from '@/lib/db/schema'
import { formatShortDate } from '@/lib/format'
import { acceptRequest, declineRequest } from './actions'
import SubmitButton from './SubmitButton'

export default function RequestPanel({ request: r }: { request: CoachingRequest }) {
  return (
    <div style={{ ...ui.card, padding: 'clamp(20px, 3vw, 28px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-light)' }}>
            Nouvelle demande · reçue le {formatShortDate(r.createdAt)}
          </span>
          <h2 style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: '1.5rem', letterSpacing: '0.06em', color: 'var(--text-bright)' }}>{r.character}</h2>
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text)' }}>
          <DiscordAvatar src={r.discordAvatar} size={28} />@{r.discordUsername}
        </span>
      </div>

      <dl style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
        <Info label="Personnage" value={r.character} />
        <Info label="Serveur" value={r.realm} />
        <Info label="Spé" value={r.spec} />
      </dl>

      <div style={box}>
        <span style={boxLabel}>Objectif</span>
        <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text)', whiteSpace: 'pre-wrap' }}>{r.goal || '—'}</p>
      </div>

      {(r.vodUrl || r.logsUrl) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {r.vodUrl && <a href={r.vodUrl} target="_blank" rel="noopener noreferrer" style={ui.secondaryButton}>Ouvrir la VOD</a>}
          {r.logsUrl && <a href={r.logsUrl} target="_blank" rel="noopener noreferrer" style={ui.secondaryButton}>Ouvrir les logs</a>}
        </div>
      )}

      <form style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
        <SubmitButton formAction={acceptRequest.bind(null, r.id)} pendingLabel="Création…" style={{ ...ui.primaryButton, minHeight: '46px', padding: '0 22px' }}>
          Créer la fiche élève
        </SubmitButton>
        <a href={ui.DISCORD_INVITE} target="_blank" rel="noopener noreferrer" style={{ ...ui.secondaryButton, minHeight: '46px', borderColor: ui.DISCORD_BLUE, backgroundColor: 'rgba(88, 101, 242, 0.1)' }}>
          Répondre sur Discord
        </a>
        <SubmitButton formAction={declineRequest.bind(null, r.id)} confirm="Refuser cette demande ?" pendingLabel="…" style={{ ...ui.secondaryButton, minHeight: '46px', backgroundColor: 'transparent', color: 'var(--text-secondary)' }}>
          Refuser
        </SubmitButton>
      </form>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div style={box}>
      <dt style={boxLabel}>{label}</dt>
      <dd style={{ marginTop: '4px', fontSize: '0.9rem', color: 'var(--text-bright)' }}>{value}</dd>
    </div>
  )
}

const box: CSSProperties = { padding: '12px 14px', borderRadius: '8px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '6px' }
const boxLabel: CSSProperties = { fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)' }
