<script setup lang="ts">
import { inject } from 'vue';
import { TabNames } from '../../types';
import ModalFooter from './ModalFooter.vue';
const props = defineProps<{
  title: TabNames;
}>();
const selectedTitle = inject('tabToShow');
</script>

<template>
  <div
    v-show="props.title === selectedTitle"
    style="
      height: 100%;
      display: flex;
      align-items: space-between;
      flex-direction: column;
    "
  >
    <div class="tab-content">
      <slot class="slot" />
    </div>
    <ModalFooter :for-tab="title"></ModalFooter>
  </div>
</template>

<style scoped>
.tab-content {
  padding: 20px 30px 20px 30px;
  background-color: white;
  border-radius: 0 0 10px 10px;
  flex-grow: 1;
  transition: 0.4s display ease-out;
}
</style>
