<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
  textQuestion?: string;
  image?: string;
  answer: string;
  index: number;
  isTextCard?: boolean;
  maxCardHeight?: string;
}>();
const emit = defineEmits(['cardOpened']);
const isActive = ref(false);
const isLocked = ref(false);

function close() {
  if (!isLocked.value) isActive.value = false;
}

function clickCard() {
  if (!isActive.value) {
    isActive.value = true;
    emit('cardOpened', props.index);
  }
}

function lockCard() {
  isLocked.value = true;
}

defineExpose({
  isActive,
  close,
  lockCard,
});
</script>
<template>
  <div :class="[{ active: isActive }, 'flip-card']" @click="clickCard">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img src="/assets/card3.png" alt="Card front" class="card-img" />
      </div>
      <div v-if="isTextCard" class="flip-card-back">
        <p class="card-text">{{ answer }}</p>
        <img src="/assets/card_text_background.png" class="card-img" />
      </div>
      <div v-else class="flip-card-back">
        <img :src="`/assets/${image}`" class="card-img" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.flip-card {
  transition: 0.5s;
  cursor: pointer;
  background-color: transparent;
  perspective: 1000px;
  max-height: v-bind(maxCardHeight);
  width: 50%;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  -webkit-transition: 0.6s;
  -webkit-transform-style: preserve-3d;
}

.active .flip-card-inner {
  transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-back {
  color: white;
  transform: rotateY(180deg);
}
.card-text {
  font-family: 'Calibri', sans-serif;
  font-size: 25px;
  color: #a11613;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  margin: 0;
}

.card-img {
  height: 100%;
  width: auto;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;
  border-radius: 5%;
}
</style>
