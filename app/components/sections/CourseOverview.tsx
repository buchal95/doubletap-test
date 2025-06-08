import React from 'react';
import SectionHeading from '../common/SectionHeading';
import CTAButton from '../common/CTAButton';
import { Video, Camera, Film, Lightbulb } from 'lucide-react';

const CourseOverview: React.FC = () => {
  const modules = [
    {
      icon: <Camera className="w-8 h-8 text-brand-olive" />,
      title: "Profesionální záběry",
      description: "Naučíte se používat kameru a světlo pro dokonalé záběry i s běžným vybavením."
    },
    {
      icon: <Film className="w-8 h-8 text-brand-olive" />,
      title: "Efektivní střih",
      description: "Zvládnete rychlý a efektivní střih, který udrží pozornost diváků."
    },
    {
      icon: <Video className="w-8 h-8 text-brand-olive" />,
      title: "Strategie obsahu",
      description: "Vytvoříte plán obsahu, který přivede nové sledující a zvýší engagement."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-brand-olive" />,
      title: "Monetizace",
      description: "Naučíte se, jak ze svých videí generovat příjem a oslovit potenciální klienty."
    }
  ];

  return (
    <section className="py-20 bg-brand-beige">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="4 dny intenzivní praxe v malé skupině" 
          subtitle="Komplexní kurz, který vás provede od základů až po pokročilé techniky tvorby videí"
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
              <h3 className="text-2xl font-anton text-brand-gray mb-2">Praktické zkušenosti z první ruky</h3>
              <p className="text-brand-gray/80 font-montserrat">
                Nejde o teoretický kurz - budete natáčet, stříhat a publikovat reálná videa pod vedením expertů.
              </p>
            </div>
            <CTAButton text="Projevit zájem" className="whitespace-nowrap text-lg py-4 px-8" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseOverview;