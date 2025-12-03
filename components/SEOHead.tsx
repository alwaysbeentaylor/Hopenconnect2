import React, { useEffect } from 'react';
import { useCountry } from '../contexts/CountryContext';
import { generateAllSchemas, SEO_CONFIG, generateMetaTags, SEOConfig } from '../utils/seo';

interface SEOHeadProps {
  page?: 'home' | 'services' | 'contact';
  customConfig?: SEOConfig;
}

const SEOHead: React.FC<SEOHeadProps> = ({ page = 'home', customConfig }) => {
  const { country } = useCountry();

  useEffect(() => {
    // Get SEO config
    const config = customConfig || SEO_CONFIG[page];

    // Update document title
    document.title = config.title;

    // Remove existing meta tags that we'll replace
    const existingMetas = document.querySelectorAll(
      'meta[name="description"], meta[name="keywords"], meta[property^="og:"], meta[name^="twitter:"]'
    );
    existingMetas.forEach(meta => meta.remove());

    // Add new meta tags
    const metaTags = generateMetaTags(config);
    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      if ('name' in tag && tag.name) {
        meta.setAttribute('name', tag.name);
      } else if ('property' in tag && tag.property) {
        meta.setAttribute('property', tag.property);
      }
      if (tag.content) {
        meta.setAttribute('content', tag.content);
      }
      document.head.appendChild(meta);
    });

    // Add/Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = config.canonical || window.location.href;

    // Add/Update structured data (Schema.org)
    let structuredDataScript = document.getElementById('structured-data');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'structured-data';
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }

    const schemas = generateAllSchemas(country as 'NL' | 'BE');
    structuredDataScript.textContent = JSON.stringify(schemas);
  }, [page, customConfig, country]);

  return null; // This component doesn't render anything
};

export default SEOHead;
