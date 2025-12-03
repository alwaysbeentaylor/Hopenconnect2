import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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

  // Text color logic: If scrolled (white bg), text is dark. If top (dark bg), text is white.
  // Exception: Mobile menu overrides this.
  const textColor = isScrolled ? 'text-charcoal' : 'text-charcoal md:text-offwhite';
  const navClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
    isScrolled ? 'bg-offwhite/90 backdrop-blur-md py-4 border-b border-gray-200' : 'bg-transparent py-8'
  }`;

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div className={`text-xl md:text-2xl font-serif tracking-widest uppercase z-50 transition-colors ${textColor}`}>
          Hope <span className="font-bold">Connects</span>
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex space-x-12 items-center ${textColor}`}>
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
          
          <a 
            href="#contact" 
            className={`border px-8 py-3 text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-gold hover:border-gold hover:text-white ${isScrolled ? 'border-charcoal text-charcoal' : 'border-offwhite text-offwhite'}`}
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-50">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className={isMobileMenuOpen ? 'text-offwhite' : 'text-charcoal'}
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;