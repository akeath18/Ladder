
export interface DispositionCard {
  id: string;
  letter: string;
  title: string;
  skilled: string[];
  overused: string[];
  unskilled: string[];
  isVowel: boolean;
  seeAlso?: string;
}

export type CategoryType = 'deck' | 'strength' | 'standard' | 'stressor';

export interface BoardState {
  deck: string[];
  strength: (string | null)[];
  standard: (string | null)[];
  stressor: (string | null)[];
}

export interface DevelopmentPlanData {
  selectedCardId: string | null;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
  step6: string;
  step7: string;
  step8: string;
  step9: string;
  step10: string;
  studentName: string;
  date: string;
}

export type AppView = 'dashboard' | 'plan';
