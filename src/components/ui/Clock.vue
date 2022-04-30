<script setup lang="ts">
import { useClockStore } from '../../stores/clock';
import { storeToRefs } from 'pinia';
import { Clock } from '../../types';
import { toRef } from 'vue';

const props = defineProps<{
  bestTime: Clock;
}>();

const bestTime = toRef(props, 'bestTime');
const clockStore = useClockStore();
const { clockSeconds, clockMinutes } = storeToRefs(clockStore);
</script>
<template>
  <div class="clock-container">
    <div class="clock-wrapper">
      <div class="clock-title">Current time:</div>
      <div class="clock-digits">
        <div class="clock-text">
          {{
            (clockMinutes < 10 ? `0${clockMinutes}` : clockMinutes) +
            ':' +
            (clockSeconds < 10 ? `0${clockSeconds}` : clockSeconds)
          }}
        </div>
      </div>
    </div>
    <div class="clock-wrapper">
      <div class="clock-title">Best time:</div>
      <div class="clock-digits">
        <div class="clock-text">
          {{
            bestTime
              ? (bestTime.minutesFinished < 10
                  ? `0${bestTime.minutesFinished}`
                  : bestTime.minutesFinished) +
                ':' +
                (bestTime.secondsFinished < 10
                  ? `0${bestTime.secondsFinished}`
                  : bestTime.secondsFinished)
              : 'No best time yet'
          }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.clock-container,
.current-clock,
.clock-wrapper,
.clock-digits {
  display: flex;
}
.clock-container,
.current-clock {
  justify-content: space-between;
  align-items: center;
}
.clock-wrapper {
  align-items: center;
  padding: 0 10px;
}
.clock-container {
  margin: 10px 0 10px 0;
  width: 100%;
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
