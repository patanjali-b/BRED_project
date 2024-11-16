import React, { useState, useEffect } from 'react';
import { useSurveyStore } from '../store';
import { surveyRounds } from '../data';
import { Timer } from 'lucide-react';

export function ImageView() {
  const { currentRound, setCurrentStep } = useSurveyStore();
  const [timeLeft, setTimeLeft] = useState(25);
  const round = surveyRounds[currentRound];

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCurrentStep('question');
    }
  }, [timeLeft, setCurrentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Round {currentRound + 1} - Study the Image
            </h2>
            <div className="flex items-center space-x-2 text-blue-600">
              <Timer size={24} />
              <span className="text-xl font-semibold">{timeLeft}s</span>
            </div>
          </div>

          <img
            src={round.imageUrl}
            alt={`Round ${currentRound + 1} image`}
            className="w-full h-[70vh] object-cover rounded-lg"
          />

          <p className="mt-4 text-center text-gray-600">
            Study the image carefully. Questions will appear after the timer ends.
          </p>
        </div>
      </div>
    </div>
  );
}