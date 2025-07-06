/**
 * Custom Hook for Calendar Events
 * 
 * Centralized hook for fetching and managing calendar events
 * Used by Hero, UpcomingEvents, and Contact components
 */

import { useState, useEffect } from 'react';
import type { CalendarEvent, LoadingState } from '../types';
import { VALIDATION_MESSAGES } from '../constants';
import { calendarService, ApiError } from '../lib/apiService';

interface UseCalendarEventsOptions {
  autoFetch?: boolean;
  limit?: number;
  onError?: (error: string) => void;
  onSuccess?: (events: CalendarEvent[]) => void;
}

interface UseCalendarEventsReturn extends LoadingState {
  events: CalendarEvent[];
  refetch: () => Promise<void>;
  hasEvents: boolean;
}

export function useCalendarEvents(options: UseCalendarEventsOptions = {}): UseCalendarEventsReturn {
  const {
    autoFetch = true,
    limit,
    onError,
    onSuccess
  } = options;

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await calendarService.getEvents();

      if (data && Array.isArray(data.events)) {
        let processedEvents = data.events;

        // Apply limit if specified
        if (limit && limit > 0) {
          processedEvents = processedEvents.slice(0, limit);
        }

        setEvents(processedEvents);
        onSuccess?.(processedEvents);
      } else {
        setEvents([]);
        onSuccess?.([]);
      }
    } catch (err) {
      console.error('Error fetching calendar events:', err);

      let errorMessage: string = VALIDATION_MESSAGES.CALENDAR_ERROR;

      if (err instanceof ApiError) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setEvents([]);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchEvents();
    }
  }, [autoFetch]);

  return {
    events,
    isLoading,
    error,
    refetch: fetchEvents,
    hasEvents: events.length > 0
  };
}
