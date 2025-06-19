import React from 'react';
import SectionHeading from '../common/SectionHeading';
import CTAButton from '../common/CTAButton';
import { Smartphone, Scissors, BookOpen, Target, Palette } from 'lucide-react';

const CourseOverview: React.FC = () => {
  const modules = [
    {
      icon: <Smartphone className="w-8 h-8 text-brand-olive" />,
      title: "Profi nastavení telefonu",
      description: "Vyždímáme maximum z kamery, kterou nosíte v kapse. Nastavení, která změní všechno."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-brand-olive" />,
      title: "Světlo, zvuk, kompozice",
      description: "Základy, které dělají rozdíl mezi amatérem a profíkem. Kde stát, kam svítit, jak natočit čistý zvuk."
    },
    {
      icon: <Palette className="w-8 h-8 text-brand-olive" />,
      title: "Efekty a postprodukce",
      description: "Barevné korekce, vizuální efekty, střih. Všechno v telefonu, v aplikacích zdarma."
    },
    {
      icon: <Scissors className="w-8 h-8 text-brand-olive" />,
      title: "Obsah pro sociální sítě",
      description: "Co funguje na Instagramu, TikToku a YouTube. Trendy, analýza publika, struktura videí."
    },
    {
      icon: <Target className="w-8 h-8 text-brand-olive" />,
      title: "Váš finální projekt",
      description: "Během kurzu natočíte vlastní video. Od scénáře po finální export. Hotové k publikaci."
    }
  ];

  return (
    <section className="py-20 bg-brand-beige">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Řemeslo videa. S telefonem v ruce." 
          subtitle="4 dny intenzivní praxe. Od základů po hotové video, které můžete hned použít."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {modules.map((module, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-md border border-brand-gray/10 transition-all duration-300 hover:shadow-lg"
            >
              <div className="mb-4">{module.icon}</div>
              <h3 className="text-xl font-anton mb-3 text-brand-gray">{module.title}</h3>
              <p className="text-brand-gray/80 font-montserrat">{module.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-md border border-brand-gray/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-anton text-brand-gray mb-2">Řemeslo má svá pravidla. Naučíme vás je.</h3>
              <p className="text-brand-gray/80 font-montserrat mb-4">
                Nejde o nudný teoretický kurz - budete natáčet, stříhat a publikovat reálná videa pod vedením expertů.
              </p>
              <div className="inline-flex items-center bg-brand-red/10 px-4 py-2 rounded-lg border border-brand-red/20">
                <span className="font-montserrat font-semibold text-brand-red">82% dotace končí koncem roku 2025</span>
              </div>
            </div>
            <CTAButton text="Využít 82% dotaci" className="whitespace-nowrap text-lg py-4 px-8" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseOverview;