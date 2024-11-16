import { create } from 'zustand';
import { User, RoundResult, SurveyStep } from './types';

interface SurveyState {
  currentStep: SurveyStep;
  currentRound: number;
  currentQuestion: number;
  user: User | null;
  results: RoundResult[];
  setUser: (user: User) => void;
  setCurrentStep: (step: SurveyStep) => void;
  addRoundResult: (result: RoundResult) => void;
  nextRound: () => void;
  nextQuestion: () => void;
  resetQuestion: () => void;
}

export const useSurveyStore = create<SurveyState>((set) => ({
  currentStep: 'registration',
  currentRound: 0,
  currentQuestion: 0,
  user: null,
  results: [],
  setUser: (user) => set({ user }),
  setCurrentStep: (step) => set({ currentStep: step }),
  addRoundResult: (result) =>
    set((state) => ({ results: [...state.results, result] })),
  nextRound: () =>
    set((state) => ({ 
      currentRound: state.currentRound + 1,
      currentQuestion: 0,
      currentStep: 'image'
    })),
  nextQuestion: () =>
    set((state) => ({ currentQuestion: state.currentQuestion + 1 })),
  resetQuestion: () =>
    set({ currentQuestion: 0 }),
}));