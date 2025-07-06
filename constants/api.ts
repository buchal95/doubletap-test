/**
 * API Constants
 * 
 * All API endpoints, timeouts, and API-related configuration
 */

// API Endpoints
export const API_ENDPOINTS = {
  CALENDAR: '/api/proxy/calendar',
  ORDER: '/api/proxy/order',
  HEALTH: '/api/health'
} as const;

// External API URLs
export const EXTERNAL_APIS = {
  GOOGLE_CALENDAR: 'https://www.googleapis.com/calendar/v3/calendars',
  BRJ_API: 'https://app.brj.app/api/v1'
} as const;

// Request timeouts (in milliseconds)
export const TIMEOUTS = {
  DEFAULT: 10000,      // 10 seconds
  CALENDAR: 10000,     // 10 seconds
  ORDER: 15000,        // 15 seconds
  HEALTH_CHECK: 5000   // 5 seconds
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
} as const;

// Request headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
} as const;

// CORS headers
export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
} as const;

// Retry configuration
export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,    // 1 second
  BACKOFF_MULTIPLIER: 2 // Exponential backoff
} as const;
