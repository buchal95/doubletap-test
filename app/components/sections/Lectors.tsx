'use client';

import React from 'react';
import Image from 'next/image';
import SectionHeading from '../common/SectionHeading';
import { Video, Users, Award, Play } from 'lucide-react';

const Lectors: React.FC = () => {
  const lectors = [
    {
      name: "Marek Madenský",
      title: "Hlavní lektor a expert na video marketing",
      image: "/marek.webp",
      expertise: ["Video produkce", "Social media", "Content strategy"],
      description: "Více než 10 let zkušeností s tvorbou videí pro mezinárodní značky. Specializuje se na video marketing a content strategii.",
      highlight: "15+ let praxe"
    },
    {
      name: "Kateřina Hůšová", 
      title: "Specialistka na sociální sítě a trendy",
      image: "/kata.webp",
      expertise: ["Instagram", "TikTok", "Trendy"],
      description: "Expertka na moderní sociální sítě a virální obsah. Pomáhá brandům najít svůj autentický hlas na platformách jako Instagram a TikTok.",
      highlight: "Miliony zhlédnutí"
    },
    {
      name: "Jan Novák",
      title: "Technický expert a post-produkce",
      image: "/honza.webp", 
      expertise: ["Střih", "Postprodukce", "Efekty"],
      description: "Specialista na technickou stránku tvorby videí. Ovládá všechny moderní aplikace a techniky pro dokonalý výsledek.",
      highlight: "1000+ projektů"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Váš tým expertů" 
          subtitle="Osobně vás provedou celým procesem od prvního záběru po finální video"
        />
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {lectors.map((lector, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl shadow-lg border border-brand-gray/10 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] transform"
            >
              {/* Photo section */}
              <div className="relative overflow-hidden">
                <div className="aspect-w-4 aspect-h-5 bg-gradient-to-br from-brand-beige to-brand-olive/20">
                  <Image
                    src={lector.image}
                    alt={lector.name}
                    width={400}
                    height={500}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Highlight badge */}
                <div className="absolute top-4 left-4 bg-brand-red text-white px-3 py-1 rounded-full text-sm font-anton">
                  {lector.highlight}
                </div>
                
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4">
                      <Play className="w-8 h-8 text-brand-red" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content section */}
              <div className="p-6">
                <h3 className="text-xl font-anton text-brand-gray mb-2">{lector.name}</h3>
                <p className="text-brand-olive font-montserrat font-semibold mb-4 text-sm">{lector.title}</p>
                
                {/* Expertise tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {lector.expertise.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="bg-brand-beige text-brand-gray px-3 py-1 rounded-full text-xs font-montserrat font-medium"
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
        
        {/* Team stats */}
        <div className="bg-brand-gray text-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Video className="w-12 h-12 text-brand-olive mb-4" />
              <div className="text-3xl font-anton text-white mb-2">500+</div>
              <p className="text-brand-beige font-montserrat">videí pro klienty</p>
            </div>
            
            <div className="flex flex-col items-center">
              <Users className="w-12 h-12 text-brand-olive mb-4" />
              <div className="text-3xl font-anton text-white mb-2">200+</div>
              <p className="text-brand-beige font-montserrat">spokojených absolventů</p>
            </div>
            
            <div className="flex flex-col items-center">
              <Award className="w-12 h-12 text-brand-olive mb-4" />
              <div className="text-3xl font-anton text-white mb-2">50+</div>
              <p className="text-brand-beige font-montserrat">ocenění za kreativitu</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <h4 className="text-xl font-anton text-white mb-3">Praktická zkušenost je základ</h4>
            <p className="text-brand-beige font-montserrat max-w-2xl mx-auto">
              Naši lektoři denně pracují s video obsahem pro největší české i mezinárodní značky. 
              To, co vás naučí, používají každý den v praxi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lectors;