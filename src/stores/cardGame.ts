import { defineStore } from 'pinia';
import { useClockStore } from './clock';

export const useCardGameStore = defineStore('cardGame', {
  state: () => {
    return {
      isCardGameStarted: false,
      cardComponentKey: 0,
    };
  },
  actions: {
    startCardGame() {
      const { startClock } = useClockStore();
      this.isCardGameStarted = true;
      startClock();
    },
    stopCardGame() {
      const { stopClock } = useClockStore();
      this.isCardGameStarted = false;
      stopClock();
    },
    reRenderCardGameComponent() {
      this.cardComponentKey++;
    },
  },
});
