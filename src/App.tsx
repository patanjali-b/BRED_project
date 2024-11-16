import React from 'react';
import { useSurveyStore } from './store';
import { Registration } from './components/Registration';
import { ImageView } from './components/ImageView';
import { QuestionView } from './components/QuestionView';
import { BreakView } from './components/BreakView';
import { Summary } from './components/Summary';

function App() {
  const { currentStep } = useSurveyStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {currentStep === 'registration' && <Registration />}
      {currentStep === 'image' && <ImageView />}
      {currentStep === 'question' && <QuestionView />}
      {currentStep === 'break' && <BreakView />}
      {currentStep === 'summary' && <Summary />}
    </div>
  );
}

export default App;