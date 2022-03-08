<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
  textQuestion?: string;
  pictureQuestion?: string;
  answer: string;
  index: number;
}>();
const emit = defineEmits(['cardOpened', 'cardClosed']);

const isActive = ref(false);
const isLocked = ref(false);
function open() {
  isActive.value = true;
}
function close(shoudEmit: boolean) {
  if (!isLocked.value) isActive.value = false;
  if (shoudEmit) emit('cardClosed', props.index);
}
function lockCard() {
  isLocked.value = true;
}
defineExpose({
  isActive,
  open,
  close,
  lockCard,
});
</script>
<template>
  <div class="flip-container" data-connection="2">
    <div :class="[{ active: isActive }, 'flipper']">
      <div
        class="front"
        @click="
          () => {
            isActive = true;
            $emit('cardOpened', index);
          }
        "
      >
        <label>Kupupū</label>
      </div>
      <div class="back">
        <label v-if="!pictureQuestion">{{ answer }}</label>
        <img v-else :src="`/assets/${pictureQuestion}`" />
      </div>
    </div>
  </div>
</template>
<style scoped>
img {
  width: 100%;
  height: 100%;
}
.active {
  -moz-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
}
.flip-container {
  font-family: 'Calibri', sans-serif;
  text-align: center;
  /* display: inline-block; */
  perspective: 1000px;
  cursor: pointer;
  border-radius: 5px;
  color: #9f2975;
  width: 45%;
  height: 19%;
}
.flipper {
  height: 100%;
  font-family: 'Calibri', sans-serif;
  text-align: center;
  cursor: pointer;
  color: #9f2975;
  -webkit-transform-style: preserve-3d;
  -webkit-transition: 0.5s;
}
.front {
  height: 100%;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Calibri', sans-serif;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  color: #9f2975;
  -webkit-backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #ff5e5b;
  z-index: 2;
  transform: rotateY(0);
  width: 100%;
}
.back {
  height: 100%;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Calibri', sans-serif;
  cursor: pointer;
  border-radius: 5px;
  color: #9f2975;
  -webkit-backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #00cecb;
  text-align: center;
  vertical-align: middle;
  transform: rotateY(180deg);
  width: 100%;
}
</style>
