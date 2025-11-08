import React, { useState } from 'react';
import { Page } from '../types';
import ConversationTab from './ConversationTab';
import QuickTranslateTab from './QuickTranslateTab';
import AIAssistantTab from './AIAssistantTab';
import DictionaryTab from './DictionaryTab';
import TabButton from './TabButton';
import { MessageSquare, Zap, Brain, BookOpen } from 'lucide-react';

interface MainAppProps {
  onNavigate: (page: Page) => void;
  initialTab: 'conversation' | 'dictionary';
}

// Fix: Define a type for all possible tabs to resolve type errors.
type Tab = 'conversation' | 'quick' | 'assistant' | 'dictionary';

const MainApp: React.FC<MainAppProps> = ({ onNavigate, initialTab }) => {
  // Fix: Explicitly type the state with `Tab`. The type was previously inferred
  // too narrowly from `initialTab`, causing comparison and assignment errors for other tabs.
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  const renderTabContent = () => {
    switch(activeTab) {
      case 'conversation': return <ConversationTab />;
      case 'quick': return <QuickTranslateTab />;
      case 'assistant': return <AIAssistantTab />;
      case 'dictionary': return <DictionaryTab />;
      default: return <ConversationTab />;
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <nav className="fixed w-full z-50 bg-neutral-950/95 backdrop-blur-sm border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
                <span className="text-xl">🦜</span>
              </div>
              <span className="text-xl font-bold">Parrot<span className="text-lime-400">.</span></span>
            </div>
            <button 
              onClick={() => onNavigate(Page.Landing)}
              className="text-neutral-400 hover:text-lime-400 transition-colors text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-16 pb-28">
        {renderTabContent()}
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-2 py-3">
            <TabButton 
              icon={<MessageSquare />} 
              label="Conversation" 
              active={activeTab === 'conversation'}
              onClick={() => setActiveTab('conversation')}
            />
            <TabButton 
              icon={<Zap />} 
              label="Quick" 
              active={activeTab === 'quick'}
              onClick={() => setActiveTab('quick')}
            />
            <TabButton 
              icon={<Brain />} 
              label="Assistant" 
              active={activeTab === 'assistant'}
              onClick={() => setActiveTab('assistant')}
            />
            <TabButton 
              icon={<BookOpen />} 
              label="Dictionary" 
              active={activeTab === 'dictionary'}
              onClick={() => setActiveTab('dictionary')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainApp;
