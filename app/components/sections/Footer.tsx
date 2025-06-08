import React from 'react';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-gray text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-anton mb-4">Video Workshop</h3>
            <p className="text-brand-beige font-montserrat mb-4">
              Naučíme vás řemeslo videa
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
            &copy; 2025 Video Workshop. Všechna práva vyhrazena.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-brand-beige/60 hover:text-white transition-colors font-montserrat">Obchodní podmínky</a>
            <a href="#" className="text-brand-beige/60 hover:text-white transition-colors font-montserrat">Zásady ochrany osobních údajů</a>
            <a href="#" className="text-brand-beige/60 hover:text-white transition-colors font-montserrat">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;