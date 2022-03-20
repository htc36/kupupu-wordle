const defaultMessage = ' Using word of the day instead.';
import { assetMapping } from '../helpers/assetMapping';
import { maoriWords } from './maoriWords';
import { allWords } from './engWords';

export function getWordOfTheDay(language: string) {
  if (location.search) {
    try {
      const query = atob(location.search.slice(1));
      if (query.length !== 5) {
        alert(`Incorrect word length from encoded query. ${defaultMessage}`);
      } else {
        return query;
      }
    } catch (e) {
      alert(`Malformed encoded word query. ${defaultMessage}`);
    }
  }
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
