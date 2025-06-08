import type { Metadata } from 'next'
import { Anton, Montserrat } from 'next/font/google'
import './globals.css'

// Optimize font loading with Next.js built-in optimization
const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
})

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kurz Profesionální Tvorby Videí | VideoKurz.cz',
  description: 'Naučte se natáčet profesionální videa za pouhé 4 dny. Dotovaný kurz pro začátečníky i pokročilé.',
  keywords: 'kurz videa, tvorba videí, video marketing, profesionální videa, Praha',
  authors: [{ name: 'Double Tap' }],
  creator: 'Double Tap',
  publisher: 'Double Tap',
  openGraph: {
    title: 'Kurz Profesionální Tvorby Videí | VideoKurz.cz',
    description: 'Naučte se natáčet profesionální videa za pouhé 4 dny. Dotovaný kurz pro začátečníky i pokročilé.',
    url: 'https://videokurz.cz',
    siteName: 'VideoKurz.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kurz Profesionální Tvorby Videí | VideoKurz.cz',
    description: 'Naučte se natáčet profesionální videa za pouhé 4 dny. Dotovaný kurz pro začátečníky i pokročilé.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" className={`${anton.variable} ${montserrat.variable}`}>
      <body className="font-montserrat text-brand-gray antialiased">
        {children}
      </body>
    </html>
  )
}