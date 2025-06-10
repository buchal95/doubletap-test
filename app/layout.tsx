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
  title: 'Kurz Profesionální Tvorby Videí | Double Tap',
  description: 'Naučte se natáčet profesionální videa za pouhé 4 dny. Dotovaný kurz pro začátečníky i pokročilé.',
  keywords: 'kurz videa, tvorba videí, video marketing, profesionální videa, Praha, Double Tap',
  authors: [{ name: 'Double Tap' }],
  creator: 'Double Tap',
  publisher: 'Double Tap',
  icons: {
    icon: [
      {
        url: '/fav16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/fav32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    shortcut: '/fav16.png',
    apple: '/fav32.png',
  },
  openGraph: {
    title: 'Kurz Profesionální Tvorby Videí | Double Tap',
    description: 'Naučte se natáčet profesionální videa za pouhé 4 dny. Dotovaný kurz pro začátečníky i pokročilé.',
    url: 'https://doubletap.cz',
    siteName: 'Double Tap',
    locale: 'cs_CZ',
    type: 'website',
    images: [
      {
        url: '/fav32.png',
        width: 32,
        height: 32,
        alt: 'Double Tap Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kurz Profesionální Tvorby Videí | Double Tap',
    description: 'Naučte se natáčet profesionální videa za pouhé 4 dny. Dotovaný kurz pro začátečníky i pokročilé.',
    images: ['/fav32.png'],
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
      <head>
        <link rel="icon" type="image/png" sizes="16x16" href="/fav16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/fav32.png" />
        <link rel="shortcut icon" href="/fav16.png" />
        <link rel="apple-touch-icon" href="/fav32.png" />
      </head>
      <body className="font-montserrat text-brand-gray antialiased">
        {children}
      </body>
    </html>
  )
}