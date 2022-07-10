import { defineStore } from 'pinia';
import { ApiResponseCards, ApiResponseWordle, CardObj } from '../types';
import axios, { AxiosError } from 'axios';
import { shuffleArray } from '../helpers/randomiseArray';
import { getSolutionObject, setSolutionObject } from '../helpers/localStorage';

const apiEndpoints = {
  wordle: 'https://whanau.tv/api/kupupu',
  cards: 'https://whanau.tv/api/kupuhi/1',
};

interface apiStoreState {
  isApiFetched: boolean;
  isApiFetching: boolean;
  apiError: Error | AxiosError | null;
  cardsPrepared: CardObj[];
  apiResponseCards: ApiResponseCards | null;
  apiResponseWordle: ApiResponseWordle | null;
  wordleOfADay: string;
}

export const useApiStore = defineStore('apiStore', {
  state: () => {
    return {
      isApiFetched: false,
      isApiFetching: false,
      apiError: null,
      cardsPrepared: [],
      apiResponseCards: null,
      apiResponseWordle: null,
      wordleOfADay: '',
    } as apiStoreState;
  },
  actions: {
    async fetchApi(url: string) {
      this.isApiFetching = true;
      try {
        const { data } = await axios.get(url);
        if (data) {
          this.isApiFetched = true;
          this.isApiFetching = false;
          return data;
        }
      } catch (err) {
        const e = err as Error | AxiosError;
        if (axios.isAxiosError(e)) {
          this.apiError = e;
        } else {
          this.apiError = e;
        }
      }
    },
    async getCards() {
      if (this.cardsPrepared.length > 0) return this.cardsPrepared;
      const apiResponse: ApiResponseCards = await this.fetchApi(
        apiEndpoints.cards
      );
      const playingCards: CardObj[] = [];
      if (apiResponse) {
        apiResponse.kupuhi.forEach((card) => {
          playingCards.push({
            ...card,
            isTextCard: false,
          });
          playingCards.push({
            ...card,
            isTextCard: true,
          });
        });
      }
      const preparedCards = shuffleArray(playingCards);
      this.cardsPrepared = preparedCards;
      this.apiResponseCards = apiResponse;
    },
    async getWordle() {
      const currentDate = new Date().toLocaleDateString('en-nz', {
        timeZone: 'Pacific/Auckland',
      });
      let localSolutionObject = getSolutionObject();
      if (!localSolutionObject || localSolutionObject.date !== currentDate) {
        const apiResponse: ApiResponseWordle = await this.fetchApi(
          apiEndpoints.wordle
        );
        if (apiResponse) {
          localSolutionObject = apiResponse.kupupu[0];
          setSolutionObject(localSolutionObject, currentDate);
          this.apiResponseWordle = apiResponse;
          this.wordleOfADay = apiResponse.kupupu[0].name_tereo;
        }
      } else {
        this.wordleOfADay = localSolutionObject.name_tereo;
      }
    },
  },
});
