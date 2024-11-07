import React, { useState } from 'react';
import { Download, Filter, Copy } from 'lucide-react';
import { ContentTemplate } from '../types';
import { generateCSV } from '../services/contentGenerator';

interface ContentPreviewProps {
  content: ContentTemplate;
}

export const ContentPreview: React.FC<ContentPreviewProps> = ({ content }) => {
  const [selectedType, setSelectedType] = useState('all');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCSVDownload = () => {
    const csv = generateCSV(content);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${content.niche.toLowerCase().replace(/\s+/g, '-')}-content-calendar.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const copyToClipboard = async (contentId: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(contentId);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const filteredContent = content.weeks.map(week => ({
    ...week,
    days: week.days.filter(day => 
      selectedType === 'all' || day.contentType === selectedType
    )
  })).filter(week => week.days.length > 0);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8 animate-scale-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Your Content Calendar</h2>
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={18} />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#0e0314] border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#bafc63] transition-all duration-300 hover:border-[#bafc63]/50"
            >
              <option value="all">All Content Types</option>
              <option value="Educational">Educational</option>
              <option value="Behind-the-Scenes">Behind the Scenes</option>
              <option value="Tips & Tricks">Tips & Tricks</option>
              <option value="Industry Insights">Industry Insights</option>
              <option value="Trending Topic">Trending Topics</option>
            </select>
          </div>
          <button
            onClick={handleCSVDownload}
            className="flex items-center gap-2 px-4 py-2 bg-[#bafc63] text-[#0e0314] rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-[0_0_15px_rgba(186,252,99,0.5)] hover:translate-y-[-2px] active:translate-y-0"
          >
            <Download size={20} />
            Download CSV
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {filteredContent.map((week) => (
          <div
            key={week.weekNumber}
            className="bg-[#0e0314] border border-white/20 rounded-lg p-6 shadow-lg shadow-[#bafc63]/10 transition-all duration-300 hover:shadow-[0_0_25px_rgba(186,252,99,0.2)]"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Week {week.weekNumber}</h3>
            <div className="space-y-4">
              {week.days.map((day, dayIndex) => {
                const contentId = `week${week.weekNumber}-day${dayIndex}`;
                const contentText = `${day.day}\n\nIdea: ${day.overallIdea}\nType: ${day.contentType}\n\nTalking Points:\n${day.talkingPoints.join('\n')}\n\nHooks:\n${day.hooks.join('\n')}\n\nNotes: ${day.additionalNotes}`;
                
                return (
                  <div 
                    key={contentId} 
                    className="border-b border-white/20 pb-4 last:border-0 last:pb-0 transition-all duration-300 hover:bg-white/5 rounded-lg p-4 -mx-4"
                  >
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-lg font-medium text-[#bafc63]">{day.day}</h4>
                        <button
                          onClick={() => copyToClipboard(contentId, contentText)}
                          className="flex items-center gap-1 text-gray-300 hover:text-[#bafc63] transition-colors group"
                        >
                          <Copy size={16} className="transition-transform duration-300 group-hover:scale-110" />
                          <span className="text-sm">
                            {copiedIndex === contentId ? 'Copied!' : 'Copy'}
                          </span>
                        </button>
                      </div>
                      <p className="text-white/90">
                        <span className="font-semibold">Idea:</span> {day.overallIdea}
                      </p>
                      <p className="text-white/90">
                        <span className="font-semibold">Type:</span> {day.contentType}
                      </p>
                      <div className="text-white/90">
                        <span className="font-semibold">Talking Points:</span>
                        <ul className="list-disc list-inside ml-4 mt-1">
                          {day.talkingPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-white/90">
                        <span className="font-semibold">Hooks:</span>
                        <ul className="list-disc list-inside ml-4 mt-1">
                          {day.hooks.map((hook, index) => (
                            <li key={index}>{hook}</li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-white/90">
                        <span className="font-semibold">Notes:</span> {day.additionalNotes}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentPreview;