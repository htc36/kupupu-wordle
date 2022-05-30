import { defineStore } from 'pinia';

export const useClockStore = defineStore('clock', {
  state: () => ({
    clockSeconds: 0,
    clockMinutes: 0,
    clockIntervalId: 0,
  }),
  getters: {
    getSeconds: (state) => state.clockSeconds,
    getMinutes: (state) => state.clockMinutes,
  },
  actions: {
    startClock() {
      this.clockSeconds = 0;
      this.clockMinutes = 0;
      this.clockIntervalId = setInterval(() => {
        this.clockSeconds = ++this.clockSeconds % 60;
        this.clockMinutes = Math.floor(this.clockSeconds / 60);
      }, 1000);
    },
    stopClock() {
      if (this.clockIntervalId !== 0) {
        clearInterval(this.clockIntervalId);
      }
      this.clockIntervalId = 0;
    },
  },
});
