import React from 'react';
import { RealEstateGuide, UserProfile } from '../types';
import { Button } from './Button';

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
    <div className="min-h-screen bg-gray-100 py-10">
        
      {/* Navigation Bar - Hidden on print */}
      <div className="max-w-4xl mx-auto px-4 mb-8 flex justify-between items-center no-print">
        <Button variant="outline" onClick={onReset} className="bg-white">
          &larr; Nieuwe Gids
        </Button>
        <Button onClick={handlePrint} className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Download PDF / Print
        </Button>
      </div>

      {/* The "Paper" Document */}
      <div className="max-w-4xl mx-auto bg-white shadow-2xl print:shadow-none print:w-full print:max-w-none">
        
        {/* Page 1: Cover */}
        <div className="w-full aspect-[1/1.414] relative flex flex-col p-0 print:break-after-page overflow-hidden">
          <div className="h-2/3 relative">
             <img src="https://picsum.photos/1200/1000" className="w-full h-full object-cover" alt="Cover" />
             <div className="absolute inset-0 bg-navy-900/60 mix-blend-multiply"></div>
             <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12">
                <div className="bg-gold-500 text-white text-xs font-bold tracking-[0.2em] px-3 py-1 mb-6 uppercase">
                    Exclusief Rapport 2025
                </div>
                <h1 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-4">
                    De 7 Geheimen<br/>van Vastgoed<br/><span className="text-gold-400">Succes</span>
                </h1>
                <p className="text-gray-200 text-xl max-w-lg mt-4 font-light">
                    Strategische inzichten voor de Belgische markt
                </p>
             </div>
          </div>
          <div className="h-1/3 bg-white p-16 flex flex-col justify-between">
            <div>
                <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">Speciaal opgesteld voor</p>
                <h2 className="text-3xl font-serif text-navy-900 font-bold">{user.name}</h2>
                <div className="mt-4 flex gap-4 text-sm text-gray-600">
                    <span className="bg-gray-100 px-3 py-1 rounded">Regio: {user.focusRegion}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded">Budget: {user.budgetRange}</span>
                </div>
            </div>
            <div className="flex justify-between items-end border-t border-gray-200 pt-6">
                <div className="text-sm font-semibold text-gold-600">VastgoedMeesters.be</div>
                <div className="text-sm text-gray-400">© 2025</div>
            </div>
          </div>
        </div>

        {/* Page 2: Intro & Table of Contents */}
        <div className="p-16 print:p-12 print:break-after-page min-h-[1100px] flex flex-col bg-slate-50">
            <h2 className="text-4xl font-serif text-navy-900 mb-8 border-l-4 border-gold-500 pl-6">Introductie</h2>
            <div className="prose prose-lg text-gray-700 mb-12 leading-relaxed whitespace-pre-line">
                {guide.introduction}
            </div>

            <div className="mt-auto bg-white p-10 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-navy-900 mb-6 uppercase tracking-wider border-b border-gray-200 pb-2">Inhoudsopgave</h3>
                <ul className="space-y-4">
                    {guide.chapters.map((chapter, index) => (
                        <li key={index} className="flex justify-between items-baseline group cursor-default">
                            <span className="font-serif text-lg text-gray-400 mr-4 font-bold italic">0{index + 1}</span>
                            <span className="text-lg font-medium text-navy-900 flex-grow border-b border-dotted border-gray-300 mx-2">{chapter.title}</span>
                            <span className="text-gray-400 text-sm">p. {index + 3}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* Content Pages */}
        <div className="p-16 print:p-12 print:break-after-page">
            <h2 className="text-xs font-bold tracking-widest text-gold-600 uppercase mb-12">De 7 Geheimen Onthuld</h2>
            
            <div className="space-y-16">
                {guide.chapters.map((chapter, index) => (
                    <article key={index} className="break-inside-avoid mb-12">
                        <div className="flex items-baseline mb-4">
                            <span className="text-5xl font-serif text-gray-100 font-bold -mr-4 z-0">0{index + 1}</span>
                            <h3 className="text-2xl font-bold text-navy-900 z-10 relative pl-6">{chapter.title}</h3>
                        </div>
                        
                        <div className="pl-6 border-l border-gray-200 ml-4">
                            <p className="text-gray-700 leading-relaxed text-justify mb-6">
                                {chapter.content}
                            </p>
                            
                            <div className="bg-navy-50 p-4 rounded-r-lg border-l-4 border-navy-900">
                                <div className="flex items-start">
                                    <svg className="w-6 h-6 text-navy-900 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <div>
                                        <span className="block text-xs font-bold text-navy-900 uppercase mb-1">Expert Tip</span>
                                        <p className="text-sm font-medium text-navy-800 italic">"{chapter.keyTakeaway}"</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>

        {/* Conclusion Page */}
        <div className="p-16 print:p-12 bg-navy-900 text-white print:break-after-page min-h-[600px] flex flex-col justify-center text-center">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-4xl font-serif mb-8 text-gold-400">Uw volgende stap</h2>
                <div className="prose prose-invert prose-lg mb-12">
                    <p>{guide.conclusion}</p>
                </div>
                
                <div className="border border-white/20 p-8 rounded-lg bg-white/5 backdrop-blur-sm no-print">
                    <h4 className="text-lg font-bold mb-2">Hulp nodig bij de uitvoering?</h4>
                    <p className="text-gray-300 mb-6 text-sm">Onze experts staan klaar voor een vrijblijvend gesprek over uw strategie in {user.focusRegion}.</p>
                    <Button variant="secondary" onClick={() => window.open('https://example.com/contact', '_blank')}>
                        Boek een strategiegesprek
                    </Button>
                </div>
                
                {/* Print only footer */}
                <div className="hidden print:block mt-12 pt-12 border-t border-white/10">
                    <p className="text-sm text-gray-500">Gegenereerd door VastgoedMeesters.be voor {user.name}</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};