import React from 'react';

export function Navbar() {
  return (
    <nav style={{ background: '#0e0314' }} className="shadow-lg border-b border-purple-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center">
          <img 
            src="https://pbs.twimg.com/media/GbOZ_PnWUAAew8Z?format=png&name=small" 
            alt="The Content Labs" 
            className="h-32 md:h-40 transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </nav>
  );
}