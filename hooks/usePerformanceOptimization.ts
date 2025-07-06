/**
 * Performance Optimization Hook
 * 
 * Hook for managing performance optimizations and loading strategies
 */

import { useEffect, useState, useCallback } from 'react';
import { 
  injectCriticalCSS, 
  preloadCriticalResources, 
  preconnectExternalDomains,
  optimizeImageLoading,
  addResourceHints 
} from '../lib/criticalCSS';

interface UsePerformanceOptimizationOptions {
  enableCriticalCSS?: boolean;
  enablePreloading?: boolean;
  enableImageOptimization?: boolean;
  enableResourceHints?: boolean;
}

interface UsePerformanceOptimizationReturn {
  isOptimized: boolean;
  performanceScore: number | null;
  optimizePerformance: () => void;
}

export function usePerformanceOptimization(
  options: UsePerformanceOptimizationOptions = {}
): UsePerformanceOptimizationReturn {
  const {
    enableCriticalCSS = true,
    enablePreloading = true,
    enableImageOptimization = true,
    enableResourceHints = true
  } = options;

  const [isOptimized, setIsOptimized] = useState(false);
  const [performanceScore, setPerformanceScore] = useState<number | null>(null);

  // Measure performance score
  const measurePerformance = useCallback(() => {
    if (typeof window === 'undefined' || !window.performance) return;

    // Simple performance score based on loading times
    const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      const loadTime = navigation.loadEventEnd - navigation.fetchStart;
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
      
      // Calculate score (lower is better, normalize to 0-100 scale)
      const score = Math.max(0, 100 - (loadTime / 50)); // 5 seconds = 0 score
      setPerformanceScore(Math.round(score));
    }
  }, []);

  // Apply performance optimizations
  const optimizePerformance = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      // Apply optimizations based on options
      if (enableResourceHints) {
        addResourceHints();
      }

      if (enableCriticalCSS) {
        injectCriticalCSS();
      }

      if (enablePreloading) {
        preloadCriticalResources();
        preconnectExternalDomains();
      }

      if (enableImageOptimization) {
        // Delay image optimization to avoid blocking
        setTimeout(optimizeImageLoading, 100);
      }

      setIsOptimized(true);
    } catch (error) {
      console.warn('Performance optimization failed:', error);
    }
  }, [enableCriticalCSS, enablePreloading, enableImageOptimization, enableResourceHints]);

  // Initialize optimizations
  useEffect(() => {
    // Apply optimizations immediately for critical resources
    optimizePerformance();

    // Measure performance after load
    const handleLoad = () => {
      setTimeout(measurePerformance, 1000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [optimizePerformance, measurePerformance]);

  return {
    isOptimized,
    performanceScore,
    optimizePerformance
  };
}

// Hook for lazy loading components
export function useLazyLoading(threshold = 0.1, rootMargin = '50px') {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState<Element | null>(null);

  const ref = useCallback((node: Element | null) => {
    if (node) setElement(node);
  }, []);

  useEffect(() => {
    if (!element || typeof window === 'undefined') return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [element, threshold, rootMargin]);

  return { ref, isVisible };
}

// Hook for preloading resources
export function usePreloadResource(href: string, as: string, type?: string) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;

    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [href, as, type]);
}

// Hook for critical resource loading
export function useCriticalResourceLoading() {
  const [resourcesLoaded, setResourcesLoaded] = useState(false);

  useEffect(() => {
    const criticalResources = [
      '/fonts/Anton-Regular.woff2',
      '/fonts/Montserrat-Regular.woff2',
      '/fonts/Montserrat-SemiBold.woff2'
    ];

    let loadedCount = 0;
    const totalResources = criticalResources.length;

    const checkResourceLoad = () => {
      loadedCount++;
      if (loadedCount === totalResources) {
        setResourcesLoaded(true);
      }
    };

    // Check if fonts are already loaded
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setResourcesLoaded(true);
      });
    } else {
      // Fallback: assume loaded after timeout
      setTimeout(() => setResourcesLoaded(true), 3000);
    }
  }, []);

  return resourcesLoaded;
}
