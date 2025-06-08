import React from 'react';
import SectionHeading from '../common/SectionHeading';
import { Gift, FileText, Video, Users, Download } from 'lucide-react';

const Bonuses: React.FC = () => {
  const bonuses = [
    {
      icon: <FileText className="w-10 h-10 text-brand-olive" />,
      title: "Šablony a checklisty",
      description: "Kompletní sada šablon pro scénáře, storyboardy a produkční plány."
    },
    {
      icon: <Video className="w-10 h-10 text-brand-olive" />,
      title: "Záznamy všech lekcí",
      description: "Doživotní přístup ke všem záznamům lekcí pro pozdější reference."
    },
    {
      icon: <Users className="w-10 h-10 text-brand-olive" />,
      title: "Přístup do komunity",
      description: "Soukromá Facebook skupina s absolventy a lektory pro vzájemnou podporu."
    },
    {
      icon: <Download className="w-10 h-10 text-brand-olive" />,
      title: "Balíček přechodů a efektů",
      description: "Prémiový balíček přechodů a efektů pro profesionální střih vašich videí."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <Gift className="w-16 h-16 text-brand-olive mx-auto mb-6" />
          <SectionHeading 
            title="Bonusové materiály v ceně kurzu" 
            subtitle="Získáte mnohem více než jen 4-denní kurz"
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {bonuses.map((bonus, index) => (
            <div 
              key={index} 
              className="bg-brand-beige p-6 rounded-xl shadow-sm border border-brand-gray/10 transition-all duration-300 hover:shadow-md"
            >
              <div className="mb-4">{bonus.icon}</div>
              <h3 className="text-xl font-anton mb-2 text-brand-gray">{bonus.title}</h3>
              <p className="text-brand-gray/80 font-montserrat">{bonus.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-6 md:p-8 bg-brand-gray text-white rounded-xl max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-anton mb-4">Celková hodnota bonusů: 8 500 Kč</h3>
          <p className="text-brand-beige font-montserrat text-lg mb-6">
            Všechny tyto materiály dostanete zdarma jako součást dotovaného kurzu
          </p>
          <div className="inline-block bg-white text-brand-gray font-anton py-2 px-6 rounded-lg">
            Celková hodnota kurzu: 23 500 Kč
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bonuses;