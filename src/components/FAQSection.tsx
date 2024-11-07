import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: 'How does the AI content generator work?',
      answer: 'Our AI analyzes your niche, target audience, and goals to generate personalized content ideas using proven content frameworks and engagement patterns from successful creators.'
    },
    {
      question: 'Can I customize the generated content?',
      answer: 'Yes! The generated calendar serves as a strategic framework. You can modify, adapt, or expand upon any of the suggestions to better match your voice and style.'
    },
    {
      question: 'How often should I generate new content ideas?',
      answer: 'We recommend generating a new calendar monthly to keep your content fresh and aligned with your evolving goals. You can generate as many variations as you need.'
    },
    {
      question: 'Is the generated content unique?',
      answer: 'Yes, each generation is uniquely tailored to your specific niche, audience, and goals. The AI combines proven frameworks with your unique inputs to create original content suggestions.'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-16">
      <h2 className="text-3xl font-bold text-white text-center mb-12">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`rounded-lg backdrop-blur-sm overflow-hidden opacity-0 animate-fade-in stagger-${index + 1}`}
            style={{
              background: 'rgba(14, 3, 20, 0.5)',
              boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1)'
            }}
          >
            <button
              className="w-full px-6 py-4 text-left flex items-center justify-between text-white hover:text-[#bafc63] transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-medium">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 flex-shrink-0 transition-transform duration-300" />
              ) : (
                <ChevronDown className="h-5 w-5 flex-shrink-0 transition-transform duration-300" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-300 animate-scale-in">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}