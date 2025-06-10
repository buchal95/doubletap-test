'use client';

import React, { useState, useEffect } from 'react';
import CTAButton from '../common/CTAButton';
import { MapPin } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  isAllDay: boolean;
  locationTitle?: string;
}

const Hero: React.FC = () => {
  const [nextEvent, setNextEvent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNextEvent = async () => {
      try {
        setIsLoading(true);
        
        const response = await fetch('/api/proxy/calendar', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(10000),
        });
        
        if (!response.ok) {
          setNextEvent(null);
          return;
        }
        
        const data = await response.json();
        
        if (data && Array.isArray(data.events) && data.events.length > 0) {
          const futureEvents = data.events
            .filter((event: CalendarEvent) => new Date(event.startTime) > new Date())
            .sort((a: CalendarEvent, b: CalendarEvent) => 
              new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
            );
          
          if (futureEvents.length > 0) {
            const nextEventData = futureEvents[0];
            const startDate = new Date(nextEventData.startTime);
            const endDate = new Date(nextEventData.endTime);
            
            if (startDate.toDateString() !== endDate.toDateString()) {
              const startDay = startDate.getDate();
              const endDay = endDate.getDate();
              const month = startDate.toLocaleDateString('cs-CZ', { month: 'long' });
              const year = startDate.getFullYear();
              
              setNextEvent(`${startDay}. - ${endDay}. ${month} ${year}`);
            } else {
              setNextEvent(startDate.toLocaleDateString('cs-CZ', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }));
            }
          } else {
            setNextEvent(null);
          }
        } else {
          setNextEvent(null);
        }
      } catch (error) {
        console.error('Error fetching next event:', error);
        setNextEvent(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNextEvent();
  }, []);

  return (
    <section className="relative py-20 md:py-32 bg-brand-gray text-white overflow-hidden">
      {/* Hero background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/hero-image.webp')"
        }}
      ></div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-gray/60 via-brand-gray/70 to-brand-gray/80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center mb-8 bg-brand-red bg-opacity-20 px-6 py-3 rounded-full transform transition-all duration-300 hover:scale-110 hover:bg-opacity-30">
            <span className="text-lg font-montserrat font-bold">82% hradí stát. Platíte jen 2 700 Kč.</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-anton mb-6 leading-tight animate-fade-in">
            Naučte se natáčet profesionální videa telefonem za 4 dny
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-brand-beige font-montserrat animate-fade-in font-semibold">
            Státní dotace 82% končí koncem roku 2025. Neváhejte!
          </p>

          <div className="mb-8">
            <div className="inline-flex items-center justify-center bg-white/15 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 shadow-lg">
              <MapPin className="w-5 h-5 mr-2 text-brand-olive" />
              <span className="font-montserrat font-semibold">Kurz se koná osobně v Praze</span>
            </div>
          </div>
          
          <div className="mb-8">
            <CTAButton 
              text="Chci využít 82% dotaci" 
              className="w-full sm:w-auto shadow-2xl text-xl py-4 px-12 transform transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              location="hero"
            />
          </div>
          
          {isLoading ? (
            <p className="mt-6 text-brand-beige/60 font-montserrat animate-pulse">
              Zjišťujeme nejbližší termíny...
            </p>
          ) : nextEvent ? (
            <p className="mt-6 text-brand-beige font-montserrat animate-fade-in">
              Nejbližší termín: {nextEvent}
            </p>
          ) : (
            <p className="mt-6 text-brand-beige/80 font-montserrat animate-fade-in">
              Nové termíny oznámíme brzy
            </p>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;