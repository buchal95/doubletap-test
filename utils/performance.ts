// Performance utilities for optimizing Core Web Vitals

// Lazy load components after critical content
export const lazyLoadComponent = (importFn: () => Promise<any>) => {
  return React.lazy(() => 
    new Promise(resolve => {
      // Delay non-critical component loading
      setTimeout(() => {
        resolve(importFn());
      }, 100);
    })
  );
};

// Passive event listeners for better scroll performance
export const addPassiveEventListener = (
  element: Element | Window,
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions
) => {
  element.addEventListener(event, handler, { 
    passive: true, 
    ...options 
  });
};

// Optimize image loading priorities
export const getImagePriority = (isAboveFold: boolean, isLCP: boolean) => {
  if (isLCP) return true; // Highest priority for LCP images
  if (isAboveFold) return true; // High priority for above-fold
  return false; // Lazy load for below-fold
};

// Optimize bundle splitting
export const preloadRoute = (href: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'script';
  link.href = href;
  document.head.appendChild(link);
};

// Debounce scroll events for performance
export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle resize events
export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  });
};

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload hero image
  const heroImage = new Image();
  heroImage.src = '/hero-image.webp';
  
  // Preload logo
  const logo = new Image();
  logo.src = '/doubletap-logo.webp';
  
  // Preload fonts (already handled in layout.tsx)
  // Critical CSS is inlined
};

// Reduce layout shift by reserving space
export const reserveImageSpace = (width: number, height: number) => {
  return {
    width,
    height,
    style: {
      aspectRatio: `${width}/${height}`
    }
  };
};

export default {
  lazyLoadComponent,
  addPassiveEventListener,
  getImagePriority,
  preloadRoute,
  debounce,
  throttle,
  createIntersectionObserver,
  preloadCriticalResources,
  reserveImageSpace
};