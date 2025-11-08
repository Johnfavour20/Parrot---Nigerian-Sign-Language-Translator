import React, { useState, useEffect } from 'react';
import { Zap, AlertTriangle } from 'lucide-react';
import { useCamera } from '../hooks/useCamera';
import { quickNslDetection } from '../services/geminiService';

interface DetectedSign {
    word: string;
    confidence: number;
}

const QuickTranslateTab: React.FC = () => {
    const [detectedSign, setDetectedSign] = useState<DetectedSign | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { videoRef, isCameraOn, error, startCamera, stopCamera, captureFrame } = useCamera();

    useEffect(() => {
        startCamera();
        return () => {
            stopCamera();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDetect = async () => {
        setDetectedSign(null);
        setIsLoading(true);
        const frame = captureFrame();
        if (!frame) {
            alert("Could not capture frame from camera.");
            setIsLoading(false);
            return;
        }
        const result = await quickNslDetection(frame);
        setDetectedSign(result);
        setIsLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 pt-8 space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Quick Translate</h1>
                <p className="text-neutral-400">Single sign recognition</p>
            </div>

            <div className="relative bg-neutral-900 rounded-2xl border-2 border-neutral-800 overflow-hidden aspect-video">
                <video ref={videoRef} className={`w-full h-full object-cover ${!isCameraOn && 'hidden'}`} playsInline muted />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    {error && (
                        <div className="text-center space-y-4 text-red-400">
                            <AlertTriangle className="w-16 h-16 mx-auto" />
                            <p className="font-semibold">Camera Error</p>
                            <p className="text-sm text-neutral-400 max-w-sm">{error}</p>
                        </div>
                    )}
                    {!isCameraOn && !error && (
                        <div className="text-center space-y-4">
                            <Zap className="w-16 h-16 mx-auto text-lime-400" />
                            <p className="text-neutral-400">Starting camera...</p>
                        </div>
                    )}
                    {isCameraOn && !detectedSign && !isLoading && (
                        <div className="text-center space-y-4 bg-black/50 p-6 rounded-xl backdrop-blur-sm">
                            <Zap className="w-16 h-16 mx-auto text-lime-400" />
                            <p className="text-neutral-200">Hold up a sign and press detect</p>
                        </div>
                    )}
                    {isLoading && (
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 mx-auto border-4 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-lime-400 font-semibold">Detecting...</p>
                        </div>
                    )}
                    {detectedSign && (
                        <div className="text-center space-y-6 p-8 bg-black/60 rounded-2xl backdrop-blur-md">
                            <div className="text-7xl animate-bounce-slow">✋</div>
                            <div className="text-6xl font-bold text-lime-400">{detectedSign.word}</div>
                            <div className="text-2xl text-neutral-400">
                                Confidence: <span className="text-lime-400 font-bold">{detectedSign.confidence}%</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={handleDetect}
                disabled={isLoading || !isCameraOn || !!error}
                className="w-full bg-lime-400 text-neutral-950 py-4 rounded-xl font-semibold text-lg hover:bg-lime-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Detecting...' : detectedSign ? 'Detect Another Sign' : 'Start Detection'}
            </button>
        </div>
    );
};

export default QuickTranslateTab;
