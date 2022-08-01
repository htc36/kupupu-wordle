<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import {
  getDefaultGameState,
  getStats,
  getWordleGameState2,
  setGameSettings,
  setWordleStats,
  setWorldeGameState,
} from '../../helpers/localStorage';
import { getAllWords } from '../../words';
import Modal from '../layout/Modal.vue';

import { storeToRefs } from 'pinia';
import { defaultGameSettings } from '../../helpers/localStorage';
import getSuggestion from '../../helpers/suggestion';
import { useApiStore } from '../../stores/apiStore';

import { useMessageStore } from '../../stores/message';
import { useModalStore } from '../../stores/modal';
import {
  Board,
  GameNames,
  LetterState,
  ModalNames,
  WordleGameStats,
} from '../../types';
import MessageAlert from '../ui/MessageAlert.vue';
import Keyboard from './Keyboard.vue';
import WordDefinition from './WordDefinition.vue';

const apiStore = useApiStore();
const modal = useModalStore();
const { wordleSolution, isApiFetching, apiError, restartGame, wordleGameId } =
  storeToRefs(apiStore);

//Calling API and storing cards in Pinia
modal.setGamePlaying(GameNames.Kupu);
const existingSettings = JSON.parse(
  window.localStorage.getItem('gameSettings') as string
);
if (!existingSettings) setGameSettings(defaultGameSettings);

let gameState = getWordleGameState2();
let board = ref<Board[][]>([]);
let showNextButton = ref<boolean>(false);
let letterStates = ref<Record<string, LetterState>>({});
let currentRowIndex = ref<number>(0);
let allowInput: boolean;

onMounted(async () => {
  await apiStore.getWordle(false);
  console.log('finished api');
  updateGame();
});

function updateGame() {
  console.log(wordleSolution.value);
  gameState.solution = wordleSolution.value;
  showNextButton.value = gameState.isGameFinished;
  console.log('GAMESTATE SOLUTION', gameState.solution);
  board.value = gameState.board;
  letterStates.value = gameState.letterState;
  currentRowIndex.value = gameState.currentRowIndex;
  allowInput = !gameState.isGameFinished;
  setWorldeGameState(gameState);
  success.value = false;
}

watch(restartGame, async () => {
  console.log('restarting game');
  gameState = getDefaultGameState();
  await apiStore.getWordle(true);
  gameState.solution = wordleSolution.value;
  updateGame();
});

const currentLanguage = 'maori';
const allWords = getAllWords(currentLanguage);
const wordleStats: WordleGameStats = getStats(
  GameNames.Kupu
) as WordleGameStats;
// Board state. Each tile is represented as { letter, state }
const currentRow = $computed(() => board.value[currentRowIndex.value]);
let grid = ref('');
let shakeRowIndex = ref(-1);
let success = ref(false);
const messageStore = useMessageStore();

// Handle keyboard input.
const onKeyup = (e: KeyboardEvent) => onKey(e.key);
window.addEventListener('keyup', onKeyup);
onUnmounted(() => {
  window.removeEventListener('keyup', onKeyup);
});

/**
 * Handles when the user either clicks on a letter or types one in
 * @param key
 */
function onKey(key: string) {
  if (!allowInput) return;
  if (key === 'Backspace') {
    clearTile();
  } else if (key === 'Enter') {
    completeRow();
  } else if (key.length > 1) {
    return;
  } else {
    fillTile(key.toLowerCase());
  }
}

function fillTile(letter: string) {
  for (const tile of currentRow) {
    if (!tile.letter) {
      tile.letter = letter;
      break;
    }
  }
}

function clearTile() {
  for (const tile of [...currentRow].reverse()) {
    if (tile.letter) {
      tile.letter = '';
      break;
    }
  }
}

/**
 * Mark correct/present/absent rows
 * @param tile current board tile
 * @param answerLetters a list of the answer letters, if its null, its already correct
 * @param index coloumn index of the current row
 */
function markCorrectRows(
  tile: Board,
  answerLetters: (string | null)[],
  index: number
) {
  if (answerLetters[index] === tile.letter) {
    tile.state = letterStates.value[tile.letter] = LetterState.CORRECT;
    answerLetters[index] = null;
  }
}
function markPresentRows(tile: Board, answerLetters: (string | null)[]) {
  if (!tile.state && answerLetters.includes(tile.letter)) {
    tile.state = LetterState.PRESENT;
    answerLetters[answerLetters.indexOf(tile.letter)] = null;
    if (!letterStates.value[tile.letter]) {
      letterStates.value[tile.letter] = LetterState.PRESENT;
    }
  }
}
function markAbsentRows(tile: Board) {
  if (!tile.state) {
    tile.state = LetterState.ABSENT;
    if (!letterStates.value[tile.letter]) {
      letterStates.value[tile.letter] = LetterState.ABSENT;
    }
  }
}

/**
 * Checks if the word is part of the main word list
 * @returns boolean weather or not word is valid
 */
function isValidWord() {
  const guess = currentRow.map((tile) => tile.letter).join('');
  if (!allWords.includes(guess) && guess !== wordleSolution.value) {
    shake();
    let guesses = board.value.map((item) => {
      return item.map((letterObj) => letterObj.letter).join('');
    });
    const suggestion = getSuggestion(
      wordleSolution.value,
      guesses,
      currentRowIndex.value,
      allWords
    );
    messageStore.showMessage(`Not in word list try ${suggestion}`, '', 2000);
    return false;
  }
  return true;
}

function completeRow() {
  if (!currentRow.every((tile) => tile.letter)) {
    // The row is not filled out
    shake();
    messageStore.showMessage('Not enough letters');
    return;
  }
  if (!isValidWord()) return;

  let answerLetters: (string | null)[] = wordleSolution.value.split('');

  // Mark correct/present/absent letters
  currentRow.forEach((tile, i) => {
    markCorrectRows(tile, answerLetters, i);
    markPresentRows(tile, answerLetters);
    markAbsentRows(tile);
  });

  allowInput = false;
  if (currentRow.every((tile) => tile.state === LetterState.CORRECT)) {
    setWordleStats(wordleStats as WordleGameStats, currentRowIndex.value);
    gameState.isGameFinished = true;
    // yay!
    setTimeout(() => {
      grid.value = messageStore.genResultGrid();
      messageStore.showMessage(
        ['Genius', 'Magnificent', 'Impressive', 'Splendid', 'Great', 'Phew'][
          currentRowIndex.value
        ],
        grid.value
      );
      success.value = true;
      modal.toggleModal(ModalNames.wordDefinitionModal);
    }, 1600);
  } else if (currentRowIndex.value < board.value.length - 1) {
    // go the next row
    currentRowIndex.value++;
    setTimeout(() => {
      allowInput = true;
    }, 1600);
  } else {
    setWordleStats(wordleStats as WordleGameStats, currentRowIndex.value);
    modal.toggleModal(ModalNames.wordDefinitionModal);
    gameState.isGameFinished = true;
    // game over :(
    setTimeout(() => {
      messageStore.showMessage(wordleSolution.value.toUpperCase(), '', 2000);
    }, 1600);
  }
  gameState.isGameFinished = gameState.isGameFinished;
  gameState.board = board.value;
  gameState.currentRowIndex = currentRowIndex.value;
  gameState.letterState = letterStates.value;
  setWorldeGameState(gameState);
}

function shake() {
  shakeRowIndex.value = currentRowIndex.value;
  setTimeout(() => {
    shakeRowIndex.value = -1;
  }, 1000);
}
</script>

<template>
  <div
    style="
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding-top: 10px;
    "
  >
    <div style="flex: 1">
      <button
        v-if="showNextButton"
        type="button"
        id="next"
        class="next-button"
        @click="() => (restartGame = !restartGame)"
      >
        Next game
      </button>
    </div>
    <h1>Match ID: {{ wordleGameId }}</h1>
  </div>
  <div class="gameContainer" v-if="isApiFetching">
    <div class="loading"></div>
    <message-alert :message="apiError" v-if="apiError" />
  </div>
  <div class="gameContainer" v-if="!isApiFetching && wordleSolution">
    <Modal :modal-name="ModalNames.wordDefinitionModal">
      <WordDefinition
        :word="wordleSolution"
        @has-selected-next="
          () => {
            modal.toggleModal(ModalNames.wordDefinitionModal);
            modal.toggleModal(ModalNames.statsModal);
            showNextButton = true;
          }
        "
      />
    </Modal>
    <div id="board">
      <div
        v-for="(row, index) in board"
        :class="[
          'row',
          shakeRowIndex === index && 'shake',
          success && currentRowIndex === index && 'jump',
        ]"
        v-bind:key="row[0].letter + row[1].letter"
      >
        <div
          v-for="(tile, index) in row"
          :class="['tile', tile.letter && 'filled', tile.state && 'revealed']"
          v-bind:key="tile.letter"
        >
          <div class="front" :style="{ transitionDelay: `${index * 300}ms` }">
            {{ tile.letter }}
          </div>
          <div
            :class="['back', tile.state]"
            :style="{
              transitionDelay: `${index * 300}ms`,
              animationDelay: `${index * 100}ms`,
            }"
          >
            {{ tile.letter }}
          </div>
        </div>
      </div>
    </div>
    <Keyboard
      @key="onKey"
      :letter-states="letterStates"
      :language="currentLanguage"
    />
  </div>
</template>

<style scoped>
.next-button {
  background-color: var(--key-bg-correct);
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
  width: 20%;
  font-size: 15px;
  height: 30px;
}
.gameContainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.loading {
  height: 100%;
  width: 100%;
  background: url('/assets/loader.svg') no-repeat center;
}
#board {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  box-sizing: border-box;
  --height: min(420px, calc(var(--vh, 100vh) - 310px));
  height: var(--height);
  width: min(350px, calc(var(--height) / 6 * 5));
  margin: 0px auto;
}
.easeModal {
  z-index: 9;
  transform: translateX(-50%);
  transition: opacity 0.3s ease-out;
}
.easeModal.v-leave-to {
  opacity: 0;
}
.row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
}
.tile {
  width: 100%;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  vertical-align: middle;
  text-transform: uppercase;
  user-select: none;
  position: relative;
}
.tile.filled {
  animation: zoom 0.2s;
}
.tile .front,
.tile .back {
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.tile .front {
  border: 2px solid #d3d6da;
}
.tile.filled .front {
  border-color: #999;
}
.tile .back {
  transform: rotateX(180deg);
}
.tile.revealed .front {
  transform: rotateX(180deg);
}
.tile.revealed .back {
  transform: rotateX(0deg);
}

@keyframes zoom {
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.shake {
  animation: shake 0.5s;
}

@keyframes shake {
  0% {
    transform: translate(1px);
  }
  10% {
    transform: translate(-2px);
  }
  20% {
    transform: translate(2px);
  }
  30% {
    transform: translate(-2px);
  }
  40% {
    transform: translate(2px);
  }
  50% {
    transform: translate(-2px);
  }
  60% {
    transform: translate(2px);
  }
  70% {
    transform: translate(-2px);
  }
  80% {
    transform: translate(2px);
  }
  90% {
    transform: translate(-2px);
  }
  100% {
    transform: translate(1px);
  }
}

.jump .tile .back {
  animation: jump 0.5s;
}

@keyframes jump {
  0% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(5px);
  }
  60% {
    transform: translateY(-25px);
  }
  90% {
    transform: translateY(3px);
  }
  100% {
    transform: translateY(0px);
  }
}

@media (max-height: 680px) {
  .tile {
    font-size: 3vh;
  }
}
</style>
