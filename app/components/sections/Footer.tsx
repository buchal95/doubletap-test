import React from 'react';
import Image from 'next/image';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-gray text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Left column - Brand & Social */}
          <div>
            {/* Logo with white background for visibility */}
            <div className="mb-4">
              <div className="bg-white rounded-xl p-3 inline-block">
                <Image
                  src="/doubletap-logo.webp"
                  alt="Double Tap Logo"
                  width={160}
                  height={72}
                  className="h-12 w-auto"
                  loading="lazy"
                />
              </div>
            </div>
            
            <p className="text-brand-beige font-montserrat mb-4 max-w-md leading-relaxed">
              Naučíme vás řemeslo videa. Profesionálně, s humorem a se srdcem.
            </p>
            
            {/* Social media */}
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/doubletap.kurzy" 
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-brand-beige/10 hover:bg-brand-red p-3 rounded-lg transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-brand-beige group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://www.instagram.com/doubletap.cz" 
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-brand-beige/10 hover:bg-brand-red p-3 rounded-lg transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-brand-beige group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
          
          {/* Right column - Contact */}
          <div>
            <h4 className="text-lg font-anton mb-4 text-white">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="bg-brand-olive/20 p-2 rounded-lg mr-3">
                  <Mail className="w-4 h-4 text-brand-olive" />
                </div>
                <div>
                  <a 
                    href="mailto:mrkt.doubletap@gmail.com" 
                    className="text-brand-beige hover:text-white transition-colors font-montserrat"
                  >
                    mrkt.doubletap@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-brand-olive/20 p-2 rounded-lg mr-3">
                  <Phone className="w-4 h-4 text-brand-olive" />
                </div>
                <div>
                  <a 
                    href="tel:+420770650852" 
                    className="text-brand-beige hover:text-white transition-colors font-montserrat"
                  >
                    +420 770 650 852
                  </a>
                  <p className="text-brand-beige/60 font-montserrat text-sm">Kateřina Hůšová</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-brand-olive/20 p-2 rounded-lg mr-3">
                  <MapPin className="w-4 h-4 text-brand-olive" />
                </div>
                <div>
                  <p className="text-brand-beige font-montserrat">Praha</p>
                  <p className="text-brand-beige/60 font-montserrat text-sm">Přesná adresa po registraci</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <hr className="border-brand-beige/20 mb-6" />
        
        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          {/* Copyright */}
          <div className="text-brand-beige/80 font-montserrat">
            <p className="mb-1">
              &copy; 2025 Double Tap. Všechna práva vyhrazena.
            </p>
            <p className="text-sm text-brand-beige/60">
              Kurz je realizován v rámci dotačního programu „Jsem v kurzu"
            </p>
          </div>
          
          {/* Legal links */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              href="/obchodni-podminky" 
              className="text-brand-beige/80 hover:text-white transition-colors font-montserrat text-sm hover:underline decoration-brand-olive underline-offset-4"
            >
              Obchodní podmínky
            </Link>
            <Link 
              href="/zasady-ochrany-osobnich-udaju" 
              className="text-brand-beige/80 hover:text-white transition-colors font-montserrat text-sm hover:underline decoration-brand-olive underline-offset-4"
            >
              Zásady ochrany osobních údajů
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;