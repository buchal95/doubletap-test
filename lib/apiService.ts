/**
 * API Service Layer
 * 
 * Centralized API handling with error management, retries, and interceptors
 */

import type { ApiResponse, CalendarApiResponse, OrderRequest, OrderResponse } from '../types';
import { 
  API_ENDPOINTS, 
  TIMEOUTS, 
  RETRY_CONFIG, 
  HTTP_STATUS,
  DEFAULT_HEADERS 
} from '../constants';

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Retry utility function
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = RETRY_CONFIG.MAX_RETRIES,
  delay: number = RETRY_CONFIG.RETRY_DELAY
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on client errors (4xx) or on the last attempt
      if (
        attempt === maxRetries ||
        (error instanceof ApiError && error.status && error.status >= 400 && error.status < 500)
      ) {
        break;
      }

      // Wait before retrying with exponential backoff
      const waitTime = delay * Math.pow(RETRY_CONFIG.BACKOFF_MULTIPLIER, attempt);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  throw lastError!;
}

// Base fetch wrapper with error handling
async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
  timeout: number = TIMEOUTS.DEFAULT
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...DEFAULT_HEADERS,
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle non-2xx responses
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use the default error message
      }

      throw new ApiError(errorMessage, response.status);
    }

    // Parse JSON response
    const data = await response.json();
    return data;

  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Časový limit požadavku vypršel', undefined, 'TIMEOUT', error);
      }
      
      if (error.message.includes('fetch')) {
        throw new ApiError('Chyba připojení k serveru', undefined, 'NETWORK_ERROR', error);
      }
    }

    throw new ApiError('Neočekávaná chyba', undefined, 'UNKNOWN_ERROR', error as Error);
  }
}

// Calendar API service
export const calendarService = {
  /**
   * Fetch calendar events
   */
  async getEvents(): Promise<CalendarApiResponse> {
    return withRetry(() => 
      apiFetch<CalendarApiResponse>(API_ENDPOINTS.CALENDAR, {}, TIMEOUTS.CALENDAR)
    );
  }
};

// Order API service
export const orderService = {
  /**
   * Submit order/registration
   */
  async submitOrder(orderData: OrderRequest): Promise<OrderResponse> {
    return withRetry(() => 
      apiFetch<OrderResponse>(
        API_ENDPOINTS.ORDER,
        {
          method: 'POST',
          body: JSON.stringify(orderData),
        },
        TIMEOUTS.ORDER
      ),
      2 // Fewer retries for POST requests
    );
  }
};

// Generic API service for other endpoints
export const apiService = {
  /**
   * Generic GET request
   */
  async get<T>(endpoint: string, timeout?: number): Promise<T> {
    return withRetry(() => apiFetch<T>(endpoint, {}, timeout));
  },

  /**
   * Generic POST request
   */
  async post<T>(endpoint: string, data: any, timeout?: number): Promise<T> {
    return withRetry(() => 
      apiFetch<T>(
        endpoint,
        {
          method: 'POST',
          body: JSON.stringify(data),
        },
        timeout
      ),
      2 // Fewer retries for POST requests
    );
  },

  /**
   * Generic PUT request
   */
  async put<T>(endpoint: string, data: any, timeout?: number): Promise<T> {
    return withRetry(() => 
      apiFetch<T>(
        endpoint,
        {
          method: 'PUT',
          body: JSON.stringify(data),
        },
        timeout
      ),
      2 // Fewer retries for PUT requests
    );
  }
};

// Health check utility
export const healthService = {
  /**
   * Check API health
   */
  async checkHealth(): Promise<boolean> {
    try {
      await apiFetch('/api/health', {}, TIMEOUTS.HEALTH_CHECK);
      return true;
    } catch {
      return false;
    }
  }
};

// Export all services
export default {
  calendar: calendarService,
  order: orderService,
  api: apiService,
  health: healthService,
  ApiError
};
