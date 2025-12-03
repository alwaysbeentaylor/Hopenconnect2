import { GoogleGenAI, Type } from "@google/genai";
import { RealEstateGuide, UserProfile } from "../types";

// Gemini API Key
const GEMINI_API_KEY = 'AIzaSyAg7xc1-4HamoIZ2srX9Ka9Y5rQGPd5pcM';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const generateGuide = async (user: UserProfile): Promise<RealEstateGuide> => {
  const modelId = "gemini-2.0-flash"; 

  const prompt = `
    Je bent een Belgische vastgoedexpert van wereldklasse, werkzaam bij Hope Connects - een exclusief vastgoedbedrijf.
    Schrijf een exclusieve, zeer waardevolle gids voor een investeerder genaamd ${user.name}.
    
    De gebruiker heeft:
    - Budget: ${user.budgetRange}
    - Interesse in regio: ${user.focusRegion}
    - Ervaring niveau: ${user.experience}

    De gids MOET de volgende 7 geheimen bevatten, maar specifiek toegespitst op de situatie van de gebruiker:
    
    1. Locatiekeuze: Analyseer waarom ${user.focusRegion} (of alternatieven) goed zijn voor 2025.
    2. Onderhandeling: Hoe bespaar je 10-15% op de vraagprijs in de huidige Belgische markt.
    3. De #1 Fout: Wat 90% van de kopers fout doet (emotie vs data).
    4. Financiering: Slimme hefboomtechnieken in België (bulletkrediet, vennootschap vs privé).
    5. Renovatie ROI: Welke verbouwingen de meeste waarde toevoegen.
    6. Huurdersselectie: Hoe je 'nachtmerrie-huurders' vermijdt.
    7. Exit Strategie: Wanneer en hoe te verkopen voor maximale winst.

    De toon moet professioneel, overtuigend en "insider" zijn. Geen generieke taal, maar diepgaande analyse.
    Schrijf in het Nederlands (België).
    
    Elk hoofdstuk moet minimaal 150 woorden bevatten met concrete tips.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            introduction: { type: Type.STRING },
            chapters: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  content: { type: Type.STRING, description: "Detailed paragraph content, around 150-200 words per chapter." },
                  keyTakeaway: { type: Type.STRING, description: "A one sentence gold nugget summary." }
                },
                required: ["title", "content", "keyTakeaway"]
              }
            },
            conclusion: { type: Type.STRING }
          },
          required: ["title", "introduction", "chapters", "conclusion"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as RealEstateGuide;
    }
    throw new Error("Geen tekst gegenereerd door AI.");

  } catch (error) {
    console.error("Fout bij het genereren van de gids:", error);
    // Fallback in case of error
    return {
      title: "De 7 Geheimen van Vastgoedsucces in België",
      introduction: `Beste ${user.name}, welkom bij deze exclusieve gids van Hope Connects. Helaas is er een tijdelijke storing opgetreden bij het genereren van uw gepersonaliseerde inhoud. Neem contact met ons op voor een persoonlijk gesprek over uw vastgoedplannen in ${user.focusRegion}.`,
      chapters: [
        {
          title: "De Kracht van Locatie",
          content: "De locatie van uw investering bepaalt voor 80% het succes van uw rendement. In België zien we momenteel sterke groeipotentie in de kuststreek en de Vlaamse Ruit. Let op demografische trends, bereikbaarheid en toekomstige ontwikkelingsplannen.",
          keyTakeaway: "Investeer waar de vraag structureel hoger is dan het aanbod."
        },
        {
          title: "Onderhandelingstechnieken",
          content: "De beste deals worden gemaakt door geduld en data. Ken de werkelijke marktwaarde, gebruik vergelijkbare verkopen als hefboom, en wees bereid om weg te lopen. Dit kan u 10-15% besparen.",
          keyTakeaway: "Emotie is uw grootste vijand bij onderhandelingen."
        }
      ],
      conclusion: "Neem contact op met Hope Connects voor een persoonlijk adviesgesprek. Wij helpen u graag verder met uw vastgoedambities."
    };
  }
};

