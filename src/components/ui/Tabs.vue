<script setup lang="ts">
import { ref, provide, useSlots, Ref } from 'vue';
import { GameNames } from '../../types';
const slots = useSlots();
const props = defineProps<{ currentGame: GameNames }>();
const tabTitles: Ref<GameNames[]> = ref(
  slots.default
    ? slots
        .default()
        .map((tab) => (tab.props ? tab.props.title : GameNames.Rerenga))
    : [GameNames.Rerenga]
);
let selectedTitle = ref(props.currentGame);

const tabWidth = ref(100 / tabTitles.value.length);
function handleClick(title: GameNames) {
  selectedTitle.value = title;
}
provide('tabToShow', selectedTitle);
</script>

<template>
  <div class="tabs">
    <ul class="tabs-header">
      <li
        v-for="title in tabTitles"
        :class="[
          'tabs-header-item',
          title === selectedTitle ? 'activeTab' : '',
        ]"
        :key="title"
        @click="handleClick(title)"
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
  height: 100%;
  max-height: 500px;
  display: flex;
  flex-direction: column;
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
