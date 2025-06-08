import React from 'react';
import SectionHeading from '../common/SectionHeading';
import CTAButton from '../common/CTAButton';
import { Camera, Scissors, BookOpen, Target } from 'lucide-react';

const CourseOverview: React.FC = () => {
  const modules = [
    {
      icon: <Camera className="w-8 h-8 text-brand-olive" />,
      title: "Kompozice a světlo",
      description: "Kde stát, kam dát telefon, jak využít denní světlo. Základy, bez kterých to nejde."
    },
    {
      icon: <Scissors className="w-8 h-8 text-brand-olive" />,
      title: "Rychlý střih v mobilu",
      description: "30 minut od natočení po publikaci. V aplikacích, které máte zdarma."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-brand-olive" />,
      title: "Struktura, která funguje",
      description: "Jak postavit video, aby ho lidi dokoukali. Od první vteřiny po závěrečný titulek."
    },
    {
      icon: <Target className="w-8 h-8 text-brand-olive" />,
      title: "Váš finální projekt",
      description: "Na konci kurzu představíte vlastní video. Hotové, ostré, připravené k publikaci."
    }
  ];

  return (
    <section className="py-20 bg-brand-beige">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Řemeslo videa. S telefonem v ruce." 
          subtitle="4 dny intenzivní praxe. Žádná teorie, jen točení."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {modules.map((module, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-md border border-brand-gray/10 transition-all duration-300 hover:shadow-lg hover:scale-105"
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
              <p className="text-brand-gray/80 font-montserrat">
                Nejde o teoretický kurz - budete natáčet, stříhat a publikovat reálná videa pod vedením expertů.
              </p>
            </div>
            <CTAButton text="Chci využít dotaci" className="whitespace-nowrap text-lg py-4 px-8" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseOverview;