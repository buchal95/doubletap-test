'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Clock, AlertTriangle, X } from 'lucide-react';

const StickyCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Target date: October 31, 2025 23:59:59
    const targetDate = new Date('2025-10-31T23:59:59').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Update immediately
    updateCountdown();
    
    // Update every second
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky banner after scrolling 800px
      setIsVisible(window.scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
  };

  if (!isVisible || isDismissed || (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0)) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-brand-red to-brand-red/90 text-white shadow-2xl border-t-2 border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Logo + Alert */}
            <div className="flex items-center">
              {/* Logo with white background for visibility */}
              <div className="bg-white rounded-lg p-2 mr-4 hidden sm:block">
                <Image
                  src="/doubletap-logo.webp"
                  alt="Double Tap Logo"
                  width={80}
                  height={36}
                  className="h-6 w-auto"
                />
              </div>
              <AlertTriangle className="w-6 h-6 mr-3 animate-pulse flex-shrink-0 sm:hidden" />
              <div>
                <div className="font-anton text-lg">82% DOTACE KONČÍ!</div>
                <div className="text-sm opacity-90">Registrace nutná do 31. 10. 2025</div>
              </div>
            </div>
            
            {/* Center - Countdown */}
            <div className="hidden md:flex items-center space-x-4">
              <Clock className="w-5 h-5" />
              <div className="flex space-x-3">
                <div className="text-center">
                  <div className="font-anton text-xl">{timeLeft.days}</div>
                  <div className="text-xs opacity-80">dní</div>
                </div>
                <div className="text-white/50">:</div>
                <div className="text-center">
                  <div className="font-anton text-xl">{timeLeft.hours}</div>
                  <div className="text-xs opacity-80">hod</div>
                </div>
                <div className="text-white/50">:</div>
                <div className="text-center">
                  <div className="font-anton text-xl">{timeLeft.minutes}</div>
                  <div className="text-xs opacity-80">min</div>
                </div>
                <div className="text-white/50">:</div>
                <div className="text-center">
                  <div className="font-anton text-xl">{timeLeft.seconds}</div>
                  <div className="text-xs opacity-80">sek</div>
                </div>
              </div>
            </div>
            
            {/* Right side - CTA and Close */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleClick}
                className="bg-white text-brand-red font-anton py-3 px-6 rounded-lg hover:bg-brand-beige transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
              >
                Využít dotaci
              </button>
              
              <button
                onClick={handleDismiss}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Zavřít"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Mobile countdown */}
          <div className="md:hidden mt-3 pt-3 border-t border-white/20">
            <div className="flex justify-center space-x-4">
              <div className="text-center">
                <div className="font-anton text-lg">{timeLeft.days}</div>
                <div className="text-xs opacity-80">dní</div>
              </div>
              <div className="text-center">
                <div className="font-anton text-lg">{timeLeft.hours}</div>
                <div className="text-xs opacity-80">hod</div>
              </div>
              <div className="text-center">
                <div className="font-anton text-lg">{timeLeft.minutes}</div>
                <div className="text-xs opacity-80">min</div>
              </div>
              <div className="text-center">
                <div className="font-anton text-lg">{timeLeft.seconds}</div>
                <div className="text-xs opacity-80">sek</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCountdown;