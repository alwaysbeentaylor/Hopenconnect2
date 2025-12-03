// Analytics Service - Stores tracking data in localStorage
// In production, replace with a real backend/database

export interface PageView {
  id: string;
  timestamp: string;
  page: string;
  userAgent: string;
  referrer: string;
}

export interface DownloadClick {
  id: string;
  timestamp: string;
  source: string; // e.g., 'hero', 'popup', 'footer'
}

export interface EmailSubmission {
  id: string;
  email: string;
  timestamp: string;
  source: 'contact_form' | 'exit_popup' | 'ai_guide';
  name?: string;
  phone?: string;
  projectType?: string;
  message?: string;
}

export interface AIGuideGeneration {
  id: string;
  timestamp: string;
  userName: string;
  userEmail: string;
  budget: string;
  region: string;
  experience: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatConversation {
  id: string;
  startedAt: string;
  lastMessageAt: string;
  userName: string;
  userEmail: string;
  messages: ChatMessage[];
  messageCount: number;
}

export interface AnalyticsData {
  pageViews: PageView[];
  downloadClicks: DownloadClick[];
  emailSubmissions: EmailSubmission[];
  aiGuideGenerations: AIGuideGeneration[];
  chatConversations: ChatConversation[];
}

const STORAGE_KEY = 'hopeconnects_analytics';

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get all analytics data
export const getAnalyticsData = (): AnalyticsData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading analytics data:', error);
  }
  return {
    pageViews: [],
    downloadClicks: [],
    emailSubmissions: [],
    aiGuideGenerations: [],
    chatConversations: []
  };
};

// Save analytics data
const saveAnalyticsData = (data: AnalyticsData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving analytics data:', error);
  }
};

// Track page view
export const trackPageView = (page: string = '/'): void => {
  const data = getAnalyticsData();
  const pageView: PageView = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    page,
    userAgent: navigator.userAgent,
    referrer: document.referrer || 'direct'
  };
  data.pageViews.push(pageView);
  saveAnalyticsData(data);
};

// Track download click
export const trackDownloadClick = (source: string): void => {
  const data = getAnalyticsData();
  const click: DownloadClick = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    source
  };
  data.downloadClicks.push(click);
  saveAnalyticsData(data);
};

// Track email submission
export const trackEmailSubmission = (
  email: string, 
  source: 'contact_form' | 'exit_popup' | 'ai_guide',
  additionalData?: {
    name?: string;
    phone?: string;
    projectType?: string;
    message?: string;
  }
): void => {
  const data = getAnalyticsData();
  const submission: EmailSubmission = {
    id: generateId(),
    email,
    timestamp: new Date().toISOString(),
    source,
    ...additionalData
  };
  data.emailSubmissions.push(submission);
  saveAnalyticsData(data);
};

// Track AI Guide Generation
export const trackAIGuideGeneration = (
  userName: string,
  userEmail: string,
  budget: string,
  region: string,
  experience: string
): void => {
  const data = getAnalyticsData();
  const generation: AIGuideGeneration = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    userName,
    userEmail,
    budget,
    region,
    experience
  };
  data.aiGuideGenerations = data.aiGuideGenerations || [];
  data.aiGuideGenerations.push(generation);
  saveAnalyticsData(data);
};

// Get statistics for a date range
export const getStatistics = (startDate?: Date, endDate?: Date) => {
  const data = getAnalyticsData();
  
  const filterByDate = <T extends { timestamp: string }>(items: T[]): T[] => {
    if (!startDate && !endDate) return items;
    
    return items.filter(item => {
      const itemDate = new Date(item.timestamp);
      if (startDate && itemDate < startDate) return false;
      if (endDate && itemDate > endDate) return false;
      return true;
    });
  };

  const filteredPageViews = filterByDate(data.pageViews);
  const filteredDownloadClicks = filterByDate(data.downloadClicks);
  const filteredEmailSubmissions = filterByDate(data.emailSubmissions);
  const filteredAIGuideGenerations = filterByDate(data.aiGuideGenerations || []);
  
  // Filter chat conversations by startedAt
  const filteredChatConversations = (data.chatConversations || []).filter(conv => {
    const convDate = new Date(conv.startedAt);
    if (startDate && convDate < startDate) return false;
    if (endDate && convDate > endDate) return false;
    return true;
  });

  // Get unique visitors (simplified - based on userAgent + date)
  const uniqueVisitors = new Set(
    filteredPageViews.map(pv => `${pv.userAgent}_${pv.timestamp.split('T')[0]}`)
  ).size;

  return {
    totalPageViews: filteredPageViews.length,
    uniqueVisitors,
    totalDownloadClicks: filteredDownloadClicks.length,
    totalEmailSubmissions: filteredEmailSubmissions.length,
    totalAIGuideGenerations: filteredAIGuideGenerations.length,
    totalChatConversations: filteredChatConversations.length,
    emailSubmissions: filteredEmailSubmissions,
    pageViews: filteredPageViews,
    downloadClicks: filteredDownloadClicks,
    aiGuideGenerations: filteredAIGuideGenerations,
    chatConversations: filteredChatConversations,
    // Conversion rate
    downloadConversionRate: filteredPageViews.length > 0 
      ? ((filteredDownloadClicks.length / filteredPageViews.length) * 100).toFixed(2)
      : '0.00',
    emailConversionRate: filteredPageViews.length > 0 
      ? ((filteredEmailSubmissions.length / filteredPageViews.length) * 100).toFixed(2)
      : '0.00',
    aiGuideConversionRate: filteredPageViews.length > 0 
      ? ((filteredAIGuideGenerations.length / filteredPageViews.length) * 100).toFixed(2)
      : '0.00'
  };
};

// Clear all analytics data (for testing/admin)
export const clearAnalyticsData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

// Start or get chat conversation
export const startChatConversation = (userName: string, userEmail: string): string => {
  const data = getAnalyticsData();
  data.chatConversations = data.chatConversations || [];
  
  const conversation: ChatConversation = {
    id: generateId(),
    startedAt: new Date().toISOString(),
    lastMessageAt: new Date().toISOString(),
    userName,
    userEmail,
    messages: [],
    messageCount: 0
  };
  
  data.chatConversations.push(conversation);
  saveAnalyticsData(data);
  return conversation.id;
};

// Add message to chat conversation
export const addChatMessage = (
  conversationId: string, 
  role: 'user' | 'assistant', 
  content: string
): void => {
  const data = getAnalyticsData();
  data.chatConversations = data.chatConversations || [];
  
  const conversation = data.chatConversations.find(c => c.id === conversationId);
  if (conversation) {
    conversation.messages.push({
      role,
      content,
      timestamp: new Date().toISOString()
    });
    conversation.messageCount = conversation.messages.length;
    conversation.lastMessageAt = new Date().toISOString();
    saveAnalyticsData(data);
  }
};

// Export data as CSV
export const exportToCSV = (type: 'pageViews' | 'downloadClicks' | 'emailSubmissions' | 'aiGuideGenerations' | 'chatConversations'): string => {
  const data = getAnalyticsData();
  const items = data[type] || [];
  
  if (items.length === 0) return '';

  const headers = Object.keys(items[0]).join(',');
  const rows = items.map(item => 
    Object.values(item).map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')
  );

  return [headers, ...rows].join('\n');
};

