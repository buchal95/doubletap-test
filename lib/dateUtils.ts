/**
 * Date Utility Functions
 * 
 * Centralized date manipulation and formatting functions
 */

import { CZECH_MONTHS_GENITIVE, BUSINESS_RULES } from '../constants';
import type { EventDateRange, FormattedEventDate } from '../types';

/**
 * Calculate the difference in days between two dates
 */
export function getDaysDifference(date1: Date, date2: Date): number {
  const timeDifference = date1.getTime() - date2.getTime();
  return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
}

/**
 * Check if an event date meets the minimum advance booking requirement
 */
export function isEventBookable(eventDate: Date, minDays: number = BUSINESS_RULES.MIN_ADVANCE_DAYS): boolean {
  const currentDate = new Date();
  const daysDifference = getDaysDifference(eventDate, currentDate);
  return daysDifference >= minDays;
}

/**
 * Extract unique months from a list of event dates
 */
export function extractUniqueMonths(eventDates: Date[], monthNames: readonly string[]): string[] {
  const monthsSet = new Set<string>();
  
  eventDates.forEach(date => {
    const monthName = monthNames[date.getMonth()];
    monthsSet.add(monthName);
  });
  
  return Array.from(monthsSet);
}

/**
 * Generate fallback months when no calendar events are available
 */
export function generateFallbackMonths(
  monthNames: readonly string[], 
  maxMonths: number = BUSINESS_RULES.MAX_AVAILABLE_MONTHS,
  minDays: number = BUSINESS_RULES.MIN_ADVANCE_DAYS
): string[] {
  const currentDate = new Date();
  const availableMonths: string[] = [];
  
  // Start with next month to ensure minimum advance notice
  let futureDate = new Date(currentDate);
  futureDate.setDate(1); // Start of next month
  futureDate.setMonth(currentDate.getMonth() + 1);
  
  while (availableMonths.length < maxMonths) {
    const monthDate = new Date(futureDate);
    const daysDifference = getDaysDifference(monthDate, currentDate);
    
    if (daysDifference >= minDays) {
      availableMonths.push(monthNames[monthDate.getMonth()]);
    }
    
    futureDate.setMonth(futureDate.getMonth() + 1);
  }
  
  return availableMonths;
}

/**
 * Format a date range for display (Czech format)
 */
export function formatDateRange(startDateString: string, endDateString: string, isAllDay: boolean): FormattedEventDate {
  const startDate = new Date(startDateString);
  let endDate = new Date(endDateString);
  
  // For all-day events, Google Calendar uses exclusive end dates
  // So we need to subtract one day to get the actual inclusive end date
  if (isAllDay) {
    endDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000);
  }
  
  const dateRange = formatDateRangeInternal(startDate, endDate);
  const timeRange = isAllDay ? undefined : formatTimeRange(startDate, endDate);
  
  return { dateRange, timeRange };
}

/**
 * Internal function to format date range
 */
function formatDateRangeInternal(startDate: Date, endDate: Date): string {
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
}

/**
 * Format time range for display
 */
function formatTimeRange(startDate: Date, endDate: Date): string {
  const startTime = startDate.toLocaleTimeString('cs-CZ', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  const endTime = endDate.toLocaleTimeString('cs-CZ', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  return `${startTime}–${endTime}`;
}

/**
 * Format a single date for next event display
 */
export function formatNextEventDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = CZECH_MONTHS_GENITIVE[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day}. ${month} ${year}`;
}
