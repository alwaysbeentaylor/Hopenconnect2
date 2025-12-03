import React from 'react';
import { Download, RefreshCw, Home, BookOpen, Lightbulb, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RealEstateGuide, UserProfile } from '../types';

interface GuideRendererProps {
  guide: RealEstateGuide;
  user: UserProfile;
  onReset: () => void;
}

export const GuideRenderer: React.FC<GuideRendererProps> = ({ guide, user, onReset }) => {
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Navigation Bar - Hidden on print */}
      <nav className="sticky top-0 z-50 bg-charcoal/90 backdrop-blur-lg border-b border-white/10 no-print">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors"
            >
              <Home size={18} />
              <span className="text-sm hidden sm:inline">Terug naar site</span>
            </Link>
            <button
              onClick={onReset}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <RefreshCw size={18} />
              <span className="text-sm hidden sm:inline">Nieuwe Gids</span>
            </button>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-gold text-charcoal font-medium rounded-lg hover:bg-amber-400 transition-colors"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Download PDF</span>
          </button>
        </div>
      </nav>

      {/* The "Paper" Document */}
      <div className="max-w-5xl mx-auto py-8 px-4 print:p-0 print:max-w-none">
        <div className="bg-silk shadow-2xl print:shadow-none overflow-hidden">
          
          {/* Cover Page */}
          <div className="relative min-h-[600px] lg:min-h-[800px] print:min-h-screen print:break-after-page">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                alt="Luxury Real Estate" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal" />
            </div>
            
            {/* Cover Content */}
            <div className="relative z-10 flex flex-col h-full min-h-[600px] lg:min-h-[800px] p-8 lg:p-16">
              <div className="flex-grow flex flex-col justify-center">
                <div className="inline-block px-4 py-2 bg-gold text-charcoal text-xs font-bold tracking-widest uppercase mb-8 w-fit">
                  Exclusief Rapport 2025
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-white leading-tight mb-6">
                  De 7 Geheimen<br />
                  van Vastgoed<br />
                  <span className="text-gold italic">Succes</span>
                </h1>
                <p className="text-xl text-gray-300 font-light max-w-xl">
                  Strategische inzichten voor de Belgische markt,
                  speciaal samengesteld door Hope Connects.
                </p>
              </div>
              
              {/* User Info */}
              <div className="border-t border-white/20 pt-8 mt-8">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Opgesteld voor</p>
                <h2 className="text-2xl lg:text-3xl font-serif text-white mb-4">{user.name}</h2>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 bg-white/10 text-white text-sm rounded">
                    Regio: {user.focusRegion}
                  </span>
                  <span className="px-3 py-1.5 bg-white/10 text-white text-sm rounded">
                    Budget: {user.budgetRange}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Introduction Page */}
          <div className="p-8 lg:p-16 bg-white print:break-after-page">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 text-gold mb-6">
                <BookOpen size={24} />
                <span className="text-xs uppercase tracking-widest font-semibold">Introductie</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-serif text-charcoal mb-8 leading-tight">
                {guide.title}
              </h2>
              <div className="prose prose-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {guide.introduction}
              </div>

              {/* Table of Contents */}
              <div className="mt-12 p-8 bg-charcoal/5 rounded-xl">
                <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-6 font-semibold">
                  Inhoudsopgave
                </h3>
                <ul className="space-y-4">
                  {guide.chapters.map((chapter, index) => (
                    <li key={index} className="flex items-baseline gap-4 group">
                      <span className="text-2xl font-serif text-gold font-bold">0{index + 1}</span>
                      <span className="text-lg text-charcoal group-hover:text-gold transition-colors">
                        {chapter.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Chapters */}
          <div className="p-8 lg:p-16 bg-silk">
            <div className="max-w-3xl mx-auto space-y-16">
              {guide.chapters.map((chapter, index) => (
                <article key={index} className="print:break-inside-avoid">
                  {/* Chapter Header */}
                  <div className="flex items-start gap-6 mb-6">
                    <div className="text-6xl lg:text-8xl font-serif text-gold/20 font-bold leading-none">
                      0{index + 1}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-2xl lg:text-3xl font-serif text-charcoal leading-tight">
                        {chapter.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Chapter Content */}
                  <div className="pl-0 lg:pl-20">
                    <p className="text-gray-700 leading-relaxed text-lg mb-8 whitespace-pre-line">
                      {chapter.content}
                    </p>
                    
                    {/* Key Takeaway */}
                    <div className="bg-charcoal p-6 rounded-xl">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-gold/20 rounded-lg shrink-0">
                          <Lightbulb className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-gold uppercase tracking-wider mb-2">
                            Expert Tip
                          </span>
                          <p className="text-white font-medium italic">
                            "{chapter.keyTakeaway}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Conclusion Page */}
          <div className="p-8 lg:p-16 bg-charcoal text-white print:break-before-page">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-serif mb-8 text-gold">
                Uw Volgende Stap
              </h2>
              <div className="text-lg text-gray-300 leading-relaxed mb-12 whitespace-pre-line">
                {guide.conclusion}
              </div>
              
              {/* CTA Box */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-xl no-print">
                <h4 className="text-xl font-semibold mb-3">
                  Hulp nodig bij de uitvoering?
                </h4>
                <p className="text-gray-400 mb-6">
                  Onze experts staan klaar voor een vrijblijvend gesprek over uw strategie in {user.focusRegion}.
                </p>
                <Link
                  to="/#contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-charcoal font-semibold rounded-lg hover:bg-amber-400 transition-colors"
                >
                  <span>Boek een Strategiegesprek</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
              
              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-white/10 text-sm text-gray-500">
                <p>Gegenereerd door Hope Connects voor {user.name}</p>
                <p className="mt-1">© 2025 Hope Connects - Exclusief Vastgoed & Renovatie</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
};

export default GuideRenderer;

