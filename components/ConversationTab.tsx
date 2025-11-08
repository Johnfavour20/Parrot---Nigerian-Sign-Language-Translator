import React, { useState, useEffect } from 'react';
import { Camera, Send, Mic, RotateCcw, VideoOff, AlertTriangle } from 'lucide-react';
import { useCamera } from '../hooks/useCamera';
import { generateNslTranslation } from '../services/geminiService';

const ConversationTab: React.FC = () => {
  const [rawGloss, setRawGloss] = useState('');
  const [refinedText, setRefinedText] = useState('');
  const [speakerInput, setSpeakerInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { videoRef, isCameraOn, error, startCamera, stopCamera, captureFrame } = useCamera();

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartSigning = async () => {
    const frame = captureFrame();
    if (!frame) {
      alert("Could not capture frame from camera.");
      return;
    }
    setIsProcessing(true);
    setRawGloss('');
    setRefinedText('');
    const result = await generateNslTranslation(frame);
    setRawGloss(result.rawGloss);
    setRefinedText(result.refinedText);
    setIsProcessing(false);
  };
  
  const handleReset = () => {
    setRawGloss('');
    setRefinedText('');
    setSpeakerInput('');
    if(!isCameraOn) startCamera();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Conversation Mode</h1>
        <p className="text-neutral-400">Real-time sign language translation</p>
      </div>

      <div className="relative bg-neutral-900 rounded-2xl border-2 border-neutral-800 overflow-hidden aspect-video">
        <video ref={videoRef} className={`w-full h-full object-cover ${!isCameraOn && 'hidden'}`} playsInline muted />
        <div className="absolute inset-0 flex items-center justify-center">
           {error && (
              <div className="text-center space-y-4 text-red-400 p-4">
                  <AlertTriangle className="w-16 h-16 mx-auto" />
                  <p className="font-semibold">Camera Error</p>
                  <p className="text-sm text-neutral-400 max-w-sm">{error}</p>
              </div>
           )}
          {!isCameraOn && !error && (
            <div className="text-center space-y-4">
              <Camera className="w-16 h-16 mx-auto text-lime-400" />
              <p className="text-neutral-400">Starting camera...</p>
            </div>
          )}
          {isProcessing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto border-4 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-lime-400 font-semibold">Translating sign...</p>
                </div>
            </div>
          )}
        </div>
        <div className="absolute top-4 right-4">
          {isCameraOn ? <div className="w-6 h-6 text-lime-400" /> : <VideoOff className="w-6 h-6 text-red-400" />}
        </div>
      </div>

      <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-neutral-400">RAW SIGN GLOSS</label>
          <span className="text-xs bg-lime-400/20 text-lime-400 px-2 py-1 rounded">Real-time</span>
        </div>
        <div className="min-h-[60px] text-xl font-mono text-lime-400 break-words">
          {rawGloss || 'Signs will appear here...'}
        </div>
      </div>

      <div className="bg-gradient-to-br from-lime-400/10 to-transparent rounded-xl border-2 border-lime-400/30 p-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-lime-400">AI-REFINED TRANSLATION</label>
          <span className="text-xs bg-lime-400 text-neutral-950 px-2 py-1 rounded font-semibold">Enhanced</span>
        </div>
        <div className="min-h-[60px] text-xl break-words">
          {refinedText || 'Natural language translation will appear here...'}
        </div>
      </div>

      <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-4">
        <label className="text-sm font-semibold text-neutral-400 mb-3 block">HEARING PERSON RESPONSE</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={speakerInput}
            onChange={(e) => setSpeakerInput(e.target.value)}
            placeholder="Type your response here..."
            className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-lime-400 transition-colors"
          />
          <button className="bg-lime-400 text-neutral-950 p-3 rounded-lg hover:bg-lime-300 transition-all">
            <Mic className="w-5 h-5" />
          </button>
          <button className="bg-lime-400 text-neutral-950 p-3 rounded-lg hover:bg-lime-300 transition-all">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={handleStartSigning}
          disabled={isProcessing || !isCameraOn || !!error}
          className="flex-1 bg-lime-400 text-neutral-950 py-4 rounded-xl font-semibold text-lg hover:bg-lime-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Translating...' : 'Translate Current Sign'}
        </button>
        <button 
            onClick={handleReset}
            className="px-6 py-4 border-2 border-neutral-700 rounded-xl hover:border-lime-400 transition-all"
        >
            <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ConversationTab;
