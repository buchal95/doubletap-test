/**
 * Lazy Section Component
 * 
 * Lazy loads sections when they come into viewport for better performance
 */

'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';
import type { BaseComponentProps } from '../../../types';

interface LazySectionProps extends BaseComponentProps {
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
  onVisible?: () => void;
}

const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback,
  rootMargin = '50px',
  threshold = 0.1,
  once = true,
  onVisible,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // If IntersectionObserver is not supported, show content immediately
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      setHasBeenVisible(true);
      onVisible?.();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            onVisible?.();
            
            if (once) {
              setHasBeenVisible(true);
              observer.unobserve(element);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        rootMargin,
        threshold
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [rootMargin, threshold, once, onVisible]);

  const shouldRender = isVisible || hasBeenVisible;

  return (
    <div ref={elementRef} className={className}>
      {shouldRender ? (
        <Suspense fallback={fallback || <LazyFallback />}>
          {children}
        </Suspense>
      ) : (
        fallback || <LazyFallback />
      )}
    </div>
  );
};

// Default fallback component
const LazyFallback: React.FC = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <LoadingSpinner size="lg" text="Načítám..." centered />
  </div>
);

export default LazySection;
