import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kurz Profesionální Tvorby Videí | VideoKurz.cz',
  description: 'Naučte se natáčet profesionální videa za pouhé 4 dny. Dotovaný kurz pro začátečníky i pokročilé.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <head>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}