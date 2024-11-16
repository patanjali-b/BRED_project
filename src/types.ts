export interface User {
  name: string;
  gender: 'male' | 'female' | 'prefer_not_to_say';
  age: string;
  phone: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Round {
  imageUrl: string;
  questions: Question[];
}

export interface Answer {
  questionId: number;
  selectedAnswer: number;
  timeTaken: number;
  isCorrect: boolean;
}

export interface RoundResult {
  roundNumber: number;
  answers: Answer[];
}

export type SurveyStep = 
  | 'registration'
  | 'image'
  | 'question'
  | 'break'
  | 'summary';