import React, { useState } from 'react';
import { NicheForm } from './NicheForm';
import ContentPreview from './ContentPreview';
import { Features } from './Features';
import { HowItWorks } from './HowItWorks';
import { CTASection } from './CTASection';
import { FAQSection } from './FAQSection';
import { generateContentSchedule } from '../services/contentGenerator';
import { ContentTemplate } from '../types';

export function ContentCalendar() {
  const [niche, setNiche] = useState('');
  const [description, setDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [contentGoals, setContentGoals] = useState('');
  const [uniqueValue, setUniqueValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<ContentTemplate | null>(null);
  const [generationCount, setGenerationCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (generationCount >= 3) {
      return;
    }

    setIsGenerating(true);

    try {
      const content = await generateContentSchedule({
        niche,
        businessDescription: description,
        targetAudience,
        contentGoals,
        uniqueValue
      });

      setGeneratedContent(content);
      setGenerationCount(prev => prev + 1);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <Features />
      <HowItWorks />
      
      <div id="generate">
        <NicheForm
          niche={niche}
          description={description}
          targetAudience={targetAudience}
          contentGoals={contentGoals}
          uniqueValue={uniqueValue}
          onNicheChange={setNiche}
          onDescriptionChange={setDescription}
          onTargetAudienceChange={setTargetAudience}
          onContentGoalsChange={setContentGoals}
          onUniqueValueChange={setUniqueValue}
          onSubmit={handleSubmit}
          isGenerating={isGenerating}
          isDisabled={generationCount >= 3}
        />
      </div>

      {generatedContent && <ContentPreview content={generatedContent} />}
      
      <CTASection />
      <FAQSection />
    </div>
  );
}