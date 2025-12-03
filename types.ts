import React from 'react';

export enum Country {
  NETHERLANDS = 'NETHERLANDS',
  BELGIUM = 'BELGIUM'
}

export enum ProjectType {
  RENOVATION = 'Renovatie',
  SALE = 'Verkoop',
  PURCHASE = 'Aankoop',
  INVESTMENT = 'Investering',
  OTHER = 'Anders'
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  projectType: ProjectType;
  message: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ProjectItem {
  id: number;
  title: string;
  location: string;
  imageUrl: string;
  category: string;
}

export interface UserProfile {
  name: string;
  email: string;
  budgetRange?: string;
  focusRegion?: string;
  experience?: 'beginner' | 'intermediate' | 'expert';
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