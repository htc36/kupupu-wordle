import { defineStore } from 'pinia';
import { useClockStore } from './clock';

export const useCardGameStore = defineStore('cardGame', {
  state: () => {
    return {
      isCardGameStarted: false,
      cardComponentKey: 0,
      clicks: 0,
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
    reRenderCardGameComponent() {
      this.cardComponentKey++;
    },
  },
});
