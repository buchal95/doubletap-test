/**
 * Centralized Library Exports
 * 
 * This file exports all utility functions from the lib directory
 * for easy importing throughout the application.
 */

// Date utilities
export {
  getDaysDifference,
  isEventBookable,
  extractUniqueMonths,
  generateFallbackMonths,
  formatDateRange,
  formatNextEventDate
} from './dateUtils';

// Phone utilities
export {
  cleanPhoneForDisplay,
  cleanPhoneForSubmission,
  combinePhoneWithPrefix,
  validatePhoneNumber,
  formatPhoneForMatching,
  extractPhonePrefix,
  getPhoneWithoutPrefix,
  validateCzechPhone,
  validateSlovakPhone
} from './phoneUtils';

// Calendar utilities
export {
  filterBookableEvents,
  extractAvailableMonths,
  getAvailableMonthsWithFallback,
  convertGoogleCalendarEvent,
  convertGoogleCalendarEvents,
  sortEventsByStartTime,
  filterFutureEvents,
  getNextUpcomingEvent,
  getUpcomingEvents
} from './calendarUtils';

// Validation utilities
export {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePhone,
  validateConsent,
  validatePreferredMonth,
  validateContactForm,
  hasValidationErrors,
  getFieldError,
  getAllErrorMessages
} from './validationUtils';

// API Service
export {
  default as apiService,
  calendarService,
  orderService,
  healthService,
  ApiError
} from './apiService';

// Performance utilities
export {
  PerformanceMonitor,
  reportWebVitals,
  optimizeImageLoading,
  preloadCriticalResources,
  debounce,
  throttle
} from './performance';

// SEO utilities
export {
  baseSEO,
  generateMetadata,
  generateStructuredData,
  generateBreadcrumbData,
  generateSlug,
  validateSEO
} from './seo';

// Critical CSS utilities
export {
  criticalCSS,
  injectCriticalCSS,
  preconnectExternalDomains,
  addResourceHints
} from './criticalCSS';

// Animation utilities
export {
  animationVariants,
  animationDurations,
  easingFunctions,
  createIntersectionObserver,
  cssAnimations,
  injectCSSAnimations,
  staggerAnimation,
  createParallaxEffect,
  smoothScrollTo
} from './animations';
