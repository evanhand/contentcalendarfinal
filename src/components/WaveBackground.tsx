import React from 'react';

export function WaveBackground() {
  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0520] via-[#1a0b3b] to-[#2a0b46]" />
      
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
      
      {/* Parallax Wave Group 1 - Top */}
      <div className="absolute top-[10%] left-0 right-0 h-screen">
        <div className="absolute inset-0 animate-wave-slow">
          <svg viewBox="0 0 2880 320" className="w-[200%] h-full" preserveAspectRatio="none">
            <path
              fill="rgba(186, 252, 99, 0.03)"
              d="M0,160 C480,100,960,240,1440,160 C1920,80,2400,200,2880,160 L2880,320 L0,320 Z"
            />
          </svg>
        </div>
      </div>

      {/* Parallax Wave Group 2 - Middle */}
      <div className="absolute top-[40%] left-0 right-0 h-screen">
        <div className="absolute inset-0 animate-wave-medium">
          <svg viewBox="0 0 2880 320" className="w-[200%] h-full" preserveAspectRatio="none">
            <path
              fill="rgba(186, 252, 99, 0.02)"
              d="M0,192 C480,240,960,180,1440,192 C1920,204,2400,140,2880,192 L2880,320 L0,320 Z"
            />
          </svg>
        </div>
      </div>

      {/* Parallax Wave Group 3 - Bottom */}
      <div className="absolute top-[70%] left-0 right-0 h-screen">
        <div className="absolute inset-0 animate-wave-fast">
          <svg viewBox="0 0 2880 320" className="w-[200%] h-full" preserveAspectRatio="none">
            <path
              fill="rgba(186, 252, 99, 0.015)"
              d="M0,128 C480,180,960,120,1440,128 C1920,136,2400,180,2880,128 L2880,320 L0,320 Z"
            />
          </svg>
        </div>
      </div>

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0520]/50 to-transparent" />
    </div>
  );
}