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
const isMenuActive = ref(false);
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
  <header class="header">
    <Modal ref="settingsModal">
      <GameSettings />
    </Modal>

    <Modal ref="statsModal">
      <Statistics :stats="stats" />
    </Modal>

    <router-link class="nav-link" to="/">Kupupu</router-link>
    <nav id="nav">
      <div class="nav-links-group">
        <router-link class="nav-link" to="/wordle">Wordle</router-link>
        <router-link class="nav-link" to="/cards">Cards</router-link>
        <Transition name="slide-left">
          <div v-if="isMenuActive">
            <button class="hamburger-nav-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path
                  fill="var(--black)"
                  d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
                />
              </svg>
            </button>
            <button class="hamburger-nav-icon" @click="() => toggleStats(true)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path
                  fill="var(--black)"
                  d="M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z"
                />
              </svg>
            </button>
            <button class="hamburger-nav-icon" style="margin-left: 2px">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                @click="() => settingsModal?.open()"
              >
                <path
                  fill="var(--black)"
                  d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"
                />
              </svg>
            </button>
          </div>
        </Transition>
        <button
          :class="[{ opened: isMenuActive }, 'hamburger']"
          @click="() => (isMenuActive = !isMenuActive)"
          aria-label="Main Menu"
          :aria-expanded="isMenuActive"
        >
          <svg width="30" height="30" viewBox="0 0 100 100">
            <path
              class="line line1"
              d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
            />
            <path class="line line2" d="M 20,50 H 80" />
            <path
              class="line line3"
              d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
            />
          </svg>
        </button>
      </div>
    </nav>
  </header>
</template>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  background-color: var(--blue);
  border-bottom: 1px solid #e5e5e5;
  padding: 0.5rem 1rem;
  height: 3.4rem;
}
/*NAVIGATION*/
.nav-link {
  color: var(--black);
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.nav-links-group {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

/*Hamburger Menu*/
.hamburger-nav-icon {
  background-color: transparent;
  border: 0px;
  cursor: pointer;
  padding: 0 0.2rem;
}
.hamburger {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 0;
}
.line {
  fill: none;
  stroke: black;
  stroke-width: 6;
  transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
    stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
}
.line1 {
  stroke-dasharray: 60 207;
  stroke-width: 6;
}
.line2 {
  stroke-dasharray: 60 60;
  stroke-width: 6;
}
.line3 {
  stroke-dasharray: 60 207;
  stroke-width: 6;
}
.opened .line1 {
  stroke-dasharray: 90 207;
  stroke-dashoffset: -134;
  stroke-width: 6;
}
.opened .line2 {
  stroke-dasharray: 1 60;
  stroke-dashoffset: -30;
  stroke-width: 6;
}
.opened .line3 {
  stroke-dasharray: 90 207;
  stroke-dashoffset: -134;
  stroke-width: 6;
}
.hamburger-open-menu {
  display: none;
  padding-right: 1rem;
  align-items: center;
}
.hamburger-open-menu.menuActive {
  display: flex;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.25s ease-out;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
