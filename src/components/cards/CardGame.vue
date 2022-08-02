<script setup lang="ts">
import CardGrid from './CardGrid.vue';
import Clock from '../ui/Clock.vue';
import { useCardGameStore } from '../../stores/cardGame';
import { storeToRefs } from 'pinia';

const cardGameStore = useCardGameStore();
const { cardComponentKey } = storeToRefs(cardGameStore);
</script>
<template>
  <Clock />
  <CardGrid :key="cardComponentKey" />
</template>
<style scoped></style>
