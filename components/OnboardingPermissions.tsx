import React, { useEffect } from 'react';
import { Camera, AlertTriangle } from 'lucide-react';
import { useCamera } from '../hooks/useCamera';

interface OnboardingPermissionsProps {
  onGranted: () => void;
}

const OnboardingPermissions: React.FC<OnboardingPermissionsProps> = ({ onGranted }) => {
  const { isCameraOn, error, startCamera, stopCamera } = useCamera();

  useEffect(() => {
    // When camera successfully turns on, grant permission and immediately stop it.
    // We only want to get the permission at this stage, not keep the camera running.
    if (isCameraOn) {
      stopCamera();
      onGranted();
    }
  }, [isCameraOn, stopCamera, onGranted]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-lg text-center bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-10 space-y-8">
        <Camera className="w-20 h-20 mx-auto text-lime-400" />
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold">Camera Access Required</h1>
          <p className="text-neutral-400">Parrot needs access to your camera to translate Nigerian Sign Language in real-time. Your camera is only used for translation and your video is never stored.</p>
        </div>

        {error && (
            <div className="text-center space-y-2 text-red-400 p-4 bg-red-400/10 rounded-lg">
                <AlertTriangle className="w-8 h-8 mx-auto" />
                <p className="font-semibold">Permission Denied</p>
                <p className="text-sm text-neutral-400">{error}</p>
            </div>
        )}

        <button
          onClick={startCamera}
          className="w-full bg-lime-400 text-neutral-950 py-3 rounded-lg font-semibold text-lg hover:bg-lime-300 transition-all flex items-center justify-center space-x-2"
        >
          <Camera className="w-5 h-5" />
          <span>Grant Access</span>
        </button>
        <p className="text-xs text-neutral-500">You can change this setting in your browser at any time.</p>
      </div>
    </div>
  );
};

export default OnboardingPermissions;