<script setup lang="ts">
import { useClockStore } from '../../stores/clock';
import { StatObject } from '../../types';
import { toRef } from 'vue';

const props = defineProps<{
  bestTime: StatObject;
}>();

const bestTime = toRef(props, 'bestTime');

const clockStore = useClockStore();
</script>
<template>
  <div class="clock-container">
    <div class="clock-wrapper">
      <div class="clock-title">Current time:</div>
      <div class="clock-digits">
        <div class="clock-text">
          {{ clockStore.getGameTime() }}
        </div>
      </div>
    </div>
    <div class="clock-wrapper">
      <div class="clock-title">Best time:</div>
      <div class="clock-digits">
        <div class="clock-text">
          {{ clockStore.getGameTime(bestTime.value) }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.clock-container,
.clock-wrapper,
.clock-digits {
  display: flex;
}
.clock-wrapper {
  align-items: center;
  padding: 0 10px;
}
.clock-container {
  margin: 10px 0 10px 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
@media screen and (max-width: 500px) {
  .clock-container {
    width: 95%;
  }
}
.clock-text,
.clock-title {
  font-family: 'Calibri', sans-serif;
  color: #a11613;
}
.clock-text {
  font-size: 25px;
}
.clock-title {
  margin-right: 10px;
}
</style>
