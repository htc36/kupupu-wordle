<script setup lang="ts">
import { useApiStore } from '../../stores/apiStore';
import { storeToRefs } from 'pinia';
import { ref, onUnmounted } from 'vue';
const apiStore = useApiStore();
const { getCards } = apiStore;
const { latestCardsGameId, cardsGameId } = storeToRefs(apiStore);
const gameNum = ref<number>(cardsGameId.value);
function increaseGameID() {
  console.log('hey');
  gameNum.value = Math.min(gameNum.value + 1, latestCardsGameId.value);
}
function decreaseGameID() {
  console.log('hey2');
  gameNum.value = Math.max(gameNum.value - 1, 1, gameNum.value - 10);
}
onUnmounted(() => {
  if (cardsGameId.value != gameNum.value) {
    getCards(false, gameNum.value);
  }
});
</script>
<template>
  <div>
    <h6 class="text-center">Switch Game Number</h6>
    <div class="input-group input-number-group">
      <div class="input-group-button" @click="decreaseGameID()">
        <span class="input-number-decrement">-</span>
      </div>
      <input
        class="input-number"
        type="number"
        :value="gameNum"
        min="0"
        max="1000"
      />
      <div class="input-group-button" @click="increaseGameID()">
        <span class="input-number-increment">+</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-number-group {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.input-number-group input[type='number']::-webkit-inner-spin-button,
.input-number-group input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
}

.input-number-group .input-group-button {
  line-height: calc(80px / 2 - 5px);
}

.input-number-group .input-number {
  width: 80px;
  padding: 0 12px;
  vertical-align: top;
  text-align: center;
  outline: none;
  display: block;
  margin: 0;
}

.input-number-group .input-number,
.input-number-group .input-number-decrement,
.input-number-group .input-number-increment {
  border: 1px solid #cacaca;
  height: 40px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border-radius: 0;
}

.input-number-group .input-number-decrement,
.input-number-group .input-number-increment {
  display: inline-block;
  width: 40px;
  background: #e6e6e6;
  color: #0a0a0a;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  font-size: 2rem;
  font-weight: 400;
}

.input-number-group .input-number-decrement {
  margin-right: 0.3rem;
}

.input-number-group .input-number-increment {
  margin-left: 0.3rem;
}
</style>
