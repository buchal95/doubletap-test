import React from 'react';
import SectionHeading from '../common/SectionHeading';
import { Smartphone, CheckCircle, Users, Zap, BookOpen } from 'lucide-react';

const PainPoints: React.FC = () => {
  const requirements = [
    {
      icon: <Smartphone className="w-12 h-12 text-brand-olive" />,
      title: "Váš telefon",
      description: "iPhone nebo Android z posledních 3-4 let. Pokud s ním fotíte, určitě s ním i točíte."
    },
    {
      icon: <Zap className="w-12 h-12 text-brand-olive" />,
      title: "Chuť se učit",
      description: "4 dny intenzivní práce. Točíte od první hodiny, dokončujete poslední den."
    },
    {
      icon: <BookOpen className="w-12 h-12 text-brand-olive" />,
      title: "A to je vše",
      description: "Žádné další vybavení, žádné placené aplikace. Všechno máte v telefonu."
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
                className="text-center p-8 bg-brand-beige rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg"
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
          <div className="bg-brand-olive/10 border border-brand-olive/20 rounded-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center">
              <Users className="w-8 h-8 text-brand-olive mr-4" />
              <div>
                <h4 className="font-anton text-xl text-brand-gray mb-1">Velikost skupiny</h4>
                <p className="text-brand-gray/80 font-montserrat">Maximálně 10 účastníků. Individuální přístup zaručen.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;