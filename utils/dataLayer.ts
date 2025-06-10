// DataLayer utility for tracking events to Google Tag Manager
// This will help with Meta Ads conversion tracking

interface BaseEventData {
  event: string;
  event_category?: string;
  event_label?: string;
  value?: number;
  currency?: string;
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
}

interface ConversionEventData extends BaseEventData {
  conversion_id?: string;
  conversion_label?: string;
  order_value?: number;
  order_id?: string;
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
  pushToDataLayer({
    event: 'form_start',
    event_category: 'engagement',
    event_label: 'course_registration_form',
    form_name: 'course_registration',
    form_step: 'start',
    user_data: formData || {}
  });

  // Also push Meta Pixel InitiateCheckout event
  pushToDataLayer({
    event: 'InitiateCheckout',
    event_category: 'conversion',
    event_label: 'course_registration_start',
    value: 2700,
    currency: 'CZK',
    content_name: 'Kurz profesionální tvorby videí',
    content_category: 'Education'
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
  pushToDataLayer({
    event: 'form_submit',
    event_category: 'conversion',
    event_label: 'course_registration_submit',
    form_name: 'course_registration',
    form_step: 'submit',
    user_data: formData
  });

  // Meta Pixel Lead event
  pushToDataLayer({
    event: 'Lead',
    event_category: 'conversion',
    event_label: 'course_registration_lead',
    value: 2700,
    currency: 'CZK',
    content_name: 'Kurz profesionální tvorby videí',
    content_category: 'Education',
    user_data: formData
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
    } : {}
  });

  // Meta Pixel CompleteRegistration event
  pushToDataLayer({
    event: 'CompleteRegistration',
    event_category: 'conversion',
    event_label: 'course_registration_complete',
    value: 2700,
    currency: 'CZK',
    content_name: 'Kurz profesionální tvorby videí',
    content_category: 'Education',
    registration_method: 'website_form',
    user_data: orderData ? {
      email: orderData.email,
      first_name: orderData.firstName,
      last_name: orderData.lastName,
      phone: orderData.phone
    } : {}
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
    } : {}
  });
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
    event: 'PageView',
    event_category: 'engagement',
    event_label: `page_${pageName}`,
    content_name: document.title,
    content_category: 'Education'
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
    event: 'Contact',
    event_category: 'engagement',
    event_label: `cta_click_${location}`,
    content_name: buttonText,
    content_category: 'CTA'
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