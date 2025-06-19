import React from 'react';
import Image from 'next/image';
import { CheckCircle, ArrowLeft, Clock, Users, FileText, CreditCard, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Děkujeme za váš zájem o kurz',
  description: 'Váš zájem o kurz profesionální tvorby videí byl úspěšně zaznamenán. Brzy vás budeme kontaktovat s dalšími informacemi o registraci a platbě.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouPage() {
  // Track thank you page view (interest confirmation)
  if (typeof window !== 'undefined') {
    // Import dynamically to avoid SSR issues
    import('../../utils/dataLayer').then(({ trackPageView, pushToDataLayer }) => {
      trackPageView('thank_you_interest');
      
      // Track interest confirmation event
      pushToDataLayer({
        event: 'interest_confirmed',
        event_category: 'engagement',
        event_label: 'thank_you_page_view',
        form_name: 'interest_form'
      });
    });
  }

  return (
    <div className="min-h-screen bg-brand-beige flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="mb-8">
            {/* Logo */}
            <div className="mb-6">
              <Image
                src="/doubletap-logo.webp"
                alt="Double Tap Logo"
                width={150}
                height={70}
                className="mx-auto h-12 w-auto"
              />
            </div>
            
            <CheckCircle className="w-20 h-20 text-brand-olive mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-anton text-brand-gray mb-4">
              Děkujeme za váš zájem!
            </h1>
            <p className="text-lg text-brand-gray/80 font-montserrat mb-6">
              Váš zájem o kurz profesionální tvorby videí s 82% dotací byl úspěšně zaznamenán.
            </p>
          </div>

          {/* Next steps */}
          <div className="bg-brand-beige rounded-xl p-6 mb-8">
            <h2 className="text-xl font-anton text-brand-gray mb-6 flex items-center justify-center">
              <Clock className="w-6 h-6 mr-2 text-brand-olive" />
              Co bude následovat?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="bg-brand-olive text-white rounded-full w-10 h-10 flex items-center justify-center font-anton text-lg mx-auto mb-3">
                  1
                </div>
                <h3 className="font-anton text-brand-gray mb-2">Kontakt do 24-48 hodin</h3>
                <p className="text-sm text-brand-gray/80 font-montserrat">
                  Ozveme se vám s informacemi o dostupných termínech kurzu a procesu získání dotace
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-brand-olive text-white rounded-full w-10 h-10 flex items-center justify-center font-anton text-lg mx-auto mb-3">
                  2
                </div>
                <h3 className="font-anton text-brand-gray mb-2">Žádost o dotaci</h3>
                <p className="text-sm text-brand-gray/80 font-montserrat">
                  Pomůžeme vám s podáním žádosti o 82% dotaci na Úřadu práce
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-brand-olive text-white rounded-full w-10 h-10 flex items-center justify-center font-anton text-lg mx-auto mb-3">
                  3
                </div>
                <h3 className="font-anton text-brand-gray mb-2">Platba a kurz</h3>
                <p className="text-sm text-brand-gray/80 font-montserrat">
                  Po schválení dotace zaplatíte pouze <span className="whitespace-nowrap">2 700 Kč</span> a můžete začít kurz
                </p>
              </div>
            </div>
          </div>

          {/* Important information about application process */}
          <div className="bg-brand-red/10 border border-brand-red/20 rounded-xl p-6 mb-8">
            <div className="flex items-start">
              <FileText className="w-6 h-6 text-brand-red mt-1 mr-4 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-anton text-lg text-brand-red mb-2">Žádost o dotaci</h3>
                <p className="text-brand-gray/80 font-montserrat text-sm leading-relaxed">
                  <strong>Důležité:</strong> Žádost o 82% dotaci je nutné podat minimálně 30 dní před začátkem kurzu. 
                  Detailně vás provedeme celým procesem a pomůžeme s vyřízením všech náležitostí.
                </p>
              </div>
            </div>
          </div>

          {/* Payment information - Enhanced with better spacing */}
          <div className="bg-brand-olive/10 border border-brand-olive/20 rounded-xl p-6 mb-8">
            <div className="flex items-start">
              <CreditCard className="w-6 h-6 text-brand-olive mt-1 mr-4 flex-shrink-0" />
              <div className="text-left w-full">
                <h3 className="font-anton text-lg text-brand-gray mb-4">Platba kurzu</h3>
                <p className="text-brand-gray/80 font-montserrat text-sm leading-relaxed mb-6">
                  Po schválení dotace od Úřadu práce:
                </p>
                
                {/* Payment breakdown with improved spacing */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Your payment */}
                  <div className="bg-white rounded-lg p-6 border border-brand-gray/10">
                    <div className="text-center">
                      <p className="text-brand-gray/70 font-montserrat text-sm mb-2">
                        Zaplatíte pouze
                      </p>
                      <p className="text-3xl font-anton text-brand-red mb-2">
                        <span className="whitespace-nowrap">2 700 Kč</span>
                      </p>
                      <p className="text-brand-gray/60 font-montserrat text-sm">
                        (18 % z celkové ceny)
                      </p>
                    </div>
                  </div>
                  
                  {/* State subsidy */}
                  <div className="bg-brand-olive/5 rounded-lg p-6 border border-brand-olive/20">
                    <div className="text-center">
                      <p className="text-brand-gray/70 font-montserrat text-sm mb-2">
                        Stát uhradí zbývajících
                      </p>
                      <p className="text-3xl font-anton text-brand-olive mb-2">
                        <span className="whitespace-nowrap">12 300 Kč</span>
                      </p>
                      <p className="text-brand-gray/60 font-montserrat text-sm">
                        (82 % dotace)
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Payment options */}
                <div className="mt-6 bg-brand-beige rounded-lg p-4">
                  <h4 className="font-anton text-brand-gray mb-3">Možnosti platby:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-brand-gray/80 font-montserrat">
                      <span className="w-2 h-2 bg-brand-olive rounded-full mr-3 flex-shrink-0"></span>
                      Platba kartou online
                    </li>
                    <li className="flex items-center text-sm text-brand-gray/80 font-montserrat">
                      <span className="w-2 h-2 bg-brand-olive rounded-full mr-3 flex-shrink-0"></span>
                      Bankovní převod
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact information */}
          <div className="bg-brand-beige border border-brand-olive/20 rounded-xl p-6 mb-8">
            <h3 className="font-anton text-lg text-brand-gray mb-4">Máte dotazy? Kontaktujte nás</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center justify-center">
                <Mail className="w-5 h-5 text-brand-olive mr-2" />
                <a 
                  href="mailto:mrkt.doubletap@gmail.com" 
                  className="text-brand-olive hover:underline font-montserrat font-semibold"
                >
                  mrkt.doubletap@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="w-5 h-5 text-brand-olive mr-2" />
                <a 
                  href="tel:+420770650852" 
                  className="text-brand-olive hover:underline font-montserrat font-semibold"
                >
                  +420 770 650 852
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center mt-4">
              <MapPin className="w-5 h-5 text-brand-olive mr-2" />
              <span className="font-montserrat text-brand-gray">
                Praha (přesná adresa po registraci)
              </span>
            </div>
          </div>

          {/* Call to action */}
          <div className="space-y-4">
            <div className="bg-brand-olive/10 rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-brand-olive mr-2" />
                <span className="font-anton text-brand-gray">Připojte se k našim spokojeným absolventům</span>
              </div>
              <p className="text-sm text-brand-gray/80 font-montserrat">
                Pomáháme lidem naučit se profesionální tvorbu videí a rozvíjet jejich kreativní dovednosti
              </p>
            </div>
            
            <Link 
              href="/"
              className="inline-flex items-center justify-center py-3 px-6 bg-brand-gray text-white rounded-lg font-montserrat font-semibold transition-all duration-300 hover:bg-opacity-90"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Zpět na hlavní stránku
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}