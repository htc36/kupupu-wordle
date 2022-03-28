<script setup lang="ts">
import Card from './Card.vue';
import Clock from '../../utils/Clock.vue';
import { shuffleArray } from '../../helpers/randomiseArray';
import { cards } from '../../helpers/assetMapping';
import { ref } from 'vue';
import { CardObj } from '../../types';
import { useMessageStore } from '../../stores/message';
const messageStore = useMessageStore();

//Generating and shuffling cards from the cards array
function createPlayingCards() {
  const playingCards: CardObj[] = [];
  cards.forEach((card) => {
    playingCards.push({
      ...card,
      isTextCard: false,
    });
    playingCards.push({
      ...card,
      isTextCard: true,
    });
  });
  return shuffleArray(playingCards);
}
const playingCards = createPlayingCards();

//Calculate height of each card
//Assume that we gonna have two cards columns and 1 percent as a gap
const maxCardHeight = (100 / playingCards.length) * 2 - 1 + '%';

const gameStarted = ref(false);
const clockRef = ref<InstanceType<typeof Clock> | null>(null);
const cardsRef = ref<InstanceType<typeof Card>[]>([]);
type cardsRefType = typeof cardsRef;
const allCards = ref<CardObj[]>(playingCards);

const matchedPairs = ref<number>(0);
let selectedCards: CardObj[] = [];

function cardOpened(index: number) {
  if (!gameStarted.value) {
    gameStarted.value = true;
    if (clockRef.value) {
      clockRef.value.startClock();
    }
  }
  selectedCards.push({ ...allCards.value[index], index });
  const { answer } = allCards.value[index];
  if (selectedCards.length === 2) {
    const firstSelected = selectedCards[0];
    if (firstSelected.answer === answer) {
      matchedPairs.value++;
      if (firstSelected.index !== undefined) {
        cardsRef.value[firstSelected.index].lockCard();
        cardsRef.value[index].lockCard();
      }
      if (matchedPairs.value === allCards.value.length / 2) {
        if (clockRef.value) {
          messageStore.showMessage(
            'Completed Game!',
            `Time ${clockRef.value.minutes}:${clockRef.value.seconds}`,
            5000
          );
          clockRef.value.stopClock();
        }
      }
      return;
    }
  }
  if (selectedCards.length === 3) {
    if (
      selectedCards[0].index !== undefined &&
      selectedCards[1].index !== undefined
    ) {
      cardsRef.value[selectedCards[0].index].close();
      cardsRef.value[selectedCards[1].index].close();
    }
    selectedCards = [{ ...allCards.value[index], index }];
  }
}
</script>
<template>
  <Clock ref="clockRef" />
  <div class="gridWrapper">
    <Card
      v-for="(card, index) in allCards"
      :key="index"
      v-bind="card"
      :max-card-height="maxCardHeight"
      :ref="(el:cardsRefType) => cardsRef.push(el)"
      :index="index"
      @card-opened="(index) => cardOpened(index)"
    />
  </div>
</template>
<style scoped>
.gridWrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  height: 82%; /* This height also needs to be calculated */
  width: 100%;
}
</style>
