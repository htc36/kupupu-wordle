<script setup lang="ts">
import { ref } from 'vue';

// TODO: colours as props as well
const props = defineProps<{
  message: object;
}>();
const show = ref(true);
</script>
<template>
  <Transition>
    <div v-if="show" class="alert danger-alert">
      <h3>{{ props.message }}</h3>
      <svg
        class="close"
        xmlns="http://www.w3.org/2000/svg"
        @click="show = !show"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path
          fill="var(--color-tone-1)"
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        ></path>
      </svg>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.alert {
  width: 50%;
  margin: 10px 10px 0 0;
  padding: 30px;
  position: fixed;
  top: 0;
  right: 0;
  border-radius: 5px;
}
.close {
  position: absolute;
  width: 30px;
  height: 30px;
  opacity: 0.5;
  border-width: 1px;
  border-style: solid;
  border-radius: 50%;
  right: 15px;
  top: 25px;
  text-align: center;
  font-size: 1.6em;
  cursor: pointer;
}
.danger-alert {
  background-color: var(--error);
  border-left: 5px solid var(--error-asc);
}
</style>
