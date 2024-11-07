import OpenAI from 'openai';
import { ContentTemplate, UserContext } from '../types';
import { parseAIResponse } from './contentParser';
import { buildContentPrompt } from './promptBuilder';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateContentSchedule(context: UserContext): Promise<ContentTemplate> {
  if (!context.niche?.trim()) {
    throw new Error('Please provide your content niche');
  }

  if (!context.businessDescription?.trim()) {
    throw new Error('Please describe your business');
  }

  if (!context.targetAudience?.trim()) {
    throw new Error('Please specify your target audience');
  }

  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    throw new Error('API key not configured');
  }

  try {
    const prompt = buildContentPrompt(context);

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.9,
      max_tokens: 2000,
      presence_penalty: 0.3,
      frequency_penalty: 0.3
    }).catch(error => {
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a few moments.');
      }
      if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please check your API configuration.');
      }
      throw new Error('Failed to connect to AI service. Please try again.');
    });

    const response = completion.choices[0]?.message?.content;
    if (!response?.trim()) {
      throw new Error('Received empty response from AI service');
    }

    const weeks = parseAIResponse(response);
    if (!weeks.length) {
      throw new Error('Failed to generate content schedule');
    }

    return {
      niche: context.niche.trim(),
      targetAudience: context.targetAudience.trim(),
      businessDescription: context.businessDescription.trim(),
      weeks
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Content generation failed: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while generating content');
  }
}

export { generateCSV } from './csvGenerator';