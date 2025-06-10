'use client';

import { useEffect } from 'react';
import LandingPage from './components/LandingPage';
import { trackPageView, initializeDataLayer } from '../utils/dataLayer';

export default function Home() {
  useEffect(() => {
    // Initialize dataLayer first
    initializeDataLayer();
    
    // Track page view after component mount
    const timer = setTimeout(() => {
      trackPageView('home');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return <LandingPage />;
}