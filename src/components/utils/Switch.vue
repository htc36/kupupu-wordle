<script setup lang="ts">
import { GameSettings } from '../types';
const props = defineProps<{
  settingName: keyof GameSettings;
  toggleSwitch: (whichSwitch: keyof GameSettings) => void;
  isChecked: boolean;
}>();
</script>
<template>
  <div class="container">
    <div
      @click="props.toggleSwitch(props.settingName)"
      class="switch"
      :class="{ checked: props.isChecked }"
    >
      <span class="knob"></span>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.switch {
  height: 20px;
  width: 32px;
  /* not quite right */
  background: var(--color-tone-3);
  border-radius: 999px;
  display: block;
  position: relative;
}
.knob {
  display: block;
  position: absolute;
  left: 2px;
  top: 2px;
  height: calc(100% - 4px);
  width: 50%;
  border-radius: 8px;
  background: var(--white);
  transform: translateX(0);
  transition: transform 0.3s;
}
.switch.checked {
  background: var(--color-correct);
}
.switch.checked > .knob {
  transform: translateX(calc(100% - 4px));
}
.switch disabled {
  opacity: 0.5;
}
</style>
