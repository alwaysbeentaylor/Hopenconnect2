import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import USP from './components/USP';
import Portfolio from './components/Portfolio';
import Testimonial from './components/Testimonial';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ExitPopup from './components/ExitPopup';
import SEOHead from './components/SEOHead';
import { sendGuideRequestToTelegram } from './services/telegramService';
import { CountryProvider } from './contexts/CountryContext';
import { initGA, initScrollTracking, initTimeTracking } from './utils/analytics';

const App: React.FC = () => {
  // Initialiseer Google Analytics en tracking
  useEffect(() => {
    // Initialize GA4
    initGA();

    // Start scroll depth tracking
    initScrollTracking();

    // Start time on page tracking
    initTimeTracking();

    console.log('🚀 SEO & Analytics systeem geactiveerd');
  }, []);

  const handleGuideRequest = (email: string) => {
    sendGuideRequestToTelegram(email);
  };

  return (
    <CountryProvider>
      {/* SEO Head component voor dynamische meta tags en schema */}
      <SEOHead page="home" />

      <main className="w-full min-h-screen bg-charcoal">
        <Navbar />
        <Hero />
        <Services />
        <USP />
        <Portfolio />
        <Testimonial />
        <ContactForm />
        <Footer />
        <ExitPopup onEmailSubmit={handleGuideRequest} />
      </main>
    </CountryProvider>
  );
};

export default App;