'use client';

import React, { useState, useEffect } from 'react';
import CTAButton from '../common/CTAButton';
import { Clock, Users } from 'lucide-react';

interface CourseEvent {
  dateRange: string;
  seatsAvailable: number;
}

const Urgency: React.FC = () => {
  const [nextEvents, setNextEvents] = useState<CourseEvent[]>([]);

  useEffect(() => {
    // Static course dates for demo purposes
    const staticEvents: CourseEvent[] = [
      {
        dateRange: "15. - 18. února 2025",
        seatsAvailable: 5
      },
      {
        dateRange: "22. - 25. března 2025",
        seatsAvailable: 8
      }
    ];
    
    setNextEvents(staticEvents);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-brand-gray text-white rounded-2xl overflow-hidden shadow-xl">
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center mb-10">
              <div className="bg-brand-olive bg-opacity-30 p-4 rounded-full mb-6 md:mb-0 md:mr-8 inline-flex items-center justify-center w-20 h-20">
                <Users className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-3xl font-anton mb-3">Omezená kapacita</h2>
                <p className="text-brand-beige text-lg">
                  Maximálně 10 účastníků na termín pro zajištění individuálního přístupu
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {nextEvents.map((event, index) => (
                <div 
                  key={index} 
                  className="bg-white bg-opacity-10 rounded-xl p-8"
                >
                  <h3 className="text-xl font-anton mb-4">{index === 0 ? 'Příští termín kurzu' : 'Další termín kurzu'}</h3>
                  <p className="text-2xl font-anton mb-3">{event.dateRange}</p>
                  <div className="flex items-center">
                    <span className={`inline-block w-3 h-3 rounded-full mr-3 ${
                      event.seatsAvailable > 0 ? 'bg-brand-olive' : 'bg-brand-red'
                    }`}></span>
                    <p className="text-lg">
                      {event.seatsAvailable > 0 
                        ? `Zbývá ${event.seatsAvailable} volných míst z 10`
                        : 'Vyprodáno'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-brand-red bg-opacity-30 rounded-xl p-8 mb-10">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="mb-4 md:mb-0 md:mr-8">
                  <Clock className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-2xl font-anton mb-2">Časově omezená nabídka</h3>
                  <p className="text-lg">
                    Přihlaste se do 5 dnů a získejte zdarma individuální konzultaci v hodnotě 1 500 Kč
                  </p>
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