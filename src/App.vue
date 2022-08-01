<script setup lang="ts">
import ViewWrapper from './components/layout/ViewWrapper.vue';
import Navbar from './components/layout/Navbar.vue';
import Footer from './components/layout/Footer.vue';
import { onMounted } from 'vue';
import { version as projectVersion } from '../package.json';
onMounted(() => {
  console.log(projectVersion);
  if (!projectVersion) return;
  const localVersion = window.localStorage.getItem('version');
  console.log('localVersion', localVersion);
  if (!localVersion) {
    console.log(
      'local dosent exist, removing all local storage and setting version'
    );
    window.localStorage.clear();
    window.localStorage.setItem('version', projectVersion);
  } else if (localVersion != projectVersion) {
    console.log('local version is outdated, removing local storage');
    window.localStorage.clear();
    window.localStorage.setItem('version', projectVersion);
  } else console.log('On latest version!');
});
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
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 600px;
}
</style>
