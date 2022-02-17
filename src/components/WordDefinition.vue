<script setup lang="ts">
defineProps<{
  word: string;
}>();
</script>

<template>
  <div class="container">
    <img :src="`../../assets/${wordAssets.image}`" />
    <figure>
      <audio controls :src="`../../assets/${wordAssets.sound}`">
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </figure>
    <div class="share">
      <button id="share-button">Lesson</button>
    </div>
  </div>
</template>

<script lang="ts">
import { assetMapping } from '../assetMapping';
export default {
  //   expose: ['isOpen', 'close', 'open'],
  props: ['word'],
  data() {
    return {
      wordAssets: assetMapping[this.word],
    };
  },
  methods: {
    getTimeLeft() {},
  },
  mounted() {},
};
</script>
<style scoped>
.container {
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  width: 100%;
  height: 100%;
}
#statistics {
  color: var(--color-tone-1);
  display: flex;
  padding-bottom: 10px;
}
.statistic-container {
  flex: 1;
}
.statistic {
  color: var(--color-tone-1);
  font-size: 36px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  letter-spacing: 0.05em;
  font-variant-numeric: proportional-nums;
}
.label {
  color: var(--color-tone-1);
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
#guess-distribution {
  padding-bottom: 10px;
}
.graph-container {
  color: var(--color-tone-1);
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  padding-bottom: 4px;
  font-size: 14px;
  line-height: 20px;
}
.guess {
  color: var(--color-tone-1);
  font-size: 14px;
  line-height: 20px;
}
.graph {
  color: var(--color-tone-1);
  font-size: 14px;
  line-height: 20px;
  width: 100%;
  height: 100%;
  padding-left: 4px;
}
.graph-bar {
  color: red;
  font-size: 14px;
  line-height: 20px;
  height: 100%;
  position: relative;
  background-color: var(--color-absent);
  display: flex;
  justify-content: center;
  width: 7%;
}
.num-guesses {
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
  color: var(--tile-text-color);
}
#timer {
  color: var(--color-tone-1);
  font-size: 36px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.05em;
  font-variant-numeric: initial;
}
#guess-distribution {
  color: var(--color-tone-1);
  width: 80%;
  padding-bottom: 10px;
}
.highlight {
  background-color: var(--color-correct);
}
.align-right {
  justify-content: flex-end;
  padding-right: 8px;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.countdown {
  border-right: 1px solid var(--color-tone-1);
  padding-right: 12px;
  width: 50%;
}
.share {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#share-button {
  background-color: var(--red);
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
  width: 80%;
  font-size: 20px;
  height: 52px;
}
</style>
