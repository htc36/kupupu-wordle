<script setup lang="ts">
import Navbar from './components/wordle/Navbar.vue';
import { getStats } from './helpers/localStorage';
import Grid from './components/cards/Grid.vue';
const stats = getStats();
</script>
<template>
  <Navbar :stats="stats"></Navbar>
  <Grid></Grid>
</template>
