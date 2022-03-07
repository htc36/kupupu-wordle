<script setup lang="ts">
import WordleGame from './WordleGame.vue';
import CardGame from './CardGame.vue';
</script>
<template>
  <div class="gameWrapper">
    <CardGame></CardGame>
    <!-- <WordleGame></WordleGame> -->
  </div>
</template>
<style scoped>
.gameWrapper {
  position: relative;
  height: 100vh;
}
</style>
