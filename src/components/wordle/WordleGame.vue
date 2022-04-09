<script setup lang="ts">
import { onBeforeMount, onUnmounted } from 'vue';
import { getAllWords, getWordOfTheDayFromAPI } from '../../words';
import {
  getStats,
  setStats,
  getGameState,
  setGameState,
  setGameSettings,
  getDefaultGameState,
} from '../../helpers/localStorage';
import Modal from '../layout/Modal.vue';
import WordDefinition from './WordDefinition.vue';
import { defaultGameSettings } from '../../helpers/localStorage';
import Keyboard from './Keyboard.vue';
import { LetterState, Board, GameState } from '../../types';
import getSuggestion from '../../helpers/suggestion';
import { onMounted } from 'vue';
import { ModalNames } from '../../types';
import { useModalStore } from '../../stores/modal';
import { useMessageStore } from '../../stores/message';
import { ref } from 'vue';

let answer = ref<string>('');
let gameState: GameState = getDefaultGameState();
let board = ref<Board[][]>([]);
let letterStates = ref<Record<string, LetterState>>({});
let currentRowIndex = ref<number>(0);
let allowInput: boolean;

function handleGameState() {
  const savedGameState = getGameState(answer.value);
  if (savedGameState) {
    gameState = savedGameState;
  } else {
    gameState.solution = answer.value;
    setGameState(gameState);
  }
}
onBeforeMount(async () => {
  answer.value = await getWordOfTheDayFromAPI();
  console.log(answer.value);

  handleGameState();

  board.value = gameState.board;
  letterStates.value = gameState.letterState;
  currentRowIndex.value = gameState.currentRowIndex;
  allowInput = !gameState.isGameFinished;
});

const modal = useModalStore();

// Get word of the day
const currentLanguage = 'maori';
const allWords = getAllWords(currentLanguage);
const stats = getStats();

// Board state. Each tile is represented as { letter, state }
const currentRow = $computed(() => board.value[currentRowIndex.value]);

defineEmits(['setStats']);
let grid = $ref('');
let shakeRowIndex = $ref(-1);
let success = $ref(false);
const messageStore = useMessageStore();
onMounted(() => {
  const existingSettings = JSON.parse(
    window.localStorage.getItem('gameSettings') as string
  );
  if (!existingSettings) setGameSettings(defaultGameSettings);
});
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
  if (!allWords.includes(guess) && guess !== answer.value) {
    shake();
    let guesses = board.value.map((item) => {
      return item.map((letterObj) => letterObj.letter).join('');
    });
    const suggestion = getSuggestion(
      answer.value,
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

  let answerLetters: (string | null)[] = answer.value.split('');

  // Mark correct/present/absent letters
  currentRow.forEach((tile, i) => {
    markCorrectRows(tile, answerLetters, i);
    markPresentRows(tile, answerLetters);
    markAbsentRows(tile);
  });

  allowInput = false;
  console.log(answer);
  if (currentRow.every((tile) => tile.state === LetterState.CORRECT)) {
    setStats(stats, currentRowIndex.value);
    gameState.isGameFinished = true;
    // yay!
    setTimeout(() => {
      grid = messageStore.genResultGrid();
      messageStore.showMessage(
        ['Genius', 'Magnificent', 'Impressive', 'Splendid', 'Great', 'Phew'][
          currentRowIndex.value
        ],
        grid
      );
      success = true;
      modal.toggleModal(ModalNames.wordDefinitionModal);
    }, 1600);
  } else if (currentRowIndex.value < board.value.length - 1) {
    // go the next row
    currentRowIndex.value++;
    setTimeout(() => {
      allowInput = true;
    }, 1600);
  } else {
    setStats(stats, currentRowIndex.value);
    modal.toggleModal(ModalNames.wordDefinitionModal);
    gameState.isGameFinished = true;
    // game over :(
    setTimeout(() => {
      messageStore.showMessage(answer.value.toUpperCase(), '', 2000);
    }, 1600);
  }
  gameState.board = board.value;
  gameState.currentRowIndex = currentRowIndex.value;
  gameState.letterState = letterStates.value;
  setGameState(gameState);
}

function shake() {
  shakeRowIndex = currentRowIndex.value;
  setTimeout(() => {
    shakeRowIndex = -1;
  }, 1000);
}
</script>

<template>
  <div class="gameContainer" v-if="answer != ''">
    <Modal :modal-name="ModalNames.wordDefinitionModal">
      <WordDefinition
        :word="answer"
        @hasSelectedNext="
          () => {
            modal.toggleModal(ModalNames.wordDefinitionModal);
            modal.toggleModal(ModalNames.statsModal);
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
  <div v-else class="loading"></div>
</template>

<style scoped>
.gameContainer {
  width: 100%;
  height: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
