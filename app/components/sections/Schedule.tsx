import React from 'react';
import SectionHeading from '../common/SectionHeading';
import { AlertTriangle } from 'lucide-react';

const Schedule: React.FC = () => {
  const days = [
    {
      day: "Den 1",
      title: "Základy natáčení",
      topics: [
        "Nastavení kamery v telefonu jako profesionál",
        "Práce se světlem, zvukem a kompozicí",
        "Co dělá záběr vizuálně silným",
        "Praxe: Vaše první profesionální záběry"
      ]
    },
    {
      day: "Den 2",
      title: "Zvuk, efekty a scénář",
      topics: [
        "Kvalitní zvuk pomocí základní postprodukce",
        "Vizuální efekty a barevné korekce",
        "Příprava scénáře pro videoprojekt",
        "Praxe: Práce s efekty a zvukem"
      ]
    },
    {
      day: "Den 3",
      title: "Obsah, který zaujme",
      topics: [
        "Co a jak točit pro sociální sítě",
        "Práce s aktuálními trendy",
        "Analýza publika a cílení obsahu",
        "Start natáčení vlastního projektu"
      ]
    },
    {
      day: "Den 4",
      title: "Finální úpravy a analýza",
      topics: [
        "Postprodukce v dostupných aplikacích",
        "Dokončení a úprava vašeho videoprojektu",
        "Vyhodnocení a zpětná vazba",
        "Výstup: Hotové video připravené k publikaci"
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
        
        {/* Important notice */}
        <div className="mt-12 bg-brand-red/10 border border-brand-red/20 rounded-xl p-6 max-w-3xl mx-auto">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-brand-red mt-1 mr-4 flex-shrink-0" />
            <div>
              <h4 className="font-anton text-lg text-brand-red mb-2">Důležité</h4>
              <p className="text-brand-gray/80 font-montserrat">
                Úspěšné dokončení projektu je podmínkou pro získání dotace
              </p>
            </div>
          </div>
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