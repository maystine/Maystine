import { asc, desc, eq, sql } from 'drizzle-orm'
import { notFound, redirect } from 'next/navigation'
import { auth } from '@/auth'
import { getDb, schema } from '@/lib/db'

const { students, goals, tasks, sessions, coachingRequests } = schema

/** À appeler en tête de chaque page et action admin. */
export async function requireAdmin() {
  const session = await auth()
  if (!session?.user) redirect('/espace/connexion')
  if (!session.user.isAdmin) notFound()
  return session.user
}

export async function listStudents() {
  const db = getDb()
  return db
    .select({
      id: students.id,
      character: students.character,
      spec: students.spec,
      discordAvatar: students.discordAvatar,
      nextSessionAt: students.nextSessionAt,
      archived: students.archived,
      tasksTotal: sql<number>`(select count(*)::int from ${tasks} where ${tasks.studentId} = ${students.id})`,
      tasksDone: sql<number>`(select count(*)::int from ${tasks} where ${tasks.studentId} = ${students.id} and ${tasks.done})`,
    })
    .from(students)
    .orderBy(asc(students.archived), asc(students.character))
}

export async function listNewRequests() {
  return getDb()
    .select()
    .from(coachingRequests)
    .where(eq(coachingRequests.status, 'new'))
    .orderBy(desc(coachingRequests.createdAt))
}

export async function getStudentFull(id: number) {
  const db = getDb()
  const [student] = await db.select().from(students).where(eq(students.id, id)).limit(1)
  if (!student) return null
  const [goalRows, taskRows, sessionRows] = await Promise.all([
    db.select().from(goals).where(eq(goals.studentId, id)).orderBy(asc(goals.position), asc(goals.id)),
    db.select().from(tasks).where(eq(tasks.studentId, id)).orderBy(asc(tasks.createdAt), asc(tasks.id)),
    db.select().from(sessions).where(eq(sessions.studentId, id)).orderBy(desc(sessions.date), desc(sessions.id)),
  ])
  return { student, goals: goalRows, tasks: taskRows, sessions: sessionRows }
}

export async function getRequest(id: number) {
  const [row] = await getDb().select().from(coachingRequests).where(eq(coachingRequests.id, id)).limit(1)
  return row ?? null
}
