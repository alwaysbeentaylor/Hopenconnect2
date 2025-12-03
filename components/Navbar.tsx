import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import CountrySelector from './CountrySelector';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Design Logic:
  // The layout is split: Left is Light (Silk), Right is Dark (Image).
  // Logo (Left) must be Dark (Charcoal).
  // Menu (Right) must be White (Offwhite) when transparent, but Dark when scrolled (white bg).
  // Mobile Menu Button is usually on the right/top, on mobile the header is bg-silk, so button is Charcoal.

  const navBackground = isScrolled 
    ? 'bg-offwhite/90 backdrop-blur-md py-4 border-b border-gray-200' 
    : 'bg-transparent py-8';

  const logoColor = 'text-charcoal'; // Always dark on the light silk background
  const menuTextColor = isScrolled ? 'text-charcoal' : 'text-white'; // White on image, dark on scroll
  const mobileButtonColor = 'text-charcoal';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${navBackground}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo - Always Charcoal because it sits on the Silk (Light) background */}
        <div className={`text-xl md:text-2xl font-serif tracking-widest uppercase z-50 transition-colors ${logoColor}`}>
          Hope <span className="font-bold">Connects</span>
        </div>

        {/* Desktop Menu - White on top (over image), Charcoal on scroll */}
        <div className={`hidden md:flex space-x-12 items-center ${menuTextColor}`}>
          {['Diensten', 'Over ons', 'Projecten'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`} 
              className="text-xs uppercase tracking-[0.2em] hover:text-gold transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          
          <CountrySelector />
          
          <a 
            href="#contact" 
            className={`border px-8 py-3 text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-gold hover:border-gold hover:text-white ${isScrolled ? 'border-charcoal text-charcoal' : 'border-white text-white'}`}
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button - Charcoal to contrast with Silk background */}
        <div className="md:hidden z-50">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className={isMobileMenuOpen ? 'text-offwhite' : mobileButtonColor}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-charcoal z-40 flex flex-col justify-center items-center space-y-8">
          {['Diensten', 'Over ons', 'Projecten', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-3xl font-serif text-offwhite hover:text-gold transition-colors"
            >
              {item}
            </a>
          ))}
          <div className="pt-8">
            <CountrySelector variant="mobile" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;