<script setup lang="ts">
import { CardGameStats, GameNames } from '../../types';
import { getStats } from '../../helpers/localStorage';
import { useApiStore } from '../../stores/apiStore';
import { storeToRefs } from 'pinia';

const apiStore = useApiStore();
const { cardsGameId } = storeToRefs(apiStore);

function getAvg(arr: number[]) {
  return arr.reduce((a: number, b: number) => a + b, 0) / arr.length;
}
function getWidth(value: number | number[], statObj: object) {
  const result = Array.isArray(value) ? getAvg(value) : value;

  const stats = Object.values(statObj).map((stat) => {
    // If value is array return average of array
    return Array.isArray(stat.value) ? getAvg(stat.value) : stat.value;
  });
  const maxScore = Math.max(...stats);
  const percentage = Math.max((result / maxScore) * 100, 10);
  const colors = ['var(--green)', 'var(--gray)', 'var(--gray)'];
  stats.sort((a, b) => a - b);

  return `width: ${percentage.toString()}%; background-color: ${
    colors[stats.indexOf(result)]
  }`;
}
function formatTime(time: number | number[]) {
  const timeObj = new Date(Array.isArray(time) ? getAvg(time) : time);
  const seconds =
    timeObj.getSeconds() < 10
      ? '0' + timeObj.getSeconds().toString()
      : timeObj.getSeconds().toString();
  return `${timeObj.getMinutes()}:${seconds}`;
}

const cardStats = getStats(GameNames.Rerenga) as CardGameStats;
const cardTimeStats = cardStats.times;
const cardClickStats = cardStats.clicks;
</script>
<template>
  <div class="container">
    <h1 class="modalTitle">Statistics</h1>
    <div class="modal-middle">
      <div class="guess-distribution">
        <h2 class="guess-title">Times</h2>
        <div
          class="graph-container"
          v-for="statTimeObj in cardTimeStats"
          :key="statTimeObj.title"
        >
          <div class="guess">{{ statTimeObj.title }}</div>
          <div class="graph" v-if="statTimeObj.value != 0">
            <div
              class="graph-bar"
              :style="getWidth(statTimeObj.value, cardTimeStats)"
            >
              <div class="num-guesses">
                {{ formatTime(statTimeObj.value) }}
              </div>
            </div>
          </div>
        </div>
        <h2 class="guess-title">Clicks</h2>
        <div
          class="graph-container"
          v-for="statClickObj in cardClickStats"
          :key="statClickObj.title"
        >
          <div class="guess">{{ statClickObj.title }}</div>
          <div class="graph" v-if="statClickObj.value != 0">
            <div
              class="graph-bar"
              :style="getWidth(statClickObj.value, cardClickStats)"
            >
              <div class="num-guesses">
                {{
                  Array.isArray(statClickObj.value)
                    ? getAvg(statClickObj.value).toFixed(1)
                    : statClickObj.value
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="bottomStats">
          <h1>
            Games Played:
            <span style="font-weight: bold">{{
              cardStats.times.avgTime.value.length
            }}</span>
          </h1>
          <h1 v-show="cardsGameId">
            Current Lesson:
            <span style="font-weight: bold">{{ cardsGameId }}</span>
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.bottomStats {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  width: 100%;
}
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
}
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
}
.guess-title {
  font-size: 16px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 15px;
}
.graph-container {
  color: var(--color-tone-1);
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding-bottom: 4px;
  font-size: 14px;
  line-height: 20px;
}
.guess {
  width: 90px;
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
  align-items: center;
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
  width: 100%;
}
</style>
