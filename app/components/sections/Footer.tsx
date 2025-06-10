import React from 'react';
import Image from 'next/image';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-gray text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Left column - Brand */}
          <div className="md:col-span-1">
            {/* Logo with white background for visibility */}
            <div className="mb-6">
              <div className="bg-white rounded-xl p-4 inline-block">
                <Image
                  src="/doubletap-logo.webp"
                  alt="Double Tap Logo"
                  width={200}
                  height={90}
                  className="h-16 w-auto"
                />
              </div>
            </div>
            
            <p className="text-brand-beige font-montserrat mb-6 max-w-md leading-relaxed">
              Naučíme vás řemeslo videa. Profesionálně, s humorem a se srdcem.
            </p>
            
            {/* Social media */}
            <div className="mb-6">
              <h4 className="text-lg font-anton mb-4 text-white">Sledujte nás</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/doubletap.kurzy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-brand-beige/10 hover:bg-brand-red p-3 rounded-lg transition-all duration-300 transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6 text-brand-beige group-hover:text-white transition-colors" />
                </a>
                <a 
                  href="https://www.instagram.com/doubletap.cz" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-brand-beige/10 hover:bg-brand-red p-3 rounded-lg transition-all duration-300 transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6 text-brand-beige group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Middle column - Quick links */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-anton mb-6 text-white">Rychlé odkazy</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="#contact" 
                  className="text-brand-beige hover:text-white transition-colors font-montserrat flex items-center group"
                >
                  <span className="w-2 h-2 bg-brand-olive rounded-full mr-3 group-hover:bg-brand-red transition-colors"></span>
                  Registrace na kurz
                </a>
              </li>
              <li>
                <a 
                  href="#schedule" 
                  className="text-brand-beige hover:text-white transition-colors font-montserrat flex items-center group"
                >
                  <span className="w-2 h-2 bg-brand-olive rounded-full mr-3 group-hover:bg-brand-red transition-colors"></span>
                  Program kurzu
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  className="text-brand-beige hover:text-white transition-colors font-montserrat flex items-center group"
                >
                  <span className="w-2 h-2 bg-brand-olive rounded-full mr-3 group-hover:bg-brand-red transition-colors"></span>
                  Často kladené otázky
                </a>
              </li>
              <li>
                <a 
                  href="#testimonials" 
                  className="text-brand-beige hover:text-white transition-colors font-montserrat flex items-center group"
                >
                  <span className="w-2 h-2 bg-brand-olive rounded-full mr-3 group-hover:bg-brand-red transition-colors"></span>
                  Reference absolventů
                </a>
              </li>
            </ul>
          </div>
          
          {/* Right column - Contact */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-anton mb-6 text-white">Kontakt</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-brand-olive/20 p-2 rounded-lg mr-4 mt-1">
                  <Mail className="w-5 h-5 text-brand-olive" />
                </div>
                <div>
                  <p className="text-brand-beige/80 font-montserrat text-sm mb-1">E-mail</p>
                  <a 
                    href="mailto:mrkt.doubletap@gmail.com" 
                    className="text-brand-beige hover:text-white transition-colors font-montserrat font-semibold"
                  >
                    mrkt.doubletap@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-olive/20 p-2 rounded-lg mr-4 mt-1">
                  <Phone className="w-5 h-5 text-brand-olive" />
                </div>
                <div>
                  <p className="text-brand-beige/80 font-montserrat text-sm mb-1">Telefon</p>
                  <a 
                    href="tel:+420770650852" 
                    className="text-brand-beige hover:text-white transition-colors font-montserrat font-semibold"
                  >
                    +420 770 650 852
                  </a>
                  <p className="text-brand-beige/60 font-montserrat text-xs mt-1">Kateřina Hůšová</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brand-olive/20 p-2 rounded-lg mr-4 mt-1">
                  <MapPin className="w-5 h-5 text-brand-olive" />
                </div>
                <div>
                  <p className="text-brand-beige/80 font-montserrat text-sm mb-1">Místo konání</p>
                  <p className="text-brand-beige font-montserrat font-semibold">Praha</p>
                  <p className="text-brand-beige/60 font-montserrat text-xs mt-1">Přesná adresa po registraci</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <hr className="border-brand-beige/20 mb-8" />
        
        {/* Bottom section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {/* Copyright */}
          <div className="text-brand-beige/80 font-montserrat">
            <p className="mb-2">
              &copy; 2025 Double Tap. Všechna práva vyhrazena.
            </p>
            <p className="text-sm text-brand-beige/60">
              Kurz je realizován v rámci dotačního programu „Jsem v kurzu"
            </p>
          </div>
          
          {/* Legal links */}
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
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