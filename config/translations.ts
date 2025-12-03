import { Country } from '../types';

export interface Translations {
  hero: {
    subtitle: string;
    countryText: string;
  };
  services: {
    investmentDescription: string;
  };
  footer: {
    region: string;
  };
  usp: {
    localKnowledge: string;
  };
  portfolio: {
    projects: Array<{
      id: number;
      title: string;
      location: string;
      imageUrl: string;
      category: string;
    }>;
  };
  testimonial: {
    location: string;
  };
  contact: {
    phone: string;
  };
  exitPopup: {
    description: string;
    guideTitle: string;
  };
  metadata: {
    description: string;
  };
}

const translations: Record<Country, Translations> = {
  [Country.NETHERLANDS]: {
    hero: {
      subtitle: 'Hope Connects is uw exclusieve partner in Nederlands vastgoed. Wij overbruggen de kloof tussen visie en realisatie.',
      countryText: 'Est. 2025 — Netherlands'
    },
    services: {
      investmentDescription: 'Rendement ontmoet zekerheid. Wij analyseren de markt in de Randstad en provincies om opportuniteiten te vinden die waarde garanderen voor de volgende generatie.'
    },
    footer: {
      region: 'Exclusief vastgoed & renovatiecoördinatie met een focus op Noord-Holland en de Randstad.'
    },
    usp: {
      localKnowledge: 'Bij Hope Connects geloven we dat een woning meer is dan muren en een dak. Het is de plek waar herinneringen worden gemaakt. Onze aanpak is gebaseerd op discretie, diepgaande lokale kennis van Nederland en een compromisloos streven naar perfectie.'
    },
    portfolio: {
      projects: [
        {
          id: 1,
          title: "Villa Zeezicht",
          location: "Amsterdam",
          imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop",
          category: "Totale Renovatie"
        },
        {
          id: 2,
          title: "Residence 'The View'",
          location: "Rotterdam",
          imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "Exclusieve Verkoop"
        },
        {
          id: 3,
          title: "Maison Utrecht",
          location: "Utrecht",
          imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "Erfgoed"
        }
      ]
    },
    testimonial: {
      location: "Amsterdam"
    },
    contact: {
      phone: "+31 6 23 08 75 92"
    },
    exitPopup: {
      description: 'Ontdek de <strong>7 geheimen</strong> die succesvolle vastgoedinvesteerders in Nederland gebruiken. Van locatiekeuze tot onderhandelen — alles in één praktische gids.',
      guideTitle: 'De 7 Geheimen van Vastgoedsucces in Nederland'
    },
    metadata: {
      description: 'Hope Connects verbindt dromen met realiteit. Premium vastgoed en renovatiecoördinatie in Nederland.'
    }
  },
  [Country.BELGIUM]: {
    hero: {
      subtitle: 'Hope Connects is uw exclusieve partner in Belgisch vastgoed. Wij overbruggen de kloof tussen visie en realisatie.',
      countryText: 'Est. 2025 — Belgium'
    },
    services: {
      investmentDescription: 'Rendement ontmoet zekerheid. Wij analyseren de markt aan de kust en binnenland om opportuniteiten te vinden die waarde garanderen voor de volgende generatie.'
    },
    footer: {
      region: 'Exclusief vastgoed & renovatiecoördinatie met een focus op West-Vlaanderen.'
    },
    usp: {
      localKnowledge: 'Bij Hope Connects geloven we dat een woning meer is dan muren en een dak. Het is de plek waar herinneringen worden gemaakt. Onze aanpak is gebaseerd op discretie, diepgaande lokale kennis van West-Vlaanderen en een compromisloos streven naar perfectie.'
    },
    portfolio: {
      projects: [
        {
          id: 1,
          title: "Villa Duinenzicht",
          location: "Knokke-Heist",
          imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop",
          category: "Totale Renovatie"
        },
        {
          id: 2,
          title: "Residence 'The View'",
          location: "Oostende",
          imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "Exclusieve Verkoop"
        },
        {
          id: 3,
          title: "Maison Louise",
          location: "Brugge",
          imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          category: "Erfgoed"
        }
      ]
    },
    testimonial: {
      location: "Knokke"
    },
    contact: {
      phone: "+32 6 23 08 75 92"
    },
    exitPopup: {
      description: 'Ontdek de <strong>7 geheimen</strong> die succesvolle vastgoedinvesteerders in België gebruiken. Van locatiekeuze tot onderhandelen — alles in één praktische gids.',
      guideTitle: 'De 7 Geheimen van Vastgoedsucces in België'
    },
    metadata: {
      description: 'Hope Connects verbindt dromen met realiteit. Premium vastgoed en renovatiecoördinatie in België.'
    }
  }
};

export const getTranslations = (country: Country): Translations => {
  return translations[country];
};

