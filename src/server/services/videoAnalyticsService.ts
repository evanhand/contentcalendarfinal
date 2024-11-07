import { VideoContentAnalysis } from '../types';

interface ScriptAnalysis {
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
}

interface EngagementFactors {
  score: number;
  strengths: string[];
  improvements: string[];
  retentionTips: string[];
}

export function analyzeVideoContent(script: string): VideoContentAnalysis {
  const scriptAnalysis = analyzeScript(script);
  const engagement = analyzeEngagementFactors(script);
  const hooks = identifyHooks(script);
  
  return {
    scriptAnalysis,
    engagement,
    hooks,
    timestamp: new Date().toISOString()
  };
}

function analyzeScript(script: string): ScriptAnalysis {
  const words = script.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  
  // Average speaking pace is 150 words per minute
  const estimatedDuration = Math.ceil(wordCount / 150);
  
  // Analyze pacing
  const pacing = analyzePacing(script, wordCount, estimatedDuration);
  
  // Analyze hooks
  const hooks = analyzeHooks(script);
  
  // Analyze structure
  const structure = analyzeStructure(script);

  return {
    pacing,
    hooks,
    structure
  };
}

function analyzePacing(
  script: string, 
  wordCount: number, 
  duration: number
): { score: number; wordCount: number; estimatedDuration: number; suggestions: string[] } {
  const suggestions: string[] = [];
  let score = 0.5;

  // Ideal video duration for most platforms is 30-90 seconds
  if (duration < 30) {
    suggestions.push('Script might be too short for effective storytelling');
  } else if (duration > 90) {
    suggestions.push('Consider breaking into multiple videos for better retention');
  } else {
    score += 0.2;
  }

  // Check speaking pace
  const wordsPerMinute = wordCount / duration;
  if (wordsPerMinute > 180) {
    suggestions.push('Consider slowing down the pace for better clarity');
  } else if (wordsPerMinute < 120) {
    suggestions.push('Pace might be too slow to maintain engagement');
  } else {
    score += 0.2;
  }

  // Check sentence length variety
  const sentences = script.split(/[.!?]+/).filter(Boolean);
  const avgWordsPerSentence = wordCount / sentences.length;
  
  if (avgWordsPerSentence > 20) {
    suggestions.push('Break down longer sentences for better delivery');
  } else if (avgWordsPerSentence < 8) {
    suggestions.push('Mix in some longer sentences for natural flow');
  } else {
    score += 0.1;
  }

  return {
    score: Math.min(score, 1),
    wordCount,
    estimatedDuration: duration,
    suggestions
  };
}

function analyzeHooks(script: string): { score: number; identifiedHooks: string[]; suggestions: string[] } {
  const firstThreeLines = script.split('\n').slice(0, 3).join(' ');
  const identifiedHooks: string[] = [];
  const suggestions: string[] = [];
  let score = 0.3;

  // Check for hook patterns
  const hookPatterns = [
    {
      pattern: /(?:want|wondering|curious) (?:to|about) (?:know|learn|see|find out)/i,
      type: 'Curiosity Hook'
    },
    {
      pattern: /(?:never|ever|always|everyone|nobody) (?:thought|believed|imagined|knew)/i,
      type: 'Pattern Interrupt Hook'
    },
    {
      pattern: /(?:here's|this is) (?:why|how|what)/i,
      type: 'Value Hook'
    },
    {
      pattern: /(?:secret|hidden|unknown|surprising|shocking)/i,
      type: 'Mystery Hook'
    },
    {
      pattern: /(?:changed|transformed|improved) (?:my|their|the)/i,
      type: 'Story Hook'
    }
  ];

  hookPatterns.forEach(({ pattern, type }) => {
    if (pattern.test(firstThreeLines)) {
      identifiedHooks.push(type);
      score += 0.1;
    }
  });

  // Check for immediate value proposition
  if (!/(?:learn|discover|find out|see|watch)/i.test(firstThreeLines)) {
    suggestions.push('Add a clear value proposition in the first line');
  } else {
    score += 0.1;
  }

  // Check for emotional triggers
  const emotionalTriggers = /(?:love|hate|fear|dream|struggle|success|fail)/i;
  if (!emotionalTriggers.test(firstThreeLines)) {
    suggestions.push('Consider adding emotional triggers in the hook');
  } else {
    score += 0.1;
  }

  if (identifiedHooks.length === 0) {
    suggestions.push('Add a strong hook in the first 3 seconds');
    suggestions.push('Use curiosity, value, or pattern interrupt hooks');
  }

  return {
    score: Math.min(score, 1),
    identifiedHooks,
    suggestions
  };
}

function analyzeStructure(script: string): { score: number; sections: string[]; suggestions: string[] } {
  const sections: string[] = [];
  const suggestions: string[] = [];
  let score = 0.5;

  // Split into paragraphs
  const paragraphs = script.split('\n\n').filter(Boolean);

  // Identify common video structure elements
  const hasIntro = /(?:hey|hi|welcome|what's up)/i.test(paragraphs[0]);
  const hasMainContent = paragraphs.length > 2;
  const hasCallToAction = /(?:follow|subscribe|like|comment|share)/i.test(paragraphs[paragraphs.length - 1]);

  if (hasIntro) {
    sections.push('Hook/Intro');
    score += 0.1;
  } else {
    suggestions.push('Add a brief, engaging introduction');
  }

  if (hasMainContent) {
    sections.push('Main Content');
    score += 0.2;
  }

  if (hasCallToAction) {
    sections.push('Call-to-Action');
    score += 0.2;
  } else {
    suggestions.push('End with a clear call-to-action');
  }

  // Check for transitions
  const transitions = script.match(/(?:now|next|then|finally|but|however)/gi) || [];
  if (transitions.length < 2) {
    suggestions.push('Add more transitions between key points');
  }

  return {
    score: Math.min(score, 1),
    sections,
    suggestions
  };
}

function analyzeEngagementFactors(script: string): EngagementFactors {
  const strengths: string[] = [];
  const improvements: string[] = [];
  const retentionTips: string[] = [];
  let score = 0.5;

  // Check for pattern interrupts
  const patternInterrupts = script.match(/(?:but wait|here's the thing|plot twist|surprisingly|imagine|fun fact)/gi) || [];
  if (patternInterrupts.length > 0) {
    strengths.push(`Uses ${patternInterrupts.length} pattern interrupts`);
    score += 0.1;
  } else {
    improvements.push('Add pattern interrupts to maintain attention');
  }

  // Check for audience engagement
  const engagementPrompts = script.match(/(?:let me know|what do you think|comment below|share your)/gi) || [];
  if (engagementPrompts.length > 0) {
    strengths.push('Includes audience engagement prompts');
    score += 0.1;
  } else {
    improvements.push('Add questions or prompts for audience interaction');
  }

  // Check for storytelling elements
  const storyElements = /(?:when I|I remember|recently|the other day|my experience)/i.test(script);
  if (storyElements) {
    strengths.push('Uses personal storytelling');
    score += 0.1;
  } else {
    improvements.push('Include personal stories or examples');
  }

  // Retention strategies
  retentionTips.push('Add text overlays for key points');
  retentionTips.push('Use visual transitions between sections');
  retentionTips.push('Include B-roll footage for visual interest');
  retentionTips.push('Add background music to set the tone');

  return {
    score: Math.min(score, 1),
    strengths,
    improvements,
    retentionTips
  };
}