import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import USP from './components/USP';
import Portfolio from './components/Portfolio';
import Testimonial from './components/Testimonial';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ExitPopup from './components/ExitPopup';
import { sendGuideRequestToTelegram } from './services/telegramService';
import { CountryProvider } from './contexts/CountryContext';

const App: React.FC = () => {
  const handleGuideRequest = (email: string) => {
    sendGuideRequestToTelegram(email);
  };

  return (
    <CountryProvider>
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