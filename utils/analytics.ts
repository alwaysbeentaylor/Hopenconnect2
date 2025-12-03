// Google Analytics 4 Tracking Implementation
// Voor vastgoed lead tracking en conversie optimalisatie

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// GA4 Measurement ID - VERVANG DEZE MET JULLIE EIGEN GA4 ID
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// Initialiseer Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined') return;

  // Laad gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialiseer dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    send_page_view: true,
    // Enhanced measurement voor vastgoed
    allow_google_signals: true,
    allow_ad_personalization_signals: false, // GDPR compliant
  });

  console.log('✅ Google Analytics 4 geïnitialiseerd');
};

// Track pageviews (voor single page apps)
export const trackPageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track events - CRUCIAAL VOOR LEAD TRACKING
export const trackEvent = (action: string, params?: Record<string, any>) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, params);
    console.log('📊 Event tracked:', action, params);
  }
};

// ===== VASTGOED SPECIFIEKE TRACKING EVENTS =====

// 1. Contact form submissions (HOOGSTE PRIORITEIT)
export const trackContactFormSubmit = (formData: {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  country?: string;
}) => {
  trackEvent('generate_lead', {
    event_category: 'Lead Generation',
    event_label: 'Contact Form',
    value: 100, // Schat waarde per lead op €100
    ...formData,
  });

  // Ook als conversie tracken
  trackEvent('conversion', {
    send_to: GA_MEASUREMENT_ID,
    value: 100,
    currency: 'EUR',
    transaction_id: Date.now().toString(),
  });
};

// 2. Guide downloads (exit popup)
export const trackGuideDownload = (email: string, country: string) => {
  trackEvent('generate_lead', {
    event_category: 'Lead Generation',
    event_label: 'Guide Download',
    email_domain: email.split('@')[1],
    country: country,
    value: 50, // €50 waarde voor guide downloads
  });
};

// 3. Service interest tracking
export const trackServiceView = (serviceName: string, timeSpent: number) => {
  trackEvent('view_item', {
    event_category: 'Engagement',
    event_label: 'Service View',
    service_name: serviceName,
    time_spent_seconds: timeSpent,
  });
};

// 4. WhatsApp clicks
export const trackWhatsAppClick = () => {
  trackEvent('click', {
    event_category: 'Communication',
    event_label: 'WhatsApp Click',
    value: 75, // Hoge intent
  });
};

// 5. Phone clicks
export const trackPhoneClick = () => {
  trackEvent('click', {
    event_category: 'Communication',
    event_label: 'Phone Click',
    value: 80, // Zeer hoge intent
  });
};

// 6. CTA clicks
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent('click', {
    event_category: 'CTA',
    event_label: ctaName,
    location: location,
  });
};

// 7. Scroll depth (engagement metric)
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll', {
    event_category: 'Engagement',
    event_label: `${percentage}%`,
    value: percentage,
  });
};

// 8. Time on page
export const trackTimeOnPage = (seconds: number) => {
  trackEvent('engagement_time', {
    event_category: 'Engagement',
    value: seconds,
  });
};

// 9. Country selector
export const trackCountrySelection = (country: string) => {
  trackEvent('select_content', {
    event_category: 'Country Selection',
    content_type: 'country',
    item_id: country,
  });
};

// 10. AI Chatbot interactions
export const trackChatbotInteraction = (action: 'open' | 'message_sent' | 'close', messageCount?: number) => {
  trackEvent('chatbot_interaction', {
    event_category: 'AI Chatbot',
    event_label: action,
    message_count: messageCount,
  });
};

// 11. Exit intent tracking
export const trackExitIntent = (triggered: boolean) => {
  trackEvent('exit_intent', {
    event_category: 'Behavior',
    event_label: triggered ? 'Popup Shown' : 'Exit Without Popup',
  });
};

// Auto-track scroll depth
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;

  const thresholds = [25, 50, 75, 90, 100];
  const tracked: Set<number> = new Set();

  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    thresholds.forEach(threshold => {
      if (scrollPercent >= threshold && !tracked.has(threshold)) {
        tracked.add(threshold);
        trackScrollDepth(threshold);
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
};

// Auto-track time on page
export const initTimeTracking = () => {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();

  const trackTime = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    trackTimeOnPage(timeSpent);
  };

  // Track elke 30 seconden
  const interval = setInterval(trackTime, 30000);

  // Track bij page unload
  window.addEventListener('beforeunload', () => {
    clearInterval(interval);
    trackTime();
  });
};

// Export alles
export default {
  initGA,
  trackPageview,
  trackEvent,
  trackContactFormSubmit,
  trackGuideDownload,
  trackServiceView,
  trackWhatsAppClick,
  trackPhoneClick,
  trackCTAClick,
  trackScrollDepth,
  trackTimeOnPage,
  trackCountrySelection,
  trackChatbotInteraction,
  trackExitIntent,
  initScrollTracking,
  initTimeTracking,
};
