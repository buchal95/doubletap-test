/**
 * Test Utilities
 * 
 * Helper functions for testing components and utilities
 */

// Mock data for testing
export const mockCalendarEvents = [
  {
    id: '1',
    title: 'Kurz tvorby videí - Základy',
    startTime: '2024-03-15T09:00:00Z',
    endTime: '2024-03-18T17:00:00Z',
    isAllDay: false,
    locationTitle: 'Praha'
  },
  {
    id: '2',
    title: 'Kurz tvorby videí - Pokročilí',
    startTime: '2024-04-20T09:00:00Z',
    endTime: '2024-04-23T17:00:00Z',
    isAllDay: false,
    locationTitle: 'Praha'
  }
];

export const mockFormData = {
  firstName: 'Jan',
  lastName: 'Novák',
  email: 'jan@example.cz',
  phone: '+420123456789',
  consent: true
};

export const mockOrderResponse = {
  success: true,
  orderNumber: 'ORD-12345',
  hash: 'abc123',
  links: {
    payLink: 'https://example.com/pay',
    orderPageLink: 'https://example.com/order'
  }
};

// Test helpers
export function createMockEvent(overrides = {}) {
  return {
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    target: { value: 'test' },
    currentTarget: { value: 'test' },
    ...overrides
  };
}

export function createMockFormData(data: Record<string, string>) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
}

// Mock fetch for API testing
export function mockFetch(response: any, ok = true, status = 200) {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok,
      status,
      json: () => Promise.resolve(response),
    })
  ) as jest.Mock;
}

// Mock IntersectionObserver for lazy loading tests
export function mockIntersectionObserver() {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  });
  window.IntersectionObserver = mockIntersectionObserver;
}

// Mock window.performance for performance tests
export function mockPerformance() {
  Object.defineProperty(window, 'performance', {
    value: {
      now: jest.fn(() => Date.now()),
      mark: jest.fn(),
      measure: jest.fn(),
      getEntriesByType: jest.fn(() => []),
      memory: {
        usedJSHeapSize: 1000000,
        totalJSHeapSize: 2000000,
        jsHeapSizeLimit: 4000000
      }
    },
    writable: true
  });
}

// Mock Google Tag Manager
export function mockGTM() {
  window.gtag = jest.fn();
  window.dataLayer = [];
}

// Test environment setup
export function setupTestEnvironment() {
  mockIntersectionObserver();
  mockPerformance();
  mockGTM();
  
  // Mock console methods to reduce noise in tests
  global.console = {
    ...console,
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
  };
}

// Cleanup after tests
export function cleanupTestEnvironment() {
  jest.clearAllMocks();
  jest.restoreAllMocks();
}
