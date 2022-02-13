interface AllGameStats {
  currentStreak: number;
  maxStreak: number;
  guesses: Guesses;
  winPercentage: number;
  gamesPlayed: number;
  gamesWon: number;
  averageGuesses: number;
}
export interface Guesses {
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
  guesses: { '1': 0, '2': 0, '3': 3, '4': 0, '5': 2, '6': 1, F: 0 },
  winPercentage: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  averageGuesses: 0,
};
function getStats(): AllGameStats {
  console.log('inside get stats');
  const statsString = window.localStorage.getItem('wordleStats');
  return statsString ? JSON.parse(statsString) : defaultStats;
}
function setStats(statsObj: AllGameStats) {
  console.log('Setting new stats', statsObj);
  window.localStorage.setItem('wordleStats', JSON.stringify(statsObj));
}
export { getStats, setStats, AllGameStats };
