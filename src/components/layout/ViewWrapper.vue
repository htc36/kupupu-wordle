<script setup lang="ts">
import { useMessageStore } from '../../stores/message';
import { storeToRefs } from 'pinia';
const game = useMessageStore();
const { messageToDisplay, formattedText } = storeToRefs(game);
</script>
<template>
  <Transition>
    <div class="message" v-if="messageToDisplay">
      <div>
        {{ messageToDisplay }}
      </div>
      <div
        style="
          white-space: pre;
          padding-top: 10px;
          display: flex;
          justify-content: center;
        "
        v-if="formattedText"
      >
        {{ formattedText }}
      </div>
    </div>
  </Transition>
  <div class="wrapper-container">
    <slot></slot>
  </div>
</template>

<style scoped>
.message {
  position: absolute;
  left: 50%;
  top: 80px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.85);
  padding: 16px 20px;
  z-index: 4;
  border-radius: 4px;
  transform: translateX(-50%);
  transition: opacity 0.3s ease-out;
  font-weight: 600;
}
.message.v-leave-to {
  opacity: 0;
}
.wrapper-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
</style>
