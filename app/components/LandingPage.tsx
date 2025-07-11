import React from 'react';
import Hero from './sections/Hero';
import SocialProof from './sections/SocialProof';
import PainPoints from './sections/PainPoints';
import CourseOverview from './sections/CourseOverview';
import Lectors from './sections/Lectors';
import Benefits from './sections/Benefits';
import Schedule from './sections/Schedule';
import Testimonials from './sections/Testimonials';
import Subsidy from './sections/Subsidy';
import UpcomingEvents from './sections/UpcomingEvents';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import StickyCountdown from './common/StickyCountdown';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <main id="main-content" role="main">
        <Hero />
        <SocialProof />
        <CourseOverview />
        <Lectors />
        <PainPoints />
        <Schedule />
        <Testimonials />
        <Subsidy />
        <UpcomingEvents />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <StickyCountdown />
    </div>
  );
};

export default LandingPage;