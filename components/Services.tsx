import React, { useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { useCountry } from '../contexts/CountryContext';
import { getTranslations } from '../config/translations';

const services = [
  {
    id: '01',
    title: 'Renovatie Coördinatie',
    description: 'Van ruwbouw tot verfijnde afwerking. Wij nemen de leiding over aannemers, budget en timing, zodat u zorgeloos kunt toekijken hoe uw visie werkelijkheid wordt.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Professionele renovatie coördinatie - Premium vastgoedrenovatie in Nederland en België'
  },
  {
    id: '02',
    title: 'Verkoopbemiddeling',
    description: 'Een discreet en krachtig netwerk. Wij positioneren uw eigendom in de markt met oog voor detail, esthetiek en de juiste doelgroep.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Luxe vastgoed verkopen - Discrete verkoopbemiddeling exclusieve woningen'
  },
  {
    id: '03',
    title: 'Investeringsadvies',
    description: '', // Will be set dynamically
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    alt: 'Vastgoed investeringsadvies - Strategisch advies voor vastgoedportefeuille'
  }
];

const Services: React.FC = () => {
  const { country } = useCountry();
  const t = getTranslations(country);
  const [activeService, setActiveService] = useState(0);

  // Update service description with country-specific text
  const servicesWithTranslations = services.map(service => {
    if (service.id === '03') {
      return { ...service, description: t.services.investmentDescription };
    }
    return service;
  });

  return (
    <section id="diensten" className="py-24 md:py-32 bg-offwhite text-charcoal">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* List Side */}
          <div className="w-full lg:w-1/2 space-y-12">
            <div>
              <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase block mb-4">Onze Expertise</span>
              <h2 className="text-4xl md:text-5xl font-serif">Wij creëren waarde.</h2>
            </div>

            <div className="space-y-0">
              {servicesWithTranslations.map((service, index) => (
                <div 
                  key={service.id}
                  className={`border-t border-gray-300 py-8 md:py-10 cursor-pointer group transition-all duration-500 ${activeService === index ? 'opacity-100' : 'opacity-60 hover:opacity-80'}`}
                  onMouseEnter={() => setActiveService(index)}
                  onClick={() => setActiveService(index)}
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-xs font-mono text-gold mr-4">/{service.id}</span>
                    <h3 className="text-2xl md:text-3xl font-serif flex-grow transition-colors group-hover:text-gold">{service.title}</h3>
                    <ArrowDownRight className={`transform transition-transform duration-500 lg:hidden text-gold ${activeService === index ? 'rotate-0' : '-rotate-90'}`} size={20} />
                  </div>
                  
                  {/* Expanded Content */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeService === index ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                    {/* Mobile Image */}
                    <div className="lg:hidden mb-6 rounded-sm overflow-hidden h-48 w-full">
                       <img src={service.image} alt={service.alt || service.title} loading="lazy" className="w-full h-full object-cover" />
                    </div>

                    <p className="text-gray-500 font-light pl-0 md:pl-10 max-w-md leading-relaxed text-base md:text-lg">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
              <div className="border-t border-gray-300"></div>
            </div>
          </div>

          {/* Image Side (Sticky) - Desktop Only */}
          <div className="hidden lg:block w-1/2 relative h-[600px]">
            <div className="sticky top-32 w-full h-full">
              {servicesWithTranslations.map((service, index) => (
                <img
                  key={service.id}
                  src={service.image}
                  alt={service.alt || service.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out shadow-2xl ${activeService === index ? 'opacity-100 scale-100 grayscale-0' : 'opacity-0 scale-95 grayscale'}`}
                />
              ))}
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-gold z-[-1]"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;