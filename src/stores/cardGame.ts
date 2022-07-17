import { defineStore } from 'pinia';
import { getCardsGameState, setCardsGameState } from '../helpers/localStorage';
import { useClockStore } from './clock';

export const useCardGameStore = defineStore('cardGame', {
  state: () => {
    return {
      isCardGameStarted: false,
      cardComponentKey: 0,
      clicks: 0,
      gamesPlayed: getCardsGameState()?.gameNumber || 0,
      allowNextGame: getCardsGameState()?.allowNextGame || false,
    };
  },
  actions: {
    startCardGame() {
      const { startClock } = useClockStore();
      this.clicks = 0;
      this.isCardGameStarted = true;
      startClock();
    },
    stopCardGame() {
      const { stopClock } = useClockStore();
      this.isCardGameStarted = false;
      stopClock();
    },
    incrementClicks() {
      this.clicks++;
    },
    incrementGamesPlayed() {
      const gamesTotal = 7;
      this.gamesPlayed++;
      if (this.gamesPlayed < gamesTotal) {
        setCardsGameState(false, this.gamesPlayed, false);
      } else {
        this.allowNextGame = true;
        setCardsGameState(false, gamesTotal, true);
      }
    },
    resetGamesPlayed() {
      this.gamesPlayed = 0;
      this.allowNextGame = false;
      this.reRenderCardGameComponent();
    },
    reRenderCardGameComponent() {
      this.cardComponentKey++;
    },
  },
});
