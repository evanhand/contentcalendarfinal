import { ContentWeek, ContentDay } from '../types';

export function parseAIResponse(response: string): ContentWeek[] {
  try {
    // First clean up the response to ensure consistent formatting
    const cleanedResponse = response
      .replace(/\r\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    // Split into weeks, handling both "Week X" and numeric-only formats
    const weekSections = cleanedResponse.split(/(?:Week\s*\d+|Week\s*[\[\(]?\d+[\]\)]?)[:\s]*/i)
      .filter(section => section.trim().length > 0);
    
    if (weekSections.length === 0) {
      throw new Error('Could not identify weekly sections in the response');
    }
    
    return weekSections.map((weekContent, weekIndex) => ({
      weekNumber: weekIndex + 1,
      days: extractDays(weekContent)
    }));
  } catch (error) {
    console.error('Parse error:', error);
    throw new Error('Failed to parse AI response into content calendar');
  }
}

function extractDays(weekContent: string): ContentDay[] {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const extractedDays: ContentDay[] = [];

  // Split content by day headers first
  const dayBlocks = weekContent.split(/(?=\b(?:Monday|Tuesday|Wednesday|Thursday|Friday)\b)/i);

  dayBlocks.forEach(block => {
    // Find which day this block belongs to
    const dayMatch = block.match(/\b(Monday|Tuesday|Wednesday|Thursday|Friday)\b/i);
    if (dayMatch) {
      const day = dayMatch[1];
      const content = block.substring(dayMatch[0].length).trim();
      if (content) {
        extractedDays.push(createContentDay(day, content));
      }
    }
  });

  // If no days were extracted, create default content for each day
  if (extractedDays.length === 0) {
    return days.map(day => createDefaultContentDay(day));
  }

  return extractedDays;
}

function createContentDay(day: string, content: string): ContentDay {
  try {
    // More flexible content extraction
    const overallIdea = extractComponent(content, ['Content Idea:', 'Overall Idea:', 'Idea:'], ['Content Type:', 'Type:', 'Talking Points:', 'Points:']) ||
                       extractFirstSubstantialLine(content);
    
    const contentType = extractComponent(content, ['Content Type:', 'Type:'], ['Talking Points:', 'Points:', 'Hooks:', 'Additional Notes:']) ||
                       'Educational Content';
    
    const talkingPoints = extractListItems(content, ['Talking Points:', 'Points:'], ['Hooks:', 'Additional Notes:']) ||
                         createDefaultTalkingPoints();
    
    const hooks = extractListItems(content, ['Hooks:'], ['Additional Notes:', 'Notes:', '$']) ||
                 createDefaultHooks();
    
    const additionalNotes = extractComponent(content, ['Additional Notes:', 'Notes:'], ['$']) ||
                           'Focus on value and engagement';

    return {
      day,
      overallIdea,
      contentType,
      talkingPoints,
      hooks,
      additionalNotes
    };
  } catch (error) {
    console.error(`Error parsing day content for ${day}:`, error);
    return createDefaultContentDay(day);
  }
}

function extractComponent(content: string, startMarkers: string[], endMarkers: string[]): string {
  for (const startMarker of startMarkers) {
    for (const endMarker of endMarkers) {
      const regex = new RegExp(`${startMarker}\\s*([\\s\\S]*?)(?=${endMarker}|$)`, 'i');
      const match = content.match(regex);
      if (match?.[1]?.trim()) {
        return match[1].trim();
      }
    }
  }
  return '';
}

function extractListItems(content: string, startMarkers: string[], endMarkers: string[]): string[] {
  let items: string[] = [];
  
  for (const startMarker of startMarkers) {
    const section = extractComponent(content, [startMarker], endMarkers);
    if (section) {
      items = section
        .split(/(?:^|\n)[-•*]\s*/)
        .map(item => item.trim())
        .filter(Boolean);
      
      if (items.length > 0) {
        return items;
      }
    }
  }

  // Try alternative parsing if no bullet points found
  const lines = content.split('\n')
    .map(line => line.replace(/^\d+\.\s*/, '').trim())
    .filter(Boolean);
  
  return lines.length > 0 ? lines : [];
}

function extractFirstSubstantialLine(content: string): string {
  const lines = content.split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 20); // Assume a substantial line has at least 20 chars
  
  return lines[0] || 'Create engaging content for your audience';
}

function createDefaultContentDay(day: string): ContentDay {
  return {
    day,
    overallIdea: 'Create engaging content for your audience',
    contentType: 'Educational Content',
    talkingPoints: createDefaultTalkingPoints(),
    hooks: createDefaultHooks(),
    additionalNotes: 'Focus on providing value and maintaining audience engagement'
  };
}

function createDefaultTalkingPoints(): string[] {
  return [
    'Share valuable insights with your audience',
    'Address common pain points and solutions',
    'Provide actionable tips and strategies'
  ];
}

function createDefaultHooks(): string[] {
  return [
    'Want to improve your content strategy?',
    'Here\'s what most creators miss...',
    'The secret to engaging content...'
  ];
}