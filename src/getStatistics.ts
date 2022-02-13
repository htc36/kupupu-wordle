interface AllGameStats {
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

const defaultStats: AllGameStats = {
  currentStreak: 0,
  maxStreak: 0,
  guesses: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, F: 0 },
  gamesPlayed: 0,
  gamesWon: 0,
  averageGuesses: 0,
};
function getStats(): AllGameStats {
  console.log('inside get stats');
  const statsString = window.localStorage.getItem('wordleStats');
  console.log('LOCAL STATS STRING', statsString);
  return statsString ? JSON.parse(statsString) : defaultStats;
}
function setStats(statsObj: AllGameStats, guessLine: number) {
  console.log(statsObj);
  console.log(guessLine);
  if (guessLine < 5) {
    console.log('Has won the game');
    statsObj.currentStreak += 1;
    statsObj.guesses[guessLine + 1] += 1;
    statsObj.maxStreak = statsObj.maxStreak < statsObj.currentStreak ? statsObj.currentStreak : statsObj.maxStreak;
    statsObj.gamesWon += 1;
  } else {
    statsObj.currentStreak = 0;
    statsObj.guesses['F'] += 1;
  }
  statsObj.gamesPlayed += 1;
  console.log('Setting new stats', statsObj);
  window.localStorage.setItem('wordleStats', JSON.stringify(statsObj));
}
export { getStats, setStats, AllGameStats };
