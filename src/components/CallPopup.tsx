import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function CallPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;
      
      // Show popup after scrolling 30% of the page
      const scrollTrigger = window.innerHeight * 0.3;
      if (window.scrollY > scrollTrigger) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  return (
    <div 
      className="fixed bottom-4 right-4 max-w-md w-full md:w-96 rounded-lg p-6 shadow-xl animate-fade-in"
      style={{ 
        background: '#0e0314',
        boxShadow: '0 0 0 1px white, 0 0 15px rgba(186,252,99,0.5)',
        zIndex: 50
      }}
    >
      <button 
        onClick={() => setIsDismissed(true)}
        className="absolute top-2 right-2 text-white/60 hover:text-white transition-colors"
      >
        <X size={20} />
      </button>
      
      <h3 className="text-white text-lg font-semibold mb-3">
        Ready to Turn Your Passion into Profit?
      </h3>
      
      <p className="text-gray-300 mb-4">
        Interested in becoming a better content creator and turning your passion into money? Book a call with Evan!
      </p>
      
      <a
        href="https://stan.store/evhandd/p/book-a-11-call-with-me-pgvuo"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center font-semibold py-3 px-4 rounded-md text-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(186,252,99,0.5)]"
        style={{ 
          background: '#bafc63',
          color: '#0e0314'
        }}
      >
        Book a Call Now
      </a>
    </div>
  );
}