/**
 * Validation Constants
 * 
 * Regular expressions, validation rules, and constraints
 */

// Regular expressions for validation
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_CZ: /^(\+420|420)?[67][0-9]{8}$/,
  PHONE_SK: /^(\+421|421)?[9][0-9]{8}$/,
  PHONE_GENERAL: /^(\+420|\+421)[0-9]{9}$/,
  PHONE_CLEANUP: /[^\d\s\-]/g,
  PHONE_DIGITS_ONLY: /[\s\-]/g
} as const;

// Form field constraints
export const FIELD_CONSTRAINTS = {
  FIRST_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50
  },
  LAST_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50
  },
  EMAIL: {
    MAX_LENGTH: 254
  },
  PHONE: {
    MIN_LENGTH: 9,
    MAX_LENGTH: 13
  }
} as const;

// Business rules
export const BUSINESS_RULES = {
  MIN_ADVANCE_DAYS: 30,        // Minimum days in advance for course registration
  MAX_AVAILABLE_MONTHS: 4,     // Maximum number of months to show in form
  COUNTDOWN_TARGET_DATE: '2025-10-31T23:59:59', // When subsidy ends
  STICKY_COUNTDOWN_SCROLL_THRESHOLD: 800 // Pixels scrolled before showing sticky countdown
} as const;

// Course configuration
export const COURSE_CONFIG = {
  FULL_PRICE: 15000,           // Full price in CZK
  DISCOUNTED_PRICE: 2700,      // Price with subsidy in CZK
  SUBSIDY_PERCENTAGE: 82,      // Subsidy percentage
  DURATION_DAYS: 4,            // Course duration in days
  MIN_ATTENDANCE: 80,          // Minimum attendance percentage required
  LOCATION: 'Praha'            // Course location
} as const;

// Analytics configuration
export const ANALYTICS_CONFIG = {
  GTM_ID: 'GTM-M3ZNVD4K',
  FORM_START_DELAY: 500,       // Delay before tracking form start (ms)
  SCROLL_TRACKING_THRESHOLD: 25 // Percentage of page scrolled before tracking
} as const;
