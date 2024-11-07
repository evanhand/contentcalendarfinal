import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateHookTemplates(type: string, videoIdea: string) {
  try {
    const prompt = `Generate 8 unique, highly conversational social media hooks for a video about "${videoIdea}". 

Style guide:
- Write like you're texting a friend - casual and exciting
- Use strategic CAPS for emphasis (but don't overdo it)
- End with ellipsis (...) to create curiosity
- Make them personal and emotional
- Keep length between 60-100 characters
- Focus on the "you won't believe this" factor
- Don't directly repeat the topic - use context and related concepts
- Create intrigue without giving away the full story

For example, if the topic is "morning routine", instead of saying:
BAD: "You won't BELIEVE my morning routine..."
GOOD: "What I discovered at 5AM changed everything..."

Or if the topic is "weight loss tips":
BAD: "These weight loss tips are INSANE..."
GOOD: "I tried this for 30 days and lost my mind..."

Generate 8 unique hooks that match this conversational style, focusing on ${type} content. Make each hook distinctly different from the others. Be creative and contextual rather than literal. Always end with ellipsis (...) and nothing after it.

Remember:
- Create mystery and intrigue
- Don't reveal the exact topic
- Use emotional triggers
- Make it personal
- Keep it conversational`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.9,
      max_tokens: 500
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error("No response from OpenAI");

    // Split response into individual hooks and clean them up
    const hooks = response.split('\n')
      .map(line => line.replace(/^-\s*/, '').trim()) // Remove bullet points
      .map(line => line.replace(/^["']|["']$/g, '').trim()) // Remove quotes
      .filter(hook => 
        hook.length > 0 && 
        hook !== '' && 
        !hook.includes('POSITIVE HOOKS:') && 
        !hook.includes('NEGATIVE HOOKS:') &&
        !hook.includes('Here are') &&
        !hook.startsWith('Generate')
      )
      .map(hook => {
        // Ensure hook ends with ... and nothing after
        const cleaned = hook.replace(/\.{3,}.*$/, '...');
        return cleaned.endsWith('...') ? cleaned : `${cleaned}...`;
      })
      .slice(0, 8);

    // Calculate virality scores
    return hooks.map(text => ({
      type,
      text,
      score: calculateViralityScore(text)
    }));

  } catch (error) {
    console.error('Error generating hooks:', error);
    throw error;
  }
}

function calculateViralityScore(hook: string): number {
  let score = 0.7; // Base score

  // Curiosity triggers
  if (hook.includes('secret') || hook.includes('discover')) score += 0.05;
  if (hook.includes('truth') || hook.includes('real')) score += 0.05;
  if (hook.includes('nobody') || hook.includes('everyone')) score += 0.05;
  if (hook.includes('...')) score += 0.05;
  
  // Personal elements
  if (hook.toLowerCase().includes('i just') || hook.toLowerCase().includes('i found')) score += 0.05;
  if (hook.toLowerCase().includes('i can\'t believe') || hook.toLowerCase().includes('i\'m about to')) score += 0.05;
  
  // Emotional triggers
  if (hook.includes('wrong') || hook.includes('mistake')) score += 0.05;
  if (hook.includes('never') || hook.includes('always')) score += 0.05;
  if (hook.includes('hate') || hook.includes('love')) score += 0.05;
  
  // Urgency/importance
  if (hook.includes('need to') || hook.includes('have to')) score += 0.05;
  if (hook.includes('immediately') || hook.includes('right now')) score += 0.05;
  
  // Emphasis scoring
  if (hook.match(/[A-Z]{2,}/)) score += 0.05; // Has CAPS for emphasis
  
  // Length optimization (prefer shorter hooks)
  if (hook.length < 80) score += 0.05;

  return Math.min(score, 1);
}