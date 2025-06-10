import React from 'react';
import Image from 'next/image';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Děkujeme za registraci',
  description: 'Vaše registrace na kurz profesionální tvorby videí byla úspěšně odeslána. Brzy vás budeme kontaktovat s dalšími informacemi.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-brand-beige flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="mb-8">
            {/* Logo with white background - no extra background needed since it's on white */}
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
              Děkujeme za vaši objednávku!
            </h1>
            <p className="text-lg text-brand-gray/80 font-montserrat mb-6">
              Vaše registrace na kurz byla úspěšně odeslána. Brzy vás budeme kontaktovat s dalšími informacemi.
            </p>
          </div>

          <div className="bg-brand-beige rounded-xl p-6 mb-8">
            <h2 className="text-xl font-anton text-brand-gray mb-4">Co bude následovat?</h2>
            <ul className="space-y-3 text-left">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-brand-gray/80 font-montserrat">Během 24 hodin vás kontaktujeme s potvrzením termínu</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-brand-gray/80 font-montserrat">Zašleme vám všechny potřebné informace o kurzu</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-brand-gray/80 font-montserrat">Týden před kurzem obdržíte připomínku a praktické pokyny</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-brand-gray/80 font-montserrat">
              Máte-li jakékoli dotazy, neváhejte nás kontaktovat na{' '}
              <a href="mailto:mrkt.doubletap@gmail.com" className="text-brand-olive hover:underline">
                mrkt.doubletap@gmail.com
              </a>
              {' '}nebo na telefonu{' '}
              <a href="tel:+420770650852" className="text-brand-olive hover:underline">
                +420 770 650 852
              </a>
            </p>
            
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