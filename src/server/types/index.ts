export interface VideoContentAnalysis {
  scriptAnalysis: {
    pacing: {
      score: number;
      wordCount: number;
      estimatedDuration: number;
      suggestions: string[];
    };
    hooks: {
      score: number;
      identifiedHooks: string[];
      suggestions: string[];
    };
    structure: {
      score: number;
      sections: string[];
      suggestions: string[];
    };
  };
  engagement: {
    score: number;
    strengths: string[];
    improvements: string[];
    retentionTips: string[];
  };
  hooks: {
    score: number;
    identifiedHooks: string[];
    suggestions: string[];
  };
  timestamp: string;
}