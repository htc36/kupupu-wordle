<script setup lang="ts"></script>

<template>
  <div class="container">
    <h1>Statistics</h1>
    <div id="statistics">
      <div class="statistic-container">
        <div class="statistic">2</div>
        <div class="label">Played</div>
      </div>

      <div class="statistic-container">
        <div class="statistic">100</div>
        <div class="label">Win %</div>
      </div>

      <div class="statistic-container">
        <div class="statistic">2</div>
        <div class="label">Current Streak</div>
      </div>

      <div class="statistic-container">
        <div class="statistic">2</div>
        <div class="label">Max Streak</div>
      </div>
    </div>
    <h1>Guess Distribution</h1>
    <div id="guess-distribution">
      <div class="graph-container">
        <div class="guess">1</div>
        <div class="graph">
          <div class="graph-bar" style="width: 7%">
            <div class="num-guesses">0</div>
          </div>
        </div>
      </div>

      <div class="graph-container">
        <div class="guess">2</div>
        <div class="graph">
          <div class="graph-bar" style="width: 7%">
            <div class="num-guesses">0</div>
          </div>
        </div>
      </div>

      <div class="graph-container">
        <div class="guess">3</div>
        <div class="graph">
          <div class="graph-bar" style="width: 7%">
            <div class="num-guesses">0</div>
          </div>
        </div>
      </div>

      <div class="graph-container">
        <div class="guess">4</div>
        <div class="graph">
          <div class="graph-bar align-right highlight" style="width: 100%">
            <div class="num-guesses">2</div>
          </div>
        </div>
      </div>

      <div class="graph-container">
        <div class="guess">5</div>
        <div class="graph">
          <div class="graph-bar" style="width: 7%">
            <div class="num-guesses">0</div>
          </div>
        </div>
      </div>

      <div class="graph-container">
        <div class="guess">6</div>
        <div class="graph">
          <div class="graph-bar" style="width: 7%">
            <div class="num-guesses">0</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="countdown">
        <h1>Next WORDLE</h1>
        <div id="timer">
          <div class="statistic-container">
            <div class="statistic timer">10:00:12</div>
          </div>
        </div>
      </div>
      <div class="share">
        <button id="share-button">Share</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  //   expose: ['isOpen', 'close', 'open'],
  data() {
    return {
      isOpen: true,
    };
  },
  //   methods: {
  //     close(): void {
  //       this.isOpen = false;
  //     },
  //     open(): void {
  //       this.isOpen = true;
  //     },
  //   },
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
  width: 80%;
  font-size: 20px;
  height: 52px;
}
</style>
