export interface CardAudio {
  [key: string]: string;
}
export const enum LetterState {
  INITIAL = 0,
  CORRECT = 'correct',
  PRESENT = 'present',
  ABSENT = 'absent',
}
export const enum statsTitle {
  PREVTIME = 'Prev. Time',
  BESTTIME = 'Best Time',
  AVGTIME = 'Avg Time',
  PREVCLICKS = 'Prev. Clicks',
  AVGCLICKS = 'Avg Clicks',
}

export const enum ModalNames {
  voiceRecordModal = 'voiceRecordModal',
  donationModal = 'donationModal',
  settingsModal = 'settingsModal',
  statsModal = 'statsModal',
  wordDefinitionModal = 'wordDefinitionModal',
  cardGameFinishedModal = 'cardGameFinishedModal',
}
export const enum GameNames {
  Kupu = 'Kupu',
  Rerenga = 'Rerenga',
}
export const enum TabNames {
  KupuStats = 'Kupu',
  RerengaStats = 'Rerenga',
  Settings = 'ngā tautuhi',
  AboutUs = 'mo mātau',
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

export interface CardsThemeResponse {
  id?: number;
  theme?: string;
}

export const enum apiResponseTypes {
  cards = 'cards',
  wordle = 'wordle',
}

export interface CardObj {
  index?: number;
  isTextCard?: boolean;
  game_id: number;
  pdf_id: string;
  word_id: string;
  word_tereo: string;
  word_eng: string;
  word_img: string;
  word_aud: string;
}

export interface localCardsObject {
  cardsPrepared: CardObj[];
  game_id: number;
  date?: string;
  apiResponseCards: ApiResponseCards;
}

export interface ApiResponseWordle {
  kupupu: {
    id: number;
    name_eng: string;
    name_tereo: string;
    image: string;
    audio: string;
    description: string;
  }[];
  count: number;
}

export interface ApiResponseCards {
  kupuhi: CardObj[];
}

export interface Board {
  letter: string;
  state: LetterState;
}

export interface CardsGameState {
  gameNumber: number;
  allowNextGame: boolean;
}
export interface WordleGameState {
  solution: string;
  lastCompletedId: number | null;
  isGameFinished: boolean;
  board: Board[][];
  letterState: Record<string, LetterState>;
  currentRowIndex: number;
}
export interface GameSettings {
  shouldPlaySound: boolean;
  shouldShowImage: boolean;
}
export interface WordleGameStats {
  currentStreak: number;
  maxStreak: number;
  guesses: Guesses;
  gamesPlayed: number;
  gamesWon: number;
  averageGuesses: number;
}

export interface Clock {
  secondsFinished: number;
  minutesFinished: number;
}

export interface StatObject {
  value: number;
  title: string;
}
export interface StatListObject {
  value: number[];
  title: string;
}
export interface CardGameStats {
  times: {
    prevTime: StatObject;
    bestTime: StatObject;
    avgTime: StatListObject;
  };
  clicks: { prevClicks: StatObject; avgClicks: StatListObject };
}

export interface CardGameStatsOld {
  lastGameTime: Clock;
  bestTime?: Clock;
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

export interface TimeToNextType {
  wordleNextTime: string;
  cardsNextTime: string;
}
