<template>
  <header>
    <div class="menu">
      <button id="help-button" class="icon" aria-label="help">
        <game-icon icon="help"></game-icon>
      </button>
    </div>
    <div class="title">WORDLE</div>
    <div class="menu">
      <button id="statistics-button" class="icon" aria-label="statistics">
        <game-icon icon="statistics"></game-icon>
      </button>
      <button id="settings-button" class="icon" aria-label="settings">
        <game-icon icon="settings"></game-icon>
      </button>
    </div>
  </header>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isOpen: true,
    };
  },
  methods: {
    close(): void {
      this.isOpen = false;
    },
    open(): void {
      this.isOpen = true;
    },
  },
};
</script>
