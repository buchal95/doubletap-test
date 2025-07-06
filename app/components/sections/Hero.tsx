'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CTAButton from '../common/CTAButton';
import { MapPin } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import AnimatedCounter from '../ui/AnimatedCounter';
import { useTypewriter } from '../../../hooks/useAnimations';

// Import shared types and constants
import { COURSE_TEXT } from '../../../constants';
import { getNextUpcomingEvent, formatNextEventDate } from '../../../lib';
import { useCalendarEvents } from '../../../hooks';

const Hero: React.FC = () => {
  const [nextEvent, setNextEvent] = useState<string | null>(null);

  const { events, isLoading } = useCalendarEvents({
    onSuccess: (events) => {
      const nextUpcomingEvent = getNextUpcomingEvent(events);
      if (nextUpcomingEvent) {
        const formattedDate = formatNextEventDate(nextUpcomingEvent.startTime);
        setNextEvent(formattedDate);
      } else {
        setNextEvent(null);
      }
    },
    onError: () => {
      setNextEvent(null);
    }
  });

  // The calendar events are now handled by the useCalendarEvents hook above

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
          <AnimatedSection animation="fadeInDown" delay={200}>
            <div className="inline-flex items-center justify-center mb-8 bg-brand-red/25 backdrop-blur-sm px-6 py-3 rounded-full transition-all duration-300 hover:bg-brand-red/30 border border-white/20">
              <span className="text-lg font-montserrat font-bold text-white drop-shadow-sm">
                <AnimatedCounter end={82} suffix="%" /> hradí stát. Platíte jen <span className="whitespace-nowrap"><AnimatedCounter end={2700} separator=" " /> Kč.</span>
              </span>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={400}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-anton mb-6 leading-tight text-white drop-shadow-lg">
              Naučte se natáčet profesionální videa telefonem za 4 dny
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={600}>
            <p className="text-xl md:text-2xl mb-8 text-brand-beige font-montserrat font-semibold drop-shadow-md">
              Státní dotace 82% končí koncem roku 2025. Neváhejte!
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fadeInUp" delay={800}>
            <div className="mb-8">
              <div className="inline-flex items-center justify-center bg-white/15 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 shadow-lg">
                <MapPin className="w-5 h-5 mr-2 text-brand-olive" />
                <span className="font-montserrat font-semibold text-white">Kurz se koná osobně v Praze</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="scaleIn" delay={1000}>
            <div className="mb-8">
              <CTAButton
                text="Chci využít 82% dotaci"
                className="w-full sm:w-auto shadow-2xl text-xl py-4 px-12 transform hover:scale-105 transition-transform duration-200"
                location="hero"
              />
            </div>
          </AnimatedSection>
          
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