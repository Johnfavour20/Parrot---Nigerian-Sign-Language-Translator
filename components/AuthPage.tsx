import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.533,44,30.026,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

const AppleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19.3,5.623a4.74,4.74,0,0,0-4.32-2.54A4.57,4.57,0,0,0,12,4.863a4.63,4.63,0,0,0-3-1.8A4.85,4.85,0,0,0,4.68,5.553C2.2,7.7,1.86,11.353,4.3,14.523A7.47,7.47,0,0,0,7.1,17.4c.55.45,1.13.92,1.8,1.35l.12.08a1.94,1.94,0,0,0,2.2,0l.12-.08c.67-.43,1.25-.9,1.8-1.35a7.47,7.47,0,0,0,2.8-2.88C22.14,11.353,21.8,7.7,19.3,5.623Zm-2.61,8.44a4.8,4.8,0,0,1-1.44,2,4.5,4.5,0,0,1-1.78.9c-.21.06-.44.09-.67.09s-.46-.03-.67-.09a4.5,4.5,0,0,1-1.78-.9,4.8,4.8,0,0,1-1.44-2c-1.32-2.15-1.08-4.75.6-6.38a2.91,2.91,0,0,1,2.2-1,2.78,2.78,0,0,1,2.15,1,2.4,2.4,0,0,0,1.38-.51,2.68,2.68,0,0,0,1.52-.76c.21,1.17-.18,2.41-1.11,3.22A4.45,4.45,0,0,1,16.69,14.063Z"></path>
    </svg>
);


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
    if (!email || !/\S+@\S+\.\S+/.test(email) || password.length < 8) {
      setError('Please enter a valid email and a password of at least 8 characters.');
      return;
    }
    setError('');
    // Mock authentication success
    onAuthSuccess();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-lime-400/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-lime-400/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="w-full max-w-sm">
            <div className="text-center mb-8">
                <button onClick={onNavigateHome} className="flex items-center space-x-2 mx-auto mb-6 group">
                    <div className="w-12 h-12 bg-lime-400 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                        <span className="text-3xl">🦜</span>
                    </div>
                    <span className="text-3xl font-bold">Parrot<span className="text-lime-400">.</span></span>
                </button>
            </div>
        
            <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create an Account'}</h1>
                    <p className="text-neutral-400 text-sm mt-1">{isLogin ? 'Sign in to continue your journey.' : 'Get started with real-time translation.'}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center space-x-2 w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 hover:bg-neutral-700/50 transition-colors">
                        <GoogleIcon />
                        <span>Google</span>
                    </button>
                     <button className="flex items-center justify-center space-x-2 w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 hover:bg-neutral-700/50 transition-colors">
                        <AppleIcon />
                        <span>Apple</span>
                    </button>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="flex-1 h-px bg-neutral-700"></div>
                    <span className="text-neutral-500 text-xs">OR</span>
                    <div className="flex-1 h-px bg-neutral-700"></div>
                </div>
            
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-1.5">Email address</label>
                        <input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-neutral-400 mb-1.5">Password</label>
                        <input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all" />
                    </div>

                    {error && <p className="text-sm text-red-400">{error}</p>}
                    
                    <button type="submit" className="w-full bg-lime-400 text-neutral-950 py-3 rounded-lg font-semibold hover:bg-lime-300 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                        <LogIn className="w-5 h-5" />
                        <span>{isLogin ? 'Log In' : 'Create Account'}</span>
                    </button>
                </form>

                <div className="text-center text-sm text-neutral-400">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="font-semibold text-lime-400 hover:underline">
                    {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </div>
            </div>
            
            <div className="text-center mt-6">
                <button onClick={onNavigateHome} className="text-neutral-500 hover:text-lime-400 transition-colors text-xs">
                ← Or go back to homepage
                </button>
            </div>
        </div>
    </div>
  );
};

export default AuthPage;