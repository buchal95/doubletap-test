// DataLayer utility for tracking events to Google Tag Manager
// Only pushes lead event on successful form submission with advanced matching

interface BaseEventData {
  event: string;
  event_category?: string;
  event_label?: string;
  fb_event_parameters?: any;
  [key: string]: any;
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
  field_name?: string;
  field_value?: string;
  error_message?: string;
  button_text?: string;
  button_location?: string;
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
  order_id?: string;
  transaction_id?: string;
  page_title?: string;
  page_location?: string;
  video_name?: string;
  video_action?: string;
  video_progress?: number;
  scroll_depth?: number;
  fb_advanced_matching?: MetaAdvancedMatching;
}

// Declare global dataLayer
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
    dataLayerInitialized?: boolean;
    gtmLoaded?: boolean;
  }
}

// Initialize dataLayer if it doesn't exist - only run once and only in production
export const initializeDataLayer = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Only initialize once
    if (window.dataLayerInitialized) {
      console.log('🔄 DataLayer already initialized, skipping...');
      return;
    }
    
    window.dataLayer = window.dataLayer || [];
    window.dataLayerInitialized = true;
    
    // Push a test event only on first initialization
    console.log('🔥 DataLayer initialized - pushing test event');
    pushToDataLayer({
      event: 'datalayer_ready',
      event_category: 'debug',
      event_label: 'initialization',
      page_title: document.title,
      page_location: window.location.href
    });
  } else if (process.env.NODE_ENV === 'development') {
    console.log('🚧 Development mode - GTM tracking disabled');
    // In development, create a mock dataLayer to prevent errors
    window.dataLayer = window.dataLayer || [];
    window.dataLayerInitialized = true;
  }
};

// Helper function to update consent for analytics
export const updateAnalyticsConsent = (granted: boolean = true) => {
  if (typeof window !== 'undefined' && window.gtag && process.env.NODE_ENV === 'production') {
    console.log(`🍪 Updating analytics consent: ${granted ? 'granted' : 'denied'}`);
    
    window.gtag('consent', 'update', {
      'analytics_storage': granted ? 'granted' : 'denied'
    });
    
    // Push consent update event
    pushToDataLayer({
      event: 'consent_update',
      event_category: 'consent',
      event_label: `analytics_${granted ? 'granted' : 'denied'}`,
      analytics_storage: granted ? 'granted' : 'denied'
    });
  } else if (process.env.NODE_ENV === 'development') {
    console.log(`🚧 Development mode - Analytics consent would be: ${granted ? 'granted' : 'denied'}`);
  }
};

// Helper function to update all marketing consent
export const updateMarketingConsent = (granted: boolean = true) => {
  if (typeof window !== 'undefined' && window.gtag && process.env.NODE_ENV === 'production') {
    console.log(`🎯 Updating marketing consent: ${granted ? 'granted' : 'denied'}`);
    
    window.gtag('consent', 'update', {
      'analytics_storage': granted ? 'granted' : 'denied',
      'ad_storage': granted ? 'granted' : 'denied',
      'ad_user_data': granted ? 'granted' : 'denied',
      'ad_personalization': granted ? 'granted' : 'denied'
    });
    
    // Push consent update event
    pushToDataLayer({
      event: 'consent_update',
      event_category: 'consent',
      event_label: `marketing_${granted ? 'granted' : 'denied'}`,
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: granted ? 'granted' : 'denied',
      ad_user_data: granted ? 'granted' : 'denied',
      ad_personalization: granted ? 'granted' : 'denied'
    });
  } else if (process.env.NODE_ENV === 'development') {
    console.log(`🚧 Development mode - Marketing consent would be: ${granted ? 'granted' : 'denied'}`);
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
  
  return matching;
};

// Generic function to push events to dataLayer - only in production
export const pushToDataLayer = (data: BaseEventData | FormEventData | ConversionEventData) => {
  if (typeof window !== 'undefined' && window.dataLayer && process.env.NODE_ENV === 'production') {
    console.log('🚀 DataLayer Push:', data);
    window.dataLayer.push(data);
  } else if (process.env.NODE_ENV === 'development') {
    console.log('🚧 Development mode - Event would be pushed:', data);
  } else {
    console.warn('⚠️ DataLayer not available or not in production:', data);
  }
};

// Track when user starts filling the form
export const trackFormStart = (formData?: Partial<FormEventData['user_data']>) => {
  console.log('📝 Form start tracked with data:', formData);
  
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
  console.log(`⌨️ Form interaction: ${fieldName} = ${value ? 'filled' : 'empty'}`);
  
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
  console.log('📤 Form submit tracked with data:', formData);
  
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
export const trackFormSuccess = (orderData?: {
  orderId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  preferredMonth?: string;
}) => {
  console.log('✅ Form success tracked with data:', orderData);
  
  const advancedMatching = orderData ? createAdvancedMatching({
    email: orderData.email,
    firstName: orderData.firstName,
    lastName: orderData.lastName,
    phone: orderData.phone
  }) : {};

  console.log('🎯 Advanced matching data:', advancedMatching);

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

  // Meta Pixel Lead event with advanced matching - ONLY Meta event
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
  console.log('❌ Form error tracked:', errorMessage, formData);
  
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
  console.log('👁️ Page view tracked:', pageName);
  
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
  console.log('🖱️ CTA click tracked:', buttonText, location);
  
  pushToDataLayer({
    event: 'cta_click',
    event_category: 'engagement',
    event_label: `cta_${location}`,
    button_text: buttonText,
    button_location: location
  } as FormEventData);
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

// Listen for Usercentrics consent changes
export const listenForConsentChanges = () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Listen for Usercentrics events
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'usercentrics-consent-given') {
        console.log('🍪 Usercentrics consent received:', event.data);
        
        // Update GTM consent based on Usercentrics data
        if (event.data.services) {
          const services = event.data.services;
          
          // Check for analytics consent
          const analyticsConsent = services.some((service: any) => 
            service.name === 'Google Analytics 4' || 
            service.id === 'google-analytics-4' ||
            service.name === 'analytics_storage'
          );
          
          // Check for marketing consent  
          const marketingConsent = services.some((service: any) => 
            service.name === 'Google Ads' || 
            service.name === 'Facebook Pixel' ||
            service.id === 'google-ads' ||
            service.id === 'facebook-pixel'
          );
          
          if (analyticsConsent) {
            updateAnalyticsConsent(true);
          }
          
          if (marketingConsent) {
            updateMarketingConsent(true);
          }
        }
      }
    });
    
    // Also listen for UC_UI events (alternative Usercentrics API)
    if (typeof window.UC_UI !== 'undefined') {
      window.UC_UI.on('consent_status_update', (data: any) => {
        console.log('🍪 UC_UI consent update:', data);
        
        if (data.analytics_storage === true) {
          updateAnalyticsConsent(true);
        }
        
        if (data.ad_storage === true) {
          updateMarketingConsent(true);
        }
      });
    }
  }
};

// TEST FUNCTION - Use this to test dataLayer manually (only in development)
export const testDataLayerEvents = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('🧪 Testing dataLayer events...');
    
    // Test basic event
    pushToDataLayer({
      event: 'test_event',
      event_category: 'test',
      event_label: 'manual_test'
    });
    
    // Test consent updates
    updateAnalyticsConsent(true);
    updateMarketingConsent(true);
    
    // Test form start
    trackFormStart({
      email: 'test@example.com',
      first_name: 'Jan',
      last_name: 'Testovací',
      phone: '+420123456789'
    });
    
    // Test fb_lead event
    trackFormSuccess({
      orderId: 'TEST123',
      email: 'test@example.com',
      firstName: 'Jan',
      lastName: 'Testovací', 
      phone: '+420123456789',
      preferredMonth: 'Leden'
    });
  } else {
    console.log('🚫 Test function only available in development mode');
  }
};

// Make test function and consent functions available globally for browser console (only in development)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).testDataLayerEvents = testDataLayerEvents;
  (window as any).updateAnalyticsConsent = updateAnalyticsConsent;
  (window as any).updateMarketingConsent = updateMarketingConsent;
}

// Auto-initialize consent listener when module loads
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', listenForConsentChanges);
  } else {
    listenForConsentChanges();
  }
}