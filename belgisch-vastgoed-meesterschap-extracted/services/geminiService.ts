import { GoogleGenAI, Type } from "@google/genai";
import { RealEstateGuide, UserProfile } from "../types";

// Initialize Gemini
// NOTE: We assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGuide = async (user: UserProfile): Promise<RealEstateGuide> => {
  const modelId = "gemini-2.5-flash"; // Supports thinking config

  const prompt = `
    Je bent een Belgische vastgoedexpert van wereldklasse. Schrijf een exclusieve, zeer waardevolle gids voor een investeerder genaamd ${user.name}.
    De gebruiker heeft een budget van ${user.budgetRange}, interesse in regio ${user.focusRegion} en ervaring niveau: ${user.experience}.

    De gids MOET de volgende 7 geheimen bevatten, maar specifiek toegespitst op de situatie van de gebruiker:
    1. Locatiekeuze: Analyseer waarom ${user.focusRegion} (of alternatieven) goed zijn voor 2025.
    2. Onderhandeling: Hoe bespaar je 10-15% op de vraagprijs in de huidige Belgische markt.
    3. De #1 Fout: Wat 90% van de kopers fout doet (emotie vs data).
    4. Financiering: Slimme hefboomtechnieken in België (bulletkrediet, vennootschap vs privé).
    5. Renovatie ROI: Welke verbouwingen de meeste waarde toevoegen.
    6. Huurdersselectie: Hoe je 'nachtmerrie-huurders' vermijdt.
    7. Exit Strategie: Wanneer en hoe te verkopen voor maximale winst.

    De toon moet professioneel, overtuigend en "insider" zijn. Geen generieke chat-GPT taal, maar diepgaande 'Ultrathink' analyse.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        // Ultrathink configuration
        thinkingConfig: {
            thinkingBudget: 4096, // Allow deeper reasoning for high quality content
        },
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
                  content: { type: Type.STRING, description: "Detailed paragraph content, around 150 words per chapter." },
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
    // Fallback in case of serious error to prevent app crash
    return {
        title: "De 7 Geheimen van Vastgoedsucces",
        introduction: "Er is een fout opgetreden bij het genereren van uw persoonlijke gids. Probeer het later opnieuw.",
        chapters: [],
        conclusion: ""
    };
  }
};