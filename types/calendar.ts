/**
 * Calendar and Event Related Types
 */

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  isAllDay: boolean;
  locationTitle?: string;
}

export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  start: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  end: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  location?: string;
  description?: string;
}

export interface GoogleCalendarResponse {
  items: GoogleCalendarEvent[];
  nextPageToken?: string;
  summary?: string;
}

export interface CalendarApiResponse {
  events: CalendarEvent[];
}

export interface EventDateRange {
  startDate: Date;
  endDate: Date;
  isAllDay: boolean;
}

export interface FormattedEventDate {
  dateRange: string;
  timeRange?: string;
}
