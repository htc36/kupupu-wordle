export const enum LetterState {
  INITIAL = 0,
  CORRECT = 'correct',
  PRESENT = 'present',
  ABSENT = 'absent',
}

export const enum ModalNames {
  settingsModal = 'settingsModal',
  statsModal = 'statsModal',
  wordDefinitionModal = 'wordDefinitionModal',
  cardGameFinishedModal = 'cardGameFinishedModal',
}

export interface WordResponse {
  date?: string;
  id: number;
  name_eng: string;
  name_tereo: string;
  image: string;
  audio: string;
  description: string;
}

export interface CardObj {
  sound?: string;
  image?: string;
  answer: string;
  index?: number;
  id?: number;
  isTextCard?: boolean;
  cardLocked?: boolean;
}
export interface Board {
  letter: string;
  state: LetterState;
}
export interface GameState {
  solution: string;
  lastCompleted: string | null;
  isGameFinished: boolean;
  board: Board[][];
  letterState: Record<string, LetterState>;
  currentRowIndex: number;
}
export interface GameSettings {
  shouldPlaySound: boolean;
  shouldShowImage: boolean;
}
export interface AllGameStats {
  currentStreak: number;
  maxStreak: number;
  guesses: Guesses;
  gamesPlayed: number;
  gamesWon: number;
  averageGuesses: number;
}
export interface Guesses {
  [key: string]: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  F: number;
}
