<script setup lang="ts">
import Game from './Game.vue';
</script>
<template>
  <Game></Game>
</template>

<!-- import { ref, onMounted } from 'vue';
import { getStats, setStats } from './helpers/localStorage';
import { AllGameStats } from './types';
import Modal from './components/wordle/Modal.vue';
import GameSettings from './components/wordle/GameSettings.vue';
import Statistics from './components/wordle/GameStatistics.vue';
import Navbar from './components/wordle/Navbar.vue'; -->
<!-- // let stats = ref<AllGameStats>(getStats());
// const statsModal = ref<InstanceType<typeof Modal> | null>(null);
// const settingsModal = ref<InstanceType<typeof Modal> | null>(null);

// function refreshStats() {
//   stats.value = getStats();
// } -->
<!-- <Navbar
    @openStats="statsModal?.open()"
    @openSettings="settingsModal?.open()"
  ></Navbar>
  <Modal ref="settingsModal" height="100%" width="100%" boxShadow="0 0px">
    <GameSettings />
  </Modal>

  <Modal ref="statsModal">
    <Statistics :stats="stats" />
  </Modal> -->
