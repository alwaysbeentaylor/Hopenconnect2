import React, { useState } from 'react';
import { GuideForm } from '../components/GuideForm';
import { GuideRenderer } from '../components/GuideRenderer';
import { LoadingScreen } from '../components/LoadingScreen';
import { GuideState, RealEstateGuide, UserProfile } from '../types';
import { generateGuide } from '../services/geminiService';
import { trackEmailSubmission, trackAIGuideGeneration } from '../services/analyticsService';

const GuidePage: React.FC = () => {
  const [guideState, setGuideState] = useState<GuideState>(GuideState.FORM);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [generatedGuide, setGeneratedGuide] = useState<RealEstateGuide | null>(null);

  const handleFormSubmit = async (data: UserProfile) => {
    setUserProfile(data);
    setGuideState(GuideState.GENERATING);
    
    // Track the email submission from AI guide
    trackEmailSubmission(data.email, 'ai_guide', {
      name: data.name,
      projectType: `Budget: ${data.budgetRange}, Regio: ${data.focusRegion}, Ervaring: ${data.experience}`
    });

    // Track the AI Guide Generation
    trackAIGuideGeneration(
      data.name,
      data.email,
      data.budgetRange,
      data.focusRegion,
      data.experience
    );
    
    try {
      // Generate the guide using Gemini AI
      const guide = await generateGuide(data);
      setGeneratedGuide(guide);
      setGuideState(GuideState.READY);
    } catch (error) {
      console.error('Error generating guide:', error);
      // Still show a fallback guide
      setGeneratedGuide({
        title: "De 7 Geheimen van Vastgoedsucces",
        introduction: `Beste ${data.name}, er is een fout opgetreden bij het genereren van uw gids. Neem contact met ons op voor persoonlijk advies.`,
        chapters: [],
        conclusion: "Neem contact op met Hope Connects voor een persoonlijk adviesgesprek."
      });
      setGuideState(GuideState.READY);
    }
  };

  const handleReset = () => {
    setUserProfile(null);
    setGeneratedGuide(null);
    setGuideState(GuideState.FORM);
  };

  return (
    <>
      {guideState === GuideState.FORM && (
        <GuideForm onSubmit={handleFormSubmit} />
      )}

      {guideState === GuideState.GENERATING && (
        <LoadingScreen />
      )}

      {guideState === GuideState.READY && userProfile && generatedGuide && (
        <GuideRenderer 
          guide={generatedGuide} 
          user={userProfile} 
          onReset={handleReset} 
        />
      )}
    </>
  );
};

export default GuidePage;

