import { and, asc, desc, eq } from 'drizzle-orm'
import { getDb, schema } from '@/lib/db'

const { students, goals, tasks, sessions } = schema

/**
 * Données visibles par l'élève : on sélectionne les colonnes explicitement
 * pour que les notes privées du coach ne quittent jamais le serveur.
 */
export async function getStudentView(discordId: string) {
  const db = getDb()
  const [student] = await db
    .select({
      id: students.id,
      createdAt: students.createdAt,
      discordUsername: students.discordUsername,
      discordAvatar: students.discordAvatar,
      character: students.character,
      realm: students.realm,
      spec: students.spec,
      nextSessionAt: students.nextSessionAt,
    })
    .from(students)
    .where(and(eq(students.discordId, discordId), eq(students.archived, false)))
    .limit(1)

  if (!student) return null

  const [goalRows, taskRows, sessionRows] = await Promise.all([
    db.select({ id: goals.id, label: goals.label, progress: goals.progress })
      .from(goals).where(eq(goals.studentId, student.id)).orderBy(asc(goals.position), asc(goals.id)),
    db.select({ id: tasks.id, label: tasks.label, done: tasks.done })
      .from(tasks).where(eq(tasks.studentId, student.id)).orderBy(asc(tasks.createdAt), asc(tasks.id)),
    db.select({
      id: sessions.id, date: sessions.date, title: sessions.title,
      vodUrl: sessions.vodUrl, logsUrl: sessions.logsUrl, sharedNote: sessions.sharedNote,
    })
      .from(sessions).where(eq(sessions.studentId, student.id)).orderBy(desc(sessions.date), desc(sessions.id)),
  ])

  return { student, goals: goalRows, tasks: taskRows, sessions: sessionRows }
}

/** Garde à jour le pseudo et l'avatar Discord affichés (ils peuvent changer côté Discord). */
export async function refreshDiscordProfile(studentId: number, username: string, avatar: string | null) {
  await getDb()
    .update(students)
    .set({ discordUsername: username, discordAvatar: avatar })
    .where(eq(students.id, studentId))
}

export async function getPendingRequest(discordId: string) {
  const [row] = await getDb()
    .select({ id: schema.coachingRequests.id, createdAt: schema.coachingRequests.createdAt })
    .from(schema.coachingRequests)
    .where(and(eq(schema.coachingRequests.discordId, discordId), eq(schema.coachingRequests.status, 'new')))
    .limit(1)
  return row ?? null
}
