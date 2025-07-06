// DataLayer utility for tracking events to Google Tag Manager

// Import shared types
import type {
  BaseEventData,
  MetaAdvancedMatching,
  FormEventData,
  ConversionEventData,
  FormSuccessData
} from '../types/analytics';
import { formatPhoneForMatching } from '../lib/phoneUtils';

// Declare global dataLayer
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
    dataLayerInitialized?: boolean;
  }
}

// This function is now imported from lib/phoneUtils.ts

// Helper function to generate external_id
const generateExternalId = (email: string, phone?: string): string => {
  const timestamp = Date.now();
  const emailHash = email.split('@')[0];
  const phoneHash = phone ? phone.slice(-4) : '0000';
  return `user_${emailHash}_${phoneHash}_${timestamp}`;
};

// Helper function to create advanced matching object
const createAdvancedMatching = (userData: {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}): MetaAdvancedMatching => {
  const matching: MetaAdvancedMatching = {};
  
  // Email - highest priority, lowercase, bez mezer
  if (userData.email) {
    matching.em = userData.email.toLowerCase().trim().replace(/\s/g, '');
    matching.external_id = generateExternalId(userData.email, userData.phone);
  }
  
  // Křestní jméno - lowercase, bez mezer
  if (userData.firstName) {
    matching.fn = userData.firstName.toLowerCase().trim().replace(/\s/g, '');
  }
  
  // Příjmení - lowercase, bez mezer  
  if (userData.lastName) {
    matching.ln = userData.lastName.toLowerCase().trim().replace(/\s/g, '');
  }
  
  // Telefon - highest priority, s kódem země, bez mezer/pomlček
  if (userData.phone) {
    matching.ph = formatPhoneForMatching(userData.phone);
  }
  
  return matching;
};

// Initialize dataLayer if it doesn't exist
export const initializeDataLayer = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayerInitialized = true;
  }
};

// Generic function to push events to dataLayer
export const pushToDataLayer = (data: BaseEventData | FormEventData | ConversionEventData) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(data);
  }
};

// Track when user starts filling the form
export const trackFormStart = (formData?: Partial<FormEventData['user_data']>) => {
  pushToDataLayer({
    event: 'form_start',
    event_category: 'engagement',
    event_label: 'course_registration_form',
    form_name: 'course_registration',
    form_step: 'start',
    user_data: formData || {}
  } as FormEventData);
};

// Track form field interactions
export const trackFormInteraction = (fieldName: string, value?: string) => {
  pushToDataLayer({
    event: 'form_interaction',
    event_category: 'engagement',
    event_label: `field_${fieldName}`,
    form_name: 'course_registration',
    form_step: 'interaction',
    field_name: fieldName,
    field_value: value ? 'filled' : 'empty'
  } as FormEventData);
};

// Track form submission attempt
export const trackFormSubmit = (formData: FormEventData['user_data']) => {
  pushToDataLayer({
    event: 'form_submit',
    event_category: 'conversion',
    event_label: 'course_registration_submit',
    form_name: 'course_registration',
    form_step: 'submit',
    user_data: formData
  } as FormEventData);
};

// Track successful registration - ONLY place where Meta Lead event is pushed
export const trackFormSuccess = (orderData?: FormSuccessData) => {
  const advancedMatching = orderData ? createAdvancedMatching({
    email: orderData.email,
    firstName: orderData.firstName,
    lastName: orderData.lastName,
    phone: orderData.phone
  }) : {};

  // Standard form success event
  pushToDataLayer({
    event: 'form_success',
    event_category: 'conversion',
    event_label: 'course_registration_success',
    form_name: 'course_registration',
    form_step: 'success',
    conversion_id: orderData?.orderId,
    user_data: orderData ? {
      email: orderData.email,
      first_name: orderData.firstName,
      last_name: orderData.lastName,
      phone: orderData.phone
    } : {}
  } as FormEventData);

  // Meta Pixel Lead event with advanced matching
  pushToDataLayer({
    event: 'fb_lead',
    fb_event_parameters: {
      content_name: 'Kurz profesionální tvorby videí',
      content_category: 'Education'
    },
    fb_advanced_matching: advancedMatching
  } as BaseEventData);
};

// Track form errors
export const trackFormError = (errorMessage: string, formData?: FormEventData['user_data']) => {
  pushToDataLayer({
    event: 'form_error',
    event_category: 'error',
    event_label: 'course_registration_error',
    form_name: 'course_registration',
    form_step: 'error',
    error_message: errorMessage,
    user_data: formData || {}
  } as FormEventData);
};

// Track page views
export const trackPageView = (pageName: string, additionalData?: Record<string, any>) => {
  pushToDataLayer({
    event: 'page_view',
    event_category: 'engagement',
    event_label: pageName,
    page_title: typeof document !== 'undefined' ? document.title : '',
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    ...additionalData
  } as ConversionEventData);
};

// Track CTA button clicks
export const trackCTAClick = (buttonText: string, location: string) => {
  pushToDataLayer({
    event: 'cta_click',
    event_category: 'engagement',
    event_label: `cta_${location}`,
    button_text: buttonText,
    button_location: location
  } as FormEventData);
};

// Track video interactions
export const trackVideoInteraction = (action: 'play' | 'pause' | 'complete', videoName: string, progress?: number) => {
  pushToDataLayer({
    event: 'video_interaction',
    event_category: 'engagement',
    event_label: `video_${action}`,
    video_name: videoName,
    video_action: action,
    video_progress: progress || 0
  } as ConversionEventData);
};

// Track scroll depth for engagement
export const trackScrollDepth = (depth: 25 | 50 | 75 | 100) => {
  pushToDataLayer({
    event: 'scroll_depth',
    event_category: 'engagement',
    event_label: `scroll_${depth}`,
    scroll_depth: depth,
    page_title: typeof document !== 'undefined' ? document.title : ''
  } as ConversionEventData);
};