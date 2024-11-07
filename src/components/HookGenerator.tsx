import React, { useState } from 'react';
import { Sparkles, Copy, RefreshCw, Loader2, Video, Layout, BarChart2 } from 'lucide-react';
import { generateHookTemplates } from '../services/hookTemplates';
import { Hook } from '../types';

export function HookGenerator() {
  const [topic, setTopic] = useState('');
  const [selectedType, setSelectedType] = useState('trending');
  const [hooks, setHooks] = useState<Hook[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const contentTypes = [
    { id: 'trending', label: 'Trending', emoji: '🔥', description: 'Viral trends and current events' },
    { id: 'value', label: 'Value', emoji: '💡', description: 'Tips and tutorials' },
    { id: 'hot-take', label: 'Hot Take', emoji: '🌶️', description: 'Controversial opinions' },
    { id: 'story', label: 'Story', emoji: '📖', description: 'Personal experiences' },
    { id: 'myth', label: 'Myth-Bust', emoji: '🔍', description: 'Debunk common beliefs' }
  ];

  const getViralityText = (score: number, index: number): string => {
    const adjustedScore = score * (1 - (index * 0.1));
    
    if (adjustedScore >= 0.9) return "Extremely High Viral Potential";
    if (adjustedScore >= 0.8) return "Very High Viral Potential";
    if (adjustedScore >= 0.7) return "High Viral Potential";
    if (adjustedScore >= 0.6) return "Good Viral Potential";
    if (adjustedScore >= 0.5) return "Moderate Viral Potential";
    return "Average Viral Potential";
  };

  const generateHooks = async () => {
    if (!topic) return;

    setHooks([]);
    setIsGenerating(true);
    setError(null);

    try {
      const generatedHooks = await generateHookTemplates(selectedType, topic);
      setHooks(generatedHooks);
    } catch (error) {
      console.error('Error generating hooks:', error);
      setError('Failed to generate hooks. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (hook: string, index: number) => {
    try {
      await navigator.clipboard.writeText(hook);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-24">
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
            <div className="relative">
              <Sparkles className="text-[#bafc63] w-8 h-8" />
              <div className="absolute inset-0 animate-ping">
                <Sparkles className="text-[#bafc63] w-8 h-8 opacity-75" />
              </div>
            </div>
            Evan's Viral Hook Generator
          </h2>
          <p className="text-gray-300">
            Generate attention-grabbing hooks that create curiosity and stop the scroll
          </p>
        </div>

        <div className="glass-effect rounded-xl p-8 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-[#bafc63]" />
              <label className="text-lg font-medium text-white">
                What's your video about?
              </label>
            </div>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., morning routine, AI tools, coffee recipe"
              className="w-full px-4 py-3 bg-[#0e0314] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#bafc63]/20 hover:border-[#bafc63]/30 transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Layout className="w-5 h-5 text-[#bafc63]" />
              <label className="text-lg font-medium text-white">
                Content Type
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {contentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-300 ${
                    selectedType === type.id
                      ? 'bg-[#bafc63] text-[#0e0314] font-medium'
                      : 'border border-white/10 text-white hover:border-[#bafc63]/30'
                  }`}
                >
                  <span>{type.emoji}</span>
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateHooks}
            disabled={isGenerating || !topic}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_25px_rgba(186,252,99,0.3)] disabled:opacity-50 disabled:cursor-not-allowed hover:translate-y-[-2px]"
            style={{ 
              background: '#bafc63',
              color: '#0e0314'
            }}
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" />
                Generating Hooks...
              </>
            ) : (
              <>
                <Sparkles />
                Generate Viral Hooks
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {hooks.length > 0 && (
          <div className="mt-12 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Your Viral Hooks</h3>
              <button
                onClick={generateHooks}
                disabled={isGenerating}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#bafc63] border border-[#bafc63]/30 hover:border-[#bafc63] transition-all duration-300"
              >
                <RefreshCw size={16} className={isGenerating ? 'animate-spin' : ''} />
                Regenerate
              </button>
            </div>

            <div className="grid gap-4">
              {hooks.map((hook, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg backdrop-blur-sm border transition-all duration-300 hover:shadow-[0_0_15px_rgba(186,252,99,0.2)] ${
                    index === 0
                      ? 'border-[#bafc63] bg-[#bafc63]/10'
                      : 'border-white/10 bg-[#0e0314]/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {index === 0 && (
                          <span className="px-2 py-1 rounded-md text-xs font-medium bg-[#bafc63] text-[#0e0314]">
                            Best Hook
                          </span>
                        )}
                        <div className="flex items-center gap-1 text-[#bafc63]">
                          <BarChart2 size={14} />
                          <span className="text-sm font-medium">
                            {getViralityText(hook.score, index)}
                          </span>
                        </div>
                      </div>
                      <p className={`text-white ${index === 0 ? 'font-medium' : ''}`}>
                        {hook.text}
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(hook.text, index)}
                      className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedIndex === index ? (
                        <span className="text-[#bafc63]">Copied!</span>
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}