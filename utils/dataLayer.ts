// DataLayer utility for tracking events to Google Tag Manager
// This will help with Meta Ads conversion tracking

interface BaseEventData {
  event: string;
  event_category?: string;
  event_label?: string;
  value?: number;
  currency?: string;
}

interface MetaAdvancedMatching {
  em?: string;        // Email - lowercase, bez mezer
  fn?: string;        // Křestní jméno - lowercase, bez mezer  
  ln?: string;        // Příjmení - lowercase, bez mezer
  ph?: string;        // Telefon - s kódem země, bez mezer/pomlček
  external_id?: string; // Externí ID
}

interface FormEventData extends BaseEventData {
  form_name?: string;
  form_step?: string;
  user_data?: {
    email?: string;
    phone?: string;
    first_name?: string;
    last_name?: string;
  };
  fb_advanced_matching?: MetaAdvancedMatching;
}

interface ConversionEventData extends BaseEventData {
  conversion_id?: string;
  conversion_label?: string;
  order_value?: number;
  order_id?: string;
  fb_advanced_matching?: MetaAdvancedMatching;
}

// Declare global dataLayer
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Initialize dataLayer if it doesn't exist
export const initializeDataLayer = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
  }
};

// Helper function to format phone number for advanced matching
const formatPhoneForMatching = (phone: string): string => {
  // Remove all spaces, dashes, parentheses
  let cleaned = phone.replace(/[\s\-\(\)]/g, '');
  
  // If starts with +, keep it
  if (cleaned.startsWith('+')) {
    return cleaned;
  }
  
  // If starts with 420 or 421, add +
  if (cleaned.startsWith('420') || cleaned.startsWith('421')) {
    return '+' + cleaned;
  }
  
  // If starts with 00420 or 00421, replace with +
  if (cleaned.startsWith('00420')) {
    return '+420' + cleaned.substring(5);
  }
  if (cleaned.startsWith('00421')) {
    return '+421' + cleaned.substring(5);
  }
  
  // If 9 digits and starts with 6,7,9 (Czech mobile), add +420
  if (cleaned.length === 9 && /^[679]/.test(cleaned)) {
    return '+420' + cleaned;
  }
  
  // If 9 digits and starts with 9 (Slovak mobile), add +421
  if (cleaned.length === 9 && cleaned.startsWith('9')) {
    return '+421' + cleaned;
  }
  
  // Default to +420 for other 9-digit numbers
  if (cleaned.length === 9) {
    return '+420' + cleaned;
  }
  
  return cleaned;
};

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
  
  // Nebudeme hardcodovat country - necháme Meta Pixel detekovat automaticky
  
  return matching;
};

// Generic function to push events to dataLayer
export const pushToDataLayer = (data: BaseEventData | FormEventData | ConversionEventData) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    console.log('DataLayer Push:', data);
    window.dataLayer.push(data);
  }
};

// Specific tracking functions for Meta Ads

// Track when user starts filling the form
export const trackFormStart = (formData?: Partial<FormEventData['user_data']>) => {
  const advancedMatching = formData ? createAdvancedMatching({
    email: formData.email,
    firstName: formData.first_name,
    lastName: formData.last_name,
    phone: formData.phone
  }) : {};

  pushToDataLayer({
    event: 'form_start',
    event_category: 'engagement',
    event_label: 'course_registration_form',
    form_name: 'course_registration',
    form_step: 'start',
    user_data: formData || {},
    fb_advanced_matching: advancedMatching
  });

  // Meta Pixel InitiateCheckout event with advanced matching
  pushToDataLayer({
    event: 'fb_initiate_checkout',
    fb_event_parameters: {
      value: 2700,
      currency: 'CZK',
      content_name: 'Kurz profesionální tvorby videí',
      content_category: 'Education'
    },
    fb_advanced_matching: advancedMatching
  });
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
  });
};

// Track form submission attempt
export const trackFormSubmit = (formData: FormEventData['user_data']) => {
  const advancedMatching = formData ? createAdvancedMatching({
    email: formData.email,
    firstName: formData.first_name,
    lastName: formData.last_name,
    phone: formData.phone
  }) : {};

  pushToDataLayer({
    event: 'form_submit',
    event_category: 'conversion',
    event_label: 'course_registration_submit',
    form_name: 'course_registration',
    form_step: 'submit',
    user_data: formData,
    fb_advanced_matching: advancedMatching
  });

  // Meta Pixel Lead event with advanced matching
  pushToDataLayer({
    event: 'fb_lead',
    fb_event_parameters: {
      value: 2700,
      currency: 'CZK',
      content_name: 'Kurz profesionální tvorby videí',
      content_category: 'Education'
    },
    fb_advanced_matching: advancedMatching
  });
};

// Track successful registration
export const trackFormSuccess = (orderData?: {
  orderId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  preferredMonth?: string;
}) => {
  const advancedMatching = orderData ? createAdvancedMatching({
    email: orderData.email,
    firstName: orderData.firstName,
    lastName: orderData.lastName,
    phone: orderData.phone
  }) : {};

  pushToDataLayer({
    event: 'form_success',
    event_category: 'conversion',
    event_label: 'course_registration_success',
    form_name: 'course_registration',
    form_step: 'success',
    conversion_id: orderData?.orderId,
    order_value: 2700,
    currency: 'CZK',
    user_data: orderData ? {
      email: orderData.email,
      first_name: orderData.firstName,
      last_name: orderData.lastName,
      phone: orderData.phone
    } : {},
    fb_advanced_matching: advancedMatching
  });

  // Meta Pixel CompleteRegistration event with advanced matching
  pushToDataLayer({
    event: 'fb_complete_registration',
    fb_event_parameters: {
      value: 2700,
      currency: 'CZK',
      content_name: 'Kurz profesionální tvorby videí',
      content_category: 'Education'
    },
    fb_advanced_matching: advancedMatching
  });

  // Enhanced ecommerce purchase event for Google Analytics
  pushToDataLayer({
    event: 'purchase',
    event_category: 'ecommerce',
    event_label: 'course_purchase',
    transaction_id: orderData?.orderId,
    value: 2700,
    currency: 'CZK',
    items: [{
      item_id: 'video-course-2025',
      item_name: 'Kurz profesionální tvorby videí',
      item_category: 'Education',
      item_category2: 'Video Production',
      item_brand: 'Double Tap',
      price: 2700,
      quantity: 1
    }],
    user_data: orderData ? {
      email: orderData.email,
      first_name: orderData.firstName,
      last_name: orderData.lastName,
      phone: orderData.phone
    } : {},
    fb_advanced_matching: advancedMatching
  });
};

// Track form errors
export const trackFormError = (errorMessage: string, formData?: FormEventData['user_data']) => {
  const advancedMatching = formData ? createAdvancedMatching({
    email: formData.email,
    firstName: formData.first_name,
    lastName: formData.last_name,
    phone: formData.phone
  }) : {};

  pushToDataLayer({
    event: 'form_error',
    event_category: 'error',
    event_label: 'course_registration_error',
    form_name: 'course_registration',
    form_step: 'error',
    error_message: errorMessage,
    user_data: formData || {},
    fb_advanced_matching: advancedMatching
  });
};

// Track page views for Meta Ads
export const trackPageView = (pageName: string, additionalData?: Record<string, any>) => {
  pushToDataLayer({
    event: 'page_view',
    event_category: 'engagement',
    event_label: pageName,
    page_title: document.title,
    page_location: window.location.href,
    ...additionalData
  });

  // Meta Pixel PageView event
  pushToDataLayer({
    event: 'fb_page_view',
    fb_event_parameters: {
      content_name: document.title,
      content_category: 'Education'
    }
  });
};

// Track CTA button clicks
export const trackCTAClick = (buttonText: string, location: string) => {
  pushToDataLayer({
    event: 'cta_click',
    event_category: 'engagement',
    event_label: `cta_${location}`,
    button_text: buttonText,
    button_location: location
  });

  // Meta Pixel custom event for CTA clicks
  pushToDataLayer({
    event: 'fb_contact',
    fb_event_parameters: {
      content_name: buttonText,
      content_category: 'CTA'
    }
  });
};

// Track video interactions (if you add videos later)
export const trackVideoInteraction = (action: 'play' | 'pause' | 'complete', videoName: string, progress?: number) => {
  pushToDataLayer({
    event: 'video_interaction',
    event_category: 'engagement',
    event_label: `video_${action}`,
    video_name: videoName,
    video_action: action,
    video_progress: progress || 0
  });
};

// Track scroll depth for engagement
export const trackScrollDepth = (depth: 25 | 50 | 75 | 100) => {
  pushToDataLayer({
    event: 'scroll_depth',
    event_category: 'engagement',
    event_label: `scroll_${depth}`,
    scroll_depth: depth,
    page_title: document.title
  });
};