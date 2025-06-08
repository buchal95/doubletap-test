'use client';

import React from 'react';
import CTAButton from '../common/CTAButton';
import { Clock } from 'lucide-react';

const Urgency: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-brand-gray text-white rounded-2xl overflow-hidden shadow-xl">
          <div className="p-8 md:p-10">
            <div className="bg-brand-red bg-opacity-30 rounded-xl p-8 mb-10">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="mb-4 md:mb-0 md:mr-8">
                  <Clock className="w-12 h-12" />
                </div>
                <div>
                  <h2 className="text-3xl font-anton mb-3">Časově omezená nabídka</h2>
                  <p className="text-lg mb-4">
                    Přihlaste se do 5 dnů a získejte zdarma individuální konzultaci v hodnotě 1 500 Kč
                  </p>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <h3 className="text-xl font-anton mb-2">Co získáte navíc:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                        <span>30minutovou konzultaci před kurzem</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                        <span>Personalizovaný plán rozvoje</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-brand-olive mt-2 mr-3 flex-shrink-0"></span>
                        <span>Prioritní podporu během kurzu</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <CTAButton 
                text="Projevit zájem" 
                className="text-xl py-4 px-12 shadow-lg"
              />
              <p className="mt-4 text-brand-beige">
                Nezávazná registrace, platbu provedete až po potvrzení místa
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Urgency;