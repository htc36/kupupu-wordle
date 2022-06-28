<script setup lang="ts">
import { useMessageStore } from '../../stores/message';
import BuyCoffeeButton from './BuyCoffeeButton.vue';
import { CardGameStats, TabNames } from '../../types';
import { getStats } from '../../helpers/localStorage';
import { useClockStore } from '../../stores/clock';
const clockStore = useClockStore();

const props = defineProps<{
  forTab: TabNames;
}>();

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
    const cardStats = getStats('cardStats') as CardGameStats;
    const cardMilliseconds = cardStats.times.prevTime.value;
    if (cardMilliseconds === 0) {
      messageStore.showMessage('Nothing To Share!');
    } else {
      const messageToCopy = `#rerenga ${new Date().toLocaleDateString(
        'en-NZ'
      )}\n\n Last game time: ${clockStore.getGameTime(cardMilliseconds)}`;
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
  padding-top: 15px;
  padding-bottom: 15px;
  border-top: 1px solid rgb(238, 238, 238);
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
