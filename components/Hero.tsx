import React from 'react';
import { ArrowDownRight } from 'lucide-react';

const Hero: React.FC = () => {
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
          Hope Connects is uw exclusieve partner in Belgisch vastgoed. Wij overbruggen de kloof tussen visie en realisatie.
        </p>

        <div className="flex items-center space-x-4">
          <a href="#contact" className="group flex items-center gap-4 text-charcoal uppercase tracking-widest text-xs font-medium hover:text-gold transition-colors">
            <span className="w-12 h-12 border border-charcoal/20 rounded-full flex items-center justify-center group-hover:border-gold group-hover:bg-gold group-hover:text-white transition-all duration-300">
              <ArrowDownRight size={16} />
            </span>
            Start uw verhaal
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
        <div className="absolute bottom-0 left-0 bg-gold/90 p-8 md:p-12 text-white max-w-sm hidden md:block">
          <p className="font-serif italic text-2xl leading-tight">
            "Vastgoed is geen transactie, het is de fundering van uw toekomst."
          </p>
        </div>
      </div>

      {/* Decorative Text Vertical */}
      <div className="hidden lg:block absolute right-8 bottom-12 z-20 mix-blend-difference">
         <span className="writing-vertical text-offwhite text-xs tracking-[0.5em] uppercase opacity-70">
            Est. 2025 — Belgium
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