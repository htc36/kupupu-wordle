import { maoriWords } from './maoriWords';
import { allWords } from './engWords';
import { apiResponseTypes } from '../types';
import useApi from '../helpers/useApi';
import { getSolutionObject, setSolutionObject } from '../helpers/localStorage';

export async function getWordOfTheDayFromAPI() {
  const currentDate = new Date().toLocaleDateString('en-nz', {
    timeZone: 'Pacific/Auckland',
  });
  let localSolutionObject = getSolutionObject();
  if (!localSolutionObject || localSolutionObject.date !== currentDate) {
    const { result, error } = await useApi(
      'https://whanau.tv/api/kupupu',
      apiResponseTypes.wordle
    );
    //TODO: need to handle error from API
    if (error) return { error: error };
    if (result) {
      localSolutionObject = result.kupupu[0];
      setSolutionObject(localSolutionObject, currentDate);
    }
  }
  return localSolutionObject.name_tereo;
}

export function getAllWords(language: string) {
  return language === 'maori' ? maoriWords : allWords;
}
