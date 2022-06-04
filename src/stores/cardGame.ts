import { defineStore } from 'pinia';
import { useClockStore } from './clock';

export const useCardGameStore = defineStore('cardGame', {
  state: () => {
    return {
      prevGametime: 0,
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
      this.prevGametime = stopClock();
    },
    incrementClicks() {
      this.clicks++;
    },
    reRenderCardGameComponent() {
      this.cardComponentKey++;
    },
  },
});
