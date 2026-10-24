import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { CSSProperties } from 'react'
import { auth } from '@/auth'
import { DiscordAvatar } from '@/components/coaching/UserChip'
import DiscordIcon from '@/components/icons/DiscordIcon'
import * as ui from '@/components/coaching/ui'
import { signOutAction } from '@/lib/auth-actions'
import { formatMonthYear, formatSessionDateTime, formatShortDate } from '@/lib/format'
import { getPendingRequest, getStudentView, refreshDiscordProfile } from '@/lib/students'
import SessionList from './SessionList'
import TaskList from './TaskList'

export const metadata: Metadata = {
  title: 'Mon suivi coaching',
  robots: { index: false },
}

export default async function EspacePage() {
  const session = await auth()
  if (!session?.user) redirect('/espace/connexion')
  const user = session.user

  const view = await getStudentView(user.discordId)

  if (!view) {
    const pending = await getPendingRequest(user.discordId)
    return <NoStudentYet username={user.username} image={user.image ?? null} hasPending={!!pending} isAdmin={user.isAdmin} />
  }

  const { student, goals, tasks, sessions } = view
  if (student.discordUsername !== user.username || student.discordAvatar !== (user.image ?? null)) {
    await refreshDiscordProfile(student.id, user.username, user.image ?? null)
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{
        position: 'absolute', top: '-120px', right: '-80px', width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(124, 58, 237, 0.12) 0%, transparent 70%)', pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem) 6rem', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Profil */}
        <section aria-label="Profil" className="fade-up" style={{ ...ui.card, padding: 'clamp(20px, 3vw, 28px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: 0 }}>
            <DiscordAvatar src={user.image ?? null} size={64} alt="" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
              <h1 style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '0.06em', lineHeight: 1.1, color: 'var(--text-bright)' }}>{student.character}</h1>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{student.realm} · {student.spec}</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '28px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text)' }}>
                <DiscordIcon size={13} color={ui.DISCORD_BLUE} />@{user.username}
              </span>
              <form action={signOutAction}>
                <button type="submit" style={{ background: 'none', border: 0, padding: '6px 0', color: 'var(--text-secondary)', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'var(--font-inter), sans-serif' }}>
                  Se déconnecter
                </button>
              </form>
            </div>
            <Stat value={String(sessions.length)} label="Sessions" />
            <Stat value={formatMonthYear(student.createdAt)} label="Élève depuis" />
          </div>
        </section>

        {user.isAdmin && <AdminLink />}

        <div style={{ display: 'flex', flexDirection: 'row-reverse', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
          {/* Colonne droite : prochaine session, objectifs, plan */}
          <aside className="fade-up fade-up-delay-1" style={{ flex: '1 1 320px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <section aria-labelledby="next-title" style={{
              borderRadius: '12px', border: '1px solid var(--border-glow)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px',
              background: 'linear-gradient(160deg, rgba(124, 58, 237, 0.18), var(--bg-card) 70%)',
            }}>
              <h2 id="next-title" style={ui.sectionTitle}>Prochaine session</h2>
              {student.nextSessionAt ? (
                <p style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: '1.4rem', letterSpacing: '0.04em', color: 'var(--text-bright)' }}>
                  {formatSessionDateTime(student.nextSessionAt)}
                </p>
              ) : (
                <p style={{ fontSize: '0.95rem', color: 'var(--text)' }}>Pas encore planifiée : on la cale ensemble sur Discord.</p>
              )}
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>Pense à envoyer ta VOD et tes logs avant la session.</p>
              <a href={ui.DISCORD_INVITE} target="_blank" rel="noopener noreferrer" style={{ ...ui.primaryButton, minHeight: '46px', padding: '0 20px' }}>Rejoindre le Discord</a>
            </section>

            <section aria-labelledby="obj-title" style={{ ...ui.card, padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <h2 id="obj-title" style={ui.sectionTitle}>Objectifs</h2>
              {goals.length === 0 && <p style={emptyText}>Tes objectifs seront fixés lors de ta première session.</p>}
              {goals.map((g) => (
                <div key={g.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', fontSize: '0.88rem' }}>
                    <span style={{ color: 'var(--text)', fontWeight: 400 }}>{g.label}</span>
                    <span style={{ flexShrink: 0, color: 'var(--accent-light)', fontWeight: 500 }}>{g.progress} %</span>
                  </div>
                  <div role="progressbar" aria-label={g.label} aria-valuenow={g.progress} aria-valuemin={0} aria-valuemax={100} style={{ height: '6px', borderRadius: '3px', backgroundColor: 'var(--border)' }}>
                    <div style={{ width: `${g.progress}%`, height: '6px', borderRadius: '3px', background: 'linear-gradient(90deg, var(--accent), var(--accent-light))', boxShadow: '0 0 8px rgba(168, 85, 247, 0.5)' }} />
                  </div>
                </div>
              ))}
            </section>

            <section aria-labelledby="plan-title" style={{ ...ui.card, position: 'relative', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h2 id="plan-title" style={ui.sectionTitle}>Plan de travail</h2>
              <TaskList tasks={tasks} />
            </section>
          </aside>

          {/* Colonne gauche : historique */}
          <section aria-labelledby="hist-title" className="fade-up fade-up-delay-2" style={{ flex: '999 1 560px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 id="hist-title" style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: '1.25rem', letterSpacing: '0.08em', color: 'var(--text-bright)' }}>Historique des sessions</h2>
            <SessionList sessions={sessions.map((s) => ({ ...s, dateLabel: formatShortDate(s.date) }))} />
          </section>
        </div>
      </div>
    </div>
  )
}

const emptyText: CSSProperties = { fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <span style={{ fontFamily: 'var(--font-cinzel), serif', fontWeight: 700, fontSize: '1.4rem', color: 'var(--text-bright)' }}>{value}</span>
      <span style={{ fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{label}</span>
    </div>
  )
}

function AdminLink() {
  return (
    <Link href="/admin" style={{ ...ui.secondaryButton, alignSelf: 'flex-start' }}>Ouvrir l&apos;admin coach</Link>
  )
}

function NoStudentYet({ username, image, hasPending, isAdmin }: { username: string; image: string | null; hasPending: boolean; isAdmin: boolean }) {
  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', justifyContent: 'center', padding: 'clamp(4rem, 10vw, 7rem) 1rem' }}>
      <div className="fade-up" style={{ ...ui.card, width: '100%', maxWidth: '480px', alignSelf: 'flex-start', padding: 'clamp(1.75rem, 5vw, 2.5rem)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.1rem', textAlign: 'center' }}>
        <DiscordAvatar src={image} size={64} />
        <p style={{ fontSize: '0.88rem', color: 'var(--text)' }}>@{username}</p>
        <h1 style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: '1.5rem', letterSpacing: '0.06em', color: 'var(--text-bright)' }}>
          {hasPending ? 'Demande bien reçue' : 'Pas encore de suivi'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7 }}>
          {hasPending
            ? 'Je reviens vers toi sur Discord pour caler ta première session. Ton espace se remplira juste après.'
            : 'Ton espace élève est créé après ta première demande de coaching.'}
        </p>
        {!hasPending && <Link href="/coaching" style={ui.primaryButton}>Réserver une session</Link>}
        {isAdmin && <AdminLink />}
        <form action={signOutAction}>
          <button type="submit" style={{ background: 'none', border: 0, padding: '8px 0', color: 'var(--text-secondary)', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'var(--font-inter), sans-serif' }}>
            Se déconnecter
          </button>
        </form>
      </div>
    </div>
  )
}
