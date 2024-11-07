import { useState } from 'react';

interface ScriptScore {
  score: number;
  strengths: string[];
  improvements: string[];
}

interface ScriptAnalysis {
  overall: { score: number };
  hook: ScriptScore;
  structure: ScriptScore;
  engagement: ScriptScore;
  valueProposition: ScriptScore;
}

// Simplified hook patterns focusing on attention-grabbing elements
const HOOK_PATTERNS = {
  curiosity: /(?:want|wonder|curious|secret|hidden|revealed|truth|how|why|what)/i,
  value: /(?:show|learn|discover|help|improve|better|best|top|favorite)/i,
  emotional: /(?:tired|sick|frustrated|imagine|love|hate|never|always)/i,
  story: /(?:story|happened|when|today|recently|just|finally)/i,
  problem: /(?:struggle|trouble|problem|issue|fix|solve|stop)/i
};

const CALL_TO_ACTION = {
  follow: /(?:follow|subscribe|hit that)/i,
  engage: /(?:let me know|comment below|share your)/i,
  action: /(?:try this|start today|get started|click|check out)/i
};

const ENGAGEMENT_MARKERS = {
  questions: /(?:\?|right\?|agree\?|you know what I mean)/i,
  personalLanguage: /(?:you|your|we|our|together)/i,
  enthusiasm: /(?:!|amazing|incredible|awesome|love|excited)/i,
  relatability: /(?:like you|been there|understand|know how it feels)/i
};

const VALUE_MARKERS = {
  benefits: /(?:benefit|advantage|improve|better|faster|easier|solution)/i,
  results: /(?:achieve|results|outcome|success|transform)/i,
  proof: /(?:proof|evidence|data|research|study|tested)/i,
  timeframe: /(?:minutes|hours|days|weeks|quickly|instantly)/i
};

function scoreHook(script: string): ScriptScore {
  const firstSentence = script.split(/[.!?]+/)[0].trim();
  let score = 0.3; // Base score for having any hook
  const strengths: string[] = [];
  const improvements: string[] = [];

  // Check for any hook pattern
  let hookTypes = [];
  Object.entries(HOOK_PATTERNS).forEach(([type, pattern]) => {
    if (pattern.test(firstSentence)) {
      hookTypes.push(type);
      score += 0.15; // More generous scoring per pattern
    }
  });

  // Add strengths based on hook types found
  if (hookTypes.length > 0) {
    strengths.push(`Strong ${hookTypes.join(' and ')} elements`);
  }

  // Check for attention-grabbing elements
  if (/^[A-Z][^.!?]*[!?]$/.test(firstSentence)) {
    score += 0.1;
    strengths.push('Strong opening energy');
  }

  // Check for brevity and clarity
  if (firstSentence.split(' ').length <= 15) {
    score += 0.1;
    strengths.push('Concise and clear hook');
  }

  // Only suggest improvements if score is low
  if (score < 0.6) {
    if (hookTypes.length === 0) {
      improvements.push('Add curiosity, value, or emotional elements');
    }
    if (firstSentence.split(' ').length > 15) {
      improvements.push('Consider making the hook more concise');
    }
  }

  return {
    score: Math.min(score, 1),
    strengths,
    improvements
  };
}

// Rest of the file remains unchanged...
function scoreStructure(script: string): ScriptScore {
  let score = 0;
  const strengths: string[] = [];
  const improvements: string[] = [];

  const sentences = script.split(/[.!?]+/).filter(Boolean).map(s => s.trim());
  
  // Hook
  const hasStrongHook = Object.values(HOOK_PATTERNS).some(pattern => 
    pattern.test(sentences[0])
  );
  
  if (hasStrongHook) {
    score += 0.2;
    strengths.push('Strong opening hook');
  } else {
    improvements.push('Add a stronger opening hook');
  }

  // Preview/Promise
  const hasPreview = /(?:going to|about to|show you|learn|discover)/i.test(sentences[1] || '');
  if (hasPreview) {
    score += 0.2;
    strengths.push('Clear content preview');
  } else {
    improvements.push('Add a preview of what viewers will learn');
  }

  // Transitions
  const middleSentences = sentences.slice(2, -2).join(' ');
  const hasTransitions = /(?:first|second|third|next|then|finally|most importantly|key point)/i.test(middleSentences);
  
  if (hasTransitions) {
    score += 0.2;
    strengths.push('Good use of transitions');
  } else {
    improvements.push('Add transition phrases between points');
  }

  // Call-to-Action
  const lastTwoSentences = sentences.slice(-2).join(' ');
  const hasStrongCTA = Object.values(CALL_TO_ACTION).some(pattern => 
    pattern.test(lastTwoSentences)
  );

  if (hasStrongCTA) {
    score += 0.2;
    strengths.push('Strong call-to-action');
  } else {
    improvements.push('Add a clear call-to-action');
  }

  return {
    score: Math.min(score, 1),
    strengths,
    improvements
  };
}

function scoreEngagement(script: string): ScriptScore {
  let score = 0;
  const strengths: string[] = [];
  const improvements: string[] = [];

  Object.entries(ENGAGEMENT_MARKERS).forEach(([type, pattern]) => {
    if (pattern.test(script)) {
      score += 0.25;
      strengths.push(`Good ${type.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
    } else {
      improvements.push(`Add more ${type.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
    }
  });

  return {
    score: Math.min(score, 1),
    strengths,
    improvements
  };
}

function scoreValueProposition(script: string): ScriptScore {
  let score = 0;
  const strengths: string[] = [];
  const improvements: string[] = [];

  Object.entries(VALUE_MARKERS).forEach(([type, pattern]) => {
    if (pattern.test(script)) {
      score += 0.25;
      strengths.push(`Clear ${type.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
    } else {
      improvements.push(`Add ${type.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
    }
  });

  return {
    score: Math.min(score, 1),
    strengths,
    improvements
  };
}

export function analyzeScript(script: string): ScriptAnalysis {
  const hookScore = scoreHook(script);
  const structureScore = scoreStructure(script);
  const engagementScore = scoreEngagement(script);
  const valueScore = scoreValueProposition(script);

  return {
    overall: {
      score: (hookScore.score + structureScore.score + engagementScore.score + valueScore.score) / 4
    },
    hook: hookScore,
    structure: structureScore,
    engagement: engagementScore,
    valueProposition: valueScore
  };
}