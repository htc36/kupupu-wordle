import { defineStore } from 'pinia';
import {
  ApiResponseCards,
  ApiResponseWordle,
  CardObj,
  GameNames,
  localCardsObject,
} from '../types';
import axios, { AxiosError } from 'axios';
import { shuffleArray } from '../helpers/randomiseArray';
import {
  getLocalStorage,
  getStats,
  setLocalStorage,
} from '../helpers/localStorage';

const apiEndpoints = {
  wordle: 'https://whanau.tv/api/kupupu/',
  cards: 'https://whanau.tv/api/kupuhi/',
};

interface apiStoreState {
  isApiFetching: boolean;
  apiError: Error | AxiosError | null;
  cardsPrepared: CardObj[];
  apiResponseCards: ApiResponseCards | null;
  apiResponseWordle: ApiResponseWordle | null;
  wordleOfADay: string;
  cardsGameId: number;
  wordleGameId: number;
  restartGame: boolean;
}

function prepareCards(cardsFromApi: ApiResponseCards) {
  const playingCards: CardObj[] = [];
  cardsFromApi.kupuhi.forEach((card) => {
    playingCards.push({
      ...card,
      isTextCard: false,
    });
    playingCards.push({
      ...card,
      isTextCard: true,
    });
  });
  return shuffleArray(playingCards);
}

export const useApiStore = defineStore('apiStore', {
  state: () => {
    return {
      isApiFetching: false,
      apiError: null,
      cardsPrepared: [],
      apiResponseCards: null,
      apiResponseWordle: null,
      wordleOfADay: '',
      cardsGameId: 0,
      wordleGameId: 0,
      restartGame: false,
    } as apiStoreState;
  },
  actions: {
    async fetchApi(url: string, gameId: number) {
      this.isApiFetching = true;
      const endpoint = url + gameId;
      try {
        const { data } = await axios.get(endpoint);
        if (data) {
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
    async getCards(isNextGame: boolean) {
      const handleCardsApiResponse = (apiResponse: ApiResponseCards) => {
        this.cardsPrepared = prepareCards(apiResponse);
        this.apiResponseCards = apiResponse;
        this.cardsGameId = apiResponse.kupuhi[0].game_id;
        localSolutionObject = {
          cardsPrepared: this.cardsPrepared,
          apiResponseCards: this.apiResponseCards,
          game_id: apiResponse.kupuhi[0].game_id,
        };
        setLocalStorage(GameNames.Rerenga, localSolutionObject);
      };
      let localSolutionObject = {} as localCardsObject;
      localSolutionObject = getLocalStorage(GameNames.Rerenga);
      if (!localSolutionObject) {
        const apiResponse: ApiResponseCards = await this.fetchApi(
          apiEndpoints.cards,
          1
        );
        if (apiResponse) {
          handleCardsApiResponse(apiResponse);
        }
      } else {
        if (isNextGame) {
          //TODO: API should have a key that shows that next game is not available and we need to restart to 1
          // OR we can just use random game id from X to X
          const apiResponse: ApiResponseCards = await this.fetchApi(
            apiEndpoints.cards,
            this.cardsGameId + 1
          );
          if (apiResponse) {
            handleCardsApiResponse(apiResponse);
          }
        }
      }
      this.cardsPrepared = prepareCards(localSolutionObject.apiResponseCards);
      this.apiResponseCards = localSolutionObject.apiResponseCards;
      this.cardsGameId = localSolutionObject.game_id;
    },

    async getWordle(isNextGame?: boolean) {
      const handleWordleApiResponse = (apiResponse: ApiResponseWordle) => {
        localSolutionObject = apiResponse.kupupu[0];
        setLocalStorage(GameNames.Kupu, localSolutionObject);
        this.apiResponseWordle = apiResponse;
        this.wordleOfADay = apiResponse.kupupu[0].name_tereo;
        this.wordleGameId = apiResponse.kupupu[0].id;
      };
      let localSolutionObject = getLocalStorage(GameNames.Kupu);
      if (!localSolutionObject) {
        const apiResponse: ApiResponseWordle = await this.fetchApi(
          apiEndpoints.wordle,
          1
        );
        if (apiResponse) {
          handleWordleApiResponse(apiResponse);
        }
      } else {
        if (isNextGame) {
          //TODO: API should have a key that shows that next game is not available and we need to restart to 1
          // OR we can just use random game id from X to X
          const apiResponse: ApiResponseWordle = await this.fetchApi(
            apiEndpoints.wordle,
            localSolutionObject.id + 1
          );
          if (apiResponse) {
            handleWordleApiResponse(apiResponse);
          }
        }
        this.wordleOfADay = localSolutionObject.name_tereo;
      }
    },
  },
});
