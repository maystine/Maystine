'use server'

import { signIn, signOut } from '@/auth'

/** Formulaire « Se connecter avec Discord » : un champ caché `redirectTo` indique où revenir. */
export async function signInWithDiscord(formData: FormData) {
  const raw = formData.get('redirectTo')
  // On n'accepte que des chemins internes pour éviter toute redirection externe.
  const redirectTo = typeof raw === 'string' && raw.startsWith('/') && !raw.startsWith('//') ? raw : '/espace'
  await signIn('discord', { redirectTo })
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' })
}
