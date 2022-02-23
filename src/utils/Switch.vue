<script setup lang="ts">
const props = defineProps<{
  checked?: boolean;
}>();
// const propRef = $ref(props);
</script>
<template>
  <div class="container">
    <label><slot></slot></label>
    <div :class="{ checked: checked, switch: true }">
      <span class="knob"></span>
    </div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}
.switch {
  height: 20px;
  width: 32px;
  vertical-align: middle;
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
.knob checked {
  transform: translateX(calc(100% - 4px));
}
.switch disabled {
  opacity: 0.5;
}
</style>
