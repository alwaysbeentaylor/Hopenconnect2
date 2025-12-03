export interface UserProfile {
  name: string;
  email: string;
  budgetRange: string;
  focusRegion: string;
  experience: 'beginner' | 'intermediate' | 'expert';
}

export interface GuideChapter {
  title: string;
  content: string;
  keyTakeaway: string;
}

export interface RealEstateGuide {
  title: string;
  introduction: string;
  chapters: GuideChapter[];
  conclusion: string;
}

export enum AppState {
  LANDING = 'LANDING',
  FORM = 'FORM',
  GENERATING = 'GENERATING',
  READY = 'READY'
}