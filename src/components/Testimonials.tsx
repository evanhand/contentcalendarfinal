import React from 'react';
import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fitness Coach',
      content: 'This tool has completely transformed how I plan my content. I save hours every week!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces'
    },
    {
      name: 'Michael Chen',
      role: 'Tech Entrepreneur',
      content: 'The AI-generated content ideas are surprisingly creative and relevant to my niche.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces'
    },
    {
      name: 'Emma Davis',
      role: 'Beauty Influencer',
      content: 'Finally, a tool that understands my niche and helps me stay consistent with posting.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces'
    }
  ];

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-white text-center mb-12">
        Loved by Content Creators
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-6 rounded-lg backdrop-blur-sm"
            style={{
              background: 'rgba(14, 3, 20, 0.5)',
              boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-current"
                  style={{ color: '#bafc63' }}
                />
              ))}
            </div>
            <p className="text-gray-300 mb-6">{testimonial.content}</p>
            <div className="flex items-center">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 className="text-white font-semibold">{testimonial.name}</h4>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}