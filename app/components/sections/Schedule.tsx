import React from 'react';
import SectionHeading from '../common/SectionHeading';

const Schedule: React.FC = () => {
  const days = [
    {
      day: "Den 1",
      title: "Základy obrazu",
      topics: [
        "Kompozice záběru - kam co umístit",
        "Práce se světlem - okno jako nejlepší kamarád",
        "Pohyb kamery - kdy statika, kdy dynamika",
        "Praxe: 5 základních typů záběrů"
      ]
    },
    {
      day: "Den 2",
      title: "Zvuk a střih",
      topics: [
        "Čistý zvuk z telefonu - kde a jak točit",
        "Střihové aplikace - CapCut a další zdarma",
        "Tempo a rytmus - jak udržet pozornost",
        "Praxe: První kompletní video"
      ]
    },
    {
      day: "Den 3",
      title: "Storytelling a formáty",
      topics: [
        "Hook - první 3 vteřiny rozhodují",
        "Struktura videa pro různé platformy",
        "Titulky, grafika, hudba",
        "Praxe: Video podle zadání"
      ]
    },
    {
      day: "Den 4",
      title: "Finální projekty",
      topics: [
        "Prezentace vlastních videí",
        "Zpětná vazba od lektorů",
        "Publikační strategie",
        "Content plán na další měsíc"
      ]
    }
  ];

  return (
    <section className="py-20 bg-brand-beige">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="4 dny, které vás posunou" 
          subtitle="Kompletní program plný praktických cvičení a expertních rad"
        />
        
        <div className="max-w-4xl mx-auto">
          {days.map((day, index) => (
            <div key={index} className="mb-8 last:mb-0">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <div className="bg-brand-red text-white py-3 px-6 rounded-lg inline-block md:block text-center font-anton">
                    {day.day}
                  </div>
                </div>
                
                <div className="md:w-3/4 bg-white rounded-xl shadow-sm p-6 border border-brand-gray/10">
                  <h3 className="text-xl font-anton mb-4 text-brand-gray">{day.title}</h3>
                  <ul className="space-y-2">
                    {day.topics.map((topic, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3"></span>
                        <span className="text-brand-gray/80 font-montserrat">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {index < days.length - 1 && (
                <div className="h-8 w-0.5 bg-brand-olive/30 mx-auto md:ml-[12%] my-2"></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-lg text-brand-gray/80 font-montserrat mb-8">
            Každý den kurzu začíná v 9:00 a končí v 17:00 s hodinovou přestávkou na oběd
          </p>
        </div>
      </div>
    </section>
  );
};

export default Schedule;