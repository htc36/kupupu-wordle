import { defineStore } from 'pinia';

export const useClockStore = defineStore('clock', {
  state: () => ({
    clockTime: 0,
    clockStartTime: 0,
    clockIntervalId: 0,
  }),
  actions: {
    startClock() {
      this.clockStartTime = new Date().getTime();
      this.clockIntervalId = setInterval(() => {
        this.clockTime = new Date().getTime() - this.clockStartTime;
      }, 1000);
    },
    stopClock() {
      if (this.clockIntervalId !== 0) {
        clearInterval(this.clockIntervalId);
      }
      this.clockIntervalId = 0;
      return this.clockTime;
    },
    getGameTime() {
      const timeMilliseconds = this.clockTime;
      const timeObj = new Date(timeMilliseconds);
      const seconds =
        timeObj.getSeconds() < 10
          ? '0' + timeObj.getSeconds().toString()
          : timeObj.getSeconds().toString();
      return `${timeObj.getMinutes()}:${seconds}`;
    },
  },
});
