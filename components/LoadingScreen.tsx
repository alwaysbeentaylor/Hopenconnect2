import React from 'react';
import { Sparkles, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-charcoal flex flex-col items-center justify-center p-6 relative">
      {/* Back to Home Button */}
      <div className="absolute top-6 left-4 md:left-8 z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors"
        >
          <Home size={18} />
          <span className="text-sm">Terug naar site</span>
        </Link>
      </div>
      <div className="text-center max-w-md">
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-gold/10 flex items-center justify-center animate-pulse">
            <Sparkles className="w-12 h-12 text-gold animate-spin-slow" />
          </div>
          <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-2 border-gold/30 animate-ping" />
        </div>

        {/* Text */}
        <h2 className="text-3xl font-serif text-white mb-4">
          Uw gids wordt <span className="text-gold italic">gegenereerd...</span>
        </h2>
        <p className="text-gray-400 font-light leading-relaxed mb-8">
          Onze AI analyseert de Belgische vastgoedmarkt en stelt een gepersonaliseerd rapport samen op basis van uw profiel.
        </p>

        {/* Progress Steps */}
        <div className="space-y-3 text-left">
          <LoadingStep text="Marktdata analyseren" delay={0} />
          <LoadingStep text="Regio-specifieke inzichten verzamelen" delay={1} />
          <LoadingStep text="Strategieën formuleren" delay={2} />
          <LoadingStep text="Rapport samenstellen" delay={3} />
        </div>

        <p className="text-xs text-gray-600 mt-8">
          Dit duurt meestal 10-20 seconden
        </p>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        @keyframes fade-in-step {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-step {
          animation: fade-in-step 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

interface LoadingStepProps {
  text: string;
  delay: number;
}

const LoadingStep: React.FC<LoadingStepProps> = ({ text, delay }) => {
  return (
    <div 
      className="flex items-center gap-3 text-gray-400 opacity-0 animate-fade-in-step"
      style={{ animationDelay: `${delay * 0.8}s` }}
    >
      <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
      <span className="text-sm">{text}</span>
    </div>
  );
};

export default LoadingScreen;

