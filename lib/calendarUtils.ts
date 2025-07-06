/**
 * Calendar Utility Functions
 * 
 * Functions for processing calendar events and extracting available months
 */

import { MONTHS_CZ, BUSINESS_RULES } from '../constants';
import { isEventBookable, extractUniqueMonths, generateFallbackMonths } from './dateUtils';
import type { CalendarEvent, GoogleCalendarEvent } from '../types';

/**
 * Filter events that meet the minimum advance booking requirement
 */
export function filterBookableEvents(
  events: CalendarEvent[], 
  minDays: number = BUSINESS_RULES.MIN_ADVANCE_DAYS
): CalendarEvent[] {
  return events.filter(event => {
    const eventDate = new Date(event.startTime);
    return isEventBookable(eventDate, minDays);
  });
}

/**
 * Extract available months from calendar events
 */
export function extractAvailableMonths(events: CalendarEvent[]): string[] {
  const bookableEvents = filterBookableEvents(events);
  const eventDates = bookableEvents.map(event => new Date(event.startTime));
  return extractUniqueMonths(eventDates, MONTHS_CZ);
}

/**
 * Get available months with fallback
 */
export function getAvailableMonthsWithFallback(events: CalendarEvent[]): string[] {
  const availableMonths = extractAvailableMonths(events);
  
  if (availableMonths.length > 0) {
    return availableMonths;
  }
  
  // Fallback to generated months if no events available
  return generateFallbackMonths(MONTHS_CZ);
}

/**
 * Convert Google Calendar event to internal CalendarEvent format
 */
export function convertGoogleCalendarEvent(event: GoogleCalendarEvent): CalendarEvent {
  // Determine if event is all-day
  const isAllDay = !!(event.start.date && event.end.date);
  
  // Get start and end times
  let startTime: string;
  let endTime: string;
  
  if (isAllDay) {
    // For all-day events, use the date and add default times
    startTime = new Date(event.start.date + 'T09:00:00').toISOString();
    endTime = new Date(event.end.date + 'T17:00:00').toISOString();
  } else {
    // For timed events, use dateTime
    startTime = event.start.dateTime || new Date().toISOString();
    endTime = event.end.dateTime || new Date().toISOString();
  }

  return {
    id: event.id,
    title: event.summary || 'Kurz tvorby videí',
    startTime: startTime,
    endTime: endTime,
    isAllDay: isAllDay,
    locationTitle: event.location
  };
}

/**
 * Convert array of Google Calendar events
 */
export function convertGoogleCalendarEvents(events: GoogleCalendarEvent[]): CalendarEvent[] {
  return events.map(convertGoogleCalendarEvent);
}

/**
 * Sort events by start time
 */
export function sortEventsByStartTime(events: CalendarEvent[]): CalendarEvent[] {
  return [...events].sort((a, b) => 
    new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );
}

/**
 * Filter future events
 */
export function filterFutureEvents(events: CalendarEvent[]): CalendarEvent[] {
  const now = new Date();
  return events.filter(event => new Date(event.startTime) > now);
}

/**
 * Get next upcoming event
 */
export function getNextUpcomingEvent(events: CalendarEvent[]): CalendarEvent | null {
  const futureEvents = filterFutureEvents(events);
  const sortedEvents = sortEventsByStartTime(futureEvents);
  return sortedEvents.length > 0 ? sortedEvents[0] : null;
}

/**
 * Get upcoming events (limited number)
 */
export function getUpcomingEvents(events: CalendarEvent[], limit: number = 3): CalendarEvent[] {
  const futureEvents = filterFutureEvents(events);
  const sortedEvents = sortEventsByStartTime(futureEvents);
  return sortedEvents.slice(0, limit);
}
