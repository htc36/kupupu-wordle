<script setup lang="ts">
import ViewWrapper from './components/layout/ViewWrapper.vue';
import Navbar from './components/layout/Navbar.vue';
import Footer from './components/layout/Footer.vue';
</script>

<template>
  <ViewWrapper>
    <Navbar />
    <div class="game-wrapper">
      <router-view />
    </div>
    <Footer />
  </ViewWrapper>
</template>
<style>
.game-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly; /* you might prefer flex-start */
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 600px;
}
</style>
