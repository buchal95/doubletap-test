/**
 * Performance Monitoring Utilities
 *
 * Functions for measuring and optimizing performance
 */

import React from 'react';

// Performance measurement utility
export class PerformanceMonitor {
  private static measurements: Map<string, number> = new Map();

  /**
   * Start measuring performance for a given operation
   */
  static start(label: string): void {
    if (typeof window !== 'undefined' && window.performance) {
      this.measurements.set(label, window.performance.now());
    }
  }

  /**
   * End measurement and log the result
   */
  static end(label: string): number | null {
    if (typeof window !== 'undefined' && window.performance) {
      const startTime = this.measurements.get(label);
      if (startTime !== undefined) {
        const duration = window.performance.now() - startTime;
        this.measurements.delete(label);
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
        }
        
        return duration;
      }
    }
    return null;
  }

  /**
   * Measure an async operation
   */
  static async measure<T>(label: string, operation: () => Promise<T>): Promise<T> {
    this.start(label);
    try {
      const result = await operation();
      this.end(label);
      return result;
    } catch (error) {
      this.end(label);
      throw error;
    }
  }
}

// Web Vitals monitoring
export function reportWebVitals(metric: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Web Vital:', metric);
  }
  
  // Send to analytics in production
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}

// Image loading optimization
export function optimizeImageLoading() {
  if (typeof window === 'undefined') return;

  // Lazy load images that are not in viewport
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach((img) => {
      const imgElement = img as HTMLImageElement;
      imgElement.src = imgElement.dataset.src || '';
      imgElement.removeAttribute('data-src');
    });
  }
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Preload critical fonts
  const fontPreloads = [
    '/fonts/Anton-Regular.woff2',
    '/fonts/Montserrat-Regular.woff2',
    '/fonts/Montserrat-SemiBold.woff2'
  ];

  fontPreloads.forEach((fontUrl) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = fontUrl;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Preload critical images
  const criticalImages = [
    '/images/hero-bg.jpg',
    '/images/course-preview.jpg'
  ];

  criticalImages.forEach((imageUrl) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = imageUrl;
    link.as = 'image';
    document.head.appendChild(link);
  });
}

// Bundle size analyzer helper
export function analyzeBundleSize() {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    // Log component render counts
    const componentCounts: Record<string, number> = {};
    
    const originalCreateElement = React.createElement;
    (React as any).createElement = function(type: any, ...args: any[]) {
      if (typeof type === 'function' && type.name) {
        componentCounts[type.name] = (componentCounts[type.name] || 0) + 1;
      }
      return originalCreateElement.apply(this, [type, ...args]);
    };

    // Log results after a delay
    setTimeout(() => {
      console.log('🧩 Component Render Counts:', componentCounts);
    }, 5000);
  }
}

// Memory usage monitoring
export function monitorMemoryUsage() {
  if (typeof window === 'undefined' || !('performance' in window)) return;

  const memory = (window.performance as any).memory;
  if (memory) {
    const memoryInfo = {
      usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1048576), // MB
      totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1048576), // MB
      jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
    };

    if (process.env.NODE_ENV === 'development') {
      console.log('🧠 Memory Usage:', memoryInfo);
    }

    return memoryInfo;
  }
}

// Debounce utility for performance optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle utility for performance optimization
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
