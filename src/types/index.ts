export interface ContentDay {
  day: string;
  contentType: string;
  topic: string;
  keyPoints: string[];
  hashtags: string[];
  notes: string;
}

export interface ContentWeek {
  weekNumber: number;
  days: ContentDay[];
}

export interface ContentTemplate {
  niche: string;
  targetAudience: string;
  weeks: ContentWeek[];
}

export interface FormData {
  niche: string;
  targetAudience: string;
  contentGoals: string;
  brandVoice: string;
}