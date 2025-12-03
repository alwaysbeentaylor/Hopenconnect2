import React, { useEffect, useState } from 'react';

export const LoadingScreen: React.FC = () => {
  const [step, setStep] = useState(0);
  
  const steps = [
    "Marktdata analyseren...",
    "Vastgoedtrends 2025 ophalen...",
    "Rentestanden en financieringsopties vergelijken...",
    "Onderhandelingsstrategieën formuleren...",
    "Uw persoonlijke gids samenstellen..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2500);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Spinner */}
        <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-gold-500 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-serif font-bold text-navy-900">VM</span>
            </div>
        </div>
        
        <h3 className="text-xl font-medium text-navy-900 mb-2">Een moment geduld</h3>
        <p className="text-gray-500 h-6 transition-all duration-500 ease-in-out">
            {steps[step]}
        </p>

        <div className="mt-8 flex justify-center gap-2">
            {steps.map((_, i) => (
                <div key={i} className={`h-1.5 w-8 rounded-full transition-colors duration-500 ${i <= step ? 'bg-navy-900' : 'bg-gray-200'}`} />
            ))}
        </div>
        
        <div className="mt-12 p-4 bg-slate-50 rounded text-xs text-gray-400">
            Powered by Google Gemini Ultrathink
        </div>
      </div>
    </div>
  );
};