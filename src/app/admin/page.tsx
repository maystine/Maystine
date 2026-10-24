import type { Metadata } from 'next'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { DiscordAvatar } from '@/components/coaching/UserChip'
import * as ui from '@/components/coaching/ui'
import { getRequest, getStudentFull, listNewRequests, listStudents, requireAdmin } from '@/lib/admin'
import { formatShortDate } from '@/lib/format'
import RequestPanel from './RequestPanel'
import StudentPanel from './StudentPanel'

export const metadata: Metadata = {
  title: 'Admin coaching',
  robots: { index: false },
}

type SearchParams = { tab?: string; id?: string; req?: string; archives?: string }

export default async function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin()

  const tab = searchParams.tab === 'demandes' ? 'demandes' : 'eleves'
  const showArchived = searchParams.archives === '1'
  const [allStudents, requests] = await Promise.all([listStudents(), listNewRequests()])
  const studentList = allStudents.filter((s) => showArchived || !s.archived)

  const selectedId = Number(searchParams.id) || studentList[0]?.id
  const selectedReq = Number(searchParams.req) || requests[0]?.id
  const student = tab === 'eleves' && selectedId ? await getStudentFull(selectedId) : null
  const request = tab === 'demandes' && selectedReq ? await getRequest(selectedReq) : null

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', padding: 'clamp(1.25rem, 3vw, 2rem) clamp(0.75rem, 2.5vw, 2rem) 4rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1 style={{ fontFamily: 'var(--font-cinzel), serif', fontSize: '1.5rem', letterSpacing: '0.08em', color: 'var(--text-bright)' }}>Coaching</h1>
          <span style={{ ...ui.badge, padding: '3px 10px', borderColor: 'var(--accent-light)' }}>Admin</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
          {/* Liste */}
          <aside aria-label="Liste" style={{ ...ui.card, flex: '1 1 300px', minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <nav aria-label="Vue" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', borderBottom: '1px solid var(--border)' }}>
              <TabLink href="/admin" active={tab === 'eleves'} label="Élèves" count={allStudents.filter((s) => !s.archived).length} />
              <TabLink href="/admin?tab=demandes" active={tab === 'demandes'} label="Demandes" count={requests.length} highlight={requests.length > 0} />
            </nav>

            {tab === 'eleves' ? (
              <>
                <ul style={{ listStyle: 'none', padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {studentList.length === 0 && <li style={emptyItem}>Aucun élève pour l&apos;instant. Accepte une demande pour créer une fiche.</li>}
                  {studentList.map((s) => (
                    <li key={s.id}>
                      <Link href={`/admin?id=${s.id}${showArchived ? '&archives=1' : ''}`} aria-current={s.id === selectedId ? 'page' : undefined} style={listItem(s.id === selectedId)}>
                        <DiscordAvatar src={s.discordAvatar} size={38} />
                        <span style={{ flex: '1 1 auto', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-bright)' }}>
                            {s.character}{s.archived && <span style={{ fontWeight: 300, color: 'var(--text-secondary)' }}> · archivé</span>}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            {s.spec} · {s.nextSessionAt ? formatShortDate(s.nextSessionAt) : 'pas de session prévue'}
                          </span>
                        </span>
                        {s.tasksTotal > 0 && (
                          <span title="Exercices cochés par l'élève" style={{ flexShrink: 0, fontSize: '0.7rem', color: 'var(--accent-light)' }}>{s.tasksDone}/{s.tasksTotal}</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={showArchived ? '/admin' : '/admin?archives=1'} style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', fontSize: '0.75rem', letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>
                  {showArchived ? 'Masquer les archivés' : 'Afficher les archivés'}
                </Link>
              </>
            ) : (
              <ul style={{ listStyle: 'none', padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {requests.length === 0 && <li style={emptyItem}>Aucune demande en attente.</li>}
                {requests.map((r) => (
                  <li key={r.id}>
                    <Link href={`/admin?tab=demandes&req=${r.id}`} aria-current={r.id === selectedReq ? 'page' : undefined} style={listItem(r.id === selectedReq)}>
                      <DiscordAvatar src={r.discordAvatar} size={38} />
                      <span style={{ flex: '1 1 auto', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-bright)' }}>{r.character}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{r.spec} · reçue le {formatShortDate(r.createdAt)}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </aside>

          {/* Détail */}
          <section style={{ flex: '999 1 640px', minWidth: 0 }}>
            {tab === 'eleves' && (student ? <StudentPanel data={student} /> : <EmptyPanel text="Sélectionne un élève dans la liste." />)}
            {tab === 'demandes' && (request && request.status === 'new' ? <RequestPanel request={request} /> : <EmptyPanel text="Aucune demande sélectionnée." />)}
          </section>
        </div>
      </div>
    </div>
  )
}

function TabLink({ href, active, label, count, highlight }: { href: string; active: boolean; label: string; count: number; highlight?: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      style={{
        minHeight: '52px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        borderBottom: `2px solid ${active ? 'var(--accent-light)' : 'transparent'}`,
        color: active ? 'var(--text-bright)' : 'var(--text-secondary)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 400,
      }}
    >
      {label}
      <span style={{ minWidth: '20px', padding: '2px 7px', borderRadius: '100px', backgroundColor: active || highlight ? 'var(--accent)' : 'var(--border-glow)', color: '#fff', fontSize: '0.7rem', letterSpacing: 0, textAlign: 'center' }}>
        {count}
      </span>
    </Link>
  )
}

function EmptyPanel({ text }: { text: string }) {
  return <div style={{ ...ui.card, padding: '32px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{text}</div>
}

function listItem(active: boolean): CSSProperties {
  return {
    display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', borderRadius: '8px',
    border: `1px solid ${active ? 'var(--border-glow)' : 'transparent'}`,
    backgroundColor: active ? 'rgba(124, 58, 237, 0.12)' : 'transparent',
  }
}

const emptyItem: CSSProperties = { padding: '16px 10px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }
