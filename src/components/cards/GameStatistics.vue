<script setup lang="ts">
import ModalFooter from '../ui/ModalFooter.vue';
import { CardGameStats, GameNames } from '../../types';
import { getStats } from '../../helpers/localStorage';

const cardStats = getStats('cardStats') as CardGameStats;
console.log('cardStats', cardStats);
</script>
<template>
  <div class="container">
    <h1 class="modalTitle">Statistics</h1>
    <div class="modal-middle">
      <div class="stat-group">
        <div class="label">Last game time</div>
        <div class="label number">
          {{
            cardStats.lastGameTime.minutesFinished === 0 &&
            cardStats.lastGameTime.secondsFinished === 0
              ? 'No statistic yet'
              : (cardStats.lastGameTime.minutesFinished < 10
                  ? `0${cardStats.lastGameTime.minutesFinished}`
                  : cardStats.lastGameTime.minutesFinished) +
                ':' +
                (cardStats.lastGameTime.secondsFinished < 10
                  ? `0${cardStats.lastGameTime.secondsFinished}`
                  : cardStats.lastGameTime.secondsFinished)
          }}
        </div>
      </div>
      <div class="stat-group">
        <div class="label">Best time</div>
        <div class="label number">
          {{
            cardStats.bestTime
              ? (cardStats.bestTime.minutesFinished < 10
                  ? `0${cardStats.bestTime.minutesFinished}`
                  : cardStats.bestTime.minutesFinished) +
                ':' +
                (cardStats.bestTime.secondsFinished < 10
                  ? `0${cardStats.bestTime.secondsFinished}`
                  : cardStats.bestTime.secondsFinished)
              : 'No best time yet'
          }}
        </div>
      </div>
    </div>
    <ModalFooter :for-modal="GameNames.Rerenga" />
  </div>
</template>
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
  padding: 15px 0;
}
.modal-middle {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.stat-group {
  display: flex;
  flex-direction: column;
}
.label {
  align-self: center;
  justify-self: center;
  color: var(--color-tone-1);
  font-size: 1.5em;
  text-align: center;
}
.number {
  font-size: 36px;
}
</style>
