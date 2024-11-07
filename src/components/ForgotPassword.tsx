import React, { useState } from 'react';
import { Mail, Loader2, AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import { ParticleBackground } from './ParticleBackground';
import { WaveBackground } from './WaveBackground';

interface ForgotPasswordProps {
  onBack: () => void;
  onSignInClick: () => void;
}

export function ForgotPassword({ onBack, onSignInClick }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to process request');
      }

      setSuccess(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        <ParticleBackground />
        <WaveBackground />
        
        <div 
          className="w-full max-w-md backdrop-blur-sm rounded-2xl p-8 animate-scale-in relative"
          style={{ 
            background: 'rgba(14, 3, 20, 0.8)',
            boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 25px rgba(186,252,99,0.2)'
          }}
        >
          <div className="text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-[#bafc63]" />
            <h2 className="text-2xl font-bold text-white mb-4">Check Your Email</h2>
            <p className="text-gray-300 mb-8">
              If an account exists with {email}, you'll receive password reset instructions.
            </p>
            <button
              onClick={onSignInClick}
              className="w-full py-3 px-4 rounded-lg text-[#0e0314] font-semibold bg-[#bafc63] hover:shadow-[0_0_25px_rgba(186,252,99,0.3)] transition-all duration-300"
            >
              Return to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <ParticleBackground />
      <WaveBackground />
      
      <div 
        className="w-full max-w-md backdrop-blur-sm rounded-2xl p-8 animate-scale-in relative"
        style={{ 
          background: 'rgba(14, 3, 20, 0.8)',
          boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 25px rgba(186,252,99,0.2)'
        }}
      >
        <button
          onClick={onBack}
          className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>

        <h2 className="text-3xl font-bold text-white text-center mb-2">Reset Password</h2>
        <p className="text-gray-400 text-center mb-8">
          Enter your email address and we'll send you instructions to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-200">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#0e0314] border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#bafc63]/20 hover:border-[#bafc63]/30 transition-all duration-300"
                placeholder="you@example.com"
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-[#0e0314] font-semibold bg-[#bafc63] hover:shadow-[0_0_25px_rgba(186,252,99,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:translate-y-[-2px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Sending Instructions...
              </>
            ) : (
              'Send Reset Instructions'
            )}
          </button>

          <p className="text-center text-gray-400">
            Remember your password?{' '}
            <button 
              type="button"
              onClick={onSignInClick}
              className="text-[#bafc63] hover:text-white transition-colors font-medium"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}