import React from 'react';
import { Hand, GraduationCap } from 'lucide-react';
import { UserType } from '../types';

interface OnboardingUserTypeProps {
  onSelect: (type: UserType) => void;
}

const OnboardingUserType: React.FC<OnboardingUserTypeProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold">How will you be using Parrot?</h1>
        <p className="text-xl text-neutral-400">This will help us personalize your experience.</p>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        <button
          onClick={() => onSelect('signer')}
          className="group p-8 bg-neutral-900 rounded-2xl border-2 border-neutral-800 hover:border-lime-400 transition-all hover:transform hover:-translate-y-2 text-center space-y-4"
        >
          <Hand className="w-16 h-16 mx-auto text-neutral-400 group-hover:text-lime-400 transition-colors" />
          <h2 className="text-2xl font-bold">I am a Signer</h2>
          <p className="text-neutral-400">I primarily use Sign Language to communicate and want to translate my signs into text.</p>
        </button>
        <button
          onClick={() => onSelect('learner')}
          className="group p-8 bg-neutral-900 rounded-2xl border-2 border-neutral-800 hover:border-lime-400 transition-all hover:transform hover:-translate-y-2 text-center space-y-4"
        >
          <GraduationCap className="w-16 h-16 mx-auto text-neutral-400 group-hover:text-lime-400 transition-colors" />
          <h2 className="text-2xl font-bold">I am a Learner/Speaker</h2>
          <p className="text-neutral-400">I am learning NSL or I am a hearing person who wants to communicate with signers.</p>
        </button>
      </div>
    </div>
  );
};

export default OnboardingUserType;
