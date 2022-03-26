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
const isShake = ref(false);
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

function shakeCards() {
  isShake.value = true;
  setTimeout(() => {
    isShake.value = false;
  }, 1500);
}

defineExpose({
  isActive,
  close,
  lockCard,
  shakeCards,
});
</script>
<template>
  <div
    :class="[{ active: isActive, shake: isShake }, 'flip-card']"
    @click="clickCard"
  >
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

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
