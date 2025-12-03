import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import USP from './components/USP';
import Portfolio from './components/Portfolio';
import Testimonial from './components/Testimonial';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ExitPopup from './components/ExitPopup';
import AIChatbot from './components/AIChatbot';
import AdminDashboard from './pages/AdminDashboard';
import GuidePage from './pages/GuidePage';
import { sendGuideRequestToTelegram } from './services/telegramService';
import { trackPageView, trackEmailSubmission } from './services/analyticsService';

// Main landing page component
const LandingPage: React.FC = () => {
  const handleGuideRequest = (email: string) => {
    sendGuideRequestToTelegram(email);
    trackEmailSubmission(email, 'exit_popup');
  };

  return (
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
      <AIChatbot />
    </main>
  );
};

const App: React.FC = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Track page views on route change
  useEffect(() => {
    // Only track page views for the main landing page, not admin
    if (!location.pathname.startsWith('/admin')) {
      trackPageView(location.pathname);
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/gids" element={<GuidePage />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
};

export default App;
