<script setup lang="ts">
import { useModalStore } from '../../stores/modal';
import { ModalNames } from '../../types';
const props = defineProps<{
  modalName: ModalNames;
}>();
const modal = useModalStore();
</script>

<template>
  <div
    v-if="modal.getCurrentModalState(props.modalName)"
    @click="modal.toggleModal(props.modalName)"
    class="content"
  >
    <div :class="['help-modal-content', props.modalName]" @click.prevent.stop>
      <svg
        class="close-btn"
        xmlns="http://www.w3.org/2000/svg"
        @click="modal.toggleModal(props.modalName)"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
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
  position: fixed;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  transition: 0.4s all ease-out;
  z-index: 2;
}

.help-modal-content {
  width: 100%;
  max-width: 500px;
  height: 100%;
  max-height: 500px;
  box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 4%;
  background: white;
  border-radius: 8px;
  overflow-y: auto;
}
.help-modal-content.donationModal {
  background: #636363;
  max-height: 700px;
}
.close-btn {
  z-index: 5;
  position: absolute;
  top: 10px;
  right: 10px;
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
