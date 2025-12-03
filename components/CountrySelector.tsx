import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useCountry } from '../contexts/CountryContext';
import { Country } from '../types';

interface CountrySelectorProps {
  variant?: 'default' | 'mobile';
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ variant = 'default' }) => {
  const { country, setCountry } = useCountry();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const countries = [
    { value: Country.NETHERLANDS, label: 'Nederland', flag: '🇳🇱' },
    { value: Country.BELGIUM, label: 'België', flag: '🇧🇪' }
  ];

  const currentCountry = countries.find(c => c.value === country) || countries[0];

  const handleSelect = (selectedCountry: Country) => {
    setCountry(selectedCountry);
    setIsOpen(false);
  };

  const isMobile = variant === 'mobile';
  const buttonClass = isMobile
    ? 'flex items-center gap-2 px-4 py-3 text-lg text-offwhite hover:text-gold transition-colors'
    : 'flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-widest hover:text-gold transition-colors';
  
  const dropdownClass = isMobile
    ? 'absolute left-0 mt-2 w-48 bg-charcoal border border-gold/30 shadow-xl z-50'
    : 'absolute right-0 mt-2 w-48 bg-offwhite border border-gray-200 shadow-xl z-50';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClass}
      >
        <span>{currentCountry.flag}</span>
        <span className={isMobile ? '' : 'hidden sm:inline'}>{currentCountry.label}</span>
        {!isMobile && <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
      </button>

      {isOpen && (
        <div className={dropdownClass}>
          {countries.map((countryOption) => (
            <button
              key={countryOption.value}
              onClick={() => handleSelect(countryOption.value)}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                country === countryOption.value
                  ? isMobile
                    ? 'bg-gold/20 text-gold'
                    : 'bg-charcoal text-white'
                  : isMobile
                    ? 'text-offwhite hover:bg-gold/10 hover:text-gold'
                    : 'text-charcoal hover:bg-charcoal hover:text-white'
              }`}
            >
              <span className="text-xl">{countryOption.flag}</span>
              <span className="text-sm font-medium">{countryOption.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountrySelector;

