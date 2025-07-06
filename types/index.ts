/**
 * Centralized Type Exports
 * 
 * This file exports all types from the types directory
 * for easy importing throughout the application.
 */

// Calendar types
export type {
  CalendarEvent,
  GoogleCalendarEvent,
  GoogleCalendarResponse,
  CalendarApiResponse,
  EventDateRange,
  FormattedEventDate
} from './calendar';

// Form types
export type {
  ContactFormData,
  ContactFormSubmission,
  PhonePrefix,
  FormValidationError,
  FormState,
  OrderRequest,
  OrderResponse,
  BRJOrderData,
  BRJOrderResponse
} from './form';

// Analytics types
export type {
  BaseEventData,
  MetaAdvancedMatching,
  FormEventData,
  ConversionEventData,
  CTAClickData,
  FormSuccessData
} from './analytics';

// Common utility types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface SectionProps extends BaseComponentProps {
  id?: string;
}

// Environment and configuration types
export interface AppConfig {
  apiUrl: string;
  brjApiKey: string;
  googleCalendarApiKey: string;
  googleCalendarId: string;
  gtmId: string;
  siteUrl: string;
}
