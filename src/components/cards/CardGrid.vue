<script setup lang="ts">
import Card from './Card.vue';
import Modal from '../layout/Modal.vue';
import { ref } from 'vue';
import { CardObj, GameNames } from '../../types';
import { useCardGameStore } from '../../stores/cardGame';
import { useApiStore } from '../../stores/apiStore';
import { useModalStore } from '../../stores/modal';
import { storeToRefs } from 'pinia';
import { ModalNames } from '../../types';
import { setCardStats } from '../../helpers/localStorage';
import { useClockStore } from '../../stores/clock';
import MessageAlert from '../ui/MessageAlert.vue';
import '../../css/tooltip.css';

const modal = useModalStore();
const apiStore = useApiStore();
const cardGameStore = useCardGameStore();
const clockStore = useClockStore();
modal.setGamePlaying(GameNames.Rerenga);
const { isApiFetching, apiError, cardsPrepared, apiResponseCards } =
  storeToRefs(apiStore);
const {
  startCardGame,
  resetGamesPlayed,
  stopCardGame,
  incrementClicks,
  incrementGamesPlayed,
} = cardGameStore;
const { allowNextGame } = storeToRefs(cardGameStore);
const { getGameTime } = clockStore;
const { clockTime } = storeToRefs(clockStore);
const { isCardGameStarted, clicks } = storeToRefs(cardGameStore);

const apiBaseUrl = 'https://whanau.tv/eventMedia/';
const themeOfAGame = ref('Wellbeing');
const playingSound = ref('');

//Calling API and storing cards in Pinia
apiStore.getCards(false);
const cards = apiResponseCards;
const cardsRef = ref<InstanceType<typeof Card>[]>([]);
type cardsRefType = typeof cardsRef;
const matchedPairs = ref<number>(0);
let selectedCards: CardObj[] = [];

function cardOpened(index: number) {
  if (!isCardGameStarted.value) {
    startCardGame();
  }
  incrementClicks();
  selectedCards.push({ ...cardsPrepared.value[index], index });
  const { word_eng } = cardsPrepared.value[index];
  if (selectedCards.length === 2) {
    const firstSelected = selectedCards[0];
    if (firstSelected.word_eng === word_eng) {
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
      if (matchedPairs.value === cardsPrepared.value.length / 2) {
        stopCardGame();
        incrementGamesPlayed();
        setCardStats(clockTime.value, clicks.value);
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
    selectedCards = [{ ...cardsPrepared.value[index], index }];
  }
}

function playSound(sound?: string) {
  if (sound && !playingSound.value) {
    playingSound.value = sound;
    const audio = new Audio(`${apiBaseUrl}/${sound}`);
    audio.play();
    audio.onended = function () {
      playingSound.value = '';
    };
  }
}
</script>
<template>
  <div class="fetching" v-if="isApiFetching">
    <div class="loading"></div>
    <message-alert :message="apiError" v-if="apiError" />
  </div>
  <div class="gridWrapper" v-if="apiResponseCards && !isApiFetching">
    <Modal :modal-name="ModalNames.cardGameFinishedModal">
      <div class="modal-finished-wrapper">
        <h3 class="modal-title">Game Completed</h3>
        <h4 class="focusing-on">
          Focusing on: <span class="theme-title">{{ themeOfAGame }}</span>
        </h4>
        <ul class="words-list">
          <li v-for="card in cards?.kupuhi" :key="card.word_eng">
            <div class="words-list-item">
              <p class="word-item">{{ card.word_eng }}</p>
              <div>
                <img
                  v-if="playingSound == card.word_aud"
                  src="/assets/pause.svg"
                  class="modal-icon"
                  @click.prevent="playSound(card.word_aud)"
                />
                <img
                  v-else
                  src="/assets/play.svg"
                  class="modal-icon"
                  @click.prevent="playSound(card.word_aud)"
                />
                <a href="#" data-tooltipfeature="Feature coming soon..">
                  <img
                    src="/assets/plus.svg"
                    style="cursor: default"
                    class="modal-icon"
                  />
                </a>
              </div>
            </div>
          </li>
        </ul>
        <div class="pdf-container">
          <h3 class="pdf-title">Download PDF of today`s kupu</h3>
          <img
            src="/assets/download.svg"
            class="download-icon"
            alt="Download PDF"
          />
        </div>
        <div class="footer">
          <h3 class="words-time">Time : {{ getGameTime() }}</h3>
          <button
            v-if="allowNextGame"
            class="next-button"
            @click="
              modal.toggleModal(ModalNames.cardGameFinishedModal);
              resetGamesPlayed();
              apiStore.getCards(true);
              modal.toggleModal(ModalNames.statsModal);
            "
          >
            Next cards
          </button>
          <button
            v-else
            class="next-button"
            @click="modal.toggleModal(ModalNames.cardGameFinishedModal)"
          >
            Play again
          </button>
        </div>
      </div>
    </Modal>
    <Card
      v-for="(card, index) in cardsPrepared"
      :key="index"
      v-bind="card"
      :max-card-height="`${(100 / cardsPrepared.length) * 2 - 1 + '%'}`"
      :ref="(el:cardsRefType) => cardsRef.push(el)"
      :index="index"
      @card-opened="(index) => cardOpened(index)"
    />
  </div>
</template>

<style scoped>
.modal-icon,
.download-icon {
  cursor: pointer;
  margin-left: 10px;
  height: 3em;
  padding-bottom: 10px;
  padding-top: 10px;
}
.loading {
  height: 100%;
  width: 100%;
  background: url('/assets/loader.svg') no-repeat center;
}
.footer {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
}
.pdf-container {
  display: flex;
  width: 100%;
  justify-content: center;
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
  height: 40px;
}
.gridWrapper,
.fetching {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  height: 95%; /* This height also needs to be calculated */
  width: 100%;
}
.fetching {
  align-items: center;
}
.modal-finished-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
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
  justify-self: flex-start;
}
@media (max-width: 450px) {
  .modal-title {
    font-size: 1.4rem;
  }
}
.pdf-title {
  cursor: pointer;
  font-size: 0.9em;
}
.focusing-on {
  font-size: 0.9rem;
  font-weight: bold;
  margin: 0 20px;
  text-align: center;
}
.theme-title {
  color: var(--orange);
  padding-left: 20px;
}
</style>
