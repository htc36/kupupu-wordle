<script setup lang="ts">
import { AllGameStats, Guesses } from '../types';
defineProps<{
  stats: AllGameStats;
}>();
</script>

<template>
  <div class="container">
    <!-- <h1>{{ JSON.stringify(stats) }}</h1> -->
    <h1>Statistics</h1>
    <div id="statistics">
      <div class="statistic-container">
        <div class="statistic">{{ stats.gamesPlayed }}</div>
        <div class="label">Played</div>
      </div>

      <div class="statistic-container">
        <div class="statistic">
          {{
            stats.gamesPlayed === 0
              ? 0
              : ((stats.gamesWon / stats.gamesPlayed) * 100).toFixed(0)
          }}
        </div>
        <div class="label">Win %</div>
      </div>

      <div class="statistic-container">
        <div class="statistic">{{ stats.currentStreak }}</div>
        <div class="label">Current Streak</div>
      </div>

      <div class="statistic-container">
        <div class="statistic">{{ stats.maxStreak }}</div>
        <div class="label">Max Streak</div>
      </div>
    </div>
    <h1>Guess Distribution</h1>
    <div id="guess-distribution">
      <div
        v-for="(amount, guessNum) in stats.guesses"
        class="graph-container"
        v-bind:key="guessNum"
      >
        <div class="guess">{{ guessNum }}</div>
        <div class="graph">
          <!-- <div class="graph-bar" :style="`width: ${getWidth(stats.guess, guessNum, amount)}%`"> -->
          <div
            class="graph-bar"
            :style="`width: ${getWidth(stats.guesses, amount)}`"
          >
            <div class="num-guesses">{{ amount }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="countdown">
        <h1>Next WORDLE</h1>
        <div id="timer">
          <div class="statistic-container">
            <div class="statistic timer">
              {{
                `${timeToNextGame.hours}:${timeToNextGame.minutes}:${timeToNextGame.seconds}`
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="share">
        <button id="share-button">Share</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  //   expose: ['isOpen', 'close', 'open'],
  data() {
    return {
      isOpen: true,
      timeToNextGame: { hours: '0', minutes: '0', seconds: '0' },
    };
  },
  methods: {
    getWidth(guesses: Guesses, guessAmount: number): string {
      if (guessAmount === 0) {
        return '7%';
      }
      const guessMap = Object.values(guesses);
      const topAmount = Math.max(...guessMap);
      const percentage = (guessAmount / topAmount) * 100;
      return percentage.toString() + '%';
    },

    getTimeToNextGame() {
      const epochMs = new Date('January 1, 2022 00:00:00').valueOf();
      const now2 = Date.now();
      const msInDay = 86400000;
      const index = Math.floor((now2 - epochMs) / msInDay);
      const nextday = (index + 1) * msInDay + epochMs;

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = nextday - now;

      // Time calculations for days, hours, minutes and seconds
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ).toString();
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      ).toString();
      const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString();
      this.timeToNextGame.hours = hours.length === 1 ? '0' + hours : hours;
      this.timeToNextGame.minutes =
        minutes.length === 1 ? '0' + minutes : minutes;
      this.timeToNextGame.seconds =
        seconds.length === 1 ? '0' + seconds : seconds;
    },
  },
  mounted() {
    this.getTimeToNextGame();
    setInterval(() => {
      this.getTimeToNextGame();
    }, 1000);
  },
};
</script>
<style scoped>
.container {
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  width: 100%;
  height: 100%;
}
#statistics {
  color: var(--color-tone-1);
  display: flex;
  padding-bottom: 10px;
}
.statistic-container {
  flex: 1;
}
.statistic {
  color: var(--color-tone-1);
  font-size: 36px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  letter-spacing: 0.05em;
  font-variant-numeric: proportional-nums;
}
.label {
  color: var(--color-tone-1);
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
#guess-distribution {
  padding-bottom: 10px;
}
.graph-container {
  color: var(--color-tone-1);
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  padding-bottom: 4px;
  font-size: 14px;
  line-height: 20px;
}
.guess {
  color: var(--color-tone-1);
  font-size: 14px;
  line-height: 20px;
}
.graph {
  color: var(--color-tone-1);
  font-size: 14px;
  line-height: 20px;
  width: 100%;
  height: 100%;
  padding-left: 4px;
}
.graph-bar {
  color: red;
  font-size: 14px;
  line-height: 20px;
  height: 100%;
  position: relative;
  background-color: var(--color-absent);
  display: flex;
  justify-content: center;
  width: 7%;
}
.num-guesses {
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
  color: var(--tile-text-color);
}
#timer {
  color: var(--color-tone-1);
  font-size: 36px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.05em;
  font-variant-numeric: initial;
}
#guess-distribution {
  color: var(--color-tone-1);
  width: 80%;
  padding-bottom: 10px;
}
.highlight {
  background-color: var(--color-correct);
}
.align-right {
  justify-content: flex-end;
  padding-right: 8px;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.countdown {
  border-right: 1px solid var(--color-tone-1);
  padding-right: 12px;
  width: 50%;
}
.share {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#share-button {
  background-color: var(--key-bg-correct);
  color: var(--key-evaluated-text-color);
  font-family: inherit;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
  width: 80%;
  font-size: 20px;
  height: 52px;
}
</style>
