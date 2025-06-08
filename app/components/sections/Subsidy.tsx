import React from 'react';
import SectionHeading from '../common/SectionHeading';
import CTAButton from '../common/CTAButton';
import { BadgeCheck, AlertTriangle } from 'lucide-react';

const Subsidy: React.FC = () => {
  const eligibleGroups = [
    "Zaměstnanci firem",
    "OSVČ a podnikatelé", 
    "Studenti a nezaměstnaní (speciální podmínky)"
  ];

  return (
    <section className="py-20 bg-brand-gray text-white">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Využijte 82% dotaci, dokud existuje" 
          subtitle="Jak to funguje a kdo může dotaci využít"
          className="text-white [&>h2]:text-white [&>p]:text-brand-beige"
        />
        
        <div className="max-w-4xl mx-auto bg-white text-brand-gray rounded-2xl overflow-hidden shadow-2xl mb-12">
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
                DOTACE 82%
              </div>
              
              <h3 className="text-2xl font-anton mb-6">Dotace od státu: 12 300 Kč</h3>
              <div className="mb-6">
                <p className="text-5xl font-anton text-brand-red">2 700 Kč</p>
                <p className="text-brand-olive font-montserrat font-semibold mt-2">Vaše investice</p>
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
              
              <CTAButton text="Chci využít dotaci" className="w-full text-lg py-4" />
            </div>
          </div>
        </div>

        {/* Warning about program ending */}
        <div className="bg-brand-red/20 border border-brand-red/30 rounded-xl p-6 mb-8 max-w-3xl mx-auto">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-brand-red mt-1 mr-4 flex-shrink-0" />
            <div>
              <h4 className="font-anton text-lg text-white mb-2">Dotační program brzy končí</h4>
              <p className="text-brand-beige font-montserrat">
                Po jeho ukončení bude kurz za plnou cenu 15 000 Kč. Využijte dotaci, dokud je k dispozici.
              </p>
            </div>
          </div>
        </div>

        {/* Eligibility */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-anton text-center mb-6">Kdo může dotaci využít:</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {eligibleGroups.map((group, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20">
                <p className="font-montserrat text-brand-beige">{group}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-brand-beige/80 font-montserrat mt-6">
            Konkrétní podmínky dotace vám sdělíme při registraci
          </p>
        </div>
      </div>
    </section>
  );
};

export default Subsidy;