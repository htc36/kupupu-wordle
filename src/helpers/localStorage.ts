import { LetterState, GameNames, localCardsObject } from '../types';
import {
  WordleGameStats,
  WordleGameState,
  GameSettings,
  WordResponse,
  CardGameStats,
  CardsGameState,
} from '../types';

export const wordleStatsDefault: WordleGameStats = {
  currentStreak: 0,
  maxStreak: 0,
  guesses: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, F: 0 },
  gamesPlayed: 0,
  gamesWon: 0,
  averageGuesses: 0,
};
const cardStatsDefault: CardGameStats = {
  times: {
    prevTime: { value: 0, title: 'Prev. Time' },
    bestTime: { value: 0, title: 'Best Time' },
    avgTime: { value: [], title: 'Avg Time' },
  },
  clicks: {
    prevClicks: { value: 0, title: 'Prev. Clicks' },
    avgClicks: { value: [], title: 'Avg Clicks' },
  },
};
export const defaultGameSettings: GameSettings = {
  shouldPlaySound: true,
  shouldShowImage: true,
};
export function getStats(gameName: GameNames): WordleGameStats | CardGameStats {
  const statsString = window.localStorage.getItem(`${gameName + 'Stats'}`);
  if (!statsString) {
    window.localStorage.setItem(
      `${GameNames.Kupu + 'Stats'}`,
      JSON.stringify(wordleStatsDefault)
    );
    return gameName === GameNames.Kupu ? wordleStatsDefault : cardStatsDefault;
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
  window.localStorage.setItem(
    `${GameNames.Kupu + 'Stats'}`,
    JSON.stringify(statsObj)
  );
}
export function setCardStats(gameTime: number, clicks: number) {
  const gameStats = getStats(GameNames.Rerenga) as CardGameStats;
  gameStats.times.bestTime.value =
    gameStats.times.bestTime.value == 0
      ? gameTime
      : (gameStats.times.bestTime.value = Math.min(
          gameTime,
          gameStats.times.bestTime.value
        ));
  gameStats.times.prevTime.value = gameTime;
  gameStats.clicks.prevClicks.value = clicks;
  gameStats.times.avgTime.value.push(gameTime);
  gameStats.clicks.avgClicks.value.push(clicks);

  window.localStorage.setItem(
    `${GameNames.Rerenga + 'Stats'}`,
    JSON.stringify(gameStats)
  );
}
export function getLocalStorage(gameName: GameNames) {
  const localStorage = window.localStorage.getItem(gameName);
  if (localStorage) {
    return JSON.parse(localStorage);
  }
}
export function setLocalStorage(
  gameName: GameNames,
  solutionObj: WordResponse | localCardsObject
) {
  window.localStorage.setItem(gameName, JSON.stringify(solutionObj));
}

export function getDefaultGameState() {
  const defaultBoard = Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => ({
      letter: '',
      state: LetterState.INITIAL,
    }))
  );
  const gameState: WordleGameState = {
    solution: '',
    lastCompletedId: null,
    isGameFinished: false,
    board: defaultBoard,
    letterState: {},
    currentRowIndex: 0,
  };
  return gameState;
}

//TODO: possibly combine game state functions into one
export function getCardsGameState(): CardsGameState | undefined {
  const state = window.localStorage.getItem(`${GameNames.Rerenga + 'State'}`);
  if (state) {
    return JSON.parse(state);
  } else {
    setCardsGameState(true);
  }
}
export function setCardsGameState(
  isDefault: boolean,
  newGameNumber?: number,
  allowNextGame?: boolean
) {
  const defaultState = { gameNumber: 0, allowNextGame: false };
  if (isDefault) {
    window.localStorage.setItem(
      `${GameNames.Rerenga + 'State'}`,
      JSON.stringify(defaultState)
    );
    return getCardsGameState();
  } else {
    window.localStorage.setItem(
      `${GameNames.Rerenga + 'State'}`,
      JSON.stringify({
        gameNumber: newGameNumber,
        allowNextGame: allowNextGame,
      })
    );
    return getCardsGameState();
  }
}

export function getWordleGameState(solution: string) {
  const existingGameState: WordleGameState = JSON.parse(
    window.localStorage.getItem(`${GameNames.Kupu + 'State'}`) as string
  );
  if (existingGameState && existingGameState.solution === solution) {
    return JSON.parse(
      window.localStorage.getItem(`${GameNames.Kupu + 'State'}`) as string
    ) as WordleGameState;
  }
  return false;
}
export function setWorldeGameState(gameState: WordleGameState) {
  window.localStorage.setItem(
    `${GameNames.Kupu + 'State'}`,
    JSON.stringify(gameState)
  );
}

export function getBoard() {
  const existingGameState: WordleGameState = JSON.parse(
    window.localStorage.getItem(`${GameNames.Kupu + 'State'}`) as string
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
