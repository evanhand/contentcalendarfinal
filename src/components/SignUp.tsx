import React, { useState } from 'react';
import { Mail, Lock, User, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { ParticleBackground } from './ParticleBackground';
import { WaveBackground } from './WaveBackground';

interface SignUpError {
  name?: string;
  email?: string;
  password?: string;
  general?: string;
}

interface SignUpProps {
  onBack: () => void;
  onSignInClick: () => void;
}

export function SignUp({ onBack, onSignInClick }: SignUpProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<SignUpError>({});

  const validateForm = (): boolean => {
    const newErrors: SignUpError = {};

    if (!name) {
      newErrors.name = 'Name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, show error
      setErrors({ general: 'This email is already registered' });
    } finally {
      setIsLoading(false);
    }
  };

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

        <h2 className="text-3xl font-bold text-white text-center mb-2">Create Account</h2>
        <p className="text-gray-400 text-center mb-8">Join us and start creating content</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-200">
              <AlertCircle size={18} />
              {errors.general}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-[#0e0314] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.name 
                    ? 'border-red-500/50 focus:ring-red-500/20' 
                    : 'border-white/20 focus:ring-[#bafc63]/20 hover:border-[#bafc63]/30'
                }`}
                placeholder="John Doe"
                disabled={isLoading}
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name}</p>
            )}
          </div>

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
                className={`w-full pl-10 pr-4 py-3 bg-[#0e0314] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.email 
                    ? 'border-red-500/50 focus:ring-red-500/20' 
                    : 'border-white/20 focus:ring-[#bafc63]/20 hover:border-[#bafc63]/30'
                }`}
                placeholder="you@example.com"
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-[#0e0314] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.password 
                    ? 'border-red-500/50 focus:ring-red-500/20' 
                    : 'border-white/20 focus:ring-[#bafc63]/20 hover:border-[#bafc63]/30'
                }`}
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-[#0e0314] font-semibold bg-[#bafc63] hover:shadow-[0_0_25px_rgba(186,252,99,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:translate-y-[-2px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>

          <p className="text-center text-gray-400">
            Already have an account?{' '}
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