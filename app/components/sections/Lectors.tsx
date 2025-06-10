'use client';

import React from 'react';
import Image from 'next/image';
import SectionHeading from '../common/SectionHeading';
import { Video, Users, Award, Play, Heart, Zap, Target } from 'lucide-react';

const Lectors: React.FC = () => {
  const lectors = [
    {
      name: "Marek Madenský",
      nickname: "Marek",
      title: "Video marketing expert a kreativní guru",
      image: "/marek.webp",
      expertise: ["Video produkce", "Social media", "Content strategy"],
      description: "Už přes 10 let dělá social media marketing a videa točí tak dobře, že by mu to záviděl i algoritmus. Pracoval pro ZOOT, Dáme jídlo nebo Zentivu. Baví ho kreativita, humor a hlavně nadchnout ostatní, aby se nebáli projevit.",
      highlight: "10+ let praxe",
      personality: "Kreativita + humor"
    },
    {
      name: "Kateřina Hůšová", 
      nickname: "Kačis",
      title: "Duše týmu a vizuální čarodějka",
      image: "/kata.webp",
      expertise: ["Vizuální styl", "Trendy", "Výuka"],
      description: "Je duší celého týmu. Neumí improvizovat (ale zato umí všechno ostatní), má cit pro vizuálno, vtip a timing. Když vám něco vysvětluje, tak se to fakt naučíte.",
      highlight: "100% úspěšnost",
      personality: "Cit pro detail"
    },
    {
      name: "Jan Buchal",
      nickname: "Honza", 
      title: "Stratég a perfekcionista",
      image: "/honza.webp",
      expertise: ["Strategie", "Analýza", "Plánování"],
      description: "Neumí improvizovat, ale všechno ostatní mu jde skvěle. Je precizní, přemýšlí nad každým detailem a kdyby byl hashtagem, byl by to #strateg.",
      highlight: "#strateg",
      personality: "Preciznost"
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
                <div className="aspect-w-4 aspect-h-5 bg-gradient-to-br from-brand-beige to-brand-olive/20">
                  <Image
                    src={lector.image}
                    alt={lector.name}
                    width={400}
                    height={500}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Highlight badge */}
                <div className="absolute top-4 left-4 bg-brand-red text-white px-4 py-2 rounded-full text-sm font-anton shadow-lg">
                  {lector.highlight}
                </div>
                
                {/* Personality badge */}
                <div className="absolute top-4 right-4 bg-brand-olive text-white px-3 py-1 rounded-full text-xs font-montserrat font-semibold">
                  {lector.personality}
                </div>
                
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
                    <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-2xl">
                      <Play className="w-8 h-8 text-brand-red" />
                    </div>
                  </div>
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
        <div className="bg-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto mb-12 shadow-lg border border-brand-gray/10">
          <div className="text-center mb-8">
            <Heart className="w-12 h-12 text-brand-red mx-auto mb-4" />
            <h3 className="text-2xl font-anton text-brand-gray mb-4">Naše mise</h3>
            <p className="text-lg font-montserrat text-brand-gray/80 max-w-2xl mx-auto leading-relaxed">
              Společně vás naučíme, jak tvořit videa, která mají <strong className="text-brand-red">šťávu</strong>, 
              <strong className="text-brand-olive"> myšlenku</strong> a hlavně <strong className="text-brand-gray">fungují</strong>.
            </p>
          </div>
        </div>
        
        {/* Team stats */}
        <div className="bg-gradient-to-r from-brand-gray to-brand-gray/90 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto overflow-hidden relative">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-olive/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-red/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="grid md:grid-cols-3 gap-8 text-center mb-8">
              <div className="flex flex-col items-center group">
                <div className="bg-brand-olive/20 p-4 rounded-2xl mb-4 group-hover:bg-brand-olive/30 transition-colors">
                  <Video className="w-12 h-12 text-brand-olive" />
                </div>
                <div className="text-4xl font-anton text-white mb-2">500+</div>
                <p className="text-brand-beige font-montserrat">videí pro klienty</p>
              </div>
              
              <div className="flex flex-col items-center group">
                <div className="bg-brand-red/20 p-4 rounded-2xl mb-4 group-hover:bg-brand-red/30 transition-colors">
                  <Users className="w-12 h-12 text-brand-red" />
                </div>
                <div className="text-4xl font-anton text-white mb-2">200+</div>
                <p className="text-brand-beige font-montserrat">spokojených absolventů</p>
              </div>
              
              <div className="flex flex-col items-center group">
                <div className="bg-brand-olive/20 p-4 rounded-2xl mb-4 group-hover:bg-brand-olive/30 transition-colors">
                  <Zap className="w-12 h-12 text-brand-olive" />
                </div>
                <div className="text-4xl font-anton text-white mb-2">24+</div>
                <p className="text-brand-beige font-montserrat">let zkušeností</p>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="text-xl font-anton text-white mb-3 flex items-center justify-center">
                <Target className="w-6 h-6 mr-2 text-brand-olive" />
                Od nápadu po viral
              </h4>
              <p className="text-brand-beige font-montserrat max-w-2xl mx-auto">
                Každý z nás má jiný styl, ale stejný cíl: naučit vás tvořit videa, 
                která nejen vypadají skvěle, ale hlavně <strong className="text-white">fungují</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lectors;