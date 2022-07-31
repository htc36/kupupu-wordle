<script setup lang="ts">
import { useClockStore } from '../../stores/clock';
import { useCardGameStore } from '../../stores/cardGame';
import { storeToRefs } from 'pinia';
import { useApiStore } from '../../stores/apiStore';

const cardGameStore = useCardGameStore();
const apiStore = useApiStore();

const { resetGamesPlayed } = cardGameStore;
const { cardsGameId } = storeToRefs(apiStore);
const { gamesPlayed, allowNextGame } = storeToRefs(cardGameStore);
const clockStore = useClockStore();

function nextCardGame() {
  resetGamesPlayed();
  apiStore.getCards(true);
}
</script>
<template>
  <div class="clock-container">
    <div class="clock-wrapper">
      <div class="clock-title">Time:</div>
      <div class="clock-digits">
        <div class="clock-text">{{ clockStore.getGameTime() }}</div>
      </div>
    </div>
    <div class="clock-wrapper">
      <div class="clock-digits">
        <div class="clock-text">{{ gamesPlayed }} / 7</div>
      </div>
    </div>
    <div class="clock-wrapper" v-if="!allowNextGame">
      <div class="clock-title">Match Num:</div>
      <div class="clock-digits">
        <div class="clock-text">
          {{ cardsGameId }}
        </div>
      </div>
    </div>
    <div class="clock-wrapper" v-else>
      <button type="button" class="share-button" @click="nextCardGame">
        Next cards
      </button>
    </div>
  </div>
</template>
<style scoped>
.clock-container,
.clock-wrapper,
.clock-digits {
  display: flex;
}
.clock-wrapper {
  align-items: center;
  padding: 0 10px;
}
.clock-container {
  margin: 10px 0 10px 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
@media screen and (max-width: 500px) {
  .clock-container {
    width: 95%;
  }
}
.clock-text,
.clock-title {
  font-family: 'Calibri', sans-serif;
  color: #a11613;
}
.clock-text {
  font-size: 25px;
}
.clock-title {
  margin-right: 10px;
}
.share-button {
  margin-top: 10px;
  background-color: var(--green);
  color: var(--key-evaluated-text-color);
  font-family: inherit;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  padding: 0 10px;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  font-size: 18px;
  height: 30px;
}
</style>
