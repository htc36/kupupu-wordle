<script setup lang="ts">
import Card from './Card.vue';
import Modal from '../layout/Modal.vue';
import { shuffleArray } from '../../helpers/randomiseArray';
import { cards } from '../../helpers/assetMapping';
import { ref } from 'vue';
import { CardObj } from '../../types';
import { useClockStore } from '../../stores/clock';
import { useCardGameStore } from '../../stores/cardGame';
import { useModalStore } from '../../stores/modal';
import { storeToRefs } from 'pinia';
import { ModalNames } from '../../types';

//Adding and destructuring store to refs to get reactivity without getters
const modal = useModalStore();
const clockStore = useClockStore();
const { clockSeconds, clockMinutes } = storeToRefs(clockStore);
const cardGameStore = useCardGameStore();
const { startCardGame, stopCardGame } = cardGameStore;
const { isCardGameStarted } = storeToRefs(cardGameStore);

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

const cardsRef = ref<InstanceType<typeof Card>[]>([]);
type cardsRefType = typeof cardsRef;
const allCards = ref<CardObj[]>(playingCards);
const matchedPairs = ref<number>(0);
let selectedCards: CardObj[] = [];
let secondsFinished = ref(0);
let minutesFinished = ref(0);
function cardOpened(index: number) {
  if (!isCardGameStarted.value) {
    startCardGame();
  }
  selectedCards.push({ ...allCards.value[index], index });
  const { answer } = allCards.value[index];
  if (selectedCards.length === 2) {
    const firstSelected = selectedCards[0];
    if (firstSelected.answer === answer) {
      matchedPairs.value++;
      if (firstSelected.index !== undefined) {
        const firstIndex = firstSelected.index;
        cardsRef.value[firstIndex].lockCard();
        cardsRef.value[index].lockCard();
        setTimeout(() => {
          cardsRef.value[index].shakeCards();
          cardsRef.value[firstIndex].shakeCards();
        }, 500);
      }
      if (matchedPairs.value === allCards.value.length / 2) {
        secondsFinished.value = clockSeconds.value;
        minutesFinished.value = clockMinutes.value;
        stopCardGame();
        modal.toggleModal(ModalNames.cardGameFinishedModal);
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
  <div class="gridWrapper">
    <Modal :modal-name="ModalNames.cardGameFinishedModal">
      <div class="modal-finished-wrapper">
        <h3 class="modal-title">Game Completed</h3>
        <ul class="words-list">
          <li v-for="card in cards" :key="card.answer">
            <div class="words-list-item">
              <p class="word-item">{{ card.answer }}</p>
              <figure class="audio-figure">
                <audio class="audio" controls :src="`/assets/${card.sound}`">
                  Your browser does not support the
                  <code>audio</code> element.
                </audio>
              </figure>
            </div>
          </li>
        </ul>
        <h3 class="words-time">
          Time
          {{ minutesFinished < 10 ? `0${minutesFinished}` : minutesFinished }} :
          {{ secondsFinished < 10 ? `0${secondsFinished}` : secondsFinished }}
        </h3>
      </div>
    </Modal>
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
  height: 95%; /* This height also needs to be calculated */
  width: 100%;
}
.modal-finished-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
}
.modal-title {
  font-size: 1.7rem;
  font-weight: bold;
  text-align: center;
}
.words-list-item,
.words-list {
  display: flex;
}
.words-list {
  flex-direction: column;
  align-items: stretch;
}
.words-list-item {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.word-item {
  text-transform: uppercase;
  color: var(--red);
  font-weight: bold;
  font-size: 1.8rem;
}
.audio {
  width: 100%;
  height: 45px;
}
.audio-figure {
  margin: 10px 0;
  width: 70%;
  flex-shrink: 0;
}
.words-time {
  text-align: center;
  font-size: 1.6rem;
  font-weight: 500;
}
@media (max-width: 450px) {
  audio::-webkit-media-controls-current-time-display,
  audio::-webkit-media-controls-time-remaining-display,
  audio::-webkit-media-controls-volume-control-container,
  audio::-webkit-media-controls-timeline {
    display: none;
  }
  audio::-webkit-media-controls-panel {
    justify-content: space-between;
  }
  .audio {
    width: 100%;
  }
  .audio-figure {
    max-width: 100px;
  }
  .modal-title {
    font-size: 1.4rem;
  }
}
</style>
