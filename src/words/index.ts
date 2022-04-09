import { maoriWords } from './maoriWords';
import { allWords } from './engWords';
import { WordResponse } from '../types';
import axios from 'axios';
import { getSolutionObject, setSolutionObject } from '../helpers/localStorage';

async function getWordFromApi() {
  const response = await axios.get('https://whanau.tv/api/kupupu');
  const word: WordResponse = response.data.kupupu[0];
  return word;
}

export async function getWordOfTheDayFromAPI() {
  const currentDate = new Date().toLocaleDateString('en-nz', {
    timeZone: 'Pacific/Auckland',
  });
  let localSolutionObject = getSolutionObject();
  if (!localSolutionObject || localSolutionObject.date != currentDate) {
    localSolutionObject = await getWordFromApi();
    setSolutionObject(localSolutionObject, currentDate);
  }
  return localSolutionObject.name_tereo;
}

export function getAllWords(language: string) {
  return language === 'maori' ? maoriWords : allWords;
}
