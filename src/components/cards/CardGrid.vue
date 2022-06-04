<script setup lang="ts">
import Card from './Card.vue';
import Modal from '../layout/Modal.vue';
import { shuffleArray } from '../../helpers/randomiseArray';
import { cards } from '../../helpers/assetMapping';
import { ref, onMounted } from 'vue';
import { CardObj, GameNames } from '../../types';
import { useCardGameStore } from '../../stores/cardGame';
import { useModalStore } from '../../stores/modal';
import { storeToRefs } from 'pinia';
import { ModalNames } from '../../types';
import { setCardStats } from '../../helpers/localStorage';
import '../../css/tooltip.css';
import { useClockStore } from '../../stores/clock';
//Adding and destructuring store to refs to get reactivity without getters
const modal = useModalStore();
const emit = defineEmits<{
  (e: 'updateBestTime'): void;
}>();
const cardGameStore = useCardGameStore();
const clockStore = useClockStore();
const { startCardGame, stopCardGame, incrementClicks } = cardGameStore;

const { getGameTime } = clockStore;
const { clockTime } = storeToRefs(clockStore);

const { isCardGameStarted, clicks } = storeToRefs(cardGameStore);
onMounted(() => {
  modal.setGamePlaying(GameNames.Rerenga);
});
const playingSound = ref('');
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
function cardOpened(index: number) {
  if (!isCardGameStarted.value) {
    startCardGame();
  }
  incrementClicks();
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
        stopCardGame();
        setCardStats(clockTime.value, clicks.value);
        emit('updateBestTime');
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
function playSound(sound?: string) {
  if (sound && !playingSound.value) {
    playingSound.value = sound;
    var audio = new Audio(`/assets/${sound}`);
    audio.play();
    audio.onended = function () {
      playingSound.value = '';
    };
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
              <div>
                <img
                  v-if="playingSound == card.sound"
                  src="/assets/pause.svg"
                  class="play-pause"
                  @click.prevent="playSound(card.sound)"
                />
                <img
                  v-else
                  src="/assets/play.svg"
                  class="play-pause"
                  @click.prevent="playSound(card.sound)"
                />
                <a href="#" data-tooltip="Feature coming soon..">
                  <img
                    data-tooltip="I am a tooltip"
                    src="/assets/plus.svg"
                    style="cursor: default"
                    class="play-pause"
                  />
                </a>
              </div>
            </div>
          </li>
        </ul>
        <div class="footer">
          <h3 class="words-time">Time : {{ getGameTime() }}</h3>
          <button
            class="next-button"
            @click="
              modal.toggleModal(ModalNames.cardGameFinishedModal);
              modal.toggleModal(ModalNames.statsModal);
            "
          >
            Next
          </button>
        </div>
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
.play-pause {
  margin-left: 10px;
  height: 3.5em;
  padding-bottom: 10px;
  padding-top: 10px;
  cursor: pointer;
}
.footer {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}
.next-button {
  background-color: var(--green);
  color: var(--key-evaluated-text-color);
  font-family: inherit;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
  width: 40%;
  font-size: 20px;
  height: 52px;
}
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
  justify-content: space-between;
  margin-right: 20px;
  margin-left: 20px;
  border-bottom: 1px solid rgb(238, 238, 238);
}
.word-item {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.5rem;
}
.words-time {
  text-align: center;
  font-size: 1.6rem;
  font-weight: 500;
}
@media (max-width: 450px) {
  .modal-title {
    font-size: 1.4rem;
  }
}
</style>
