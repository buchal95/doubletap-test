'use client';

import React, { useState, useEffect } from 'react';
import SectionHeading from '../common/SectionHeading';
import CTAButton from '../common/CTAButton';
import { Calendar, Clock, MapPin, RefreshCw } from 'lucide-react';

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
  const [retryCount, setRetryCount] = useState<number>(0);

  const fetchEvents = async (isRetry: boolean = false) => {
    try {
      if (!isRetry) {
        setIsLoading(true);
      }
      setError(null);
      
      // Use proxy API route with proper error handling
      const response = await fetch('/api/proxy/calendar', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add timeout
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Process and sort events by start time
      if (data && Array.isArray(data.events)) {
        const sortedEvents = data.events
          .filter((event: any) => new Date(event.startTime) > new Date()) // Only future events
          .sort((a: any, b: any) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
          .slice(0, 3); // Take only the next 3 events
        
        setEvents(sortedEvents);
        setRetryCount(0); // Reset retry count on success
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error('Error fetching calendar events:', err);
      setError('Nepodařilo se načíst události z kalendáře');
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Retry function with exponential backoff
  const handleRetry = () => {
    if (retryCount < 3) {
      setRetryCount(prev => prev + 1);
      const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
      setTimeout(() => {
        fetchEvents(true);
      }, delay);
    }
  };

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
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-brand-gray/10">
              <Calendar className="w-12 h-12 text-brand-red mx-auto mb-4" />
              <p className="text-xl font-anton text-brand-gray mb-2">Nepodařilo se načíst termíny</p>
              <p className="text-brand-gray/80 font-montserrat mb-6">
                Zkuste to prosím znovu nebo nás kontaktujte přímo
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {retryCount < 3 && (
                  <button
                    onClick={handleRetry}
                    className="inline-flex items-center justify-center py-3 px-6 bg-brand-olive text-white rounded-lg font-montserrat font-semibold transition-all duration-300 hover:bg-opacity-90"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Zkusit znovu
                  </button>
                )}
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
              {events.map((event) => (
                <div 
                  key={event.id} 
                  className="bg-white rounded-xl shadow-sm border border-brand-gray/10 p-6 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-xl font-anton text-brand-gray mb-2">{event.title}</h3>
                      <div className="flex items-center text-brand-gray/80 font-montserrat mb-2">
                        <Calendar className="w-5 h-5 mr-2 text-brand-olive flex-shrink-0" />
                        <span>{formatDate(event.startTime)}</span>
                      </div>
                      <div className="flex items-center text-brand-gray/80 font-montserrat mb-2">
                        <Clock className="w-5 h-5 mr-2 text-brand-olive flex-shrink-0" />
                        <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                      </div>
                      <div className="flex items-start text-brand-gray/80 font-montserrat">
                        <MapPin className="w-5 h-5 mr-2 text-brand-olive mt-0.5 flex-shrink-0" />
                        <span>Osobně v Praze{event.locationTitle ? ` - ${event.locationTitle}` : ''}</span>
                      </div>
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