import {
  boolean,
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

/** Briefs envoyés depuis le formulaire public /coaching. */
export const coachingRequests = pgTable('coaching_requests', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  character: text('character').notNull(),
  realm: text('realm').notNull(),
  spec: text('spec').notNull(),
  /** Compte Discord connecté au moment de l'envoi (connexion obligatoire). */
  discordId: text('discord_id').notNull(),
  discordUsername: text('discord_username').notNull(),
  discordAvatar: text('discord_avatar'),
  goal: text('goal').notNull().default(''),
  vodUrl: text('vod_url'),
  logsUrl: text('logs_url'),
  /** new | accepted | declined */
  status: text('status').notNull().default('new'),
})

/** Fiches élèves gérées depuis l'admin. */
export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  discordId: text('discord_id').notNull().unique(),
  discordUsername: text('discord_username').notNull(),
  discordAvatar: text('discord_avatar'),
  character: text('character').notNull(),
  realm: text('realm').notNull(),
  spec: text('spec').notNull(),
  nextSessionAt: timestamp('next_session_at', { withTimezone: true }),
  /** Notes générales, visibles uniquement par le coach. */
  privateNotes: text('private_notes').notNull().default(''),
  archived: boolean('archived').notNull().default(false),
})

export const goals = pgTable('goals', {
  id: serial('id').primaryKey(),
  studentId: integer('student_id')
    .notNull()
    .references(() => students.id, { onDelete: 'cascade' }),
  label: text('label').notNull(),
  progress: integer('progress').notNull().default(0),
  position: integer('position').notNull().default(0),
})

/** Plan de travail : exercices que l'élève coche entre deux sessions. */
export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  studentId: integer('student_id')
    .notNull()
    .references(() => students.id, { onDelete: 'cascade' }),
  label: text('label').notNull(),
  done: boolean('done').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  studentId: integer('student_id')
    .notNull()
    .references(() => students.id, { onDelete: 'cascade' }),
  date: date('date').notNull(),
  title: text('title').notNull(),
  vodUrl: text('vod_url'),
  logsUrl: text('logs_url'),
  /** Visible par l'élève. */
  sharedNote: text('shared_note').notNull().default(''),
  /** Visible uniquement par le coach. */
  privateNote: text('private_note').notNull().default(''),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export type CoachingRequest = typeof coachingRequests.$inferSelect
export type Student = typeof students.$inferSelect
export type Goal = typeof goals.$inferSelect
export type Task = typeof tasks.$inferSelect
export type Session = typeof sessions.$inferSelect
