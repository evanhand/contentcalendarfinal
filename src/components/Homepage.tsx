import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Calendar, Zap, Star, CheckCircle, BarChart2, Users } from 'lucide-react';
import { Testimonials } from './Testimonials';
import { FAQSection } from './FAQSection';
import { Features } from './Features';
import { HowItWorks } from './HowItWorks';
import { CTASection } from './CTASection';

function CountUpNumber({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const countStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countStarted.current) {
          countStarted.current = true;
          const startTime = Date.now();
          const endTime = startTime + duration;

          const updateCount = () => {
            const now = Date.now();
            const progress = Math.min(1, (now - startTime) / duration);
            const currentCount = Math.floor(end * progress);
            
            setCount(currentCount);

            if (now < endTime) {
              requestAnimationFrame(updateCount);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(updateCount);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  const formattedNumber = count >= 1000 
    ? `${(count / 1000).toFixed(0)}K` 
    : count.toString();

  return (
    <div ref={elementRef} className="text-4xl font-bold text-[#bafc63] mb-2">
      {formattedNumber}{suffix}
    </div>
  );
}

export function Homepage() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        {/* Floating badge */}
        <div className="inline-block animate-float">
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-[#bafc63]/10 text-[#bafc63] border border-[#bafc63]/20">
            Trusted by Thousands of Content Creators
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          Turn Your Content Into A
          <span className="block text-[#bafc63] drop-shadow-[0_0_8px_rgba(186,252,99,0.5)]">
            Viral Success Story
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Generate viral hooks, plan your content calendar, and learn the secrets to getting millions of views on your content.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://stan.store/evhandd/p/book-a-11-call-with-me-pgvuo"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_25px_rgba(186,252,99,0.3)] hover:translate-y-[-2px]"
            style={{ 
              background: '#bafc63',
              color: '#0e0314'
            }}
          >
            Book a Strategy Call
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <button
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold border border-[#bafc63]/30 text-white hover:border-[#bafc63] transition-all duration-300"
          >
            Learn More
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Social Proof */}
      <section className="text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">Trusted by Content Creators</h2>
          <p className="text-gray-300">Join thousands of creators who've transformed their content strategy</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#bafc63] mb-2">50K+</div>
            <div className="text-gray-300">Hooks Generated</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#bafc63] mb-2">10K+</div>
            <div className="text-gray-300">Content Plans Created</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#bafc63] mb-2">3B+</div>
            <div className="text-gray-300">Views Generated</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-[#bafc63]/5 rounded-2xl -rotate-1" />
        <div className="absolute inset-0 bg-[#0e0314] rounded-2xl rotate-1 backdrop-blur-sm" 
             style={{ background: 'rgba(14, 3, 20, 0.8)' }} />
        <div className="relative rounded-2xl p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Meet Your Content Coach</h2>
            <p className="text-xl text-gray-300 mb-8">
              Hey! I'm Evan, and I've helped thousands of content creators transform their social media presence. With over 5 years of experience in content strategy and a proven track record of generating viral content, I'm here to help you unlock your content's full potential.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 rounded-lg bg-[#bafc63]/10">
                <div className="text-2xl font-bold text-[#bafc63] mb-1">1B+</div>
                <div className="text-gray-300">Views Generated</div>
              </div>
              <div className="p-4 rounded-lg bg-[#bafc63]/10">
                <div className="text-2xl font-bold text-[#bafc63] mb-1">1,000+</div>
                <div className="text-gray-300">Clients Helped</div>
              </div>
              <div className="p-4 rounded-lg bg-[#bafc63]/10">
                <div className="text-2xl font-bold text-[#bafc63] mb-1">5+ Years</div>
                <div className="text-gray-300">Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Features />
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <FAQSection />
    </div>
  );
}