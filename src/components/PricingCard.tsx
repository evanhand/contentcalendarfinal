import React from 'react';
import { Calendar, Lock, FileDown } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: number;
  ideas: number;
}

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <div 
      className="backdrop-blur-sm rounded-lg p-8" 
      style={{ 
        background: 'rgba(14, 3, 20, 0.5)',
        boxShadow: '0 0 0 1px white, 0 0 15px rgba(186,252,99,0.5)'
      }}>
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-3">{plan.name}</h3>
        <p className="text-4xl font-bold mb-6 drop-shadow-[0_0_8px_rgba(186,252,99,0.5)]" style={{ color: '#bafc63' }}>
          ${plan.price}
        </p>
        <ul className="text-gray-300 space-y-4 mb-8 text-lg">
          <li className="flex items-center justify-center">
            <Calendar className="h-6 w-6 mr-3" style={{ color: '#bafc63' }} />
            {plan.ideas} Content Ideas
          </li>
          <li className="flex items-center justify-center">
            <Lock className="h-6 w-6 mr-3" style={{ color: '#bafc63' }} />
            Premium Support
          </li>
          <li className="flex items-center justify-center">
            <FileDown className="h-6 w-6 mr-3" style={{ color: '#bafc63' }} />
            Downloadable File
          </li>
        </ul>
        <button 
          className="w-full font-semibold py-3 px-4 rounded-md text-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(186,252,99,0.5)]"
          style={{ 
            background: '#bafc63',
            color: '#0e0314'
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}