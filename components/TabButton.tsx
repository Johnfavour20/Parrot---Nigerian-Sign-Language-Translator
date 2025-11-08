import React from 'react';

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center space-y-1 py-2 rounded-lg transition-all ${
      active 
        ? 'bg-lime-400/20 text-lime-400' 
        : 'text-neutral-400 hover:text-lime-400 hover:bg-neutral-800'
    }`}
  >
    <div className="w-6 h-6">{icon}</div>
    <span className="text-xs font-medium">{label}</span>
  </button>
);

export default TabButton;
