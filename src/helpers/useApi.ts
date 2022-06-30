import axios from 'axios';
import { apiResponseTypes, WordResponse, CardsThemeResponse } from '../types';
export default async function useApi(
  url: string,
  responseType: apiResponseTypes
) {
  let result = null;
  let error = null;
  try {
    const { data } = await axios.get(url);
    if (data) {
      switch (responseType) {
        case 'cards':
          result = data as CardsThemeResponse[];
          break;
        case 'wordle':
          result = data as WordResponse[];
          break;
        default:
          result = data;
      }
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      error = e;
    } else {
      error = e;
    }
  }
  return { result, error };
}
