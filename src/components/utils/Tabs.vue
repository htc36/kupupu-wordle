<script setup lang="ts">
import { ref, provide, useSlots } from 'vue';
const slots = useSlots();
const tabTitles = ref(
  slots.default
    ? slots.default().map((tab) => (tab.props ? tab.props.title : 'Tab Title'))
    : []
);
const selectedTitle = ref(tabTitles.value[0]);
const tabWidth = ref(100 / tabTitles.value.length);
provide('selectedTitle', selectedTitle);
</script>

<template>
  <div class="tabs">
    <ul class="tabs-header">
      <li
        :class="['tabs-header-item', title == selectedTitle ? 'activeTab' : '']"
        v-for="title in tabTitles"
        :key="title"
        @click="selectedTitle = title"
      >
        {{ title }}
      </li>
    </ul>
    <slot />
  </div>
</template>

<style scoped>
.tabs {
  width: 100%;
  max-width: 500px;
  height: 100%;
  max-height: 500px;
}

.tabs-header {
  display: flex;
  list-style: none;
  padding: 0;
  flex-direction: row;
}

.tabs-header-item {
  font-weight: bold;
  padding: 10px 0;
  width: v-bind(tabWidth + '%');
  text-align: center;
  cursor: pointer;
  transition: 0.4s all ease-out;
  background-color: #e5ebff;
  border-radius: 10px 10px 0 0;
}

.activeTab {
  background-color: white;
}
</style>
