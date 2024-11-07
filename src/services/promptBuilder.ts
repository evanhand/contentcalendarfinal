import { UserContext } from '../types';

export function buildContentPrompt(context: UserContext): string {
  const { niche, businessDescription, targetAudience, contentGoals, uniqueValue } = context;

  return `Generate a 2-week content calendar (10 content pieces) for a ${niche} creator.

Business Context:
${businessDescription}

Target Audience:
${targetAudience}

Content Goals:
${contentGoals || 'Build authority and engage with the target audience'}

Unique Value Proposition:
${uniqueValue || 'Provide valuable, actionable insights'}

For each weekday (Monday-Friday), structure the content as follows:

Monday
Content Idea: [Unique, specific idea - no repeats across days]
Content Type: [Type]
Talking Points:
- Point 1
- Point 2
- Point 3
Hooks: [Use these formulas]
- "Want to know the secret to [benefit]..."
- "I tried this for [timeframe] and [unexpected result]..."
- "What I discovered about [topic] changed everything..."
- "Nobody talks about this [niche] secret..."
- "The truth about [common belief] in [niche]..."
Additional Notes: [Implementation tips]

[Repeat for Tuesday through Friday]

Hook Guidelines:
- Create mystery and intrigue
- Don't reveal the exact topic
- Use emotional triggers
- Make it personal
- Keep it conversational
- End with ellipsis (...)
- Use strategic CAPS for emphasis
- Length between 60-100 characters

Focus on:
- Platform-native content optimized for social media
- Current trends in ${niche}
- Engaging hooks that stop the scroll
- Clear value proposition in each piece
- Audience engagement and interaction
- Content variety and progression
- Building authority in ${niche}
- NO REPEATED CONTENT IDEAS

Make each piece of content:
1. Immediately valuable
2. Easy to understand
3. Actionable
4. Engaging
5. Shareable`;
}