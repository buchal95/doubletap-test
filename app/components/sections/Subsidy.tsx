import React from 'react';
import SectionHeading from '../common/SectionHeading';
import CTAButton from '../common/CTAButton';
import { BadgeCheck } from 'lucide-react';

const Subsidy: React.FC = () => {
  return (
    <section className="py-20 bg-brand-gray text-white">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Dotovaný kurz" 
          subtitle="Díky podpoře našich partnerů je kurz dostupný za zlomek běžné ceny"
          className="text-white [&>h2]:text-white [&>p]:text-brand-beige"
        />
        
        <div className="max-w-4xl mx-auto bg-white text-brand-gray rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-10">
              <h3 className="text-2xl font-anton mb-6">Běžná cena kurzu</h3>
              <div className="mb-6">
                <p className="text-4xl font-anton text-brand-gray/40 line-through">15 000 Kč</p>
                <p className="text-brand-gray/60 font-montserrat mt-2">bez dotace</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start opacity-50">
                  <BadgeCheck className="w-5 h-5 text-brand-gray/40 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="font-montserrat">4 dny intenzivního kurzu</span>
                </li>
                <li className="flex items-start opacity-50">
                  <BadgeCheck className="w-5 h-5 text-brand-gray/40 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="font-montserrat">Materiály a studijní podklady</span>
                </li>
                <li className="flex items-start opacity-50">
                  <BadgeCheck className="w-5 h-5 text-brand-gray/40 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="font-montserrat">Certifikát o absolvování</span>
                </li>
                <li className="flex items-start opacity-50">
                  <BadgeCheck className="w-5 h-5 text-brand-gray/40 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="font-montserrat">Přístup do komunity absolventů</span>
                </li>
              </ul>
            </div>
            
            <div className="p-8 md:p-10 bg-brand-beige relative">
              <div className="absolute top-0 right-0 bg-brand-olive text-white py-2 px-6 rounded-bl-2xl font-anton">
                DOTOVANÁ CENA
              </div>
              
              <h3 className="text-2xl font-anton mb-6">Cena s podporou</h3>
              <div className="mb-6">
                <p className="text-5xl font-anton text-brand-red">2 700 Kč</p>
                <p className="text-brand-olive font-montserrat font-semibold mt-2">Úspora 12 300 Kč</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <BadgeCheck className="w-5 h-5 text-brand-olive mt-0.5 mr-3 flex-shrink-0" />
                  <span className="font-montserrat">4 dny intenzivního kurzu</span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="w-5 h-5 text-brand-olive mt-0.5 mr-3 flex-shrink-0" />
                  <span className="font-montserrat">Materiály a studijní podklady</span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="w-5 h-5 text-brand-olive mt-0.5 mr-3 flex-shrink-0" />
                  <span className="font-montserrat">Certifikát o dokončení kurzu</span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="w-5 h-5 text-brand-olive mt-0.5 mr-3 flex-shrink-0" />
                  <span className="font-montserrat">Přístup do komunity absolventů</span>
                </li>
                <li className="flex items-start font-semibold">
                  <BadgeCheck className="w-5 h-5 text-brand-olive mt-0.5 mr-3 flex-shrink-0" />
                  <span className="font-montserrat">30 dní podpory po kurzu</span>
                </li>
              </ul>
              
              <CTAButton text="Projevit zájem" className="w-full text-lg py-4" />
            </div>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-brand-beige font-montserrat">
            Díky podpoře našich partnerů můžeme nabídnout kurz za zvýhodněnou cenu a poskytnout vám
            kvalitní vzdělání v oblasti tvorby videí za dostupnou cenu.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Subsidy;