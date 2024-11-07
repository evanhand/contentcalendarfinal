import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HookGenerator } from './components/HookGenerator';
import { ContentCalendar } from './components/ContentCalendar';
import { Homepage } from './components/Homepage';
import { ParticleBackground } from './components/ParticleBackground';
import { WaveBackground } from './components/WaveBackground';
import { Calendar, Home, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'hooks' | 'calendar'>('home');

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <WaveBackground />
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div 
            className="backdrop-blur-sm rounded-lg p-1 inline-flex"
            style={{ 
              background: 'rgba(14, 3, 20, 0.8)',
              boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1)'
            }}
          >
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all duration-300 ${
                activeTab === 'home'
                  ? 'bg-[#bafc63] text-[#0e0314] shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Home size={20} />
              Home
            </button>
            <button
              onClick={() => setActiveTab('hooks')}
              className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all duration-300 ${
                activeTab === 'hooks'
                  ? 'bg-[#bafc63] text-[#0e0314] shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Sparkles size={20} />
              Hook Generator
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all duration-300 ${
                activeTab === 'calendar'
                  ? 'bg-[#bafc63] text-[#0e0314] shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Calendar size={20} />
              Content Calendar
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'home' && <Homepage />}
        {activeTab === 'hooks' && <HookGenerator />}
        {activeTab === 'calendar' && <ContentCalendar />}
      </div>
    </div>
  );
}