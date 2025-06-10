'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CTAButton from '../common/CTAButton';
import { MapPin, Camera } from 'lucide-react';

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
  const [imageError, setImageError] = useState<boolean>(false);

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

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <section className="relative py-20 md:py-32 bg-brand-gray text-white overflow-hidden">
      {/* Background with fallback */}
      <div className="absolute inset-0 bg-brand-gray">
        {!imageError ? (
          <Image
            src="https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Profesionální tvorba videí"
            fill
            priority
            quality={75}
            sizes="100vw"
            className="object-cover opacity-30"
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRpABAABXRUJQVlA4WAoAAAABAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA"
            onError={handleImageError}
          />
        ) : (
          // Fallback pattern background
          <div className="absolute inset-0 opacity-30">
            <div className="w-full h-full bg-gradient-to-br from-brand-gray via-brand-olive/20 to-brand-red/20 relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="3" cy="3" r="1"/%3E%3Ccircle cx="13" cy="13" r="1"/%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Camera className="w-32 h-32 text-white/10" />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Optimized dark overlay */}
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