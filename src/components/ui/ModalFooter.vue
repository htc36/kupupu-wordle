<script setup lang="ts">
import { useMessageStore } from '../../stores/message';
import BuyCoffeeButton from './BuyCoffeeButton.vue';
import { CardGameStats, GameNames } from '../../types';
import { getStats } from '../../helpers/localStorage';

const props = defineProps<{
  forModal: GameNames;
}>();

const messageStore = useMessageStore();

function onShare() {
  if (props.forModal === GameNames.Kupu) {
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
  if (props.forModal === GameNames.Rerenga) {
    const cardStats = getStats('cardStats') as CardGameStats;
    if (
      cardStats.lastGameTime.minutesFinished === 0 &&
      cardStats.lastGameTime.secondsFinished === 0
    ) {
      messageStore.showMessage('Nothing To Share!');
    } else {
      const messageToCopy = `#rerenga ${new Date().toLocaleDateString(
        'en-NZ'
      )}\n\n Last game time: ${cardStats.lastGameTime.minutesFinished}m ${
        cardStats.lastGameTime.secondsFinished
      }s`;
      navigator.clipboard.writeText(messageToCopy);
      messageStore.showMessage('Copied To Clipboard!', messageToCopy);
    }
  }
}
</script>
<template>
  <div class="footer">
    <button type="button" class="share-button" @click="onShare()">Share</button>
    <BuyCoffeeButton />
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
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
  width: 50%;
  font-size: 20px;
  height: 37px;
}
</style>
