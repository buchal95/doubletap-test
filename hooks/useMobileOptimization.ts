/**
 * Mobile Optimization Hook
 * 
 * Hook for mobile-first responsive design and touch interactions
 */

import { useEffect, useState, useCallback } from 'react';

interface Breakpoints {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

interface UseMobileOptimizationReturn {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenSize: keyof Breakpoints | 'xs';
  orientation: 'portrait' | 'landscape';
  touchSupported: boolean;
  isOnline: boolean;
  viewportHeight: number;
  safeAreaInsets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

const defaultBreakpoints: Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

export function useMobileOptimization(
  breakpoints: Breakpoints = defaultBreakpoints
): UseMobileOptimizationReturn {
  const [screenSize, setScreenSize] = useState<keyof Breakpoints | 'xs'>('xs');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [touchSupported, setTouchSupported] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [safeAreaInsets, setSafeAreaInsets] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  });

  // Determine screen size
  const updateScreenSize = useCallback(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    
    if (width >= breakpoints['2xl']) {
      setScreenSize('2xl');
    } else if (width >= breakpoints.xl) {
      setScreenSize('xl');
    } else if (width >= breakpoints.lg) {
      setScreenSize('lg');
    } else if (width >= breakpoints.md) {
      setScreenSize('md');
    } else if (width >= breakpoints.sm) {
      setScreenSize('sm');
    } else {
      setScreenSize('xs');
    }
  }, [breakpoints]);

  // Update orientation
  const updateOrientation = useCallback(() => {
    if (typeof window === 'undefined') return;

    setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
  }, []);

  // Update viewport height (for mobile viewport units)
  const updateViewportHeight = useCallback(() => {
    if (typeof window === 'undefined') return;

    setViewportHeight(window.innerHeight);
    
    // Set CSS custom property for mobile viewport height
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  }, []);

  // Update safe area insets
  const updateSafeAreaInsets = useCallback(() => {
    if (typeof window === 'undefined') return;

    const computedStyle = getComputedStyle(document.documentElement);
    
    setSafeAreaInsets({
      top: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-top)') || '0'),
      bottom: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
      left: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-left)') || '0'),
      right: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-right)') || '0')
    });
  }, []);

  // Initialize and set up event listeners
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect touch support
    setTouchSupported('ontouchstart' in window || navigator.maxTouchPoints > 0);

    // Initial setup
    updateScreenSize();
    updateOrientation();
    updateViewportHeight();
    updateSafeAreaInsets();

    // Set up resize listener
    const handleResize = () => {
      updateScreenSize();
      updateOrientation();
      updateViewportHeight();
    };

    // Set up orientation change listener
    const handleOrientationChange = () => {
      setTimeout(() => {
        updateOrientation();
        updateViewportHeight();
        updateSafeAreaInsets();
      }, 100); // Small delay to ensure accurate measurements
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [updateScreenSize, updateOrientation, updateViewportHeight, updateSafeAreaInsets]);

  // Online/offline detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const isMobile = screenSize === 'xs' || screenSize === 'sm';
  const isTablet = screenSize === 'md';
  const isDesktop = screenSize === 'lg' || screenSize === 'xl' || screenSize === '2xl';

  return {
    isMobile,
    isTablet,
    isDesktop,
    screenSize,
    orientation,
    touchSupported,
    isOnline,
    viewportHeight,
    safeAreaInsets
  };
}

// Hook for touch gestures
export function useTouchGestures(element: HTMLElement | null) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      setTouchEnd(null);
      setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      setTouchEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      });
    };

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
    };
  }, [element]);

  const getSwipeDirection = useCallback(() => {
    if (!touchStart || !touchEnd) return null;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > 50;
    const isRightSwipe = distanceX < -50;
    const isUpSwipe = distanceY > 50;
    const isDownSwipe = distanceY < -50;

    if (isLeftSwipe) return 'left';
    if (isRightSwipe) return 'right';
    if (isUpSwipe) return 'up';
    if (isDownSwipe) return 'down';

    return null;
  }, [touchStart, touchEnd]);

  return {
    touchStart,
    touchEnd,
    getSwipeDirection
  };
}

// Hook for mobile-specific optimizations
export function useMobilePerformance() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Disable hover effects on touch devices
    if ('ontouchstart' in window) {
      document.documentElement.classList.add('touch-device');
    }

    // Optimize scrolling performance
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-overflow-scrolling: touch;
      }
      
      .touch-device *:hover {
        /* Disable hover effects on touch devices */
      }
      
      /* Optimize mobile scrolling */
      body {
        overscroll-behavior: none;
      }
      
      /* Improve tap targets */
      button, a, input, select, textarea {
        min-height: 44px;
        min-width: 44px;
      }
    `;
    
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);
}
