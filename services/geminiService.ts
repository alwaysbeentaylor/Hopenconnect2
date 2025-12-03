import { Country } from '../types';

// This service can be used when AI generation is needed
// For now, it provides country-specific prompts that can be used with Gemini API

export const getCountrySpecificPrompt = (country: Country, userEmail: string): string => {
  const isNetherlands = country === Country.NETHERLANDS;
  
  const countryText = isNetherlands ? 'Nederlandse' : 'Belgische';
  const marketText = isNetherlands ? 'Nederlandse' : 'Belgische';
  const financingText = isNetherlands 
    ? 'hypotheek, box 3 belasting, BV vs privé, NHG hypotheek'
    : 'bulletkrediet, vennootschap vs privé, registratierechten';
  const regionText = isNetherlands 
    ? 'Randstad, Amsterdam, Rotterdam, Utrecht of andere Nederlandse steden'
    : 'Vlaanderen, Brussel, Antwerpen, Gent of andere Belgische regio\'s';

  return `
    Je bent een ${countryText} vastgoedexpert van wereldklasse. Schrijf een exclusieve, zeer waardevolle gids voor een investeerder.
    De gebruiker heeft interesse in de ${marketText} vastgoedmarkt.

    De gids MOET de volgende 7 geheimen bevatten, specifiek toegespitst op de ${marketText} markt:
    1. Locatiekeuze: Analyseer waarom ${regionText} goed zijn voor 2025 in ${isNetherlands ? 'Nederland' : 'België'}.
    2. Onderhandeling: Hoe bespaar je 10-15% op de vraagprijs in de huidige ${marketText} markt.
    3. De #1 Fout: Wat 90% van de kopers fout doet (emotie vs data).
    4. Financiering: Slimme hefboomtechnieken in ${isNetherlands ? 'Nederland' : 'België'} (${financingText}).
    5. Renovatie ROI: Welke verbouwingen de meeste waarde toevoegen in de ${marketText} markt.
    6. Huurdersselectie: Hoe je 'nachtmerrie-huurders' vermijdt.
    7. Exit Strategie: Wanneer en hoe te verkopen voor maximale winst.

    De toon moet professioneel, overtuigend en "insider" zijn. Geen generieke chat-GPT taal, maar diepgaande analyse specifiek voor de ${marketText} vastgoedmarkt.
    Focus op praktische, actiegerichte adviezen die direct toepasbaar zijn in ${isNetherlands ? 'Nederland' : 'België'}.
  `;
};

// Placeholder for future AI integration
// When @google/genai is available, this function can be implemented
export const generateGuide = async (
  country: Country, 
  userEmail: string
): Promise<{ title: string; introduction: string }> => {
  // For now, return a country-specific fallback
  const isNetherlands = country === Country.NETHERLANDS;
  
  return {
    title: isNetherlands 
      ? 'De 7 Geheimen van Vastgoedsucces in Nederland'
      : 'De 7 Geheimen van Vastgoedsucces in België',
    introduction: isNetherlands
      ? 'Ontdek de strategieën die succesvolle vastgoedinvesteerders in Nederland gebruiken om rendement te maximaliseren en risico\'s te minimaliseren.'
      : 'Ontdek de strategieën die succesvolle vastgoedinvesteerders in België gebruiken om rendement te maximaliseren en risico\'s te minimaliseren.'
  };
};

