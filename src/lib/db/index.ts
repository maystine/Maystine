import { neon } from '@neondatabase/serverless'
import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http'
import * as schema from './schema'

let instance: NeonHttpDatabase<typeof schema> | null = null

/**
 * Connexion paresseuse : le site se build et tourne même sans DATABASE_URL
 * (les pages publiques n'en ont pas besoin) ; seules les fonctions qui
 * lisent ou écrivent en base lèvent une erreur si elle manque.
 */
export function getDb() {
  if (instance) return instance
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL manquante : configure la base Postgres (voir .env.example).')
  }
  instance = drizzle(neon(url), { schema })
  return instance
}

export { schema }
