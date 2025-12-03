import React from 'react';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { useCountry } from '../contexts/CountryContext';
import { getTranslations } from '../config/translations';
import { trackCTAClick } from '../utils/analytics';

const Hero: React.FC = () => {
  const { country } = useCountry();
  const t = getTranslations(country);

  return (
    <section className="relative w-full min-h-screen bg-silk overflow-hidden flex flex-col md:flex-row">
      
      {/* Left Column - Content */}
      <div className="w-full md:w-5/12 relative z-10 flex flex-col justify-center px-6 md:px-16 pt-32 md:pt-0 bg-silk">
        <div className="mb-8 relative">
          <div className="w-12 h-0.5 bg-gold mb-8"></div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-charcoal leading-[0.9]">
            Connecting <br />
            <span className="italic text-gold ml-4 md:ml-12">Dreams</span> <br />
            To Reality.
          </h1>
        </div>
        
        <p className="text-gray-600 text-lg font-light max-w-sm leading-relaxed mb-12">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a
            href="#contact"
            onClick={() => trackCTAClick('Gratis Adviesgesprek', 'Hero')}
            className="group relative px-10 py-5 bg-gold text-charcoal text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 hover:bg-charcoal hover:text-white hover:shadow-2xl flex items-center gap-4"
          >
            <span>Gratis Adviesgesprek</span>
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
          </a>
          <a
            href="#diensten"
            onClick={() => trackCTAClick('Bekijk diensten', 'Hero')}
            className="text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-gold transition-colors border-b border-transparent hover:border-gold pb-1"
          >
            Bekijk diensten
          </a>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="w-full md:w-7/12 relative h-[60vh] md:h-screen">
        <div className="absolute inset-0 bg-charcoal">
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
            alt="Minimalist Luxury Architecture" 
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        
        {/* Floating Element */}
        <div className="absolute bottom-0 left-0 bg-gold/90 p-8 md:p-12 text-white max-w-sm hidden md:block backdrop-blur-sm">
          <p className="font-serif italic text-2xl leading-tight">
            "Vastgoed is geen transactie, het is de fundering van uw toekomst."
          </p>
        </div>
      </div>

      {/* Decorative Text Vertical */}
      <div className="hidden lg:block absolute right-8 bottom-12 z-20 mix-blend-difference">
         <span className="writing-vertical text-offwhite text-xs tracking-[0.5em] uppercase opacity-70">
            {t.hero.countryText}
         </span>
      </div>
      
      <style>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </section>
  );
};

export default Hero;