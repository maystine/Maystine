import type { Metadata } from 'next'
import { Cinzel, Inter, Caveat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import MiniTwitchPlayer from '@/components/layout/MiniTwitchPlayer'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-caveat',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://maystine.vercel.app'),
  title: {
    default: "Maystine's Lair",
    template: "%s | Maystine's Lair",
  },
  description: 'Addons World of Warcraft, parcours esport et stream par Maystine — joueur pro Mandatory & Echo.',
  openGraph: {
    siteName: 'Maystine',
    locale: 'fr_FR',
    type: 'website',
  },
  verification: {
    google: 'OopVWrnGTa2dXuSJGIOaJ6fbqGxTImRHoBHwfwvZ_y4',
  },
  twitter: {
    card: 'summary',
    site: '@Maystine_',
    creator: '@Maystine_',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${cinzel.variable} ${inter.variable} ${caveat.variable}`}>
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
