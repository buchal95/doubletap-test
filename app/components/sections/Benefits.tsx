import React from 'react';
import SectionHeading from '../common/SectionHeading';
import { TrendingUp, AlertTriangle, Eye, Clock, Trophy, Plus } from 'lucide-react';

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6 text-brand-olive" />,
      title: "Více sledujících",
      description: "Díky profesionálním videím zvýšíte počet sledujících i jejich interakci na sociálních sítích."
    },
    {
      icon: <Eye className="w-6 h-6 text-brand-olive" />,
      title: "Profesionální vizuál",
      description: "Vaše videa budou vypadat jako od profesionálního studia i s omezeným rozpočtem."
    },
    {
      icon: <Trophy className="w-6 h-6 text-brand-olive" />,
      title: "Rychlá návratnost investice",
      description: "Investice do kurzu se vám vrátí díky novým klientům a příležitostem."
    },
    {
      icon: <Clock className="w-6 h-6 text-brand-olive" />,
      title: "Ušetření času",
      description: "Naučíte se efektivní postupy, které vám ušetří desítky hodin měsíčně."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-brand-olive" />,
      title: "Konkurenční výhoda",
      description: "Získáte náskok před konkurencí, která stále používá amatérské postupy."
    },
    {
      icon: <Plus className="w-6 h-6 text-brand-olive" />,
      title: "Rozšíření nabídky služeb",
      description: "Budete moci nabízet video služby svým stávajícím klientům."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Co vám kurz přinese" 
          subtitle="Konkrétní výsledky, které uvidíte již během prvních týdnů po dokončení kurzu"
          className="animate-fade-in"
        />
        
        {/* Dotace emphasis */}
        <div className="bg-brand-red/10 border border-brand-red/20 rounded-xl p-6 mb-12 max-w-3xl mx-auto">
          <div className="flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-brand-red mr-4" />
            <div className="text-center">
              <h4 className="font-anton text-xl text-brand-red mb-1">Využijte 82% státní dotaci</h4>
              <p className="text-brand-gray/80 font-montserrat">Místo <span className="whitespace-nowrap">15 000 Kč</span> zaplatíte pouze <span className="whitespace-nowrap">2 700 Kč</span> • Dotace končí koncem roku 2025</p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex transition-all duration-300 hover:shadow-lg p-4 rounded-lg"
            >
              <div className="mr-4 mt-1 flex-shrink-0">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-xl font-anton mb-2 text-brand-gray">{benefit.title}</h3>
                <p className="text-brand-gray/80 font-montserrat">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center transition-all duration-300">
          <p className="text-xl text-brand-gray/80 font-montserrat max-w-3xl mx-auto mb-6">
            "Naši absolventi v průměru zvyšují své dosahy na sociálních sítích o 80 % během prvních 30 dnů po dokončení kurzu."
          </p>
          <p className="font-montserrat font-semibold text-brand-gray">
            Petr Novák, hlavní lektor kurzu
          </p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;