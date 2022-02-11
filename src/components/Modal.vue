<script setup lang="ts">
// import { LetterState } from './types';

// defineProps<{
//   letterStates: Record<string, LetterState>;
// }>();
</script>

<template>
  <div class="content" v-if="isOpen">
    <div class="help-modal-content">
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

<script lang="ts">
export default {
  expose: ['isOpen', 'close', 'open'],
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    close(): void {
      this.isOpen = false;
    },
    open(): void {
      this.isOpen = true;
    },
  },
};
</script>

<style scoped>
.content {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
}

.help-modal-content {
  min-width: 500px;
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
