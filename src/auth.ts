import NextAuth from 'next-auth'
import Discord from 'next-auth/providers/discord'

declare module 'next-auth' {
  interface Session {
    user: {
      discordId: string
      username: string
      name?: string | null
      image?: string | null
      isAdmin: boolean
    }
  }
}

/**
 * Connexion via Discord uniquement (OAuth, scope « identify ») :
 * on ne récupère que l'identifiant, le pseudo et l'avatar.
 * Le coach est reconnu par son identifiant Discord (ADMIN_DISCORD_ID).
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Discord({ authorization: { params: { scope: 'identify' } } })],
  session: { strategy: 'jwt' },
  pages: { signIn: '/espace/connexion' },
  callbacks: {
    jwt({ token, profile }) {
      if (profile) {
        token.discordId = String(profile.id)
        token.username = String(profile.username ?? '')
        token.picture = profile.avatar
          ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
          : null
        token.name = (profile.global_name as string | undefined) ?? (profile.username as string)
      }
      return token
    },
    session({ session, token }) {
      const discordId = String(token.discordId ?? '')
      session.user = {
        ...session.user,
        discordId,
        username: String(token.username ?? ''),
        name: token.name ?? null,
        image: (token.picture as string | null | undefined) ?? null,
        isAdmin: !!process.env.ADMIN_DISCORD_ID && discordId === process.env.ADMIN_DISCORD_ID,
      }
      return session
    },
  },
})
