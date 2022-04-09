import { defineStore } from 'pinia';
import { ModalNames } from '../types';
import { useCardGameStore } from './cardGame';

export const useModalStore = defineStore('modal', {
  state: () => {
    return {
      isSettingsModalShown: false,
      isStatsModalShown: false,
      isWordDefinitionModalShown: false,
      isCardGameFinishedModal: false,
      isDonationModalShown: false,
    };
  },
  actions: {
    toggleModal(modalName: ModalNames) {
      switch (modalName) {
        case ModalNames.donationModal:
          this.isDonationModalShown = !this.isDonationModalShown;
        case ModalNames.settingsModal:
          this.isSettingsModalShown = !this.isSettingsModalShown;
          break;
        case ModalNames.statsModal:
          this.isStatsModalShown = !this.isStatsModalShown;
          break;
        case ModalNames.wordDefinitionModal:
          this.isWordDefinitionModalShown = !this.isWordDefinitionModalShown;
          break;
        case ModalNames.cardGameFinishedModal:
          if (this.isCardGameFinishedModal) {
            const { reRenderCardGameComponent } = useCardGameStore();
            reRenderCardGameComponent();
            this.isCardGameFinishedModal = false;
          } else {
            this.isCardGameFinishedModal = true;
          }
          break;
      }
    },
    getCurrentModalState(modalName: ModalNames) {
      switch (modalName) {
        case ModalNames.donationModal:
          return this.isDonationModalShown;
        case ModalNames.settingsModal:
          return this.isSettingsModalShown;
        case ModalNames.statsModal:
          return this.isStatsModalShown;
        case ModalNames.wordDefinitionModal:
          return this.isWordDefinitionModalShown;
        case ModalNames.cardGameFinishedModal:
          return this.isCardGameFinishedModal;
      }
    },
  },
});
