'use client';

import React, { useState, useEffect } from 'react';
import SectionHeading from '../common/SectionHeading';
import CTAButton from '../common/CTAButton';
import { Calendar, Clock } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  isAllDay: boolean;
  locationTitle?: string;
}

const UpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/calendar/events');
        
        if (!response.ok) {
          throw new Error('Nepodařilo se načíst události z kalendáře');
        }
        
        const data = await response.json();
        
        // Process and sort events by start time
        if (data && Array.isArray(data.events)) {
          const sortedEvents = data.events
            .filter((event: any) => new Date(event.startTime) > new Date()) // Only future events
            .sort((a: any, b: any) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
            .slice(0, 3); // Take only the next 3 events
          
          setEvents(sortedEvents);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error('Error fetching calendar events:', err);
        setError('Nepodařilo se načíst události z kalendáře');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Format date to Czech format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('cs-CZ', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Format time to HH:MM format
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('cs-CZ', {
      hour: '2-digit',
      minute: '2-digit'
    });
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
              <p className="mt-4 text-brand-gray/80 font-montserrat">Načítání termínů...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-brand-red font-montserrat">{error}</p>
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
              {events.map((event) => (
                <div 
                  key={event.id} 
                  className="bg-white rounded-xl shadow-sm border border-brand-gray/10 p-6 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-xl font-anton text-brand-gray mb-2">{event.title}</h3>
                      <div className="flex items-center text-brand-gray/80 font-montserrat mb-2">
                        <Calendar className="w-5 h-5 mr-2 text-brand-olive" />
                        <span>{formatDate(event.startTime)}</span>
                      </div>
                      <div className="flex items-center text-brand-gray/80 font-montserrat">
                        <Clock className="w-5 h-5 mr-2 text-brand-olive" />
                        <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                      </div>
                      {event.locationTitle && (
                        <p className="mt-2 text-brand-gray/80 font-montserrat">
                          <span className="font-semibold">Místo:</span> {event.locationTitle}
                        </p>
                      )}
                    </div>
                    <CTAButton text="Rezervovat" className="whitespace-nowrap" />
                  </div>
                </div>
              ))}
              
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