import React, { useEffect } from 'react';
import { useSurveyStore } from '../store';

export function BreakView() {
  const { nextRound } = useSurveyStore();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        nextRound();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [nextRound]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Take a Brief Break
        </h2>
        <p className="text-gray-600 mb-6">
          Well done! Take a moment to rest your eyes before the next round.
        </p>
        <p className="text-blue-600 font-semibold">
          Press Enter when you're ready to continue
        </p>
      </div>
    </div>
  );
}