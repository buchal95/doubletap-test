'use client';

import React, { useState, useEffect } from 'react';
import CTAButton from '../common/CTAButton';
import { Camera } from 'lucide-react';

const Hero: React.FC = () => {
  const [nextEvent, setNextEvent] = useState<string | null>(null);

  useEffect(() => {
    // Static upcoming course dates for demo purposes
    const upcomingDates = [
      "15. - 18. února 2025",
      "22. - 25. března 2025",
      "19. - 22. dubna 2025"
    ];
    
    setNextEvent(upcomingDates[0]);
  }, []);

  return (
    <section className="relative py-20 md:py-32 bg-brand-gray text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] opacity-20 bg-cover bg-center transform transition-all duration-500 hover:scale-105"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center mb-8 bg-brand-olive bg-opacity-20 px-4 py-2 rounded-full transform transition-all duration-300 hover:scale-110 hover:bg-opacity-30">
            <Camera className="w-5 h-5 mr-2 animate-float" />
            <span className="text-sm font-montserrat font-semibold">Offline kurz v Praze</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-anton mb-6 leading-tight animate-fade-in">
            Učte se natáčet profi videa za 4 dny
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-brand-beige font-montserrat animate-fade-in">
            Dotovaný kurz s reálnými výsledky - zvyšte své dosahy o 80 % a více
          </p>
          
          <CTAButton 
            text="Projevit zájem" 
            className="w-full sm:w-auto shadow-lg text-xl py-4 px-12 transform transition-all duration-300 hover:scale-110" 
          />
          
          {nextEvent && (
            <p className="mt-6 text-brand-beige text-sm font-montserrat animate-fade-in">
              Příští termín: {nextEvent} | Zbývá 5 míst
            </p>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;