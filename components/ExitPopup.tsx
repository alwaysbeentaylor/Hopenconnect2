import React, { useState, useEffect } from 'react';
import { X, Download, Gift, ArrowRight } from 'lucide-react';
import { useCountry } from '../contexts/CountryContext';
import { getTranslations } from '../config/translations';

interface ExitPopupProps {
  onEmailSubmit?: (email: string) => void;
}

const ExitPopup: React.FC<ExitPopupProps> = ({ onEmailSubmit }) => {
  const { country } = useCountry();
  const t = getTranslations(country);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const shown = sessionStorage.getItem('exitPopupShown');
    if (shown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Detect if mouse is leaving toward the top (close button area)
      if (e.clientY <= 5 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };

    // Delay adding the listener to prevent immediate triggers
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Send to Telegram via the service
    if (onEmailSubmit) {
      onEmailSubmit(email);
    }

    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus('success');
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div className="relative w-full max-w-md bg-silk shadow-2xl animate-scale-in overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 p-1.5 text-gray-400 hover:text-charcoal transition-colors"
        >
          <X size={18} />
        </button>

        {/* Gold accent bar */}
        <div className="h-0.5 bg-gradient-to-r from-gold via-amber-400 to-gold" />

        <div className="p-6 md:p-8">
          {status === 'success' ? (
            <div className="text-center py-6 animate-fade-in">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                <Download className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-xl font-serif text-charcoal mb-2">Check je inbox!</h3>
              <p className="text-sm text-gray-600 font-light">
                De gids is onderweg naar {email}
              </p>
              <button 
                onClick={handleClose}
                className="mt-6 text-xs uppercase tracking-widest text-gold hover:text-charcoal transition-colors"
              >
                Sluiten
              </button>
            </div>
          ) : (
            <>
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold/10 text-gold text-xs uppercase tracking-widest mb-4">
                <Gift size={12} />
                Gratis Download
              </div>

              {/* Content */}
              <h2 className="text-2xl md:text-3xl font-serif text-charcoal mb-3 leading-tight">
                Wacht! Vergeet uw <span className="italic text-gold">gratis gids</span> niet.
              </h2>
              
              <p className="text-sm text-gray-600 font-light mb-5 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.exitPopup.description }} />

              {/* What's inside */}
              <div className="bg-charcoal/5 p-4 mb-5">
                <span className="text-xs uppercase tracking-widest text-gray-400 mb-3 block">In deze gids:</span>
                <ul className="space-y-1.5 text-xs text-charcoal">
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-0.5">✓</span>
                    De #1 fout die 90% van de kopers maakt
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-0.5">✓</span>
                    Hoe u 10-15% bespaart bij onderhandeling
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-0.5">✓</span>
                    De beste locaties voor rendement in 2025
                  </li>
                </ul>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Uw e-mailadres"
                    className="w-full px-3 py-3 bg-white border border-gray-200 text-charcoal placeholder-gray-400 focus:outline-none focus:border-gold transition-colors text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full group relative px-6 py-3 bg-gold text-charcoal text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-charcoal hover:text-white flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <span className="animate-pulse">Even geduld...</span>
                  ) : (
                    <>
                      <span>Download Gratis Gids</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-gray-400 text-center mt-3">
                Geen spam. Alleen waardevolle inzichten.
              </p>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.95) translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default ExitPopup;

