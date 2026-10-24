import DiscordIcon from '@/components/icons/DiscordIcon'
import { DISCORD_BLUE } from './ui'

/** Avatar Discord rond + pseudo, utilisé dans le formulaire, l'espace élève et l'admin. */
export function DiscordAvatar({ src, size = 40, alt = '' }: { src: string | null; size?: number; alt?: string }) {
  return (
    <span
      style={{
        flexShrink: 0,
        width: size,
        height: size,
        borderRadius: '50%',
        border: `2px solid ${DISCORD_BLUE}`,
        backgroundColor: 'var(--bg-surface)',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: DISCORD_BLUE,
      }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} width={size} height={size} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <DiscordIcon size={Math.round(size * 0.45)} />
      )}
    </span>
  )
}

export default function UserChip({ username, image }: { username: string; image: string | null }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
      <DiscordAvatar src={image} size={32} />
      <span style={{ fontSize: '0.88rem', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis' }}>@{username}</span>
    </span>
  )
}
