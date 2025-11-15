import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { askNslAssistant } from '../services/geminiService';

const AIAssistantTab: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async (question: string) => {
    // Prevent new requests while one is in progress or if the question is empty
    if (loading || !question.trim()) return;

    setQuery(question); // Update text area to show the current question
    setLoading(true);
    setResponse('');
    const aiResponse = await askNslAssistant(question);
    setResponse(aiResponse);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">AI Assistant</h1>
        <p className="text-neutral-400">Ask anything about Nigerian Sign Language</p>
      </div>

      <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6 space-y-4">
        <label className="text-sm font-semibold text-neutral-400">YOUR QUESTION</label>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Explain the NSL grammar structure for nouns..."
          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 h-32 resize-none focus:outline-none focus:border-lime-400 transition-colors"
        />
        <button 
          onClick={() => handleAsk(query)}
          disabled={loading || !query.trim()}
          className="w-full bg-lime-400 text-neutral-950 py-3 rounded-lg font-semibold hover:bg-lime-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin"></div>
              <span>Thinking...</span>
            </>
          ) : (
            <>
              <Brain className="w-5 h-5" />
              <span>Ask AI</span>
            </>
          )}
        </button>
      </div>

      {(loading || response) && (
        <div className="bg-gradient-to-br from-lime-400/10 to-transparent rounded-xl border-2 border-lime-400/30 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center">
              <span className="text-lg">🤖</span>
            </div>
            <span className="font-semibold text-lime-400">AI Response</span>
          </div>
          {loading && !response && <p className="text-neutral-400 animate-pulse">AI is generating a response...</p>}
          <div className="text-neutral-100 leading-relaxed whitespace-pre-wrap prose prose-invert prose-sm sm:prose-base">{response}</div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={() => handleAsk('What are the basic greetings in NSL?')}
          disabled={loading}
          className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-left hover:border-lime-400/50 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <p className="text-sm text-lime-400 font-semibold mb-1">Quick Question</p>
          <p className="text-neutral-300">What are the basic greetings in NSL?</p>
        </button>
        <button 
          onClick={() => handleAsk('How do I sign numbers in Nigerian Sign Language?')}
          disabled={loading}
          className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-left hover:border-lime-400/50 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <p className="text-sm text-lime-400 font-semibold mb-1">Quick Question</p>
          <p className="text-neutral-300">How do I sign numbers in NSL?</p>
        </button>
      </div>
    </div>
  );
};

export default AIAssistantTab;