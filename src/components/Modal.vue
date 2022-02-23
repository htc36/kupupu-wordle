<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
  height?: string;
  width?: string;
  boxShadow?: string;
}>();
const styleObject = ref({
  width: props.width,
  height: props.height,
  boxShadow: props.boxShadow,
});

const isContentShown = ref(false);
const open = () => (isContentShown.value = true);
const close = () => (isContentShown.value = false);

defineExpose({
  open,
  close,
});
</script>

<template>
  <div class="content" v-if="isContentShown">
    <div class="help-modal-content" :style="styleObject">
      <svg class="close-btn" @click="close()" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
        <path
          fill="var(--color-tone-3)"
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        ></path>
      </svg>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.content {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.help-modal-content {
  width: 90%;
  box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  box-sizing: border-box;
  padding: 24px;
  background: white;
  border-radius: 8px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #d2d2d280 #fff0;
}
.close-btn {
  z-index: 5;
  position: absolute;
  top: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}
</style>
