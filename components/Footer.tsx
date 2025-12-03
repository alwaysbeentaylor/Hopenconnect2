import React from 'react';
import { Instagram, Linkedin, Facebook, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-offwhite pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24">
          <div className="mb-12 md:mb-0">
             <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-none">HOPE <br/> CONNECTS<span className="text-gold">.</span></h2>
             <p className="text-gray-500 max-w-xs font-light mb-8">
               Exclusief vastgoed & renovatiecoördinatie met een focus op West-Vlaanderen.
             </p>
             <a href="#contact" className="inline-flex items-center text-sm uppercase tracking-widest text-gold hover:text-white transition-colors">
                Start uw project <ArrowRight className="ml-2 w-4 h-4" />
             </a>
          </div>
          
          <div className="flex space-x-12 md:space-x-24">
            <div className="flex flex-col space-y-4">
              <span className="text-gold text-xs uppercase tracking-widest mb-4 block">Menu</span>
              {['Diensten', 'Projecten', 'Over ons', 'Contact'].map((item) => (
                 <a 
                   key={item} 
                   href={`#${item.toLowerCase().replace(' ', '-')}`} 
                   className="text-gray-400 hover:text-gold hover:translate-x-2 transition-all duration-300 inline-block"
                 >
                   {item}
                 </a>
              ))}
            </div>
            <div className="flex flex-col space-y-4">
              <span className="text-gold text-xs uppercase tracking-widest mb-4 block">Socials</span>
              <a href="#" className="text-gray-400 hover:text-gold hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group">
                 <Instagram size={16} className="group-hover:text-white transition-colors"/> Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-gold hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group">
                 <Linkedin size={16} className="group-hover:text-white transition-colors"/> LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-gold hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group">
                 <Facebook size={16} className="group-hover:text-white transition-colors"/> Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} Hope Connects.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;