import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-silk overflow-hidden flex flex-col md:flex-row">
      
      {/* Left Column - Content */}
      <div className="w-full md:w-5/12 relative z-10 flex flex-col justify-center px-6 md:px-16 pt-28 pb-12 md:py-24 bg-silk">
        <div className="mb-6 relative">
          <div className="w-12 h-0.5 bg-gold mb-6"></div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-charcoal leading-[0.95]">
            Connecting <br />
            <span className="italic text-gold ml-2 sm:ml-4 md:ml-8">Dreams</span> <br />
            To Reality.
          </h1>
        </div>
        
        <p className="text-gray-600 text-base md:text-lg font-light max-w-sm leading-relaxed mb-8">
          Hope Connects is uw exclusieve partner in Belgisch vastgoed. Wij overbruggen de kloof tussen visie en realisatie.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
          <a 
            href="#contact" 
            className="group relative px-8 py-4 bg-gold text-charcoal text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:bg-charcoal hover:text-white hover:shadow-2xl flex items-center gap-3"
          >
            <span>Gratis Adviesgesprek</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
          </a>
          <a 
            href="#diensten" 
            className="text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-gold transition-colors border-b border-transparent hover:border-gold pb-1"
          >
            Bekijk diensten
          </a>
        </div>

        {/* CTA for Guide - Now styled as a subtle card */}
        <Link 
          to="/gids"
          className="group flex items-center gap-3 p-4 bg-charcoal/5 border border-charcoal/10 rounded-lg text-charcoal transition-all duration-300 hover:bg-charcoal hover:text-white hover:border-charcoal max-w-fit"
        >
          <div className="p-2 bg-gold/20 rounded-lg group-hover:bg-gold/30">
            <Sparkles size={18} className="text-gold" />
          </div>
          <div>
            <span className="text-sm font-medium block">Gratis AI Vastgoedgids</span>
            <span className="text-xs text-gray-500 group-hover:text-gray-300">Gepersonaliseerd rapport op maat</span>
          </div>
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
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

    </section>
  );
};

export default Hero;