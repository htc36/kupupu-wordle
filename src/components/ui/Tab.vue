<script setup lang="ts">
import { inject, ref } from 'vue';
import { GameNames } from '../../types';
const props = defineProps<{
  title: GameNames;
}>();
const selectedTitle = inject('tabToShow');
</script>

<template>
  <div class="tab-content" v-show="props.title === selectedTitle">
    <slot class="slot" />
  </div>
</template>

<style scoped>
.tab-content {
  padding-top: 10px;
  background-color: white;
  border-radius: 0 0 10px 10px;
  flex-grow: 1;
  transition: 0.4s display ease-out;
}
</style>
