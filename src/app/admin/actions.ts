'use server'

import { and, eq, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdmin, getRequest } from '@/lib/admin'
import { getDb, schema } from '@/lib/db'
import { parisLocalToDate } from '@/lib/format'
import { cleanText, cleanUrl } from '@/lib/validation'

const { students, goals, tasks, sessions, coachingRequests } = schema

function refresh() {
  revalidatePath('/admin')
  revalidatePath('/espace')
}

/* ---------------- Demandes ---------------- */

/** Crée la fiche élève à partir d'une demande (ou réactive la fiche existante du même compte Discord). */
export async function acceptRequest(requestId: number) {
  await requireAdmin()
  const req = await getRequest(requestId)
  if (!req) return
  const db = getDb()

  const [student] = await db
    .insert(students)
    .values({
      discordId: req.discordId,
      discordUsername: req.discordUsername,
      discordAvatar: req.discordAvatar,
      character: req.character,
      realm: req.realm,
      spec: req.spec,
    })
    .onConflictDoUpdate({
      target: students.discordId,
      set: { character: req.character, realm: req.realm, spec: req.spec, archived: false },
    })
    .returning({ id: students.id })

  await db.update(coachingRequests).set({ status: 'accepted' }).where(eq(coachingRequests.id, requestId))

  // On reprend l'objectif saisi dans le formulaire comme premier objectif, s'il y en a un et qu'aucun n'existe.
  if (req.goal) {
    const existing = await db.select({ id: goals.id }).from(goals).where(eq(goals.studentId, student.id)).limit(1)
    if (existing.length === 0) {
      await db.insert(goals).values({ studentId: student.id, label: req.goal.slice(0, 200), progress: 0 })
    }
  }

  refresh()
  redirect(`/admin?id=${student.id}`)
}

export async function declineRequest(requestId: number) {
  await requireAdmin()
  await getDb().update(coachingRequests).set({ status: 'declined' }).where(eq(coachingRequests.id, requestId))
  refresh()
  redirect('/admin?tab=demandes')
}

/* ---------------- Fiche élève ---------------- */

export async function updateProfile(studentId: number, formData: FormData) {
  await requireAdmin()
  const character = cleanText(formData.get('character'), 40)
  const realm = cleanText(formData.get('realm'), 40)
  const spec = cleanText(formData.get('spec'), 40)
  if (!character || !realm || !spec) return
  await getDb().update(students).set({ character, realm, spec }).where(eq(students.id, studentId))
  refresh()
}

export async function updateNextSession(studentId: number, formData: FormData) {
  await requireAdmin()
  const date = cleanText(formData.get('date'), 10)
  const time = cleanText(formData.get('time'), 5) || '20:00'
  const next = date ? parisLocalToDate(date, time) : null
  await getDb().update(students).set({ nextSessionAt: next }).where(eq(students.id, studentId))
  refresh()
}

export async function savePrivateNotes(studentId: number, formData: FormData) {
  await requireAdmin()
  await getDb()
    .update(students)
    .set({ privateNotes: cleanText(formData.get('privateNotes'), 10000) })
    .where(eq(students.id, studentId))
  refresh()
}

export async function setArchived(studentId: number, archived: boolean) {
  await requireAdmin()
  await getDb().update(students).set({ archived }).where(eq(students.id, studentId))
  refresh()
}

/* ---------------- Objectifs ---------------- */

export async function addGoal(studentId: number, formData: FormData) {
  await requireAdmin()
  const label = cleanText(formData.get('label'), 200)
  if (!label) return
  const db = getDb()
  const [{ max }] = await db
    .select({ max: sql<number>`coalesce(max(${goals.position}), -1)::int` })
    .from(goals)
    .where(eq(goals.studentId, studentId))
  await db.insert(goals).values({ studentId, label, position: max + 1 })
  refresh()
}

export async function updateGoal(goalId: number, formData: FormData) {
  await requireAdmin()
  const label = cleanText(formData.get('label'), 200)
  const progress = Math.max(0, Math.min(100, Math.round(Number(formData.get('progress')) || 0)))
  if (!label) return
  await getDb().update(goals).set({ label, progress }).where(eq(goals.id, goalId))
  refresh()
}

export async function deleteGoal(goalId: number) {
  await requireAdmin()
  await getDb().delete(goals).where(eq(goals.id, goalId))
  refresh()
}

/* ---------------- Plan de travail ---------------- */

export async function addTask(studentId: number, formData: FormData) {
  await requireAdmin()
  const label = cleanText(formData.get('label'), 300)
  if (!label) return
  await getDb().insert(tasks).values({ studentId, label })
  refresh()
}

export async function deleteTask(taskId: number) {
  await requireAdmin()
  await getDb().delete(tasks).where(eq(tasks.id, taskId))
  refresh()
}

/** Vide les exercices déjà cochés (utile avant de donner un nouveau plan). */
export async function clearDoneTasks(studentId: number) {
  await requireAdmin()
  await getDb().delete(tasks).where(and(eq(tasks.studentId, studentId), eq(tasks.done, true)))
  refresh()
}

/* ---------------- Sessions ---------------- */

export async function addSession(studentId: number, formData: FormData) {
  await requireAdmin()
  const date = cleanText(formData.get('date'), 10)
  const title = cleanText(formData.get('title'), 120)
  const vodUrl = cleanUrl(formData.get('vodUrl'))
  const logsUrl = cleanUrl(formData.get('logsUrl'))
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !title) return
  await getDb().insert(sessions).values({
    studentId,
    date,
    title,
    vodUrl: vodUrl || null,
    logsUrl: logsUrl || null,
    sharedNote: cleanText(formData.get('sharedNote'), 10000),
    privateNote: cleanText(formData.get('privateNote'), 10000),
  })
  refresh()
}

export async function updateSession(sessionId: number, formData: FormData) {
  await requireAdmin()
  const date = cleanText(formData.get('date'), 10)
  const title = cleanText(formData.get('title'), 120)
  const vodUrl = cleanUrl(formData.get('vodUrl'))
  const logsUrl = cleanUrl(formData.get('logsUrl'))
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !title) return
  await getDb()
    .update(sessions)
    .set({
      date,
      title,
      vodUrl: vodUrl || null,
      logsUrl: logsUrl || null,
      sharedNote: cleanText(formData.get('sharedNote'), 10000),
      privateNote: cleanText(formData.get('privateNote'), 10000),
    })
    .where(eq(sessions.id, sessionId))
  refresh()
}

export async function deleteSession(sessionId: number) {
  await requireAdmin()
  await getDb().delete(sessions).where(eq(sessions.id, sessionId))
  refresh()
}
