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
  width: 100%;
  height: 94%;
  background-color: #e5ebff;
  border-radius: 0 0 10px 10px;
  padding: 15px 10px;
  transition: 0.4s display ease-out;
}
</style>
