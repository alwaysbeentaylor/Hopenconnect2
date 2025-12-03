import React from 'react';
import { Button } from './Button';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <div className="text-2xl font-serif font-bold text-navy-900">Vastgoed<span className="text-gold-500">Meesters</span>.be</div>
        <div className="hidden md:block text-sm text-gray-500">Exclusief voor investeerders</div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-16 lg:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-gold-100 text-gold-700 text-sm font-semibold tracking-wide uppercase">
              Gratis Rapport 2025
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-navy-950 leading-tight">
              Ontdek de 7 geheimen die <span className="text-gold-600 italic">succesvolle</span> beleggers gebruiken.
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              Stop met gokken. Krijg toegang tot de strategieën die het verschil maken tussen rendement en verlies. Van locatiekeuze tot keiharde onderhandeling — alles in één gepersonaliseerde gids.
            </p>
            
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-3 shadow-sm">
              <h3 className="font-semibold text-navy-900 mb-4">Wat u leert in deze gids:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700"><strong>De #1 fout</strong> die 90% van de kopers maakt (en duizenden euro's kost).</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Hoe u <strong>10-15% bespaart</strong> bij onderhandelingen.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">De <strong>beste locaties</strong> voor rendement in België in 2025.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4">
              <Button onClick={onStart} variant="secondary" className="text-lg px-8 py-4 w-full sm:w-auto shadow-xl shadow-gold-500/20 transform hover:-translate-y-1 transition-all">
                Download Uw Gratis Gids
              </Button>
              <p className="mt-4 text-xs text-gray-400">Directe toegang. Geen wachttijd.</p>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 bg-gradient-to-tr from-gold-100 to-white rounded-2xl blur-lg opacity-70"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
              <img 
                src="https://picsum.photos/800/1000?grayscale" 
                alt="Modern Appartement in Brussel" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent flex flex-col justify-end p-8">
                <div className="text-white font-serif text-2xl mb-2">"De markt wacht niet."</div>
                <div className="text-gold-400 font-medium">Investeer slim met data.</div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl border border-gray-100 max-w-xs">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase font-bold">Gemiddeld Rendement</div>
                  <div className="text-lg font-bold text-navy-900">+4.2% hoger</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Social Proof Strip */}
      <div className="mt-24 border-t border-gray-100 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">Vertrouwd door 2.500+ Belgische beleggers</p>
          <div className="flex justify-center items-center space-x-12 opacity-50 grayscale">
             {/* Mock Logos using text for simplicity but styled like logos */}
             <span className="font-serif text-2xl font-bold">INVEST<span className="font-light">BE</span></span>
             <span className="font-sans text-xl font-black tracking-tighter">VASTGOED<span className="text-gold-500">PRO</span></span>
             <span className="font-serif italic text-2xl">WoonWens</span>
             <span className="font-mono text-xl font-bold">BRICKS.</span>
          </div>
        </div>
      </div>
    </div>
  );
};