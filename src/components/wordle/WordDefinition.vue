<script setup lang="ts">
import { ref } from 'vue';
import { getGameSettings, getLocalStorage } from '../../helpers/localStorage';
import { GameNames, WordResponse } from '../../types';
defineProps<{
  word: string;
}>();
const gameSettings = ref(getGameSettings());
const solutionObject = ref<WordResponse>(getLocalStorage(GameNames.Kupu));
function openLesson() {
  window.open('https://whanau.tv/', '_blank');
}
</script>

<template>
  <div class="container">
    <img
      v-show="gameSettings.shouldShowImage"
      :src="`https://whanau.tv/eventMedia/${solutionObject.image}`"
    />
    <figure class="audio-figure" v-show="gameSettings.shouldPlaySound">
      <audio
        class="audio"
        controls
        :src="`https://whanau.tv/eventMedia/${solutionObject.audio}`"
      >
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </figure>
    <div class="share">
      <button class="share-button" @click="openLesson()">Lesson</button>
      <button class="next-button" @click="$emit('hasSelectedNext')">
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
}
.share {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
.audio {
  width: 300px;
  height: 54px;
}
.audio-figure {
  margin: 10px 0;
}
.next-button {
  background-color: var(--green);
  color: var(--key-evaluated-text-color);
  font-family: inherit;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
  width: 40%;
  font-size: 20px;
  height: 52px;
}
.share-button {
  background-color: var(--red);
  color: var(--key-evaluated-text-color);
  font-family: inherit;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
  width: 40%;
  font-size: 20px;
  height: 52px;
}
</style>
