<script setup lang="ts">
import Navbar from './components/wordle/Navbar.vue';
import { getStats } from './helpers/localStorage';
const stats = getStats();
</script>

<template>
  <Navbar :stats="stats"></Navbar>
  <div class="app-container">
    <router-view />
  </div>
</template>

<style scoped>
.app-container {
  max-width: 900px;
  margin: auto;
}
</style>
