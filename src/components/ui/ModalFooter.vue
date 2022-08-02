<script setup lang="ts">
import { useMessageStore } from '../../stores/message';
import BuyCoffeeButton from './BuyCoffeeButton.vue';
import { CardGameStats, GameNames, ModalNames } from '../../types';
import { TabNames } from '../../types';
import { getStats } from '../../helpers/localStorage';
import { useClockStore } from '../../stores/clock';
import { useModalStore } from '../../stores/modal';
import { useApiStore } from '../../stores/apiStore';

const props = defineProps<{
  forTab: TabNames;
}>();

const clockStore = useClockStore();
const modalStore = useModalStore();
const apiStore = useApiStore();

const messageStore = useMessageStore();

function onShare() {
  if (props.forTab === TabNames.KupuStats) {
    const resultGrid = messageStore.genResultGrid();
    if (resultGrid != '') {
      const messageToCopy = `#kupupu ${new Date().toLocaleDateString(
        'en-NZ'
      )}\n\n${resultGrid}`;
      navigator.clipboard.writeText(messageToCopy);
      messageStore.showMessage('Copied To Clipboard!', resultGrid);
    } else {
      messageStore.showMessage('Nothing To Share!');
    }
  }
  if (props.forTab === TabNames.RerengaStats) {
    const cardStats = getStats(GameNames.Rerenga) as CardGameStats;
    const cardMilliseconds = cardStats.times.prevTime.value;
    if (cardMilliseconds === 0) {
      messageStore.showMessage('Nothing To Share!');
    } else {
      const messageToCopy = `#rerenga ${new Date().toLocaleDateString(
        'en-NZ'
      )}\n\n Last game time: ${clockStore.getGameTime()}`;
      navigator.clipboard.writeText(messageToCopy);
      messageStore.showMessage('Copied To Clipboard!', messageToCopy);
    }
  }
}
// function nextGame() {
//   modalStore.toggleModal(ModalNames.statsModal);
//   apiStore.restartGame = !apiStore.restartGame;
// }
</script>
<template>
  <div class="footer">
    <button type="button" class="share-button" @click="onShare">Share</button>
    <div>
      <BuyCoffeeButton />
    </div>
    <!-- <button
      v-if="
        props.forTab === TabNames.KupuStats &&
        modalStore.gamePlaying === GameNames.Kupu
      "
      type="button"
      class="share-button"
      @click="nextGame"
    >
      Next game
    </button> -->
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
  border-top: 1px solid rgb(238, 238, 238);
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.share-button {
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
  width: 30%;
  font-size: 20px;
  height: 37px;
}
</style>
