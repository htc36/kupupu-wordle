import { defineStore } from 'pinia';
import { LetterState } from '../types';
import { getBoard } from '../helpers/localStorage';
const icons = {
  [LetterState.CORRECT]: '🟩',
  [LetterState.PRESENT]: '🟨',
  [LetterState.ABSENT]: '⬜',
  [LetterState.INITIAL]: null,
};

export const useMessageStore = defineStore('message', {
  state: () => {
    return {
      messageToDisplay: '',
      formattedText: '',
    };
  },
  actions: {
    showMessage(message: string, formattedText = '', time = 1000) {
      this.messageToDisplay = message;
      this.formattedText = formattedText;
      if (time > 0) {
        setTimeout(() => {
          this.messageToDisplay = '';
          this.formattedText = '';
        }, time);
      }
    },
    genResultGrid() {
      const board = getBoard();
      return board
        .filter((obj) => {
          return obj[0].letter != '';
        })
        .map((row) => {
          return row.map((tile) => icons[tile.state]).join(' ');
        })
        .join('\n');
    },
  },
});
