<script setup lang="ts">
import BuyCoffeeButton from '../ui/BuyCoffeeButton.vue';
</script>
<template>
  <div class="footerWrapper">
    <div class="left">
      <h1 class="copyright">2022 Kupupu. &copy; All rights reserved.</h1>
    </div>
    <div class="right">
      <BuyCoffeeButton />
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
  width: 80%;
  max-width: 600px;
}
</style>
