import LandingPage from './components/LandingPage';
import { trackPageView, initializeDataLayer } from '../utils/dataLayer';

export default function Home() {
  // Initialize page tracking (this will run on client side)
  if (typeof window !== 'undefined') {
    initializeDataLayer();
    // Track page view after component mount
    setTimeout(() => {
      trackPageView('home');
    }, 1000);
  }

  return <LandingPage />;
}