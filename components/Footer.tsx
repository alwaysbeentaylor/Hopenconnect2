import React from 'react';
import { Instagram, Linkedin, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-offwhite pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24">
          <div className="mb-12 md:mb-0">
             <h2 className="text-4xl md:text-6xl font-serif mb-6">HOPE <br/> CONNECTS<span className="text-gold">.</span></h2>
             <p className="text-gray-500 max-w-xs font-light">
               Exclusief vastgoed & renovatiecoördinatie met een focus op West-Vlaanderen.
             </p>
          </div>
          
          <div className="flex space-x-12">
            <div className="flex flex-col space-y-4">
              <span className="text-gold text-xs uppercase tracking-widest mb-2">Menu</span>
              <a href="#diensten" className="text-gray-400 hover:text-white transition-colors">Diensten</a>
              <a href="#projecten" className="text-gray-400 hover:text-white transition-colors">Portfolio</a>
              <a href="#over-ons" className="text-gray-400 hover:text-white transition-colors">Over ons</a>
            </div>
            <div className="flex flex-col space-y-4">
              <span className="text-gold text-xs uppercase tracking-widest mb-2">Socials</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><Instagram size={16}/> Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><Linkedin size={16}/> LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><Facebook size={16}/> Facebook</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} Hope Connects.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-400">Privacy</a>
            <a href="#" className="hover:text-gray-400">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;