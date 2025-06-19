'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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

  // Czech month names in genitive case (for dates)
  const CZECH_MONTHS_GENITIVE = [
    'ledna', 'února', 'března', 'dubna', 'května', 'června',
    'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'
  ];

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
            let endDate = new Date(nextEventData.endTime);
            
            // For all-day events, Google Calendar uses exclusive end dates
            // So we need to subtract one day to get the actual inclusive end date
            if (nextEventData.isAllDay) {
              endDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000); // Subtract one day
            }
            
            // Check if it's a single day or multi-day event
            if (startDate.toDateString() === endDate.toDateString()) {
              // Single day event
              const day = startDate.getDate();
              const month = CZECH_MONTHS_GENITIVE[startDate.getMonth()];
              const year = startDate.getFullYear();
              setNextEvent(`${day}. ${month} ${year}`);
            } else {
              // Multi-day event - format with proper Czech grammar
              const startDay = startDate.getDate();
              const endDay = endDate.getDate();
              const startMonth = startDate.getMonth();
              const endMonth = endDate.getMonth();
              const startYear = startDate.getFullYear();
              const endYear = endDate.getFullYear();
              
              // If same month and year
              if (startMonth === endMonth && startYear === endYear) {
                const month = CZECH_MONTHS_GENITIVE[startMonth];
                setNextEvent(`${startDay}.–${endDay}. ${month} ${startYear}`);
              } else if (startYear === endYear) {
                // Same year, different months
                const startMonthName = CZECH_MONTHS_GENITIVE[startMonth];
                const endMonthName = CZECH_MONTHS_GENITIVE[endMonth];
                setNextEvent(`${startDay}. ${startMonthName} – ${endDay}. ${endMonthName} ${startYear}`);
              } else {
                // Different years
                const startMonthName = CZECH_MONTHS_GENITIVE[startMonth];
                const endMonthName = CZECH_MONTHS_GENITIVE[endMonth];
                setNextEvent(`${startDay}. ${startMonthName} ${startYear} – ${endDay}. ${endMonthName} ${endYear}`);
              }
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

  const handleClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 md:py-32 bg-brand-gray text-white overflow-hidden">
      {/* Hero background image - simplified approach */}
      <div className="absolute inset-0">
        <Image
          src="/hero-image.webp"
          alt="Profesionální tvorba videí"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover opacity-40"
          onLoad={() => console.log('Hero image loaded successfully')}
          onError={(e) => console.error('Hero image failed to load:', e)}
        />
      </div>
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-gray/70 via-brand-gray/60 to-brand-gray/80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center mb-8 bg-brand-red/25 backdrop-blur-sm px-6 py-3 rounded-full transform transition-all duration-300 hover:scale-105 hover:bg-brand-red/30 border border-white/20">
            <span className="text-lg font-montserrat font-bold text-white drop-shadow-sm">82% hradí stát. Platíte jen <span className="whitespace-nowrap">2 700 Kč.</span></span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-anton mb-6 leading-tight animate-fade-in text-white drop-shadow-lg">
            Naučte se natáčet profesionální videa telefonem za 4 dny
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-brand-beige font-montserrat animate-fade-in font-semibold drop-shadow-md">
            Státní dotace 82% končí koncem roku 2025. Neváhejte!
          </p>

          <div className="mb-8">
            <div className="inline-flex items-center justify-center bg-white/15 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 shadow-lg">
              <MapPin className="w-5 h-5 mr-2 text-brand-olive" />
              <span className="font-montserrat font-semibold text-white">Kurz se koná osobně v Praze</span>
            </div>
          </div>
          
          <div className="mb-8">
            <CTAButton 
              text="Chci využít 82% dotaci" 
              className="w-full sm:w-auto shadow-2xl text-xl py-4 px-12 transform transition-all duration-300 hover:scale-110"
              location="hero"
            />
          </div>
          
          {isLoading ? (
            <p className="mt-6 text-brand-beige/60 font-montserrat animate-pulse">
              Zjišťujeme nejbližší termíny...
            </p>
          ) : nextEvent ? (
            <p className="mt-6 text-brand-beige font-montserrat animate-fade-in">
              Nejbližší termín: <span className="font-semibold">{nextEvent}</span>
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