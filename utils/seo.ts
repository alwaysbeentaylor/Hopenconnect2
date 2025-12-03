// SEO Utility - Complete SEO optimalisatie voor vastgoed leadgeneratie
// Schema.org markup, Meta tags, Open Graph, Twitter Cards

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
  };
  schema?: any;
}

// Primaire SEO Keywords voor vastgoed NL/BE
export const PRIMARY_KEYWORDS = [
  // Hoofd keywords
  'vastgoed nederland',
  'vastgoed belgië',
  'luxe vastgoed',
  'vastgoed investeren',

  // Service keywords
  'renovatie coördinatie',
  'vastgoedmakelaar',
  'vastgoed verkopen',
  'vastgoed kopen',
  'vastgoedadvies',

  // Long-tail keywords
  'vastgoed zonder makelaar',
  'exclusief vastgoed nederland',
  'premium vastgoed belgië',
  'vastgoed investering advies',
  'renovatie projectmanagement',

  // Lokaal
  'vastgoed amsterdam',
  'vastgoed brussel',
  'vastgoed antwerpen',
  'vastgoed rotterdam',
];

// Dynamische SEO configuratie per pagina
export const SEO_CONFIG = {
  home: {
    title: 'Hope Connects | Premium Vastgoed & Renovatie in Nederland & België',
    description: 'Exclusieve vastgoedbemiddeling, renovatie coördinatie en investeringsadvies in Nederland en België. Connecting Dreams to Reality. ✓ Persoonlijk advies ✓ Premium service ✓ Bewezen expertise',
    keywords: PRIMARY_KEYWORDS,
    ogImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=630&fit=crop',
    ogType: 'website',
  },
  services: {
    title: 'Vastgoed Diensten | Renovatie, Verkoop & Investeringsadvies',
    description: 'Professionele vastgoeddiensten: renovatie coördinatie, verkoopbemiddeling en investeringsadvies. Uw partner in premium vastgoed met persoonlijke begeleiding.',
    keywords: ['renovatie coördinatie', 'vastgoed verkopen', 'investeringsadvies vastgoed', ...PRIMARY_KEYWORDS],
  },
  contact: {
    title: 'Contact | Gratis Vastgoed Adviesgesprek | Hope Connects',
    description: 'Neem contact op voor een gratis adviesgesprek over uw vastgoedplannen. Persoonlijk, discreet en resultaatgericht. Bereikbaar via telefoon, WhatsApp of email.',
    keywords: ['vastgoed contact', 'gratis adviesgesprek', 'vastgoedadvies', ...PRIMARY_KEYWORDS],
  },
};

// Generate comprehensive Schema.org markup voor vastgoed
export const generateOrganizationSchema = (country: 'NL' | 'BE') => ({
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Hope Connects',
  description: 'Premium vastgoedbemiddeling, renovatie coördinatie en investeringsadvies',
  url: 'https://hopeconnects.com',
  logo: 'https://hopeconnects.com/logo.png',
  image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200',

  // Contact informatie
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: country === 'NL' ? '+31-XX-XXXXXXX' : '+32-XX-XXXXXXX',
    contactType: 'customer service',
    areaServed: country === 'NL' ? 'NL' : 'BE',
    availableLanguage: ['nl', 'en'],
    email: 'info@hopeconnects.com',
  },

  // Service areas
  areaServed: {
    '@type': 'Country',
    name: country === 'NL' ? 'Netherlands' : 'Belgium',
  },

  // Services offered
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Vastgoed Diensten',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Renovatie Coördinatie',
          description: 'Professionele coördinatie van vastgoedrenovaties van A tot Z',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Verkoopbemiddeling',
          description: 'Discreet en effectief vastgoed verkopen met premium service',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Investeringsadvies',
          description: 'Strategisch advies voor vastgoedinvesteringen',
        },
      },
    ],
  },

  // Social media profiles
  sameAs: [
    'https://www.linkedin.com/company/hopeconnects',
    'https://www.instagram.com/hopeconnects',
    'https://www.facebook.com/hopeconnects',
  ],

  // Ratings (voeg echte reviews toe later)
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '1',
  },
});

// LocalBusiness Schema voor lokale SEO
export const generateLocalBusinessSchema = (city: string, country: 'NL' | 'BE') => ({
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': `https://hopeconnects.com/#localbusiness-${city.toLowerCase()}`,
  name: `Hope Connects - ${city}`,
  description: `Premium vastgoedbemiddeling in ${city}`,

  address: {
    '@type': 'PostalAddress',
    addressLocality: city,
    addressCountry: country,
  },

  geo: {
    '@type': 'GeoCoordinates',
    // Voeg specifieke coördinaten toe per stad
  },

  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },

  priceRange: '€€€',
});

// FAQ Schema voor rijke snippets
export const generateFAQSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wat zijn de kosten van vastgoedbemiddeling?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Onze kosten zijn afhankelijk van de dienstverlening. Neem contact op voor een vrijblijvend gesprek en offerte op maat.',
      },
    },
    {
      '@type': 'Question',
      name: 'In welke regio\'s zijn jullie actief?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hope Connects is actief in heel Nederland en België, met specialisatie in premium vastgoed in grote steden zoals Amsterdam, Rotterdam, Brussel en Antwerpen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wat onderscheidt Hope Connects van andere makelaars?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wij bieden een persoonlijke, boutique-achtige aanpak met focus op premium vastgoed. Onze renovatie coördinatie en investeringsadvies gaan verder dan traditionele makelaardij.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hoelang duurt het gemiddeld om vastgoed te verkopen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'De verkooptijd varieert per object en markt, maar door onze discrete netwerken en gerichte marketing bereiken we vaak binnen 3-6 maanden een succesvolle verkoop.',
      },
    },
    {
      '@type': 'Question',
      name: 'Bieden jullie ook begeleiding bij vastgoedaankoop?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, wij begeleiden ook bij aankoop, inclusief bezichtigingen, onderhandelingen en complete begeleiding tot aan de overdracht.',
      },
    },
  ],
});

// Service Schema voor elke dienst
export const generateServiceSchema = (serviceName: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: serviceName,
  provider: {
    '@type': 'RealEstateAgent',
    name: 'Hope Connects',
  },
  description: description,
  areaServed: ['NL', 'BE'],
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: 'https://hopeconnects.com',
    servicePhone: '+31-XX-XXXXXXX',
  },
});

// BreadcrumbList Schema
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

// WebSite Schema met SearchAction
export const generateWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Hope Connects',
  url: 'https://hopeconnects.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://hopeconnects.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
});

// Helper functie om alle schemas te combineren
export const generateAllSchemas = (country: 'NL' | 'BE') => {
  return [
    generateOrganizationSchema(country),
    generateFAQSchema(),
    generateWebsiteSchema(),
  ];
};

// Meta tags generator
export const generateMetaTags = (config: SEOConfig) => {
  const tags = [
    // Basic meta tags
    { name: 'description', content: config.description },
    { name: 'keywords', content: config.keywords?.join(', ') || PRIMARY_KEYWORDS.join(', ') },

    // Open Graph
    { property: 'og:title', content: config.title },
    { property: 'og:description', content: config.description },
    { property: 'og:type', content: config.ogType || 'website' },
    { property: 'og:url', content: config.canonical || 'https://hopeconnects.com' },
    { property: 'og:image', content: config.ogImage || SEO_CONFIG.home.ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: 'nl_NL' },
    { property: 'og:site_name', content: 'Hope Connects' },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: config.title },
    { name: 'twitter:description', content: config.description },
    { name: 'twitter:image', content: config.ogImage || SEO_CONFIG.home.ogImage },

    // Additional SEO tags
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { name: 'googlebot', content: 'index, follow' },
    { name: 'author', content: 'Hope Connects' },
    { name: 'language', content: 'Dutch' },
    { name: 'revisit-after', content: '7 days' },

    // Mobile
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },

    // Geo tags voor lokale SEO
    { name: 'geo.region', content: 'NL-NH' },
    { name: 'geo.placename', content: 'Nederland' },
  ];

  return tags;
};

// Canonical URL helper
export const getCanonicalURL = (path: string = '') => {
  const baseURL = 'https://hopeconnects.com';
  return `${baseURL}${path}`;
};

// Export everything
export default {
  SEO_CONFIG,
  PRIMARY_KEYWORDS,
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateFAQSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateWebsiteSchema,
  generateAllSchemas,
  generateMetaTags,
  getCanonicalURL,
};
