'use server'

import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { getDb, schema } from '@/lib/db'

/** L'élève coche / décoche un exercice de son plan de travail. */
export async function setTaskDone(taskId: number, done: boolean) {
  const session = await auth()
  if (!session?.user?.discordId) throw new Error('Non connecté')

  const db = getDb()
  const [student] = await db
    .select({ id: schema.students.id })
    .from(schema.students)
    .where(eq(schema.students.discordId, session.user.discordId))
    .limit(1)
  if (!student) throw new Error('Fiche élève introuvable')

  // La condition sur student_id empêche de modifier l'exercice d'un autre élève.
  await db
    .update(schema.tasks)
    .set({ done })
    .where(and(eq(schema.tasks.id, taskId), eq(schema.tasks.studentId, student.id)))

  revalidatePath('/espace')
}
