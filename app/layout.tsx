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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
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
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kurz Profesionální Tvorby Videí | Double Tap',
    description: 'Naučte se natáčet profesionální videa telefonem za 4 dny s 82% státní dotací.',
    images: ['/social-share.webp'],
    creator: '@doubletap_cz',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" className={`${anton.variable} ${montserrat.variable}`}>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/doubletap-logo.webp" as="image" type="image/webp" />
        <link rel="preload" href="/hero-image.webp" as="image" type="image/webp" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//images.pexels.com" />
        
        {/* Initialize dataLayer and set consent defaults */}
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied',
              'functionality_storage': 'denied',
              'personalization_storage': 'denied',
              'security_storage': 'granted',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });
            gtag('set', {
              'non_personalized_ads': true
            });
          `
        }} />
        
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M3ZNVD4K');`
        }} />
        
        {/* Usercentrics consent update handler with debugging */}
        <script dangerouslySetInnerHTML={{
          __html: `
            function updateConsent() {
              console.log('🔍 updateConsent() called');
              
              if (typeof UC_UI === 'undefined') {
                console.log('❌ UC_UI not available');
                return;
              }
              
              console.log('✅ UC_UI available, getting services...');
              
              try {
                var servicesInfo = UC_UI.getServicesBaseInfo();
                console.log('📋 All services:', servicesInfo);
                
                var consentedServices = servicesInfo.filter(function(service) {
                  return service.consent.status === true;
                });
                
                console.log('✅ Consented services:', consentedServices);
                
                // Get all unique categories from consented services
                var categories = [];
                consentedServices.forEach(function(service) {
                  var category = service.categorySlug || service.category;
                  if (category && categories.indexOf(category) === -1) {
                    categories.push(category);
                  }
                });
                
                console.log('📂 Consented categories:', categories);
                
                // Check for marketing/analytics consent - try multiple possible category names
                var hasMarketing = categories.some(function(cat) {
                  return cat.toLowerCase().includes('marketing') || 
                         cat.toLowerCase().includes('advertising') || 
                         cat.toLowerCase().includes('analytics') ||
                         cat.toLowerCase().includes('tracking');
                });
                
                var hasFunctional = categories.some(function(cat) {
                  return cat.toLowerCase().includes('functional') || 
                         cat.toLowerCase().includes('performance') ||
                         cat.toLowerCase().includes('preference');
                });
                
                console.log('🎯 Has marketing consent:', hasMarketing);
                console.log('🔧 Has functional consent:', hasFunctional);
                
                // Always grant if we have any consented services beyond essential
                var hasAnyConsent = consentedServices.length > 0;
                console.log('📊 Has any consent:', hasAnyConsent);
                
                // Update consent - be more permissive for testing
                var consentUpdate = {
                  'analytics_storage': hasMarketing || hasAnyConsent ? 'granted' : 'denied',
                  'ad_storage': hasMarketing || hasAnyConsent ? 'granted' : 'denied',
                  'ad_user_data': hasMarketing || hasAnyConsent ? 'granted' : 'denied',
                  'ad_personalization': hasMarketing || hasAnyConsent ? 'granted' : 'denied',
                  'functionality_storage': hasFunctional || hasAnyConsent ? 'granted' : 'denied',
                  'personalization_storage': hasFunctional || hasAnyConsent ? 'granted' : 'denied',
                  'security_storage': 'granted'
                };
                
                console.log('📤 Updating consent with:', consentUpdate);
                
                gtag('consent', 'update', consentUpdate);
                
                gtag('set', {
                  'non_personalized_ads': hasMarketing ? false : true
                });
                
                console.log('✅ Consent update complete');
                
              } catch (error) {
                console.error('❌ Error in updateConsent:', error);
              }
            }

            // Listen for Usercentrics events
            window.addEventListener("UC_UI_CMP_EVENT", function(event) {
              console.log('🎭 UC_UI_CMP_EVENT received:', event);
              setTimeout(updateConsent, 100);
            });

            // Also try on page load after a delay
            setTimeout(function() {
              console.log('⏰ Delayed consent check...');
              updateConsent();
            }, 2000);

            // Make function available globally for testing
            window.debugUpdateConsent = updateConsent;
          `
        }} />
        
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
                  "@id": "https://doubletap.cz/#organization",
                  "name": "Double Tap",
                  "url": "https://doubletap.cz",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://doubletap.cz/doubletap-logo.webp"
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
                  "@id": "https://doubletap.cz/#course",
                  "name": "Kurz Profesionální Tvorby Videí",
                  "description": "4-denní intenzivní kurz tvorby profesionálních videí pomocí mobilního telefonu. Určeno pro začátečníky i pokročilé.",
                  "provider": {
                    "@id": "https://doubletap.cz/#organization"
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
                  "@id": "https://doubletap.cz/#website",
                  "url": "https://doubletap.cz",
                  "name": "Double Tap - Kurz Profesionální Tvorby Videí",
                  "description": "Naučte se natáčet profesionální videa telefonem za 4 dny",
                  "publisher": {
                    "@id": "https://doubletap.cz/#organization"
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
        
        {children}
      </body>
    </html>
  )
}