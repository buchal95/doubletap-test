'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Heart } from 'lucide-react';

const SocialProof: React.FC = () => {
  const allLogos = [
    { src: '/proteinaco-logo.png', alt: 'Protein a Co' },
    { src: '/florea-logo.png', alt: 'Florea' },
    { src: '/xinzuo-logo.png', alt: 'Xinzuo' },
    { src: '/alkoholcz-logo.webp', alt: 'Alkohol.cz' },
    { src: '/himalife-logo.webp', alt: 'Himalife' },
    { src: '/naturway-logo.webp', alt: 'Naturway' },
    { src: '/zoot-logo.webp', alt: 'Zoot' }
  ];

  const [currentLogoSet, setCurrentLogoSet] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [fingerPosition, setFingerPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get current logos based on screen size
  const getCurrentLogos = () => {
    const logosPerSet = isMobile ? 2 : 3;
    const start = currentLogoSet * logosPerSet;
    return allLogos.slice(start, start + logosPerSet);
  };

  // Calculate max sets based on screen size
  const getMaxSets = () => {
    const logosPerSet = isMobile ? 2 : 3;
    return Math.ceil(allLogos.length / logosPerSet);
  };

  // Auto-play animation every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleDoubleTap();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleDoubleTap = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    
    const maxX = isMobile ? 150 : 200;
    const maxY = isMobile ? 80 : 100;
    setFingerPosition({
      x: Math.random() * maxX - maxX/2,
      y: Math.random() * maxY - maxY/2
    });

    setTimeout(() => {
      setShowHeart(true);
      
      setTimeout(() => {
        setCurrentLogoSet((prev) => {
          const maxSets = getMaxSets();
          return (prev + 1) % maxSets;
        });
      }, 300);

      setTimeout(() => {
        setShowHeart(false);
        setIsAnimating(false);
      }, 1000);
    }, 500);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-brand-beige to-brand-beige/80 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-anton text-brand-gray leading-tight text-center">
            Naši lektoři tvořili videa (nejen) pro tyto společnosti
          </h2>
        </div>
        
        {/* Interactive logo container with responsive design */}
        <div className="relative max-w-4xl mx-auto">
          <div 
            className="flex justify-center items-center gap-6 md:gap-12 lg:gap-20 mb-16 min-h-[100px] md:min-h-[120px] cursor-pointer select-none relative"
            onClick={handleDoubleTap}
          >
            {getCurrentLogos().map((logo, index) => (
              <div
                key={`${currentLogoSet}-${index}`}
                className={`transform transition-all duration-700 ${
                  isAnimating ? 'scale-110 rotate-1' : 'scale-100 hover:scale-105'
                } opacity-80 hover:opacity-100`}
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                <div className="w-24 h-12 sm:w-28 sm:h-14 md:w-32 md:h-16 lg:w-40 lg:h-20 flex items-center justify-center bg-white/50 rounded-lg backdrop-blur-sm border border-white/30 p-2 md:p-3">
                  <Image 
                    src={logo.src} 
                    alt={logo.alt} 
                    width={150}
                    height={75}
                    loading="lazy"
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, (max-width: 1024px) 128px, 160px"
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}

            {/* Animated finger - responsive size */}
            <div 
              className={`absolute pointer-events-none transition-all duration-500 z-10 ${
                isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{
                left: `calc(50% + ${fingerPosition.x}px)`,
                top: `calc(50% + ${fingerPosition.y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="relative">
                <div className={`text-2xl md:text-4xl transition-transform duration-200 ${
                  isAnimating ? 'animate-pulse scale-90' : ''
                }`}>
                  👆
                </div>
                
                <div className="absolute -top-1 md:-top-2 -right-1 md:-right-2 w-2 h-2 md:w-3 md:h-3 bg-brand-red rounded-full animate-ping"></div>
                <div className="absolute -top-0.5 md:-top-1 -right-0.5 md:-right-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-brand-red rounded-full"></div>
              </div>
            </div>

            {/* Instagram-style heart */}
            <div 
              className={`absolute pointer-events-none transition-all duration-500 z-10 ${
                showHeart ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{
                left: `calc(50% + ${fingerPosition.x}px)`,
                top: `calc(50% + ${fingerPosition.y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <Heart 
                className={`w-8 h-8 md:w-12 md:h-12 text-brand-red fill-brand-red transition-all duration-300 ${
                  showHeart ? 'animate-bounce' : ''
                }`} 
              />
            </div>

            {/* Ripple effect */}
            {isAnimating && (
              <div 
                className="absolute pointer-events-none z-10"
                style={{
                  left: `calc(50% + ${fingerPosition.x}px)`,
                  top: `calc(50% + ${fingerPosition.y}px)`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-brand-red/30 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 left-1/2 w-6 h-6 md:w-8 md:h-8 border-2 border-brand-red/50 rounded-full animate-ping transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '0.1s' }}></div>
              </div>
            )}
          </div>

          {/* Progress dots */}
          <div className="flex justify-center space-x-2 mb-8">
            {Array.from({ length: getMaxSets() }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentLogoSet(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentLogoSet ? 'bg-brand-red w-4 md:w-6' : 'bg-brand-gray/20 hover:bg-brand-gray/40'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Stats section - responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center mb-8 max-w-4xl mx-auto">
          <div className="p-4 md:p-6 bg-white/80 backdrop-blur-sm rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-white/50">
            <div className="text-3xl md:text-4xl font-anton text-brand-red mb-2 animate-fade-in text-center">24+</div>
            <div className="text-sm md:text-base text-brand-gray/80 font-montserrat text-center mb-3">let zkušeností z marketingu</div>
            <div className="text-xs md:text-sm text-brand-gray/50 font-montserrat italic text-center">
              * a tisíce videí
            </div>
          </div>
          
          <div className="p-4 md:p-6 bg-white/80 backdrop-blur-sm rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-white/50">
            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 md:w-6 md:h-6 text-brand-red fill-brand-red" />
              ))}
            </div>
            <div className="text-sm md:text-base text-brand-gray/80 font-montserrat font-semibold text-center mb-3">hodnocení kurzu</div>
            <div className="text-xs md:text-sm text-brand-gray/50 font-montserrat italic text-center">
              * sami tomu věříme těžko, ale je to pravda
            </div>
          </div>
          
          <div className="p-4 md:p-6 bg-white/80 backdrop-blur-sm rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-white/50">
            <div className="text-3xl md:text-4xl font-anton text-brand-red mb-2 animate-fade-in text-center">82%</div>
            <div className="text-sm md:text-base text-brand-gray/80 font-montserrat text-center mb-3">dotace od státu</div>
            <div className="text-xs md:text-sm text-brand-gray/50 font-montserrat italic text-center">
              * do konce roku 2025
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;