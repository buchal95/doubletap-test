import type { Metadata } from 'next'
import { Anton, Montserrat } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
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
  weight: ['400', '500', '600', '700'],
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
  description: 'Naučte se natáčet profesionální videa telefonem za 4 dny s 82% státní dotací. Kurz pro začátečníky i pokročilé v Praze. Platíte jen 2 700 Kč místo 15 000 Kč.',
  keywords: [
    'kurz tvorby videí',
    'profesionální videa',
    'video marketing',
    'sociální sítě',
    'dotovaný kurz',
    'Praha',
    'smartphone video',
    'Instagram videa',
    'TikTok videa',
    'YouTube videa',
    'video produkce',
    'Double Tap'
  ],
  authors: [{ name: 'Double Tap', url: 'https://doubletap.cz' }],
  creator: 'Double Tap',
  publisher: 'Double Tap',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://doubletap.cz'),
  alternates: {
    canonical: '/',
    languages: {
      'cs-CZ': '/',
    },
  },
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
    description: 'Naučte se natáčet profesionální videa telefonem za 4 dny s 82% státní dotací. Platíte jen 2 700 Kč místo 15 000 Kč.',
    url: '/',
    siteName: 'Double Tap',
    locale: 'cs_CZ',
    type: 'website',
    images: [
      {
        url: '/social-share.webp',
        width: 1200,
        height: 630,
        alt: 'Double Tap - Kurz profesionální tvorby videí telefonem s 82% státní dotací',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kurz Profesionální Tvorby Videí | Double Tap',
    description: 'Naučte se natáčet profesionální videa telefonem za 4 dny s 82% státní dotací.',
    images: ['/social-share.webp'],
    creator: '@doubletap_cz',
    site: '@doubletap_cz',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'education',
  // Additional metadata for better LinkedIn support
  other: {
    'og:image:secure_url': (process.env.NEXT_PUBLIC_SITE_URL || 'https://doubletap.cz') + '/social-share.webp',
    'og:updated_time': new Date().toISOString(),
    'article:author': 'Double Tap',
    'article:publisher': 'https://www.facebook.com/doubletap.kurzy',
    'linkedin:owner': 'Double Tap',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doubletap.cz';

  return (
    <html lang="cs" className={`${anton.variable} ${montserrat.variable}`}>
      <head>
        {/* Explicit OpenGraph meta tags for better LinkedIn compatibility */}
        <meta property="og:title" content="Kurz Profesionální Tvorby Videí | Double Tap" />
        <meta property="og:description" content="Naučte se natáčet profesionální videa telefonem za 4 dny s 82% státní dotací. Platíte jen 2 700 Kč místo 15 000 Kč." />
        <meta property="og:image" content={`${baseUrl}/social-share.webp`} />
        <meta property="og:image:secure_url" content={`${baseUrl}/social-share.webp`} />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Double Tap - Kurz profesionální tvorby videí telefonem s 82% státní dotací" />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Double Tap" />
        <meta property="og:locale" content="cs_CZ" />
        <meta property="og:updated_time" content={new Date().toISOString()} />
        
        {/* LinkedIn specific meta tags */}
        <meta name="linkedin:owner" content="Double Tap" />
        <meta property="article:author" content="Double Tap" />
        <meta property="article:publisher" content="https://www.facebook.com/doubletap.kurzy" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@doubletap_cz" />
        <meta name="twitter:creator" content="@doubletap_cz" />
        <meta name="twitter:title" content="Kurz Profesionální Tvorby Videí | Double Tap" />
        <meta name="twitter:description" content="Naučte se natáčet profesionální videa telefonem za 4 dny s 82% státní dotací." />
        <meta name="twitter:image" content={`${baseUrl}/social-share.webp`} />
        <meta name="twitter:image:alt" content="Double Tap - Kurz profesionální tvorby videí telefonem s 82% státní dotací" />

        {/* Additional meta tags for better social sharing */}
        <meta name="description" content="Naučte se natáčet profesionální videa telefonem za 4 dny s 82% státní dotací. Kurz pro začátečníky i pokročilé v Praze. Platíte jen 2 700 Kč místo 15 000 Kč." />
        <meta name="author" content="Double Tap" />
        <meta name="publisher" content="Double Tap" />
        <meta name="copyright" content="Double Tap" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={baseUrl} />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/doubletap-logo.webp" as="image" type="image/webp" />
        <link rel="preload" href="/hero-image.webp" as="image" type="image/webp" />
        <link rel="preload" href="/social-share.webp" as="image" type="image/webp" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//images.pexels.com" />
        <link rel="dns-prefetch" href="//vitals.vercel-insights.com" />
        
        {/* Set default consent BEFORE GTM loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
              });
            `
          }}
        />
        
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M3ZNVD4K');`
          }}
        />
        {/* End Google Tag Manager */}
        
        <link rel="icon" type="image/png" sizes="16x16" href="/fav16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/fav32.png" />
        <link rel="shortcut icon" href="/fav16.png" />
        <link rel="apple-touch-icon" href="/fav32.png" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${baseUrl}/#organization`,
                  "name": "Double Tap",
                  "url": baseUrl,
                  "logo": {
                    "@type": "ImageObject",
                    "url": `${baseUrl}/doubletap-logo.webp`
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+420770650852",
                    "email": "mrkt.doubletap@gmail.com",
                    "contactType": "customer service",
                    "areaServed": "CZ",
                    "availableLanguage": "cs"
                  },
                  "sameAs": [
                    "https://www.facebook.com/doubletap.kurzy",
                    "https://www.instagram.com/doubletap.cz"
                  ]
                },
                {
                  "@type": "Course",
                  "@id": `${baseUrl}/#course`,
                  "name": "Kurz Profesionální Tvorby Videí",
                  "description": "4-denní intenzivní kurz tvorby profesionálních videí pomocí mobilního telefonu. Určeno pro začátečníky i pokročilé.",
                  "provider": {
                    "@id": `${baseUrl}/#organization`
                  },
                  "hasCourseInstance": {
                    "@type": "CourseInstance",
                    "courseMode": "onsite",
                    "duration": "P4D",
                    "inLanguage": "cs",
                    "location": {
                      "@type": "Place",
                      "name": "Praha",
                      "addressCountry": "CZ"
                    }
                  },
                  "offers": {
                    "@type": "Offer",
                    "price": "2700",
                    "priceCurrency": "CZK",
                    "priceValidUntil": "2025-10-31",
                    "availability": "https://schema.org/InStock",
                    "validFrom": "2025-01-01",
                    "description": "Cena s 82% státní dotací"
                  },
                  "educationalLevel": "Beginner to Intermediate",
                  "teaches": [
                    "Profesionální natáčení mobilním telefonem",
                    "Postprodukce a střih videí",
                    "Obsah pro sociální sítě",
                    "Video marketing"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": `${baseUrl}/#website`,
                  "url": baseUrl,
                  "name": "Double Tap - Kurz Profesionální Tvorby Videí",
                  "description": "Naučte se natáčet profesionální videa telefonem za 4 dny",
                  "publisher": {
                    "@id": `${baseUrl}/#organization`
                  },
                  "inLanguage": "cs"
                }
              ]
            })
          }}
        />
      </head>
      <body className="font-montserrat text-brand-gray antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-M3ZNVD4K"
            height="0" 
            width="0" 
            style={{display:'none', visibility:'hidden'}}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        {children}
        
        {/* Vercel Speed Insights */}
        <SpeedInsights />
      </body>
    </html>
  )
}