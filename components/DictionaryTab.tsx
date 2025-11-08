import React, { useState, useMemo, useEffect, useRef } from 'react';
import { DictionaryEntry } from '../types';
import { BookOpen, ChevronRight, Volume2, LoaderCircle, AlertTriangle, CheckCircle, XCircle, ChevronLeft, Video } from 'lucide-react';
import { generateSpeech, quickNslDetection } from '../services/geminiService';
import { decode, decodeAudioData } from '../utils/audio';
import { useCamera } from '../useCamera';

type PracticeResult = {
  message: string;
  success: boolean;
  detectedWord?: string;
} | null;

const DictionaryTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWord, setSelectedWord] = useState<DictionaryEntry | null>(null);
  const [selectedWordAudio, setSelectedWordAudio] = useState<AudioBuffer | null>(null);
  const [isFetchingAudio, setIsFetchingAudio] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  
  // State for Practice Mode
  const [isPracticing, setIsPracticing] = useState(false);
  const [practiceWord, setPracticeWord] = useState<DictionaryEntry | null>(null);
  const [isCheckingSign, setIsCheckingSign] = useState(false);
  const [practiceResult, setPracticeResult] = useState<PracticeResult>(null);

  const { videoRef, isCameraOn, error, startCamera, stopCamera, captureFrame } = useCamera();

  useEffect(() => {
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
  }, []);

  useEffect(() => {
    if (isPracticing) {
      startCamera();
    } else {
      stopCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPracticing]);

  useEffect(() => {
    if (selectedWord && audioContextRef.current) {
      const fetchAudio = async () => {
        setIsFetchingAudio(true);
        setSelectedWordAudio(null);
        const base64Audio = await generateSpeech(selectedWord.word);
        if (base64Audio && audioContextRef.current) {
          const audioData = decode(base64Audio);
          const buffer = await decodeAudioData(audioData, audioContextRef.current, 24000, 1);
          setSelectedWordAudio(buffer);
        }
        setIsFetchingAudio(false);
      };
      fetchAudio();
    }
  }, [selectedWord]);

  const playAudio = (audioBuffer: AudioBuffer) => {
    if (!audioContextRef.current || !audioBuffer) return;
    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContextRef.current.destination);
    source.start(0);
  };
  
  const handleStartPractice = (word: DictionaryEntry) => {
    setSelectedWord(null);
    setPracticeWord(word);
    setIsPracticing(true);
  };

  const handleExitPractice = () => {
    setIsPracticing(false);
    setPracticeWord(null);
    setPracticeResult(null);
  };

  const handleCheckSign = async () => {
    setIsCheckingSign(true);
    setPracticeResult(null);
    const frame = captureFrame();
    if (!frame || !practiceWord) {
      alert("Could not capture frame.");
      setIsCheckingSign(false);
      return;
    }
    const result = await quickNslDetection(frame);
    
    if (result.word.toLowerCase() === practiceWord.word.toLowerCase() && result.confidence > 60) {
      setPracticeResult({ success: true, message: `Great job! That was "${result.word}".` });
    } else {
      setPracticeResult({ success: false, message: "Not quite. Let's try that again.", detectedWord: result.word });
    }
    setIsCheckingSign(false);
  };

  const dictionary: DictionaryEntry[] = useMemo(() => [
    // ... (dictionary entries remain the same)
    { word: 'Come', category: 'Actions', video: '🫴' }, { word: 'Go', category: 'Actions', video: '🏃' }, { word: 'Cat', category: 'Animals', video: '🐱' }, { word: 'Chicken', category: 'Animals', video: '🐔' }, { word: 'Dog', category: 'Animals', video: '🐶' }, { word: 'Goat', category: 'Animals', video: '🐐' }, { word: 'Finish', category: 'Common', video: '🏁' }, { word: 'Help', category: 'Common', video: '🆘' }, { word: 'More', category: 'Common', video: '➕' }, { word: 'No', category: 'Common', video: '❌' }, { word: 'Please', category: 'Common', video: '🙏' }, { word: 'Yes', category: 'Common', video: '✅' }, { word: 'Drink', category: 'Daily Life', video: '🥤' }, { word: 'Eat', category: 'Daily Life', video: '😋' }, { word: 'Food', category: 'Daily Life', video: '🍽️' }, { word: 'House', category: 'Daily Life', video: '🏠' }, { word: 'Money', category: 'Daily Life', video: '💰' }, { word: 'School', category: 'Daily Life', video: '🏫' }, { word: 'Sleep', category: 'Daily Life', video: '😴' }, { word: 'Water', category: 'Daily Life', video: '💧' }, { word: 'Baby', category: 'Family', video: '👶' }, { word: 'Brother', category: 'Family', video: '👦' }, { word: 'Father', category: 'Family', video: '👨' }, { word: 'Mother', category: 'Family', video: '👩' }, { word: 'Sister', category: 'Family', video: '👧' }, { word: 'Happy', category: 'Feelings', video: '😄' }, { word: 'Love', category: 'Feelings', video: '❤️' }, { word: 'Sad', category: 'Feelings', video: '😢' }, { word: 'Sorry', category: 'Feelings', video: '😔' }, { word: 'Good Afternoon', category: 'Greetings', video: '☀️' }, { word: 'Good Morning', category: 'Greetings', video: '🌅' }, { word: 'Good Night', category: 'Greetings', video: '🌙' }, { word: 'Hello', category: 'Greetings', video: '👋' }, { word: 'How are you?', category: 'Greetings', video: '🤔' }, { word: 'My name is...', category: 'Greetings', video: '🏷️' }, { word: 'Thank You', category: 'Greetings', video: '🙏' }, { word: 'Friend', category: 'People', video: '🤝' }, { word: 'Church', category: 'Places', video: '⛪' }, { word: 'Hospital', category: 'Places', video: '🏥' }, { word: 'Market', category: 'Places', video: '🏪' }, { word: 'What', category: 'Questions', video: '❓' }, { word: 'When', category: 'Questions', video: '⏰' }, { word: 'Where', category: 'Questions', video: '🗺️' }, { word: 'Who', category: 'Questions', video: '👤' }, { word: 'Why', category: 'Questions', video: '🤷' }, { word: 'Today', category: 'Time', video: '🗓️' }, { word: 'Tomorrow', category: 'Time', video: '➡️' }, { word: 'Yesterday', category: 'Time', video: '⬅️' },
  ], []);

  const filteredWords = useMemo(() => 
    dictionary.filter(item => 
      item.word.toLowerCase().includes(searchTerm.toLowerCase())
  ), [dictionary, searchTerm]);
  
  if (isPracticing && practiceWord) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-8 space-y-6">
        <button onClick={handleExitPractice} className="flex items-center space-x-2 text-neutral-400 hover:text-lime-400 transition-colors">
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Dictionary</span>
        </button>
        <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold">Practice Signing</h1>
            <p className="text-4xl sm:text-5xl font-bold text-lime-400 mt-2">{practiceWord.word}</p>
        </div>
        <div className="relative bg-neutral-900 rounded-2xl border-2 border-neutral-800 overflow-hidden aspect-video">
            <video ref={videoRef} className={`w-full h-full object-cover ${!isCameraOn && 'hidden'}`} playsInline muted />
            <div className="absolute inset-0 flex items-center justify-center p-4">
                {error && (
                    <div className="text-center space-y-4 text-red-400">
                        <AlertTriangle className="w-16 h-16 mx-auto" /><p className="font-semibold">Camera Error</p><p className="text-sm text-neutral-400 max-w-sm">{error}</p>
                    </div>
                )}
                {!isCameraOn && !error && (
                    <div className="text-center space-y-4"><Video className="w-16 h-16 mx-auto text-lime-400" /><p className="text-neutral-400">Starting camera...</p></div>
                )}
                 {practiceResult && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col justify-center items-center text-center p-6 space-y-6 z-20">
                        {practiceResult.success ? <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-lime-400" /> : <XCircle className="w-16 h-16 sm:w-20 sm:h-20 text-red-400" />}
                        <p className="text-2xl sm:text-3xl font-bold">{practiceResult.message}</p>
                        {practiceResult.detectedWord && <p className="text-neutral-300 text-lg">I detected: <span className="font-bold text-lime-400">{practiceResult.detectedWord}</span></p>}
                        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-xs">
                            <button onClick={() => setPracticeResult(null)} className="w-full bg-lime-400 text-neutral-950 px-8 py-3 rounded-lg font-semibold hover:bg-lime-300 transition-all">Try Again</button>
                            <button onClick={handleExitPractice} className="w-full bg-neutral-700 text-neutral-100 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-600 transition-all">Finish</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
        <button
            onClick={handleCheckSign}
            disabled={isCheckingSign || !isCameraOn || !!error}
            className="w-full bg-lime-400 text-neutral-950 py-4 rounded-xl font-semibold text-lg hover:bg-lime-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
        >
            {isCheckingSign ? <><LoaderCircle className="w-6 h-6 animate-spin" /><span>Checking...</span></> : 'Check My Sign'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">NSL Dictionary</h1>
        <p className="text-neutral-400">Learn Nigerian Sign Language signs</p>
      </div>

      <div className="relative">
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for a word..." className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-4 pl-12 focus:outline-none focus:border-lime-400 transition-colors" />
        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
      </div>

      {selectedWord && (
        <div className="bg-gradient-to-br from-lime-400/10 to-transparent rounded-xl border-2 border-lime-400/30 p-6 animate-fade-in">
          <button onClick={() => setSelectedWord(null)} className="text-neutral-400 hover:text-lime-400 mb-4 flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 rotate-180" /><span>Back to list</span>
          </button>
          <div className="text-center space-y-6">
            <div className="text-7xl sm:text-8xl">{selectedWord.video}</div>
            <div>
              <div className="flex items-center justify-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-lime-400">{selectedWord.word}</h2>
                {isFetchingAudio ? (<LoaderCircle className="w-6 h-6 text-lime-400 animate-spin" />) : (
                  selectedWordAudio && (<button onClick={() => playAudio(selectedWordAudio)} className="text-lime-400 hover:text-lime-300"><Volume2 className="w-6 h-6" /></button>)
                )}
              </div>
              <p className="text-neutral-400 mt-2">{selectedWord.category}</p>
            </div>
            <div className="bg-neutral-900 rounded-lg p-4"><p className="text-sm text-neutral-400">Video demonstration would play here</p></div>
            <button onClick={() => handleStartPractice(selectedWord)} className="bg-lime-400 text-neutral-950 px-8 py-3 rounded-lg font-semibold hover:bg-lime-300 transition-all">Practice This Sign</button>
          </div>
        </div>
      )}

      {!selectedWord && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredWords.map((item, index) => (
            <button key={index} onClick={() => setSelectedWord(item)} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6 hover:border-lime-400/50 transition-all hover:scale-105 text-center space-y-3">
              <div className="text-4xl sm:text-5xl">{item.video}</div>
              <div><p className="font-semibold text-neutral-100">{item.word}</p><p className="text-xs text-neutral-400">{item.category}</p></div>
            </button>
          ))}
        </div>
      )}

      {filteredWords.length === 0 && !selectedWord && (
        <div className="text-center py-12 text-neutral-400"><BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" /><p>No words found. Try a different search term.</p></div>
      )}
      
      <style>{`.animate-fade-in { animation: fade-in 0.5s ease-out; } @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
};

export default DictionaryTab;