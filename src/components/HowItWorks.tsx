import React from 'react';
import { FileText, Sparkles, Calendar, Download, ArrowRight } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <FileText className="h-8 w-8" style={{ color: '#bafc63' }} />,
      title: 'Share Your Details',
      description: 'Tell us about your niche, audience, and content goals'
    },
    {
      icon: <Sparkles className="h-8 w-8" style={{ color: '#bafc63' }} />,
      title: 'AI Generation',
      description: 'Our AI creates personalized content ideas and hooks'
    },
    {
      icon: <Calendar className="h-8 w-8" style={{ color: '#bafc63' }} />,
      title: 'Get Your Calendar',
      description: 'Review your month of strategically planned content'
    },
    {
      icon: <Download className="h-8 w-8" style={{ color: '#bafc63' }} />,
      title: 'Export & Execute',
      description: 'Download your plan and start creating engaging content'
    }
  ];

  return (
    <div className="py-16" id="how-it-works">
      <h2 className="text-3xl font-bold text-white text-center mb-4">
        How It Works
      </h2>
      <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
        Generate your content calendar in four simple steps
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div
              className="p-6 rounded-lg backdrop-blur-sm h-full transition-transform duration-300 hover:translate-y-[-4px]"
              style={{
                background: 'rgba(14, 3, 20, 0.5)',
                boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400">{step.description}</p>
            </div>

            {/* Arrow for desktop - positioned to overlap boxes */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute -right-10 top-1/2 transform -translate-y-1/2 w-12">
                <div className="relative w-full">
                  <ArrowRight className="text-[#bafc63]/30 absolute left-0" size={24} />
                </div>
              </div>
            )}

            {/* Arrow for mobile/tablet */}
            {index < steps.length - 1 && (
              <div className="lg:hidden flex justify-center w-full mt-8">
                <ArrowRight className="text-[#bafc63]/30 transform rotate-90" size={24} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}