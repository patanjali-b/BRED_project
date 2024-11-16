import React, { useState } from 'react';
import { useSurveyStore } from '../store';
import { ClipboardCopy, CheckCircle2, Timer, XCircle } from 'lucide-react';

export function Summary() {
  const { results, user } = useSurveyStore();
  const [copied, setCopied] = useState(false);

  const formatResultsJSON = () => {
    const summary = {
      participant: {
        name: user?.name,
        contact: user?.phone,
      },
      rounds: [] as { round: number; questions: { question: number; isCorrect: boolean; timeTaken: number; }[] }[],
      finalScore: {
        totalQuestions: 0,
        totalCorrect: 0,
        averageTime: 0,
      },
    };

    let totalCorrect = 0;
    let totalQuestions = 0;
    let totalTime = 0;

    results.forEach((round, roundIndex) => {
      const roundData: { round: number; questions: { question: number; isCorrect: boolean; timeTaken: number; }[] } = {
        round: roundIndex + 1,
        questions: [],
      };

      round.answers.forEach((answer, qIndex) => {
        totalQuestions++;
        if (answer.isCorrect) totalCorrect++;
        totalTime += answer.timeTaken;

        roundData.questions.push({
          question: qIndex + 1,
          isCorrect: answer.isCorrect,
          timeTaken: answer.timeTaken,
        });
      });

      summary.rounds.push(roundData);
    });

    summary.finalScore = {
      totalQuestions,
      totalCorrect,
      averageTime: totalTime / totalQuestions,
    };

    return summary;
  };

  const resultJSON = JSON.stringify(formatResultsJSON(), null, 2);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(resultJSON);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              Survey Complete! 🎉
            </h1>
            <p className="text-gray-600">
              Thank you for participating in our visual survey challenge
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={handleCopyToClipboard}
              className={`flex items-center justify-center space-x-2 w-full ${
                copied
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white font-semibold py-3 px-6 rounded-lg transition duration-200`}
            >
              <ClipboardCopy size={20} />
              <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
