<script setup lang="ts">
import { inject } from 'vue';
defineProps<{
  title: string;
}>();
const selectedTitle = inject('selectedTitle');
</script>

<template>
  <div class="tab-content" v-show="title == selectedTitle">
    <slot class="slot" />
  </div>
</template>

<style scoped>
.tab-content {
  background-color: white;
  border-radius: 0 0 10px 10px;
  flex-grow: 1;
  transition: 0.4s display ease-out;
}
</style>
