'use client';

import React, { useState, useEffect } from 'react';
import SectionHeading from '../common/SectionHeading';
import CTAButton from '../common/CTAButton';
import { Calendar, RefreshCw, MapPin, Clock } from 'lucide-react';

// Import shared types and constants
import type { CalendarEvent } from '../../../types';
import { VALIDATION_MESSAGES, CZECH_MONTHS_GENITIVE } from '../../../constants';
import { formatDateRange } from '../../../lib';
import { useCalendarEvents } from '../../../hooks';

const UpcomingEvents: React.FC = () => {
  const {
    events,
    isLoading,
    error,
    refetch
  } = useCalendarEvents({
    limit: 3,
    onError: (errorMessage) => {
      console.error('Failed to load upcoming events:', errorMessage);
    }
  });

  // Czech month names in genitive case (for dates)
  const CZECH_MONTHS_GENITIVE = [
    'ledna', 'února', 'března', 'dubna', 'května', 'června',
    'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'
  ];

  // Events are now handled by the useCalendarEvents hook

  const formatDateRange = (startDateString: string, endDateString: string, isAllDay: boolean) => {
    const startDate = new Date(startDateString);
    let endDate = new Date(endDateString);
    
    // For all-day events, Google Calendar uses exclusive end dates
    // So we need to subtract one day to get the actual inclusive end date
    if (isAllDay) {
      endDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000); // Subtract one day
    }
    
    // Check if it's a single day event
    if (startDate.toDateString() === endDate.toDateString()) {
      const day = startDate.getDate();
      const month = CZECH_MONTHS_GENITIVE[startDate.getMonth()];
      const year = startDate.getFullYear();
      return `${day}. ${month} ${year}`;
    }
    
    // For multi-day events, format with proper Czech grammar
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const startMonth = startDate.getMonth();
    const endMonth = endDate.getMonth();
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    
    // If same month and year
    if (startMonth === endMonth && startYear === endYear) {
      const month = CZECH_MONTHS_GENITIVE[startMonth];
      return `${startDay}.–${endDay}. ${month} ${startYear}`;
    }
    
    // If same year but different months
    if (startYear === endYear) {
      const startMonthName = CZECH_MONTHS_GENITIVE[startMonth];
      const endMonthName = CZECH_MONTHS_GENITIVE[endMonth];
      return `${startDay}. ${startMonthName} – ${endDay}. ${endMonthName} ${startYear}`;
    }
    
    // Different years
    const startMonthName = CZECH_MONTHS_GENITIVE[startMonth];
    const endMonthName = CZECH_MONTHS_GENITIVE[endMonth];
    return `${startDay}. ${startMonthName} ${startYear} – ${endDay}. ${endMonthName} ${endYear}`;
  };

  const formatTime = (startDateString: string, endDateString: string, isAllDay: boolean) => {
    if (isAllDay) return null;
    
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    
    const startTime = startDate.toLocaleTimeString('cs-CZ', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    const endTime = endDate.toLocaleTimeString('cs-CZ', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    return `${startTime}–${endTime}`;
  };

  return (
    <section className="py-20 bg-brand-beige">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Nadcházející termíny kurzů" 
          subtitle="Vyberte si termín, který vám vyhovuje a rezervujte si místo"
        />
        
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-brand-olive border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-brand-gray/80 font-montserrat">Zjišťujeme termíny...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-brand-gray/10">
              <Calendar className="w-12 h-12 text-brand-red mx-auto mb-4" />
              <p className="text-xl font-anton text-brand-gray mb-2">Nepodařilo se načíst termíny</p>
              <p className="text-brand-gray/80 font-montserrat mb-6">
                Zkuste to prosím znovu nebo nás kontaktujte přímo
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={refetch}
                  className="inline-flex items-center justify-center py-3 px-6 bg-brand-olive text-white rounded-lg font-montserrat font-semibold transition-all duration-300 hover:bg-opacity-90"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Zkusit znovu
                </button>
                <CTAButton text="Projevit zájem" className="mx-auto" />
              </div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-brand-gray/10">
              <Calendar className="w-12 h-12 text-brand-olive mx-auto mb-4" />
              <p className="text-xl font-anton text-brand-gray mb-2">Momentálně nejsou vypsány žádné termíny</p>
              <p className="text-brand-gray/80 font-montserrat mb-6">Projevte zájem a my vás budeme informovat o nových termínech</p>
              <CTAButton text="Projevit zájem" className="mx-auto" />
            </div>
          ) : (
            <div className="space-y-6">
              {events.map((event) => {
                const timeInfo = formatTime(event.startTime, event.endTime, event.isAllDay);
                
                return (
                  <div 
                    key={event.id} 
                    className="bg-white rounded-xl shadow-sm border border-brand-gray/10 p-6 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-anton text-brand-gray mb-3">{event.title}</h3>
                        
                        <div className="space-y-2">
                          {/* Date */}
                          <div className="flex items-center text-brand-gray/80 font-montserrat">
                            <Calendar className="w-5 h-5 mr-2 text-brand-olive flex-shrink-0" />
                            <span>{formatDateRange(event.startTime, event.endTime, event.isAllDay)}</span>
                          </div>
                          
                          {/* Time (if not all-day) */}
                          {timeInfo && (
                            <div className="flex items-center text-brand-gray/80 font-montserrat">
                              <Clock className="w-5 h-5 mr-2 text-brand-olive flex-shrink-0" />
                              <span>{timeInfo}</span>
                            </div>
                          )}
                          
                          {/* Location */}
                          <div className="flex items-start text-brand-gray/80 font-montserrat">
                            <MapPin className="w-5 h-5 mr-2 text-brand-olive mt-0.5 flex-shrink-0" />
                            <span>
                              {event.locationTitle || 'Praha'}
                              {!event.locationTitle && (
                                <span className="text-brand-gray/60 text-sm block">
                                  Přesná adresa po registraci
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <CTAButton text="Rezervovat" className="whitespace-nowrap" />
                    </div>
                  </div>
                );
              })}
              
              <div className="text-center mt-8">
                <CTAButton 
                  text="Projevit zájem o další termíny" 
                  type="secondary"
                  className="mx-auto"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;