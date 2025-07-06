/**
 * Custom Hook for Available Months
 * 
 * Hook for managing available course months based on calendar events
 * Used by Contact component
 */

import { useState, useEffect } from 'react';
import type { CalendarEvent } from '../types';
import { VALIDATION_MESSAGES } from '../constants';
import { getAvailableMonthsWithFallback } from '../lib';
import { useCalendarEvents } from './useCalendarEvents';

interface UseAvailableMonthsReturn {
  availableMonths: string[];
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  isLoading: boolean;
  error: string | null;
  hasMonths: boolean;
}

export function useAvailableMonths(): UseAvailableMonthsReturn {
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('');

  const { 
    events, 
    isLoading, 
    error: calendarError 
  } = useCalendarEvents({
    onSuccess: (events: CalendarEvent[]) => {
      const months = getAvailableMonthsWithFallback(events);
      setAvailableMonths(months);
      
      // Set first month as default if none selected
      if (months.length > 0 && !selectedMonth) {
        setSelectedMonth(months[0]);
      }
    },
    onError: () => {
      // Use fallback months on error
      const fallbackMonths = getAvailableMonthsWithFallback([]);
      setAvailableMonths(fallbackMonths);
      
      if (fallbackMonths.length > 0 && !selectedMonth) {
        setSelectedMonth(fallbackMonths[0]);
      }
    }
  });

  // Update selected month if it's no longer available
  useEffect(() => {
    if (availableMonths.length > 0 && selectedMonth && !availableMonths.includes(selectedMonth)) {
      setSelectedMonth(availableMonths[0]);
    }
  }, [availableMonths, selectedMonth]);

  return {
    availableMonths,
    selectedMonth,
    setSelectedMonth,
    isLoading,
    error: calendarError,
    hasMonths: availableMonths.length > 0
  };
}
