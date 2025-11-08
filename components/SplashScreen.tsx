import React from 'react';

interface SplashScreenProps {
  isFadingOut: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isFadingOut }) => {
  return (
    <div 
      className={`fixed inset-0 bg-neutral-950 flex flex-col justify-center items-center z-[100] transition-opacity duration-500 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
      aria-live="polite"
      aria-label="Parrot application is loading"
    >
      <div className="flex flex-col items-center space-y-6 animate-fade-in-slow">
        <div className="w-24 h-24 bg-lime-400 rounded-2xl flex items-center justify-center shadow-lg shadow-lime-400/20 animate-pulse">
          <span className="text-6xl">🦜</span>
        </div>
        <span className="text-4xl font-bold text-neutral-100">
          Parrot<span className="text-lime-400">.</span>
        </span>
      </div>
      <style>{`
        @keyframes fade-in-slow {
          from { 
            opacity: 0; 
            transform: translateY(15px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .animate-fade-in-slow {
          animation: fade-in-slow 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;