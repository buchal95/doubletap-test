/**
 * Performant Layout Component
 * 
 * Layout wrapper with performance optimizations
 */

'use client';

import React, { useEffect, memo } from 'react';
import { PerformanceMonitor, reportWebVitals, preloadCriticalResources } from '../../../lib/performance';
import { usePerformanceOptimization } from '../../../hooks/usePerformanceOptimization';
import ErrorBoundary from '../common/ErrorBoundary';
import type { BaseComponentProps } from '../../../types';

interface PerformantLayoutProps extends BaseComponentProps {
  enablePerformanceMonitoring?: boolean;
  preloadResources?: boolean;
}

const PerformantLayout: React.FC<PerformantLayoutProps> = memo(({
  children,
  enablePerformanceMonitoring = true,
  preloadResources = true,
  className = ''
}) => {
  // Use performance optimization hook
  const { isOptimized, performanceScore } = usePerformanceOptimization({
    enableCriticalCSS: true,
    enablePreloading: preloadResources,
    enableImageOptimization: true,
    enableResourceHints: true
  });
  useEffect(() => {
    if (enablePerformanceMonitoring) {
      PerformanceMonitor.start('page-load');
      
      // Monitor page load performance
      const handleLoad = () => {
        PerformanceMonitor.end('page-load');
      };
      
      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
      }
    }
  }, [enablePerformanceMonitoring]);

  useEffect(() => {
    if (preloadResources) {
      preloadCriticalResources();
    }
  }, [preloadResources]);

  // Report Web Vitals
  useEffect(() => {
    if (enablePerformanceMonitoring && typeof window !== 'undefined') {
      // Dynamic import to avoid loading Web Vitals on server
      import('web-vitals').then((webVitals) => {
        if (webVitals.onCLS) webVitals.onCLS(reportWebVitals);
        if (webVitals.onINP) webVitals.onINP(reportWebVitals);
        if (webVitals.onFCP) webVitals.onFCP(reportWebVitals);
        if (webVitals.onLCP) webVitals.onLCP(reportWebVitals);
        if (webVitals.onTTFB) webVitals.onTTFB(reportWebVitals);
      }).catch(() => {
        // Silently fail if web-vitals is not available
      });
    }
  }, [enablePerformanceMonitoring]);

  return (
    <ErrorBoundary>
      <div className={`min-h-screen ${className}`}>
        {children}
      </div>
    </ErrorBoundary>
  );
});

PerformantLayout.displayName = 'PerformantLayout';

export default PerformantLayout;
