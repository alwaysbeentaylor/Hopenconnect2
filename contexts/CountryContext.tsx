import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Country } from '../types';

interface CountryContextType {
  country: Country;
  setCountry: (country: Country) => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

const STORAGE_KEY = 'hope-connects-country';

export const CountryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [country, setCountryState] = useState<Country>(() => {
    // Try to get from localStorage, default to BELGIUM
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === Country.NETHERLANDS || stored === Country.BELGIUM) {
        return stored as Country;
      }
    }
    return Country.BELGIUM;
  });

  const setCountry = (newCountry: Country) => {
    setCountryState(newCountry);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newCountry);
    }
  };

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = (): CountryContextType => {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};

