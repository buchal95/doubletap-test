import React from 'react';
import SectionHeading from '../common/SectionHeading';
import { XCircle } from 'lucide-react';

const PainPoints: React.FC = () => {
  const painPoints = [
    "Vaše videa mají nízkou sledovanost a malý dosah",
    "Bojujete s nekvalitním obrazem a zvukem",
    "Nevíte, jak udržet pozornost diváků",
    "Střih videa vám zabírá příliš mnoho času",
    "Chybí vám strategie pro růst kanálu",
    "Nevíte, jak měřit úspěšnost vašich videí"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Potýkáte se s těmito problémy?" 
          subtitle="Většina tvůrců obsahu řeší stejné překážky při tvorbě videí"
          className="animate-fade-in"
        />
        
        <div className="max-w-3xl mx-auto">
          <div className="grid gap-4">
            {painPoints.map((point, index) => (
              <div 
                key={index} 
                className="flex items-start p-4 bg-brand-beige rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] transform"
              >
                <XCircle className="text-brand-red w-6 h-6 mt-0.5 mr-4 flex-shrink-0 animate-pulse-custom" />
                <p className="text-lg text-brand-gray font-montserrat">{point}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center transform transition-all duration-300 hover:scale-105">
            <p className="text-xl font-anton text-brand-gray mb-4">
              Přesně tyhle problémy náš kurz řeší!
            </p>
            <p className="text-brand-gray/80 font-montserrat">
              Za pouhé 4 dny se naučíte profesionálně tvořit videa, která získají pozornost a konverze.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;