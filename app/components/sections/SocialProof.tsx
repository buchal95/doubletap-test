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

  // Get current 3 logos
  const getCurrentLogos = () => {
    const start = currentLogoSet * 3;
    return allLogos.slice(start, start + 3);
  };

  // Auto-play animation every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleDoubleTap();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentLogoSet]);

  const handleDoubleTap = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    
    // Random finger position
    setFingerPosition({
      x: Math.random() * 200 - 100,
      y: Math.random() * 100 - 50
    });

    // Finger tap animation
    setTimeout(() => {
      setShowHeart(true);
      
      // Change logos
      setTimeout(() => {
        setCurrentLogoSet((prev) => {
          const maxSets = Math.ceil(allLogos.length / 3);
          return (prev + 1) % maxSets;
        });
      }, 300);

      // Hide heart
      setTimeout(() => {
        setShowHeart(false);
        setIsAnimating(false);
      }, 1000);
    }, 500);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-brand-beige to-brand-beige/80 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-anton text-brand-gray mb-2">
            Naši lektoři tvořili videa pro tyto společnosti
          </h2>
          <p className="text-brand-gray/60 font-montserrat">Automaticky se mění každé 4 sekundy</p>
        </div>
        
        {/* Interactive logo container */}
        <div className="relative max-w-4xl mx-auto">
          <div 
            className="flex justify-center items-center gap-12 md:gap-20 mb-16 min-h-[120px] cursor-pointer select-none relative"
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
                {/* Fixed container for consistent sizing */}
                <div className="w-32 h-16 md:w-40 md:h-20 flex items-center justify-center bg-white/50 rounded-lg backdrop-blur-sm border border-white/30 p-3">
                  <Image 
                    src={logo.src} 
                    alt={logo.alt} 
                    width={150}
                    height={75}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}

            {/* Animated finger */}
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
                {/* Finger icon */}
                <div className={`text-4xl transition-transform duration-200 ${
                  isAnimating ? 'animate-pulse scale-90' : ''
                }`}>
                  👆
                </div>
                
                {/* Double tap indicator */}
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-brand-red rounded-full animate-ping"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-brand-red rounded-full"></div>
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
                className={`w-12 h-12 text-brand-red fill-brand-red transition-all duration-300 ${
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
                <div className="w-16 h-16 border-2 border-brand-red/30 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 left-1/2 w-8 h-8 border-2 border-brand-red/50 rounded-full animate-ping transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '0.1s' }}></div>
              </div>
            )}
          </div>

          {/* Progress dots */}
          <div className="flex justify-center space-x-2 mb-8">
            {Array.from({ length: Math.ceil(allLogos.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentLogoSet(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentLogoSet ? 'bg-brand-red w-6' : 'bg-brand-gray/20 hover:bg-brand-gray/40'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-6">
          <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-white/50">
            <div className="text-4xl font-anton text-brand-red mb-2 animate-fade-in">7+</div>
            <div className="text-brand-gray/80 font-montserrat">značek důvěřuje našim lektorům</div>
          </div>
          
          <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-white/50">
            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-brand-red fill-brand-red" />
              ))}
            </div>
            <div className="text-brand-gray/80 font-montserrat font-semibold">hodnocení kurzu</div>
          </div>
          
          <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-white/50">
            <div className="text-4xl font-anton text-brand-red mb-2 animate-fade-in">82%</div>
            <div className="text-brand-gray/80 font-montserrat">dotace od státu</div>
          </div>
        </div>
        
        {/* Playful footnote */}
        <div className="text-center">
          <p className="text-xs text-brand-gray/50 font-montserrat italic">
            * videa, která pomohla těmto značkám růst
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;