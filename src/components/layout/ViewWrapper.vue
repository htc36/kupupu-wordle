<template>
  <div class="wrapper-container">
    <slot></slot>
  </div>
</template>

<style scoped>
.wrapper-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
