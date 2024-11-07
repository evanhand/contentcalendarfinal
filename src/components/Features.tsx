import React from 'react';
import { Calendar, Target, Zap, Sparkles } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Calendar className="h-6 w-6" style={{ color: '#bafc63' }} />,
      title: 'Smart Scheduling',
      description: 'AI-powered content calendar that adapts to your niche and audience'
    },
    {
      icon: <Target className="h-6 w-6" style={{ color: '#bafc63' }} />,
      title: 'Targeted Content',
      description: 'Customized content ideas that resonate with your specific audience'
    },
    {
      icon: <Zap className="h-6 w-6" style={{ color: '#bafc63' }} />,
      title: 'Instant Generation',
      description: 'Get a month of content ideas in seconds, not hours'
    },
    {
      icon: <Sparkles className="h-6 w-6" style={{ color: '#bafc63' }} />,
      title: 'Proven Formulas',
      description: 'Based on successful content strategies across various niches'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`p-6 rounded-lg backdrop-blur-sm opacity-0 animate-fade-in stagger-${index + 1} h-full`}
          style={{
            background: 'rgba(14, 3, 20, 0.5)',
            boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="mb-4">{feature.icon}</div>
          <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
          <p className="text-gray-400">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}