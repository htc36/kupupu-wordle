<script setup lang="ts">
import WordleGame from './WordleGame.vue';
import CardGame from './CardGame.vue';
import { computed, ref } from 'vue';
interface Routes {
  '/': InstanceType<typeof CardGame>;
  '/wordle': InstanceType<typeof WordleGame>;
}

const routes = {
  '/': CardGame,
  '/wordle': WordleGame,
};

const currentPath = ref(window.location.hash);

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash;
});

const currentView = computed(() => {
  const path: string = currentPath.value.slice(1) || '/';
  return routes[path as keyof Routes] || CardGame;
});
</script>
<template>
  <div class="gameWrapper">
    <a href="#/">Home</a> | <a href="#/wordle">Wordle</a> |
    <component :is="currentView" />
  </div>
</template>
<style scoped>
.gameWrapper {
  position: relative;
  height: 100vh;
}
</style>
