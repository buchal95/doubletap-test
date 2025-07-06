import type { Metadata } from 'next'
import { Anton, Montserrat } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import PerformantLayout from './components/layout/PerformantLayout'
import { generateMetadata as generateSEOMetadata, generateStructuredData } from '../lib/seo'
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

export const metadata: Metadata = generateSEOMetadata({
  title: 'Kurz profesionální tvorby videí s 82% dotací od státu',
  description: 'Naučte se natáčet profesionální videa telefonem za 4 dny s 82% státní dotací. Kurz pro začátečníky i pokročilé v Praze. Platíte jen 2 700 Kč místo 15 000 Kč.',
  keywords: [
    'video marketing',
    'sociální sítě',
    'dotovaný kurz',
    'smartphone video',
    'Instagram videa',
    'TikTok videa',
    'YouTube videa'
  ]
});

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
        <link rel="dns-prefetch" href="//vercel.live" />
        
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

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              generateStructuredData({
                type: 'Course',
                name: 'Kurz profesionální tvorby videí',
                description: 'Naučte se tvořit profesionální videa s 82% dotací od státu',
                provider: 'DoubleTap',
                location: 'Praha',
                price: 2700,
                currency: 'CZK'
              }),
              generateStructuredData({
                type: 'Organization',
                name: 'DoubleTap',
                description: 'Kurzy profesionální tvorby videí'
              }),
              generateStructuredData({
                type: 'WebSite'
              })
            ])
          }}
        />

        <PerformantLayout>
          {children}
        </PerformantLayout>

        {/* Vercel Analytics & Performance Monitoring */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}