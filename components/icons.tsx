import React from 'react';

interface IconProps {
  className?: string;
}

export const RealTimeIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <path d="M32 8L36 24L44 16L40 32L56 32L40 40L48 56L32 48L24 56L32 40L16 32L32 32L28 16L36 24L32 8Z" 
          fill="currentColor" opacity="0.2"/>
    <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="3" fill="none"/>
    <circle cx="32" cy="32" r="4" fill="currentColor"/>
    <path d="M32 20V14M32 50V44M44 32H50M14 32H20" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

export const PrivacyIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <rect x="18" y="12" width="28" height="38" rx="3" stroke="currentColor" strokeWidth="3" fill="none"/>
    <path d="M24 12V10C24 7.79 25.79 6 28 6H36C38.21 6 40 7.79 40 10V12" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="3" fill="none"/>
    <path d="M32 28V32L34 34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 54H40" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

export const CommunityIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <circle cx="32" cy="24" r="8" stroke="currentColor" strokeWidth="3" fill="none"/>
    <circle cx="20" cy="42" r="6" stroke="currentColor" strokeWidth="3" fill="none"/>
    <circle cx="44" cy="42" r="6" stroke="currentColor" strokeWidth="3" fill="none"/>
    <path d="M26 38C26 34 28 32 32 32C36 32 38 34 38 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M20 48V52C20 54 22 56 24 56H40C42 56 44 54 44 52V48" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="32" cy="24" r="3" fill="currentColor"/>
  </svg>
);

export const AiAccuracyIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <path d="M32 8L38 22L52 24L42 34L44 48L32 42L20 48L22 34L12 24L26 22L32 8Z" 
          stroke="currentColor" strokeWidth="3" fill="none" strokeLinejoin="round"/>
    <circle cx="32" cy="28" r="6" stroke="currentColor" strokeWidth="2.5" fill="none"/>
    <path d="M26 36L30 32L34 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="32" cy="28" r="2" fill="currentColor"/>
  </svg>
);
