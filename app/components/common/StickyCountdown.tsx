'use client';

import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

const StickyCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isVisible, setIsVisible] = useState(false);

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
      // Show sticky button after scrolling 500px
      setIsVisible(window.scrollY > 500);
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

  if (!isVisible || (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0)) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="bg-brand-red text-white rounded-2xl shadow-2xl border-2 border-white/20 overflow-hidden max-w-sm">
        {/* Header */}
        <div className="bg-brand-red/90 px-4 py-3 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 animate-pulse" />
          <span className="font-anton text-sm">Dotace brzy končí!</span>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="text-center mb-4">
            <div className="text-2xl font-anton mb-1">82% DOTACE</div>
            <div className="text-xs opacity-90">Zbývá jen:</div>
          </div>
          
          {/* Countdown */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="text-center">
              <div className="bg-white/20 rounded-lg py-2 px-1">
                <div className="font-anton text-lg">{timeLeft.days}</div>
                <div className="text-xs opacity-80">dní</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-lg py-2 px-1">
                <div className="font-anton text-lg">{timeLeft.hours}</div>
                <div className="text-xs opacity-80">hod</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-lg py-2 px-1">
                <div className="font-anton text-lg">{timeLeft.minutes}</div>
                <div className="text-xs opacity-80">min</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 rounded-lg py-2 px-1">
                <div className="font-anton text-lg">{timeLeft.seconds}</div>
                <div className="text-xs opacity-80">sek</div>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <button
            onClick={handleClick}
            className="w-full bg-white text-brand-red font-anton py-3 px-4 rounded-lg hover:bg-brand-beige transition-all duration-300 transform hover:scale-105 text-sm"
          >
            Využít dotaci nyní
          </button>
          
          <div className="text-center mt-2">
            <span className="text-xs opacity-75">Pouze 2 700 Kč místo 15 000 Kč</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCountdown;