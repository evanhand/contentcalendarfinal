import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { ContentTemplate, FormData } from '../types';

interface ContentFormProps {
  onGenerate: (content: ContentTemplate) => void;
}

export function ContentForm({ onGenerate }: ContentFormProps) {
  const [formData, setFormData] = useState<FormData>({
    niche: '',
    targetAudience: '',
    contentGoals: '',
    brandVoice: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated API call
    setTimeout(() => {
      const mockContent: ContentTemplate = {
        niche: formData.niche,
        targetAudience: formData.targetAudience,
        weeks: [
          {
            weekNumber: 1,
            days: [
              {
                day: 'Monday',
                contentType: 'Educational',
                topic: 'Introduction to ' + formData.niche,
                keyPoints: ['Key benefit 1', 'Key benefit 2'],
                hashtags: ['#content', '#marketing'],
                notes: 'Focus on value delivery'
              }
            ]
          }
        ]
      };

      onGenerate(mockContent);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-200">
          What's your niche?
        </label>
        <input
          type="text"
          value={formData.niche}
          onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">
          Who's your target audience?
        </label>
        <input
          type="text"
          value={formData.targetAudience}
          onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Calendar'
        )}
      </button>
    </form>
  );
}