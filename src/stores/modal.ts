import { defineStore } from 'pinia';
import { ModalNames } from '../types';
export const useModalStore = defineStore('modal', {
  state: () => {
    return {
      isSettingsModalShown: false,
      isStatsModalShown: false,
      isWordDefinitionModalShown: false,
    };
  },
  actions: {
    toggleModal(modalName: ModalNames) {
      switch (modalName) {
        case ModalNames.settingsModal:
          this.isSettingsModalShown = !this.isSettingsModalShown;
          break;
        case ModalNames.statsModal:
          this.isStatsModalShown = !this.isStatsModalShown;
          break;
        case ModalNames.wordDefinitionModal:
          this.isWordDefinitionModalShown = !this.isWordDefinitionModalShown;
          break;
      }
    },
    getCurrentModalState(modalName: ModalNames) {
      switch (modalName) {
        case ModalNames.settingsModal:
          return this.isSettingsModalShown;
        case ModalNames.statsModal:
          return this.isStatsModalShown;
        case ModalNames.wordDefinitionModal:
          return this.isWordDefinitionModalShown;
      }
    },
  },
});
