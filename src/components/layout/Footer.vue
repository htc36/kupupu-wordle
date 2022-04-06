<script setup lang="ts">
import BuyCoffeeButton from '../utils/BuyCoffeeButton.vue';
</script>
<template>
  <div class="footerWrapper">
    <div class="left">
      <h1 class="copyright">2022 Kupupu. All rights reserved.</h1>
    </div>
    <div class="middle"></div>
    <div class="right">
      <BuyCoffeeButton></BuyCoffeeButton>
    </div>
  </div>
</template>
<style scoped>
.left {
  display: flex;
  align-content: flex-end;
}
.copyright {
  margin-top: auto;
  margin-bottom: auto;
  font-size: 10px;
}
.footerWrapper {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e5e5e5;
  padding: 0.5rem 1rem;
  height: 3.4rem;
  width: 80%;
  position: relative;
  max-width: 600px;
}
</style>
