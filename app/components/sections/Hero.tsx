'use client';

import React, { useState, useEffect } from 'react';
import CTAButton from '../common/CTAButton';
import { Camera, MapPin } from 'lucide-react';

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNextEvent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Use proxy API route with proper error handling
        const response = await fetch('/api/proxy/calendar', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Add timeout
          signal: AbortSignal.timeout(10000), // 10 second timeout
        });
        
        if (!response.ok) {
          console.error(`Calendar API error: ${response.status} ${response.statusText}`);
          setError('Nepodařilo se načíst termíny');
          setNextEvent(null);
          return;
        }
        
        const data = await response.json();
        
        if (data && Array.isArray(data.events) && data.events.length > 0) {
          // Filter and sort future events
          const futureEvents = data.events
            .filter((event: CalendarEvent) => new Date(event.startTime) > new Date())
            .sort((a: CalendarEvent, b: CalendarEvent) => 
              new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
            );
          
          if (futureEvents.length > 0) {
            const nextEventData = futureEvents[0];
            const startDate = new Date(nextEventData.startTime);
            const endDate = new Date(nextEventData.endTime);
            
            // Format the date range properly
            const formatDate = (date: Date) => {
              return date.toLocaleDateString('cs-CZ', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              });
            };
            
            // If it's a multi-day event, show date range
            if (startDate.toDateString() !== endDate.toDateString()) {
              const startDay = startDate.getDate();
              const endDay = endDate.getDate();
              const month = startDate.toLocaleDateString('cs-CZ', { month: 'long' });
              const year = startDate.getFullYear();
              
              setNextEvent(`${startDay}. - ${endDay}. ${month} ${year}`);
            } else {
              // Single day event
              setNextEvent(formatDate(startDate));
            }
          } else {
            setNextEvent(null);
          }
        } else {
          setNextEvent(null);
        }
      } catch (error) {
        console.error('Error fetching next event:', error);
        setError('Nepodařilo se načíst termíny');
        setNextEvent(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNextEvent();
  }, []);

  return (
    <section className="relative py-20 md:py-32 bg-brand-gray text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] opacity-20 bg-cover bg-center transform transition-all duration-500 hover:scale-105"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center mb-8 bg-brand-red bg-opacity-20 px-6 py-3 rounded-full transform transition-all duration-300 hover:scale-110 hover:bg-opacity-30">
            <span className="text-lg font-montserrat font-bold">82% hradí stát. Vy jen 2 700 Kč.</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-anton mb-6 leading-tight animate-fade-in">
            Naučte se točit profesionální videa telefonem za 4 dny
          </h1>
          
          <p className="text-xl md:text-2xl mb-6 text-brand-beige font-montserrat animate-fade-in font-semibold">
            Státní dotace brzy končí. Využijte je, dokud existují.
          </p>

          {/* Location info */}
          <div className="inline-flex items-center justify-center mb-8 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <MapPin className="w-5 h-5 mr-2 text-brand-olive" />
            <span className="font-montserrat font-semibold">Kurz probíhá osobně v Praze</span>
          </div>
          
          <CTAButton 
            text="Chci využít dotaci" 
            className="w-full sm:w-auto shadow-lg text-xl py-4 px-12 transform transition-all duration-300 hover:scale-110" 
          />
          
          {/* Dynamic next event display with error handling */}
          {isLoading ? (
            <p className="mt-6 text-brand-beige/60 font-montserrat animate-pulse">
              Načítání termínů...
            </p>
          ) : error ? (
            <p className="mt-6 text-brand-beige/80 font-montserrat animate-fade-in">
              Nové termíny budou brzy vyhlášeny
            </p>
          ) : nextEvent ? (
            <p className="mt-6 text-brand-beige font-montserrat animate-fade-in">
              Příští termín: {nextEvent}
            </p>
          ) : (
            <p className="mt-6 text-brand-beige/80 font-montserrat animate-fade-in">
              Nové termíny budou brzy vyhlášeny
            </p>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;