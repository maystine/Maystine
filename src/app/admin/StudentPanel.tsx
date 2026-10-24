import type { CSSProperties, ReactNode } from 'react'
import { DiscordAvatar } from '@/components/coaching/UserChip'
import * as ui from '@/components/coaching/ui'
import type { Goal, Session, Student, Task } from '@/lib/db/schema'
import { dateToParisInputs, formatShortDate } from '@/lib/format'
import {
  addGoal, addSession, addTask, clearDoneTasks, deleteGoal, deleteSession, deleteTask,
  savePrivateNotes, setArchived, updateGoal, updateNextSession, updateProfile, updateSession,
} from './actions'
import SubmitButton from './SubmitButton'

type Data = { student: Student; goals: Goal[]; tasks: Task[]; sessions: Session[] }

export default function StudentPanel({ data }: { data: Data }) {
  const { student: s, goals, tasks, sessions } = data
  const next = dateToParisInputs(s.nextSessionAt)
  const today = dateToParisInputs(new Date()).date
  const doneCount = tasks.filter((t) => t.done).length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* En-tête */}
      <div style={{ ...ui.card, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
            <DiscordAvatar src={s.discordAvatar} size={56} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
              <h2 style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: '1.5rem', letterSpacing: '0.06em', color: 'var(--text-bright)' }}>
                {s.character}{s.archived && <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}> · archivé</span>}
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {s.realm} · {s.spec} · <span style={{ color: 'var(--text)' }}>@{s.discordUsername}</span>
              </p>
            </div>
          </div>
          <form style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <SubmitButton
              formAction={setArchived.bind(null, s.id, !s.archived)}
              confirm={s.archived ? undefined : "Archiver cet élève ? Il n'aura plus accès à son espace."}
              pendingLabel="…"
              style={ui.secondaryButton}
            >
              {s.archived ? 'Réactiver' : 'Archiver'}
            </SubmitButton>
          </form>
        </div>
        <details>
          <summary style={summary}>Modifier le profil</summary>
          <form action={updateProfile.bind(null, s.id)} style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', alignItems: 'end' }}>
            <Field label="Personnage"><input name="character" required maxLength={40} defaultValue={s.character} className="coaching-field" style={small} /></Field>
            <Field label="Serveur"><input name="realm" required maxLength={40} defaultValue={s.realm} className="coaching-field" style={small} /></Field>
            <Field label="Spé"><input name="spec" required maxLength={40} defaultValue={s.spec} className="coaching-field" style={small} /></Field>
            <SubmitButton style={{ ...ui.secondaryButton, minHeight: '42px' }}>Enregistrer</SubmitButton>
          </form>
        </details>
      </div>

      <div style={twoCols}>
        {/* Prochaine session */}
        <Card title="Prochaine session">
          <form action={updateNextSession.bind(null, s.id)} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '10px' }}>
              <Field label="Date"><input type="date" name="date" defaultValue={next.date} className="coaching-field" style={{ ...small, colorScheme: 'dark' }} /></Field>
              <Field label="Heure (Paris)"><input type="time" name="time" defaultValue={next.time || '20:00'} className="coaching-field" style={{ ...small, colorScheme: 'dark' }} /></Field>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <span style={hint}>Vider la date pour retirer la session.</span>
              <SubmitButton style={{ ...ui.secondaryButton, minHeight: '40px' }}>Enregistrer</SubmitButton>
            </div>
          </form>
        </Card>

        {/* Notes privées */}
        <div style={{ borderRadius: '12px', border: '1px dashed var(--border-glow)', backgroundColor: 'var(--bg-surface)', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ ...ui.sectionTitle, display: 'flex', alignItems: 'center', gap: '8px' }}><LockIcon />Notes privées</h3>
          <form action={savePrivateNotes.bind(null, s.id)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label htmlFor={`priv-${s.id}`} style={srOnly}>Notes privées</label>
            <textarea id={`priv-${s.id}`} name="privateNotes" rows={4} defaultValue={s.privateNotes} placeholder="Visible uniquement par toi : ressenti, points sensibles, idées pour la suite…" className="coaching-field" style={{ ...ui.textarea, fontSize: '0.88rem' }} />
            <SubmitButton style={{ ...ui.secondaryButton, minHeight: '40px', alignSelf: 'flex-end' }}>Enregistrer</SubmitButton>
          </form>
        </div>
      </div>

      <div style={twoCols}>
        {/* Objectifs */}
        <Card title="Objectifs" aside="visibles par l'élève">
          {goals.length === 0 && <p style={hint}>Aucun objectif pour l&apos;instant.</p>}
          {goals.map((g) => (
            <form key={g.id} action={updateGoal.bind(null, g.id)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input name="label" aria-label="Objectif" required maxLength={200} defaultValue={g.label} className="coaching-field" style={{ ...small, flex: '1 1 auto', minWidth: 0 }} />
              <input name="progress" aria-label="Progression en %" type="number" min={0} max={100} step={5} defaultValue={g.progress} className="coaching-field" style={{ ...small, width: '72px', flex: 'none', padding: '0 8px' }} />
              <SubmitButton ariaLabel="Enregistrer l'objectif" pendingLabel="…" style={iconButton}><CheckIcon /></SubmitButton>
              <SubmitButton formAction={deleteGoal.bind(null, g.id)} confirm="Supprimer cet objectif ?" ariaLabel="Supprimer l'objectif" pendingLabel="…" style={iconButton}><CrossIcon /></SubmitButton>
            </form>
          ))}
          <form key={`goal-${goals.length}`} action={addGoal.bind(null, s.id)} style={{ display: 'flex', gap: '8px' }}>
            <input name="label" aria-label="Nouvel objectif" required maxLength={200} placeholder="Nouvel objectif…" className="coaching-field" style={{ ...small, flex: '1 1 auto', minWidth: 0 }} />
            <SubmitButton pendingLabel="…" style={{ ...ui.secondaryButton, minHeight: '40px', flex: 'none' }}>Ajouter</SubmitButton>
          </form>
        </Card>

        {/* Plan de travail */}
        <Card title="Plan de travail" aside={tasks.length ? `${doneCount}/${tasks.length} cochés par l'élève` : undefined}>
          {tasks.length === 0 && <p style={hint}>Aucun exercice pour l&apos;instant.</p>}
          {tasks.map((t) => (
            <form key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', minHeight: '40px', borderBottom: '1px solid var(--border)' }}>
              <span aria-label={t.done ? 'Fait' : 'À faire'} style={{
                flexShrink: 0, width: '18px', height: '18px', borderRadius: '5px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: t.done ? 'linear-gradient(135deg, var(--accent), var(--accent-light))' : 'transparent',
                border: t.done ? 0 : '1px solid var(--border-glow)', color: '#fff',
              }}>{t.done && <CheckIcon size={11} />}</span>
              <span style={{ flex: '1 1 auto', minWidth: 0, fontSize: '0.85rem', color: t.done ? 'var(--text-secondary)' : 'var(--text)' }}>{t.label}</span>
              <SubmitButton formAction={deleteTask.bind(null, t.id)} ariaLabel="Supprimer l'exercice" pendingLabel="…" style={{ ...iconButton, border: 0 }}><CrossIcon /></SubmitButton>
            </form>
          ))}
          <form key={`task-${tasks.length}`} action={addTask.bind(null, s.id)} style={{ display: 'flex', gap: '8px' }}>
            <input name="label" aria-label="Nouvel exercice" required maxLength={300} placeholder="Nouvel exercice…" className="coaching-field" style={{ ...small, flex: '1 1 auto', minWidth: 0 }} />
            <SubmitButton pendingLabel="…" style={{ ...ui.secondaryButton, minHeight: '40px', flex: 'none' }}>Ajouter</SubmitButton>
          </form>
          {doneCount > 0 && (
            <form>
              <SubmitButton formAction={clearDoneTasks.bind(null, s.id)} confirm="Retirer les exercices déjà cochés ?" pendingLabel="…" style={linkButton}>
                Retirer les exercices faits
              </SubmitButton>
            </form>
          )}
        </Card>
      </div>

      {/* Sessions */}
      <Card title="Sessions" aside="les notes partagées apparaissent dans l'espace de l'élève">
        <details open={sessions.length === 0}>
          <summary style={{ ...ui.primaryButton, minHeight: '42px', padding: '0 18px', fontSize: '0.82rem', display: 'inline-flex', listStyle: 'none' }}>+ Nouvelle session</summary>
          <form key={`session-${sessions.length}`} action={addSession.bind(null, s.id)} style={{ marginTop: '14px' }}>
            <SessionFields defaults={{ date: today }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
              <SubmitButton style={{ ...ui.primaryButton, minHeight: '42px', padding: '0 18px', fontSize: '0.82rem' }}>Enregistrer la session</SubmitButton>
            </div>
          </form>
        </details>

        {sessions.map((se) => (
          <article key={se.id} style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-bright)' }}>{se.title}</span>
              <span style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '10px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {formatShortDate(se.date)}
                {se.vodUrl && <a href={se.vodUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-light)' }}>VOD</a>}
                {se.logsUrl && <a href={se.logsUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-light)' }}>Logs</a>}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
              <div style={noteBox(false)}>
                <span style={{ ...noteLabel, color: 'var(--accent-light)' }}>Partagée</span>
                <p style={noteText}>{se.sharedNote || '—'}</p>
              </div>
              <div style={noteBox(true)}>
                <span style={{ ...noteLabel, display: 'inline-flex', alignItems: 'center', gap: '6px' }}><LockIcon size={11} />Privée</span>
                <p style={{ ...noteText, color: 'var(--text-secondary)' }}>{se.privateNote || '—'}</p>
              </div>
            </div>
            <details>
              <summary style={summary}>Modifier</summary>
              <form action={updateSession.bind(null, se.id)} style={{ marginTop: '12px' }}>
                <SessionFields defaults={se} />
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginTop: '12px' }}>
                  <SubmitButton formAction={deleteSession.bind(null, se.id)} confirm="Supprimer cette session ?" pendingLabel="…" style={{ ...ui.secondaryButton, backgroundColor: 'transparent', color: 'var(--text-secondary)' }}>Supprimer</SubmitButton>
                  <SubmitButton style={ui.secondaryButton}>Enregistrer</SubmitButton>
                </div>
              </form>
            </details>
          </article>
        ))}
      </Card>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function SessionFields({ defaults }: { defaults: Partial<Pick<Session, 'date' | 'title' | 'vodUrl' | 'logsUrl' | 'sharedNote' | 'privateNote'>> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
        <Field label="Date"><input type="date" name="date" required defaultValue={defaults.date ?? ''} className="coaching-field" style={{ ...small, colorScheme: 'dark' }} /></Field>
        <Field label="Titre"><input name="title" required maxLength={120} defaultValue={defaults.title ?? ''} placeholder="Donjon +niveau · VOD review" className="coaching-field" style={small} /></Field>
        <Field label="Lien VOD"><input type="url" name="vodUrl" defaultValue={defaults.vodUrl ?? ''} placeholder="https://" className="coaching-field" style={small} /></Field>
        <Field label="Lien Warcraft Logs"><input type="url" name="logsUrl" defaultValue={defaults.logsUrl ?? ''} placeholder="https://" className="coaching-field" style={small} /></Field>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
        <Field label="Note partagée · visible par l'élève">
          <textarea name="sharedNote" rows={4} defaultValue={defaults.sharedNote ?? ''} placeholder="Points forts, erreurs à corriger, priorités…" className="coaching-field" style={{ ...ui.textarea, fontSize: '0.88rem' }} />
        </Field>
        <Field label="Note privée · visible par toi seul">
          <textarea name="privateNote" rows={4} defaultValue={defaults.privateNote ?? ''} placeholder="Ce que tu ne veux pas afficher à l'élève…" className="coaching-field" style={{ ...ui.textarea, fontSize: '0.88rem', borderStyle: 'dashed', borderColor: 'var(--border-glow)' }} />
        </Field>
      </div>
    </div>
  )
}

function Card({ title, aside, children }: { title: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <div style={{ ...ui.card, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px', minWidth: 0 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
        <h3 style={ui.sectionTitle}>{title}</h3>
        {aside && <span style={hint}>{aside}</span>}
      </div>
      {children}
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{label}</span>
      {children}
    </label>
  )
}

function LockIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--accent-light)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */

const twoCols: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }
const small: CSSProperties = { ...ui.input, minHeight: '40px', padding: '0 10px', fontSize: '0.88rem' }
const hint: CSSProperties = { fontSize: '0.75rem', color: 'var(--text-secondary)' }
const summary: CSSProperties = { cursor: 'pointer', fontSize: '0.78rem', letterSpacing: '0.06em', color: 'var(--text-secondary)', width: 'fit-content' }
const srOnly: CSSProperties = { position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }
const iconButton: CSSProperties = {
  flex: 'none', width: '36px', height: '40px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)',
}
const linkButton: CSSProperties = {
  background: 'none', border: 0, padding: '6px 0', color: 'var(--text-secondary)', fontSize: '0.75rem',
  letterSpacing: '0.06em', fontFamily: 'var(--font-inter), sans-serif',
}
const noteLabel: CSSProperties = { fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)' }
const noteText: CSSProperties = { fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text)', whiteSpace: 'pre-wrap' }
function noteBox(isPrivate: boolean): CSSProperties {
  return {
    padding: '12px 14px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '4px',
    backgroundColor: isPrivate ? 'transparent' : 'var(--bg-surface)',
    border: isPrivate ? '1px dashed var(--border-glow)' : '1px solid var(--border)',
  }
}
