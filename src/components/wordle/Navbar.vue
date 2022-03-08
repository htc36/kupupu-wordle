<script setup lang="ts">
import Modal from './Modal.vue';
import GameSettings from './GameSettings.vue';
import Statistics from './GameStatistics.vue';
import { AllGameStats } from '../../types';
import { ref } from 'vue';

defineProps<{
  stats: AllGameStats;
}>();

const statsModal = ref<InstanceType<typeof Modal> | null>(null);
const settingsModal = ref<InstanceType<typeof Modal> | null>(null);

function wordDefHasSelectedNext() {
  // wordDefinitionModal.value?.close();
  statsModal.value?.open();
}
function toggleStats(shouldOpen: boolean) {
  shouldOpen ? statsModal.value?.open() : statsModal.value?.close();
}
// function toggleWordDefModal(shouldOpen: boolean) {
//   shouldOpen
//     ? wordDefinitionModal.value?.open()
//     : wordDefinitionModal.value?.close();
// }
defineExpose({
  toggleStats,
  wordDefHasSelectedNext,
});
</script>
<template>
  <Modal ref="settingsModal" height="100%" width="100%" boxShadow="0 0px">
    <GameSettings />
  </Modal>

  <Modal ref="statsModal">
    <Statistics :stats="stats" />
  </Modal>

  <header>
    <div style="">
      <!-- <a id="source-link" href="https://github.com/yyx990803/vue-wordle" target="_blank">Source</a> -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path
          fill="var(--color-tone-3)"
          d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
        />
      </svg>
    </div>
    <h1 class="title">kupupu</h1>
    <div style="">
      <!-- <a id="source-link" href="https://github.com/yyx990803/vue-wordle" target="_blank">Source</a> -->
      <button class="navbarButton" @click="() => toggleStats(true)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path
            fill="var(--color-tone-3)"
            d="M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z"
          />
        </svg>
      </button>
      <button class="navbarButton" style="margin-left: 2px">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          @click="() => settingsModal?.open()"
        >
          <path
            fill="var(--color-tone-3)"
            d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"
          />
        </svg>
      </button>
    </div>
  </header>
</template>
<style scoped>
header {
  /* padding-top: 10px; */
  /* padding-bottom: 10px; */
  padding-left: 5px;
  padding-right: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5%;
}
.title {
  text-transform: none;
  font-weight: 700;
  font-size: 36px;
  letter-spacing: 0.2rem;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  pointer-events: none;
}
.navbarButton {
  background-color: transparent;
  border: 0px;
  cursor: pointer;
}
</style>
