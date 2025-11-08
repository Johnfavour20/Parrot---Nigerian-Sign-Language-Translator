import { useState, useRef, useCallback } from 'react';

export const useCamera = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    if (streamRef.current) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      streamRef.current = stream;
      setIsCameraOn(true);
      setError(null);
    } catch (err) {
      console.error("Error accessing camera:", err);
      if (err instanceof DOMException) {
         setError(`Camera access denied: ${err.message}. Please enable camera permissions in your browser settings.`);
      } else {
         setError("An unexpected error occurred while accessing the camera.");
      }
      setIsCameraOn(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraOn(false);
    }
  }, []);

  const captureFrame = useCallback((): string | null => {
    if (!videoRef.current) return null;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) return null;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    // The Gemini API expects a base64 string without the data URL prefix.
    return canvas.toDataURL('image/jpeg').split(',')[1];
  }, []);

  return { videoRef, isCameraOn, error, startCamera, stopCamera, captureFrame };
};
