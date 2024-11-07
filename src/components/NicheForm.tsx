import React from 'react';
import { HelpCircle, Loader2 } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface NicheFormProps {
  niche: string;
  description: string;
  targetAudience: string;
  contentGoals: string;
  uniqueValue: string;
  onNicheChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onTargetAudienceChange: (value: string) => void;
  onContentGoalsChange: (value: string) => void;
  onUniqueValueChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isGenerating: boolean;
  isDisabled?: boolean;
}

export function NicheForm({
  niche,
  description,
  targetAudience,
  contentGoals,
  uniqueValue,
  onNicheChange,
  onDescriptionChange,
  onTargetAudienceChange,
  onContentGoalsChange,
  onUniqueValueChange,
  onSubmit,
  isGenerating,
  isDisabled
}: NicheFormProps) {
  return (
    <form 
      onSubmit={onSubmit}
      className="max-w-2xl mx-auto backdrop-blur-sm rounded-lg p-8 mb-16 animate-scale-in transition-all duration-300 hover:shadow-[0_0_25px_rgba(186,252,99,0.3)]"
      style={{ 
        background: 'rgba(14, 3, 20, 0.8)',
        boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.2)'
      }}
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <label htmlFor="niche" className="block text-2xl font-medium text-white">
              What's your niche?
            </label>
            <Tooltip content="The specific market or area your content focuses on">
              <HelpCircle className="h-5 w-5 text-gray-300 hover:text-[#bafc63] transition-colors cursor-help" />
            </Tooltip>
          </div>
          <input
            type="text"
            id="niche"
            className="w-full px-4 py-3 rounded-md text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 hover:border-[#bafc63]/50 focus:ring-[#bafc63]"
            style={{ 
              background: 'rgba(14, 3, 20, 0.9)',
              borderColor: 'rgba(186, 252, 99, 0.3)',
              boxShadow: '0 0 10px rgba(186, 252, 99, 0.1)'
            }}
            placeholder="e.g., Fitness, Technology, Fashion"
            value={niche}
            onChange={(e) => onNicheChange(e.target.value)}
            disabled={isGenerating || isDisabled}
            required
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <label htmlFor="description" className="block text-lg font-medium text-white">
              Briefly explain what you do
            </label>
            <Tooltip content="A short description of your business or content focus">
              <HelpCircle className="h-5 w-5 text-gray-300 hover:text-[#bafc63] transition-colors cursor-help" />
            </Tooltip>
          </div>
          <textarea
            id="description"
            rows={3}
            className="w-full px-4 py-3 rounded-md text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 hover:border-[#bafc63]/50 focus:ring-[#bafc63]"
            style={{ 
              background: 'rgba(14, 3, 20, 0.9)',
              borderColor: 'rgba(186, 252, 99, 0.3)',
              boxShadow: '0 0 10px rgba(186, 252, 99, 0.1)'
            }}
            placeholder="e.g., I'm a fitness coach helping busy professionals build sustainable workout routines"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            disabled={isGenerating || isDisabled}
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <label htmlFor="targetAudience" className="block text-lg font-medium text-white">
              Who's your ideal audience?
            </label>
            <Tooltip content="The specific group of people you want to reach with your content">
              <HelpCircle className="h-5 w-5 text-gray-300 hover:text-[#bafc63] transition-colors cursor-help" />
            </Tooltip>
          </div>
          <textarea
            id="targetAudience"
            rows={2}
            className="w-full px-4 py-3 rounded-md text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 hover:border-[#bafc63]/50 focus:ring-[#bafc63]"
            style={{ 
              background: 'rgba(14, 3, 20, 0.9)',
              borderColor: 'rgba(186, 252, 99, 0.3)',
              boxShadow: '0 0 10px rgba(186, 252, 99, 0.1)'
            }}
            placeholder="e.g., 25-45 year old professionals who want to get fit but struggle with time management"
            value={targetAudience}
            onChange={(e) => onTargetAudienceChange(e.target.value)}
            disabled={isGenerating || isDisabled}
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <label htmlFor="contentGoals" className="block text-lg font-medium text-white">
              What are your content goals?
            </label>
            <Tooltip content="What you want to achieve with your content strategy">
              <HelpCircle className="h-5 w-5 text-gray-300 hover:text-[#bafc63] transition-colors cursor-help" />
            </Tooltip>
          </div>
          <textarea
            id="contentGoals"
            rows={2}
            className="w-full px-4 py-3 rounded-md text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 hover:border-[#bafc63]/50 focus:ring-[#bafc63]"
            style={{ 
              background: 'rgba(14, 3, 20, 0.9)',
              borderColor: 'rgba(186, 252, 99, 0.3)',
              boxShadow: '0 0 10px rgba(186, 252, 99, 0.1)'
            }}
            placeholder="e.g., Build authority, generate leads, increase brand awareness"
            value={contentGoals}
            onChange={(e) => onContentGoalsChange(e.target.value)}
            disabled={isGenerating || isDisabled}
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <label htmlFor="uniqueValue" className="block text-lg font-medium text-white">
              What makes your approach unique?
            </label>
            <Tooltip content="Your unique selling proposition or special approach">
              <HelpCircle className="h-5 w-5 text-gray-300 hover:text-[#bafc63] transition-colors cursor-help" />
            </Tooltip>
          </div>
          <textarea
            id="uniqueValue"
            rows={2}
            className="w-full px-4 py-3 rounded-md text-white text-lg placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 hover:border-[#bafc63]/50 focus:ring-[#bafc63]"
            style={{ 
              background: 'rgba(14, 3, 20, 0.9)',
              borderColor: 'rgba(186, 252, 99, 0.3)',
              boxShadow: '0 0 10px rgba(186, 252, 99, 0.1)'
            }}
            placeholder="e.g., I combine traditional fitness with mindfulness practices"
            value={uniqueValue}
            onChange={(e) => onUniqueValueChange(e.target.value)}
            disabled={isGenerating || isDisabled}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isGenerating || isDisabled}
        className="w-full mt-8 font-semibold py-3 px-4 rounded-md text-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(186,252,99,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group hover:translate-y-[-2px]"
        style={{ 
          background: '#bafc63',
          color: '#0e0314'
        }}
      >
        {isGenerating ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Generating Calendar...
          </>
        ) : isDisabled ? (
          'Generation Limit Reached'
        ) : (
          <>
            Generate Content Calendar
            <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
          </>
        )}
      </button>
    </form>
  );
}