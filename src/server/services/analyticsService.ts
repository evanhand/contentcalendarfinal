import { ContentAnalysis } from '../types';

interface SentimentScore {
  score: number;
  label: 'positive' | 'neutral' | 'negative';
}

interface ReadabilityScore {
  score: number;
  level: 'elementary' | 'intermediate' | 'advanced';
  readingTime: number;
}

interface EngagementPrediction {
  score: number;
  factors: string[];
  suggestions: string[];
}

interface SEOAnalysis {
  score: number;
  keywords: { word: string; frequency: number }[];
  suggestions: string[];
}

interface ContentQuality {
  score: number;
  strengths: string[];
  improvements: string[];
}

export async function analyzeContentPerformance(content: string): Promise<ContentAnalysis> {
  // Analyze sentiment
  const sentiment = analyzeSentiment(content);
  
  // Calculate readability
  const readability = calculateReadability(content);
  
  // Predict engagement
  const engagement = predictEngagement(content);
  
  // Analyze SEO potential
  const seo = analyzeSEO(content);
  
  // Evaluate content quality
  const quality = evaluateQuality(content);

  return {
    sentiment,
    readability,
    engagement,
    seo,
    quality,
    timestamp: new Date().toISOString()
  };
}

function analyzeSentiment(text: string): SentimentScore {
  // Simple sentiment analysis based on positive/negative word lists
  const positiveWords = new Set([
    'good', 'great', 'awesome', 'excellent', 'happy',
    'best', 'love', 'perfect', 'wonderful', 'amazing'
  ]);
  
  const negativeWords = new Set([
    'bad', 'poor', 'terrible', 'awful', 'horrible',
    'worst', 'hate', 'disappointing', 'negative', 'wrong'
  ]);

  const words = text.toLowerCase().split(/\W+/);
  let score = 0;
  
  words.forEach(word => {
    if (positiveWords.has(word)) score += 1;
    if (negativeWords.has(word)) score -= 1;
  });

  const normalizedScore = Math.tanh(score / 10); // Convert to range [-1, 1]

  return {
    score: normalizedScore,
    label: normalizedScore > 0.2 ? 'positive' : 
           normalizedScore < -0.2 ? 'negative' : 'neutral'
  };
}

function calculateReadability(text: string): ReadabilityScore {
  // Simplified Flesch-Kincaid readability calculation
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const words = text.split(/\s+/).filter(Boolean);
  const syllables = countSyllables(text);

  const averageWordsPerSentence = words.length / sentences.length;
  const averageSyllablesPerWord = syllables / words.length;
  
  // Flesch-Kincaid Grade Level formula
  const grade = 0.39 * averageWordsPerSentence + 11.8 * averageSyllablesPerWord - 15.59;
  
  // Calculate reading time (average adult reads 238 words per minute)
  const readingTime = Math.ceil(words.length / 238);

  return {
    score: Math.min(Math.max(grade, 0), 12), // Clamp between 0-12
    level: grade < 6 ? 'elementary' : 
           grade < 10 ? 'intermediate' : 'advanced',
    readingTime
  };
}

function predictEngagement(text: string): EngagementPrediction {
  const factors: string[] = [];
  const suggestions: string[] = [];
  let score = 0.5; // Base score

  // Check content length
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length < 100) {
    suggestions.push('Consider adding more content for better engagement');
  } else if (words.length > 300) {
    factors.push('Good content length for detailed explanation');
    score += 0.1;
  }

  // Check for questions (engagement triggers)
  const questions = (text.match(/\?/g) || []).length;
  if (questions > 0) {
    factors.push('Uses questions to engage readers');
    score += 0.1;
  } else {
    suggestions.push('Add questions to increase reader engagement');
  }

  // Check for call-to-actions
  const ctaWords = ['click', 'subscribe', 'follow', 'share', 'comment', 'like'];
  const hasCTA = ctaWords.some(word => text.toLowerCase().includes(word));
  if (hasCTA) {
    factors.push('Includes clear call-to-action');
    score += 0.1;
  } else {
    suggestions.push('Add a clear call-to-action');
  }

  // Check for formatting variety
  const hasFormatting = /[*_#]/.test(text) || text.includes('\n\n');
  if (hasFormatting) {
    factors.push('Uses varied formatting for better readability');
    score += 0.1;
  } else {
    suggestions.push('Use formatting to break up content');
  }

  return {
    score: Math.min(score, 1), // Normalize to 0-1
    factors,
    suggestions
  };
}

function analyzeSEO(text: string): SEOAnalysis {
  const words = text.toLowerCase().split(/\W+/).filter(Boolean);
  const stopWords = new Set(['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'a', 'an']);
  
  // Count keyword frequency
  const wordFrequency: Record<string, number> = {};
  words.forEach(word => {
    if (!stopWords.has(word) && word.length > 2) {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }
  });

  // Sort keywords by frequency
  const keywords = Object.entries(wordFrequency)
    .map(([word, frequency]) => ({ word, frequency }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 5);

  const suggestions: string[] = [];
  let score = 0.5;

  // Analyze keyword density
  const totalWords = words.length;
  keywords.forEach(({ word, frequency }) => {
    const density = frequency / totalWords;
    if (density > 0.03) {
      suggestions.push(`Consider reducing the frequency of "${word}"`);
    } else if (density > 0.01) {
      score += 0.1;
    }
  });

  // Check content length
  if (totalWords < 300) {
    suggestions.push('Add more content to improve SEO value');
  } else {
    score += 0.2;
  }

  return {
    score: Math.min(score, 1),
    keywords,
    suggestions
  };
}

function evaluateQuality(text: string): ContentQuality {
  const strengths: string[] = [];
  const improvements: string[] = [];
  let score = 0.5;

  // Check content length
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length > 200) {
    strengths.push('Comprehensive content length');
    score += 0.1;
  } else {
    improvements.push('Consider expanding the content');
  }

  // Check paragraph structure
  const paragraphs = text.split('\n\n').filter(Boolean);
  if (paragraphs.length > 1) {
    strengths.push('Good content structure with multiple paragraphs');
    score += 0.1;
  } else {
    improvements.push('Break content into smaller paragraphs');
  }

  // Check for variety in sentence length
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const sentenceLengths = sentences.map(s => s.split(/\s+/).length);
  const hasVariety = Math.max(...sentenceLengths) - Math.min(...sentenceLengths) > 5;
  
  if (hasVariety) {
    strengths.push('Good variety in sentence length');
    score += 0.1;
  } else {
    improvements.push('Vary sentence length for better flow');
  }

  // Check for active voice (simple heuristic)
  const passiveIndicators = ['was', 'were', 'been', 'being', 'is', 'are'];
  const passiveCount = passiveIndicators.reduce((count, word) => 
    count + (text.toLowerCase().match(new RegExp(`\\b${word}\\b`, 'g')) || []).length, 0
  );
  
  if (passiveCount / sentences.length < 0.3) {
    strengths.push('Primarily uses active voice');
    score += 0.1;
  } else {
    improvements.push('Consider using more active voice');
  }

  return {
    score: Math.min(score, 1),
    strengths,
    improvements
  };
}

function countSyllables(text: string): number {
  const words = text.toLowerCase().split(/\s+/);
  return words.reduce((count, word) => {
    // Simple syllable counting heuristic
    return count + word
      .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
      .match(/[aeiouy]{1,2}/g)?.length || 1;
  }, 0);
}