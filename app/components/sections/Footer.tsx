import React from 'react';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-gray text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="mb-6">
              <Image
                src="/doubletap-logo.webp"
                alt="Double Tap Logo"
                width={200}
                height={90}
                className="h-16 w-auto mb-4"
              />
            </div>
            <p className="text-brand-beige font-montserrat mb-4 max-w-md">
              Naučíme vás řemeslo videa. Profesionálně, s humorem a se srdcem.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-beige hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-brand-beige hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-brand-beige hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-brand-beige hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-anton mb-4">Kontakt</h3>
            <ul className="space-y-2 text-brand-beige font-montserrat">
              <li>Kateřina Hůšová</li>
              <li>+420 770 650 852</li>
              <li>mrkt.doubletap@gmail.com</li>
            </ul>
          </div>
        </div>
        
        <hr className="border-brand-gray/20 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-brand-beige/60 font-montserrat mb-4 md:mb-0">
            &copy; 2025 Double Tap. Všechna práva vyhrazena.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/obchodni-podminky" className="text-brand-beige/60 hover:text-white transition-colors font-montserrat">Obchodní podmínky</Link>
            <Link href="/zasady-ochrany-osobnich-udaju" className="text-brand-beige/60 hover:text-white transition-colors font-montserrat">Zásady ochrany osobních údajů</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;