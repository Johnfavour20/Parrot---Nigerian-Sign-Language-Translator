import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';

interface AuthPageProps {
  onAuthSuccess: () => void;
  onNavigateHome: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess, onNavigateHome }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || password.length < 8) {
      setError('Please enter a valid email and a password of at least 8 characters.');
      return;
    }
    setError('');
    // Mock authentication success
    onAuthSuccess();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-12 h-12 bg-lime-400 rounded-lg flex items-center justify-center">
            <span className="text-3xl">🦜</span>
          </div>
          <span className="text-3xl font-bold">Parrot<span className="text-lime-400">.</span></span>
        </div>
        
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center">{isLogin ? 'Welcome Back' : 'Create an Account'}</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-lime-400 transition-colors" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input type="password" placeholder="Password (min. 8 characters)" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-lime-400 transition-colors" />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}
            
            <button type="submit" className="w-full bg-lime-400 text-neutral-950 py-3 rounded-lg font-semibold hover:bg-lime-300 transition-all flex items-center justify-center space-x-2">
              <LogIn className="w-5 h-5" />
              <span>{isLogin ? 'Log In' : 'Sign Up'}</span>
            </button>
          </form>

          <div className="text-center text-sm text-neutral-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="font-semibold text-lime-400 hover:underline">
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </div>
          
          <div className="text-center">
            <button className="text-xs text-neutral-500 hover:underline">Forgot Password?</button>
          </div>
        </div>
        
        <div className="text-center mt-8">
            <button onClick={onNavigateHome} className="text-neutral-400 hover:text-lime-400 transition-colors text-sm">
              ← Back to Home
            </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
