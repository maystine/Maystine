import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import MiniTwitchPlayer from '@/components/layout/MiniTwitchPlayer'

export const metadata: Metadata = {
  title: 'Maystine — WoW Addon Developer & Streamer',
  description: 'Addons World of Warcraft, parcours et stream par Maystine.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        <main style={{ paddingTop: '64px', position: 'relative', zIndex: 1 }}>
          {children}
        </main>
        <MiniTwitchPlayer />
      </body>
    </html>
  )
}
