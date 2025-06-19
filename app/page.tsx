'use client';

import { useEffect } from 'react';
import LandingPage from './components/LandingPage';
import { trackPageView } from '../utils/dataLayer';

export default function Home() {
  useEffect(() => {
    // Track page view after component mount (dataLayer is already initialized in layout.tsx)
    const timer = setTimeout(() => {
      trackPageView('home');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return <LandingPage />;
}