<script setup lang="ts">
import { useApiStore } from '../../stores/apiStore';
import { storeToRefs } from 'pinia';
import { ref, onUnmounted } from 'vue';
import { useCardGameStore } from '../../stores/cardGame';
const apiStore = useApiStore();
const cardStore = useCardGameStore();
const { resetGamesPlayed, stopCardGame } = cardStore;
const { getCards } = apiStore;
const { latestCardsGameId, cardsGameId } = storeToRefs(apiStore);
const gameNum = ref<number>(cardsGameId.value);
const isUpperLimitReached = ref<boolean>(false);
const isLowerLimitReached = ref<boolean>(false);
function increaseGameID() {
  if (gameNum.value < latestCardsGameId.value) {
    gameNum.value++;
  } else {
    isUpperLimitReached.value = true;
    setTimeout(() => (isUpperLimitReached.value = false), 100);
  }
}
function decreaseGameID() {
  if (gameNum.value > 1 && gameNum.value > latestCardsGameId.value - 10) {
    gameNum.value--;
  } else {
    isLowerLimitReached.value = true;
    setTimeout(() => (isLowerLimitReached.value = false), 100);
  }
}
onUnmounted(async () => {
  if (cardsGameId.value != gameNum.value) {
    resetGamesPlayed();
    await getCards(false, gameNum.value);
    console.log('game should stop');
    stopCardGame();
  }
});
</script>
<template>
  <div>
    <div class="input-group input-number-group">
      <div class="input-group-button" @click="decreaseGameID()">
        <span
          :class="['input-number-decrement', { alert: isLowerLimitReached }]"
          >-</span
        >
      </div>
      <input
        class="input-number"
        type="number"
        :value="gameNum"
        min="0"
        max="1000"
      />
      <div class="input-group-button" @click="increaseGameID()">
        <span
          :class="['input-number-increment', { alert: isUpperLimitReached }]"
          >+</span
        >
      </div>
    </div>
    <h6 class="text-center">Switch Match</h6>
  </div>
</template>

<style scoped>
.alert {
  background-color: rgb(255, 95, 89) !important;
}
.text-center {
  text-align: center;
}
.input-number-group {
  padding-top: 10px;
  padding-bottom: 8px;
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
  color: 'red';
  line-height: calc(58px / 2 - 5px);
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
  height: 30px;
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
