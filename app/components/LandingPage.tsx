import React from 'react';
import Hero from './sections/Hero';
import SocialProof from './sections/SocialProof';
import PainPoints from './sections/PainPoints';
import CourseOverview from './sections/CourseOverview';
import Benefits from './sections/Benefits';
import Schedule from './sections/Schedule';
import Testimonials from './sections/Testimonials';
import Subsidy from './sections/Subsidy';
import Bonuses from './sections/Bonuses';
import Urgency from './sections/Urgency';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <SocialProof />
      <PainPoints />
      <CourseOverview />
      <Benefits />
      <Schedule />
      <Testimonials />
      <Subsidy />
      <Bonuses />
      <Urgency />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;