<script setup lang="ts">
import { ref } from 'vue';

const seconds = ref(0);
const minutes = ref(0);
let clockIntervalId: number | null = null;
let localSeconds = 0;
function startInterval() {
  seconds.value = ++localSeconds % 60;
  minutes.value = Math.floor(localSeconds / 60);
}
function startClock() {
  // Have a look at that:
  // If we want to start clock immediately we need to uncomment startInterval()
  // Otherwise we need to wait for the first tick

  // startInterval();
  clockIntervalId = setInterval(startInterval, 1000);
}
function stopClock() {
  if (clockIntervalId) {
    seconds.value = 0;
    clearInterval(clockIntervalId);
  }
  // release our clockIntervalId from the variable
  clockIntervalId = null;
}
defineExpose({
  startClock,
  stopClock,
  seconds,
});
</script>
<template>
  <div class="clock-container">
    <div class="clock-wrapper">
      <div class="clock-title">Current time:</div>
      <div class="clock-digits">
        <div class="clock-text">
          {{ minutes < 10 ? `0${minutes}` : minutes }}
        </div>
        <div class="clock-text">:</div>
        <div class="clock-text">
          {{ seconds < 10 ? `0${seconds}` : seconds }}
        </div>
      </div>
    </div>
    <div class="clock-wrapper">
      <!-- Should come from localStorage GameStats -->
      <div class="clock-title">Best time:</div>
      <div class="clock-digits">
        <div class="clock-text">
          <!-- {{ minutes < 10 ? `0${minutes}` : minutes }} -->
          00
        </div>
        <div class="clock-text">:</div>
        <div class="clock-text">
          12
          <!-- {{ seconds < 10 ? `0${seconds}` : seconds }} -->
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
}
.clock-container {
  margin: 10px 0 10px 0;
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
