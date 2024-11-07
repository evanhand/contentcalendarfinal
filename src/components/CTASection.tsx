import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTASection() {
  return (
    <div className="py-16">
      <div 
        className="max-w-4xl mx-auto rounded-2xl p-8 md:p-12 text-center backdrop-blur-sm animate-glow relative overflow-hidden"
        style={{ 
          background: 'rgba(14, 3, 20, 0.5)',
          boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 15px rgba(186,252,99,0.2)'
        }}
      >
        {/* Background sparkle effect */}
        <div className="absolute -top-4 -right-4 opacity-20">
          <Sparkles className="w-24 h-24" style={{ color: '#bafc63' }} />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Turn Your Passion Into Profit
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Ready to become a better content creator and start monetizing your expertise? Book a call with Evan and transform your content strategy today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#generate"
            className="group flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_15px_rgba(186,252,99,0.5)] hover:translate-y-[-2px]"
            style={{ 
              background: '#bafc63',
              color: '#0e0314'
            }}
          >
            Generate Your Calendar
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="https://stan.store/evhandd/p/book-a-11-call-with-me-pgvuo"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold border border-[#bafc63]/30 text-white hover:border-[#bafc63] transition-all duration-300"
          >
            Book a Strategy Call
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
}