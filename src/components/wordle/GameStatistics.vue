<script setup lang="ts">
import { WordleGameStats, Guesses } from '../../types';
import { getStats } from '../../helpers/localStorage';
// import { timeToNextGame } from '../../helpers';
import { inject } from 'vue';
import { TimeToNextType } from '../../types';

const wordleStats = getStats('wordleStats') as WordleGameStats;
const timeToNext = inject<TimeToNextType>('timeToNext', {
  wordleNextTime: '00:00:00',
  cardsNextTime: '00:00:00',
});
</script>

<template>
  <div class="container">
    <h1 class="modalTitle">Statistics</h1>
    <div class="modal-middle">
      <div class="statistics-container">
        <div class="stat-group">
          <div class="label">Played</div>
          <div class="label number">{{ wordleStats.gamesPlayed }}</div>
        </div>
        <div class="stat-group">
          <div class="label">Win %</div>
          <div class="label number">
            {{
              wordleStats.gamesPlayed === 0
                ? 0
                : (
                    (wordleStats.gamesWon / wordleStats.gamesPlayed) *
                    100
                  ).toFixed(0)
            }}
          </div>
        </div>
        <div class="stat-group">
          <div class="label">Current Streak</div>
          <div class="label number">{{ wordleStats.currentStreak }}</div>
        </div>
        <div class="stat-group">
          <div class="label">Max Streak</div>
          <div class="label number">{{ wordleStats.maxStreak }}</div>
        </div>
        <div class="stat-group time-group">
          <h1 class="label">Next Wordle</h1>
          <div class="label number">
            {{ timeToNext.wordleNextTime }}
          </div>
        </div>
      </div>
      <div class="guess-distribution">
        <h1 class="guess-title">Guess Distribution</h1>
        <div
          v-for="(amount, guessNum) in wordleStats.guesses"
          class="graph-container"
          v-bind:key="guessNum"
        >
          <div class="guess">{{ guessNum }}</div>
          <div class="graph">
            <div
              class="graph-bar"
              :style="`width: ${getWidth(wordleStats.guesses, amount)}`"
            >
              <div class="num-guesses">{{ amount }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- <hr /> -->
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isOpen: true,
      // timeToNextGame: { hours: '0', minutes: '0', seconds: '0' },
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
  },
};
</script>
<style scoped>
.container {
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
}
.modal-middle {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.statistics-container {
  display: flex;
  align-items: flex-end;
}
.stat-group {
  display: flex;
  flex-direction: column;
  flex-basis: 55px;
  height: 100%;
  justify-content: space-between;
}
.stat-group:nth-child(4) {
  padding-right: 10px;
}
@media (min-width: 600px) {
  .stat-group {
    flex-basis: 100px;
  }
  .statistics-container {
    width: 100%;
  }
}
.time-group {
  justify-content: space-between;
  border-left: 1px solid var(--color-absent);
  padding: 0px 15px;
}
.label {
  align-self: center;
  justify-self: center;
  color: var(--color-tone-1);
  font-size: 12px;
  text-align: center;
}
.number {
  font-size: 36px;
}
.guess-title {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
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
  line-height: 17px;
  font-weight: bold;
  color: var(--tile-text-color);
}
.guess-distribution {
  color: var(--color-tone-1);
  width: 95%;
}
</style>
