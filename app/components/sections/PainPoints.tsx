import React from 'react';
import SectionHeading from '../common/SectionHeading';
import { Smartphone, CheckCircle, Users } from 'lucide-react';

const PainPoints: React.FC = () => {
  const requirements = [
    {
      icon: <Smartphone className="w-12 h-12 text-brand-olive" />,
      title: "Váš telefon",
      description: "iPhone nebo Android z posledních 3-4 let. Pokud s ním fotíte, zvládnete s ním i točit."
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-brand-olive" />,
      title: "Chuť učit se",
      description: "4 dny intenzivní práce. Točíte od první hodiny, dokončujete poslední den."
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-brand-olive" />,
      title: "To je vše",
      description: "Žádné další vybavení, žádné placené aplikace. Všechno v telefonu."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Co potřebujete" 
          subtitle="Minimální požadavky pro maximální výsledky"
          className="animate-fade-in"
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {requirements.map((req, index) => (
              <div 
                key={index} 
                className="text-center p-8 bg-brand-beige rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] transform"
              >
                <div className="mb-6">
                  {req.icon}
                </div>
                <h3 className="text-xl font-anton text-brand-gray mb-4">{req.title}</h3>
                <p className="text-brand-gray/80 font-montserrat">{req.description}</p>
              </div>
            ))}
          </div>

          {/* Group size info */}
          <div className="bg-brand-olive/10 border border-brand-olive/20 rounded-xl p-6 mb-12 max-w-2xl mx-auto">
            <div className="flex items-center justify-center">
              <Users className="w-8 h-8 text-brand-olive mr-4" />
              <div>
                <h4 className="font-anton text-xl text-brand-gray mb-1">Velikost skupiny</h4>
                <p className="text-brand-gray/80 font-montserrat">Maximálně 10 účastníků. Individuální přístup zaručen.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-brand-gray text-white p-8 md:p-10 rounded-2xl text-center">
            <h3 className="text-2xl font-anton mb-4">
              Takhle točí naši absolventi
            </h3>
            <div className="aspect-w-16 aspect-h-9 max-w-3xl mx-auto mb-6">
              <div className="bg-brand-gray/50 rounded-lg w-full h-64 md:h-[400px] flex items-center justify-center border border-brand-beige/20">
                <p className="text-brand-beige/60 font-montserrat">Videa absolventů - embedovaná videa nebo galerie</p>
              </div>
            </div>
            <p className="text-brand-beige font-montserrat italic">
              Všechno natočeno telefonem. Během kurzu nebo těsně po něm.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;