<script setup lang="ts">
import { GameNames, TabNames } from '../../types';
import { ref, provide, useSlots, Ref, readonly, onBeforeUnmount } from 'vue';
import { timeToNextGame } from '../../helpers';
const slots = useSlots();
const props = defineProps<{
  currentTabType: TabNames | GameNames;
  isStatistic: boolean;
}>();

const timeToNext = ref({});
const tabTitles: Ref<TabNames[]> = ref(
  slots.default
    ? slots
        .default()
        .map((tab) => (tab.props ? tab.props.title : TabNames.RerengaStats))
    : [TabNames.RerengaStats]
);
let selectedTitle = ref(props.currentTabType);
let clockIntervalIdNew: number;
if (props.isStatistic) {
  timeToNext.value = timeToNextGame();
  clockIntervalIdNew = setInterval(() => {
    timeToNext.value = timeToNextGame();
  }, 1000);
}
onBeforeUnmount(() => clearInterval(clockIntervalIdNew));

const tabWidth = ref(100 / tabTitles.value.length);
function handleClick(title: TabNames) {
  selectedTitle.value = title;
}
provide('tabToShow', selectedTitle);
provide('timeToNext', readonly(timeToNext));
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
  background-color: grey;
  border-radius: 10px 10px 0 0;
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
