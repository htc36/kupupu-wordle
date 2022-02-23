export const enum LetterState {
  INITIAL = 0,
  CORRECT = 'correct',
  PRESENT = 'present',
  ABSENT = 'absent',
}
export interface Board {
  letter: string;
  state: LetterState;
}
export interface GameState {
  solution: string;
  lastCompleted: string | null;
  isGameFinished: Boolean;
  board: Board[][];
  letterState: Record<string, LetterState>;
  currentRowIndex: number;
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
