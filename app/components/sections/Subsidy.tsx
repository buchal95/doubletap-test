import React from 'react';
import SectionHeading from '../common/SectionHeading';
import CTAButton from '../common/CTAButton';
import { BadgeCheck, AlertTriangle, CheckCircle } from 'lucide-react';

const Subsidy: React.FC = () => {
  const eligibleGroups = [
    "Zaměstnanci",
    "OSVČ a podnikatelé", 
    "Studenti",
    "Nezaměstnaní",
    "Rodiče na mateřské/rodičovské",
    "Důchodci"
  ];

  const subsidySteps = [
    "Registrujete se online přes datovou schránku nebo bankovní identitu",
    "Zařadíte se do evidence zájemců o zaměstnání (po kurzu se můžete odhlásit)",
    "Požádáte o dotaci minimálně 30 dní před kurzem",
    "Zaplatíte jen 18% (2 700 Kč) před začátkem kurzu",
    "Absolvujete kurz s min. 80% účastí",
    "Stát zaplatí zbytek (12 300 Kč) po úspěšném dokončení"
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
              <h4 className="font-anton text-lg text-white mb-2">Dotační program končí koncem roku 2025</h4>
              <p className="text-brand-beige font-montserrat">
                Státní dotace z Národního plánu obnovy EU jsou omezené a brzy skončí.
              </p>
            </div>
          </div>
        </div>

        {/* Eligibility */}
        <div className="max-w-4xl mx-auto mb-12">
          <h3 className="text-2xl font-anton text-center mb-6">Kdo může dotaci využít:</h3>
          <p className="text-center text-brand-beige font-montserrat mb-8 text-lg">
            Prakticky každý občan ČR starší 18 let:
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {eligibleGroups.map((group, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/20 flex items-center">
                <CheckCircle className="w-5 h-5 text-brand-olive mr-3 flex-shrink-0" />
                <p className="font-montserrat text-brand-beige">{group}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-anton text-center mb-8">Jak to funguje:</h3>
          <div className="space-y-4 mb-8">
            {subsidySteps.map((step, index) => (
              <div key={index} className="flex items-start bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="bg-brand-olive text-white rounded-full w-8 h-8 flex items-center justify-center font-anton text-sm mr-4 mt-1 flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-brand-beige font-montserrat">{step}</p>
              </div>
            ))}
          </div>

          <div className="bg-brand-red/20 border border-brand-red/30 rounded-xl p-6 text-center">
            <AlertTriangle className="w-8 h-8 text-brand-red mx-auto mb-4" />
            <p className="text-brand-beige font-montserrat">
              <strong>Pozor:</strong> Můžete čerpat max. 50 000 Kč za 3 roky na vzdělávací kurzy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subsidy;