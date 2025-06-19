import type { Metadata } from 'next'
import { Anton, Montserrat } from 'next/font/google'
import './globals.css'

// Optimize font loading with better performance settings
const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

const montserrat = Montserrat({
  weight: ['400proč ', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = {
  title: {
    default: 'Kurz Profesionální Tvorby Videí | Double Tap',
    template: '%s | Double Tap'
  },
  description: 'Naučte se natáčet profesionální videa telefonem za 4 d