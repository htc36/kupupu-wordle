// ESlint has a bug with typescript, so we need to disable it for this file
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LetterState } from '../types';
import {
  WordleGameStats,
  GameState,
  GameSettings,
  WordResponse,
  CardGameStats,
} from '../types';
const wordleStatsDefault: WordleGameStats = {
  currentStreak: 0,
  maxStreak: 0,
  guesses: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, F: 0 },
  gamesPlayed: 0,
  gamesWon: 0,
  averageGuesses: 0,
};
const cardStatsDefault: CardGameStats = {
  lastGameTime: { secondsFinished: 0, minutesFinished: 0 },
};
export const defaultGameSettings: GameSettings = {
  shouldPlaySound: true,
  shouldShowImage: true,
};
export function getStats(
  gameName: 'wordleStats' | 'cardStats'
): WordleGameStats | CardGameStats {
  const statsString = window.localStorage.getItem(gameName);
  if (!statsString) {
    return gameName === 'wordleStats' ? wordleStatsDefault : cardStatsDefault;
  }
  return JSON.parse(statsString) as WordleGameStats | CardGameStats;
}
export function setWordleStats(statsObj: WordleGameStats, guessLine: number) {
  if (guessLine < 5) {
    statsObj.currentStreak += 1;
    statsObj.guesses[guessLine + 1] += 1;
    statsObj.maxStreak =
      statsObj.maxStreak < statsObj.currentStreak
        ? statsObj.currentStreak
        : statsObj.maxStreak;
    statsObj.gamesWon += 1;
  } else {
    statsObj.currentStreak = 0;
    statsObj.guesses['F'] += 1;
  }
  statsObj.gamesPlayed += 1;
  window.localStorage.setItem('wordleStats', JSON.stringify(statsObj));
}
export function setCardStats(statsObj: CardGameStats) {
  const { lastGameTime } = statsObj;
  const gameStats = getStats('cardStats') as CardGameStats;

  if (!gameStats.bestTime) {
    window.localStorage.setItem(
      'cardStats',
      JSON.stringify({ ...statsObj, bestTime: { ...lastGameTime } })
    );
    return;
  } else {
    const currentTotalSeconds =
      lastGameTime.minutesFinished * 60 + lastGameTime.secondsFinished;
    const bestTotalSeconds =
      gameStats.bestTime.minutesFinished * 60 +
      gameStats.bestTime.secondsFinished;
    if (currentTotalSeconds < bestTotalSeconds) {
      window.localStorage.setItem(
        'cardStats',
        JSON.stringify({ ...statsObj, bestTime: { ...lastGameTime } })
      );
    } else {
      window.localStorage.setItem(
        'cardStats',
        JSON.stringify({ ...gameStats, ...statsObj })
      );
    }
  }
}
export function getSolutionObject() {
  const solutionObjectString = window.localStorage.getItem('solutionObject');
  if (solutionObjectString) {
    return JSON.parse(solutionObjectString);
  }
  return;
}
export function setSolutionObject(solutionObj: WordResponse, date: string) {
  const solutionObjToSave = { ...solutionObj, ...{ date } };
  window.localStorage.setItem(
    'solutionObject',
    JSON.stringify(solutionObjToSave)
  );
  return;
}

export function getDefaultGameState() {
  const defaultBoard = Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => ({
      letter: '',
      state: LetterState.INITIAL,
    }))
  );
  const gameState: GameState = {
    solution: '',
    lastCompleted: null,
    isGameFinished: false,
    board: defaultBoard,
    letterState: {},
    currentRowIndex: 0,
  };
  return gameState;
}

export function getGameState(solution: string) {
  const existingGameState: GameState = JSON.parse(
    window.localStorage.getItem('gameState') as string
  );
  if (existingGameState && existingGameState.solution === solution) {
    return JSON.parse(
      window.localStorage.getItem('gameState') as string
    ) as GameState;
  }
  return false;
}
export function getBoard() {
  const existingGameState: GameState = JSON.parse(
    window.localStorage.getItem('gameState') as string
  );
  return existingGameState.board;
}

export function setGameSettings(gameSettingsObj: GameSettings) {
  window.localStorage.setItem('gameSettings', JSON.stringify(gameSettingsObj));
}

export function getGameSettings() {
  const existingSettings = JSON.parse(
    window.localStorage.getItem('gameSettings') as string
  );
  if (!existingSettings) return defaultGameSettings;
  return existingSettings;
}
export function setGameState(gameState: GameState) {
  window.localStorage.setItem('gameState', JSON.stringify(gameState));
}
