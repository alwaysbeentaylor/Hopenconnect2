import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { LeadForm } from './components/LeadForm';
import { GuideRenderer } from './components/GuideRenderer';
import { LoadingScreen } from './components/LoadingScreen';
import { AppState, RealEstateGuide, UserProfile } from './types';
import { generateGuide } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [generatedGuide, setGeneratedGuide] = useState<RealEstateGuide | null>(null);

  const handleStart = () => {
    setAppState(AppState.FORM);
  };

  const handleBackToLanding = () => {
    setAppState(AppState.LANDING);
  };

  const handleFormSubmit = async (data: UserProfile) => {
    setUserProfile(data);
    setAppState(AppState.GENERATING);
    
    // Trigger Gemini API
    const guide = await generateGuide(data);
    
    setGeneratedGuide(guide);
    setAppState(AppState.READY);
  };

  const handleReset = () => {
    setUserProfile(null);
    setGeneratedGuide(null);
    setAppState(AppState.LANDING);
  };

  return (
    <div className="antialiased text-slate-900">
      {appState === AppState.LANDING && (
        <LandingPage onStart={handleStart} />
      )}
      
      {appState === AppState.FORM && (
        <LeadForm onSubmit={handleFormSubmit} onBack={handleBackToLanding} />
      )}

      {appState === AppState.GENERATING && (
        <LoadingScreen />
      )}

      {appState === AppState.READY && userProfile && generatedGuide && (
        <GuideRenderer 
            guide={generatedGuide} 
            user={userProfile} 
            onReset={handleReset} 
        />
      )}
    </div>
  );
};

export default App;