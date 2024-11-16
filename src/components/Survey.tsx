import React, { useState, useEffect } from 'react';
import { useSurveyStore } from '../store';
import { surveyRounds } from '../data';
import { Timer } from 'lucide-react';

export function Survey() {
  const { currentRound, addRoundResult, nextRound, setCurrentStep } = useSurveyStore();
  const [timeLeft, setTimeLeft] = useState(25);
  const [answers, setAnswers] = useState<number[]>([]);
  const [answerTimes, setAnswerTimes] = useState<number[]>([]);
  const [startTime] = useState(Date.now());

  const round = surveyRounds[currentRound];

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleRoundComplete();
    }
  }, [timeLeft]);

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);

    const timeTaken = (Date.now() - startTime) / 1000;
    const newAnswerTimes = [...answerTimes];
    newAnswerTimes[questionIndex] = timeTaken;
    setAnswerTimes(newAnswerTimes);

    if (newAnswers.filter(a => a !== undefined).length === round.questions.length) {
      handleRoundComplete();
    }
  };

  const handleRoundComplete = () => {
    const roundResult = {
      roundNumber: currentRound,
      answers: round.questions.map((q, i) => ({
        questionId: q.id,
        selectedAnswer: answers[i] ?? -1,
        timeTaken: answerTimes[i] ?? 25,
        isCorrect: answers[i] === q.correctAnswer,
      })),
    };

    addRoundResult(roundResult);

    if (currentRound < surveyRounds.length - 1) {
      nextRound();
      setTimeLeft(25);
      setAnswers([]);
      setAnswerTimes([]);
    } else {
      setCurrentStep('summary');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Round {currentRound + 1}/{surveyRounds.length}
            </h2>
            <div className="flex items-center space-x-2 text-blue-600">
              <Timer size={24} />
              <span className="text-xl font-semibold">{timeLeft}s</span>
            </div>
          </div>

          <img
            src={round.imageUrl}
            alt={`Round ${currentRound + 1} image`}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          <div className="space-y-6">
            {round.questions.map((question, qIndex) => (
              <div key={question.id} className="bg-gray-50 rounded-lg p-4">
                <p className="text-lg font-medium text-gray-800 mb-3">
                  {qIndex + 1}. {question.text}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {question.options.map((option, oIndex) => (
                    <button
                      key={oIndex}
                      onClick={() => handleAnswer(qIndex, oIndex)}
                      className={`p-3 rounded-lg text-left transition ${
                        answers[qIndex] === oIndex
                          ? 'bg-blue-600 text-white'
                          : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}