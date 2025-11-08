import React, { useState } from 'react';
import { DictionaryEntry } from '../types';
import { BookOpen, ChevronRight } from 'lucide-react';

const DictionaryTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWord, setSelectedWord] = useState<DictionaryEntry | null>(null);

  const dictionary: DictionaryEntry[] = [
    { word: 'Hello', category: 'Greetings', video: '👋' },
    { word: 'Thank You', category: 'Greetings', video: '🙏' },
    { word: 'Mother', category: 'Family', video: '👩' },
    { word: 'Father', category: 'Family', video: '👨' },
    { word: 'Food', category: 'Daily Life', video: '🍽️' },
    { word: 'Water', category: 'Daily Life', video: '💧' },
    { word: 'Help', category: 'Common', video: '🆘' },
    { word: 'Please', category: 'Common', video: '🙏' },
    { word: 'Yes', category: 'Common', video: '✅' },
    { word: 'No', category: 'Common', video: '❌' },
  ];

  const filteredWords = dictionary.filter(item => 
    item.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 pt-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">NSL Dictionary</h1>
        <p className="text-neutral-400">Learn Nigerian Sign Language signs</p>
      </div>

      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a word..."
          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-4 pl-12 focus:outline-none focus:border-lime-400 transition-colors"
        />
        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
      </div>

      {selectedWord && (
        <div className="bg-gradient-to-br from-lime-400/10 to-transparent rounded-xl border-2 border-lime-400/30 p-6">
          <button 
            onClick={() => setSelectedWord(null)}
            className="text-neutral-400 hover:text-lime-400 mb-4 flex items-center space-x-2"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span>Back to list</span>
          </button>
          <div className="text-center space-y-6">
            <div className="text-8xl">{selectedWord.video}</div>
            <div>
              <h2 className="text-3xl font-bold text-lime-400 mb-2">{selectedWord.word}</h2>
              <p className="text-neutral-400">{selectedWord.category}</p>
            </div>
            <div className="bg-neutral-900 rounded-lg p-4">
              <p className="text-sm text-neutral-400">Video demonstration would play here</p>
            </div>
            <button className="bg-lime-400 text-neutral-950 px-8 py-3 rounded-lg font-semibold hover:bg-lime-300 transition-all">
              Practice This Sign
            </button>
          </div>
        </div>
      )}

      {!selectedWord && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredWords.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedWord(item)}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-lime-400/50 transition-all hover:scale-105 text-center space-y-3"
            >
              <div className="text-5xl">{item.video}</div>
              <div>
                <p className="font-semibold text-neutral-100">{item.word}</p>
                <p className="text-xs text-neutral-400">{item.category}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {filteredWords.length === 0 && !selectedWord && (
        <div className="text-center py-12 text-neutral-400">
          <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No words found. Try a different search term.</p>
        </div>
      )}
    </div>
  );
};

export default DictionaryTab;
