const defaultMessage = ' Using word of the day instead.';
import { assetMapping } from '../helpers/assetMapping';
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
function delay(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
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

export function getWordOfTheDay(language: string) {
  const maoriSolutions = Object.keys(assetMapping);
  const now = new Date();
  now.setDate(now.getDate() + 6);
  const start = new Date(2022, 0, 0);
  const diff = Number(now) - Number(start);
  let day = Math.floor(diff / (1000 * 60 * 60 * 24));
  const wordList = language == 'maori' ? maoriSolutions : allWords;
  while (day >= wordList.length) {
    day -= wordList.length;
  }
  console.log('SOLUTION ', wordList[day]);
  return wordList[day];
}
export function getAllWords(language: string) {
  return language === 'maori' ? maoriWords : allWords;
}
