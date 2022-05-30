import { defineStore } from 'pinia';
import { useClockStore } from './clock';

export const useCardGameStore = defineStore('cardGame', {
  state: () => {
    return {
      startTime: 0,
      time: 0,
      isCardGameStarted: false,
      cardComponentKey: 0,
      clicks: 0,
    };
  },
  actions: {
    startCardGame() {
      const { startClock } = useClockStore();
      this.clicks = 0;
      this.startTime = new Date().getTime();
      this.isCardGameStarted = true;
      startClock();
    },
    stopCardGame() {
      const { stopClock } = useClockStore();
      const currentTime = new Date();
      this.time = currentTime.getTime() - this.startTime;
      this.isCardGameStarted = false;
      stopClock();
    },
    incrementClicks() {
      this.clicks++;
    },
    reRenderCardGameComponent() {
      this.cardComponentKey++;
    },
    getGameTime(time: number) {
      const gameTime = time - this.startTime;
      const timeObj = new Date(gameTime);
      const seconds =
        timeObj.getSeconds() < 10
          ? '0' + timeObj.getSeconds().toString()
          : timeObj.getSeconds().toString();
      return `${timeObj.getMinutes()}:${seconds}`;
    },
    dateToGameTime(time: number) {
      const timeObj = new Date(time);
      const seconds =
        timeObj.getSeconds() < 10
          ? '0' + timeObj.getSeconds().toString()
          : timeObj.getSeconds().toString();
      return `${timeObj.getMinutes()}:${seconds}`;
    },
  },
});
