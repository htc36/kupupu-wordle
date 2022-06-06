<script setup lang="ts">
import CardGrid from './CardGrid.vue';
import Clock from '../ui/Clock.vue';
import { useCardGameStore } from '../../stores/cardGame';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { CardGameStats } from '../../types';
import { getStats } from '../../helpers/localStorage';

const cardGameStore = useCardGameStore();
const { cardComponentKey } = storeToRefs(cardGameStore);
const cardStats = getStats('cardStats') as CardGameStats;
const bestTime = ref(cardStats.times.bestTime);
function updateBestTime() {
  bestTime.value = (getStats('cardStats') as CardGameStats).times.bestTime;
}
</script>
<template>
  <Clock :best-time="bestTime" />
  <CardGrid @update-best-time="updateBestTime" :key="cardComponentKey" />
</template>
<style scoped></style>
