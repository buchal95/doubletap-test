'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import SectionHeading from '../common/SectionHeading';
import { Heart, User, Camera, Video } from 'lucide-react';

const Lectors: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  const handleImageError = (imageName: string) => {
    setImageErrors(prev => ({ ...prev, [imageName]: true }));
  };

  const lectors = [
    {
      name: "Marek Madenský",
      nickname: "Marek",
      title: "Video marketing expert a kreativní guru",
      image: "/marek.webp",
      fallbackUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=1",
      expertise: ["Video produkce", "Social media", "Content strategy"],
      description: "Už přes 10 let dělá social media marketing a videa točí tak dobře, že by mu to záviděl i algoritmus. Pracoval pro ZOOT, Dáme jídlo nebo Zentivu. Baví ho kreativita, humor a hlavně nadchnout ostatní, aby se nebáli projevit.",
      highlight: "Algoritmus whisperer",
      personality: "Kreativní chaos",
      objectPosition: "center top",
      fallbackIcon: <Video className="w-16 h-16 text-brand-olive/60" />
    },
    {
      name: "Kateřina Hůšová", 
      nickname: "Kačis",
      title: "Duše týmu a vizuální čarodějka",
      image: "/kata.webp",
      fallbackUrl: "https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=1",
      expertise: ["Vizuální styl", "Trendy", "Výuka"],
      description: "Je duší celého týmu. Neumí improvizovat (ale zato umí všechno ostatní), má cit pro vizuálno, vtip a timing. Když vám něco vysvětluje, tak se to fakt naučíte.",
      highlight: "Učí tak, že to pochopíte",
      personality: "Vizuální génius",
      objectPosition: "center top",
      fallbackIcon: <Camera className="w-16 h-16 text-brand-olive/60" />
    },
    {
      name: "Jan Buchal",
      nickname: "Honza", 
      title: "Stratég a perfekcionista",
      image: "/honza.webp",
      fallbackUrl: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=1",
      expertise: ["Strategie", "Analýza", "Plánování"],
      description: "Neumí improvizovat, ale všechno ostatní mu jde skvěle. Je precizní, přemýšlí nad každým detailem a kdyby byl hashtagem, byl by to #strateg.",
      highlight: "Anti-improvizace",
      personality: "#strateg",
      objectPosition: "center center",
      fallbackIcon: <User className="w-16 h-16 text-brand-olive/60" />
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-brand-beige to-brand-beige/60">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="O nás" 
          subtitle="Jsme Marek, Honza a Kačis. Tři nadšenci do sociálních sítí, marketingu a hlavně tvorby krátkých videí. Pořádáme workshopy pro všechny, kdo chtějí přestat scrollovat a začít tvořit."
        />
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {lectors.map((lector, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl shadow-lg border border-brand-gray/10 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] transform"
            >
              {/* Photo section */}
              <div className="relative overflow-hidden">
                <div className="relative w-full h-80">
                  {imageErrors[lector.image] ? (
                    // Try fallback URL first, then enhanced placeholder
                    imageErrors[lector.fallbackUrl] ? (
                      <div className="w-full h-full bg-gradient-to-br from-brand-beige via-brand-olive/10 to-brand-red/5 flex items-center justify-center">
                        <div className="text-center">
                          {lector.fallbackIcon}
                          <p className="text-brand-gray/60 font-montserrat text-sm mt-2">{lector.name}</p>
                          <p className="text-brand-gray/40 font-montserrat text-xs">{lector.nickname}</p>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={lector.fallbackUrl}
                        alt={lector.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        style={{ objectPosition: lector.objectPosition }}
                        priority={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                        quality={80}
                        placeholder="blur"
                        blurDataURL="data:image/webp;base64,UklGRpABAABXRUJQVlA4WAoAAAABAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA"
                        onError={() => handleImageError(lector.fallbackUrl)}
                      />
                    )
                  ) : (
                    <Image
                      src={lector.image}
                      alt={lector.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ objectPosition: lector.objectPosition }}
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      quality={80}
                      placeholder="blur"
                      blurDataURL="data:image/webp;base64,UklGRpABAABXRUJQVlA4WAoAAAABAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VLIAAAA"
                      onError={() => handleImageError(lector.image)}
                    />
                  )}
                </div>
                
                {/* Fun highlight badge */}
                <div className="absolute top-4 left-4 bg-brand-red text-white px-4 py-2 rounded-full text-sm font-anton shadow-lg transform rotate-2 group-hover:rotate-0 transition-transform duration-300">
                  {lector.highlight}
                </div>
                
                {/* Personality badge */}
                <div className="absolute top-4 right-4 bg-brand-olive text-white px-3 py-1 rounded-full text-xs font-montserrat font-semibold transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
                  {lector.personality}
                </div>
              </div>
              
              {/* Content section */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-anton text-brand-gray mb-1">{lector.name}</h3>
                  <p className="text-brand-olive font-montserrat font-semibold text-sm">{lector.title}</p>
                </div>
                
                {/* Expertise tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {lector.expertise.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="bg-brand-beige text-brand-gray px-3 py-1 rounded-full text-xs font-montserrat font-medium border border-brand-olive/20 transition-all duration-300 hover:bg-brand-olive/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                {/* Description */}
                <p className="text-brand-gray/80 font-montserrat text-sm leading-relaxed">
                  {lector.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Team mission statement */}
        <div className="bg-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto shadow-lg border border-brand-gray/10">
          <div className="text-center">
            <Heart className="w-12 h-12 text-brand-red mx-auto mb-4" />
            <h3 className="text-2xl font-anton text-brand-gray mb-4">Naše mise</h3>
            <p className="text-lg font-montserrat text-brand-gray/80 max-w-2xl mx-auto leading-relaxed">
              Společně vás naučíme, jak tvořit videa, která mají <strong className="text-brand-red">šťávu</strong>, 
              <strong className="text-brand-olive"> myšlenku</strong> a hlavně <strong className="text-brand-gray">fungují</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lectors;