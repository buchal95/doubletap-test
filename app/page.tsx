'use client';

import { useEffect } from 'react';
import LandingPage from './components/LandingPage';
import { trackPageView, listenForConsentChanges } from '../utils/dataLayer';

export default function Home() {
  useEffect(() => {
    // Track page view after component mount
    const timer = setTimeout(() => {
      trackPageView('home');
    }, 500);

    // Initialize consent listeners
    listenForConsentChanges();

    return () => clearTimeout(timer);
  }, []);

  return <LandingPage />;
}