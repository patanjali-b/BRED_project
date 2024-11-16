import React, { useState } from 'react';
import { useSurveyStore } from '../store';
import { surveyRounds } from '../data';
import { Timer } from 'lucide-react';

export function QuestionView() {
  const {
    currentRound,
    currentQuestion,
    nextQuestion,
    addRoundResult,
    setCurrentStep,
  } = useSurveyStore();

  const [startTime, setStartTime] = useState(Date.now());
  const [answer, setAnswer] = useState<number | null>(null);
  const [roundAnswers, setRoundAnswers] = useState<{ questionId: number; selectedAnswer: number; timeTaken: number; isCorrect: boolean; }[]>([]); // Track answers for the current round

  const round = surveyRounds[currentRound];
  const question = round.questions[currentQuestion];

  const handleAnswer = (answerIndex: number) => {
    const timeTaken = (Date.now() - startTime) / 1000;

    setAnswer(answerIndex);

    // Create partial result for this question
    const questionResult = {
      questionId: question.id,
      selectedAnswer: answerIndex,
      timeTaken,
      isCorrect: answerIndex === question.correctAnswer,
    };

    console.log('Question result:', questionResult);

    // Update the answers for the current round
    setRoundAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestion] = questionResult; // Update or insert the result at the current index
      return updatedAnswers;
    });


    // If this is the last question in the round
    if (currentQuestion === round.questions.length - 1) {
      addRoundResult({
        roundNumber: currentRound,
        answers: [...roundAnswers, questionResult], // Pass all answers
      });

      if (currentRound === surveyRounds.length - 1) {
        setCurrentStep('summary'); // Move to summary if it's the last round
      } else {
        setCurrentStep('break'); // Otherwise, move to the break step
      }
    } else {
      setTimeout(() => {
        nextQuestion();
        setAnswer(null);
        setStartTime(Date.now()); // Reset start time for the next question
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Question {currentQuestion + 1} of {round.questions.length}
            </h2>
            <div className="text-gray-600">Round {currentRound + 1}</div>
          </div>

          <div className="space-y-6">
            <p className="text-lg font-medium text-gray-800 mb-6">
              {question.text}
            </p>
            <div className="grid grid-cols-1 gap-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => answer === null && handleAnswer(index)}
                  className={`p-4 rounded-lg text-left transition ${answer === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  disabled={answer !== null}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
