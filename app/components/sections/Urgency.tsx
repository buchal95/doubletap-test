'use client';

import React from 'react';
import CTAButton from '../common/CTAButton';
import { Clock, Gift, Zap } from 'lucide-react';

const Urgency: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main urgency card with gradient background */}
          <div className="relative bg-gradient-to-br from-brand-gray via-brand-gray to-brand-gray/90 text-white rounded-3xl overflow-hidden shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/20 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-olive/20 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative p-8 md:p-12">
              {/* Header with icon */}
              <div className="flex items-center justify-center mb-8">
                <div className="bg-brand-red/20 p-4 rounded-full backdrop-blur-sm border border-brand-red/30">
                  <Clock className="w-12 h-12 text-brand-red" />
                </div>
              </div>
              
              {/* Main content */}
              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-anton mb-4 bg-gradient-to-r from-white to-brand-beige bg-clip-text text-transparent">
                  Časově omezená nabídka
                </h2>
                <p className="text-xl md:text-2xl text-brand-beige mb-8 max-w-2xl mx-auto leading-relaxed">
                  Přihlaste se do 5 dnů a získejte zdarma individuální konzultaci v hodnotě 1 500 Kč
                </p>
              </div>

              {/* Bonus features card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10 border border-white/20">
                <div className="flex items-center justify-center mb-6">
                  <Gift className="w-8 h-8 text-brand-olive mr-3" />
                  <h3 className="text-2xl font-anton text-white">Co získáte navíc zdarma:</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start group">
                    <div className="bg-brand-olive/20 p-2 rounded-lg mr-4 group-hover:bg-brand-olive/30 transition-colors">
                      <Zap className="w-6 h-6 text-brand-olive" />
                    </div>
                    <div>
                      <h4 className="font-anton text-lg mb-1">30minutová konzultace</h4>
                      <p className="text-brand-beige/80 text-sm">Před kurzem si probereme vaše cíle</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="bg-brand-olive/20 p-2 rounded-lg mr-4 group-hover:bg-brand-olive/30 transition-colors">
                      <Zap className="w-6 h-6 text-brand-olive" />
                    </div>
                    <div>
                      <h4 className="font-anton text-lg mb-1">Personalizovaný plán</h4>
                      <p className="text-brand-beige/80 text-sm">Individuální strategie rozvoje</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CTA section */}
              <div className="text-center">
                <div className="mb-6">
                  <CTAButton 
                    text="Projevit zájem" 
                    className="text-xl py-5 px-16 shadow-2xl transform hover:scale-105 transition-all duration-300"
                  />
                </div>
                <p className="text-brand-beige/80 text-lg">
                  Nezávazná registrace • Platbu provedete až po potvrzení místa
                </p>
              </div>
            </div>
          </div>

          {/* Additional urgency indicator */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center bg-brand-red/10 text-brand-red px-6 py-3 rounded-full border border-brand-red/20">
              <Clock className="w-5 h-5 mr-2 animate-pulse" />
              <span className="font-montserrat font-semibold">Nabídka platí pouze do konce týdne</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Urgency;