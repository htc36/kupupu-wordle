import { maoriWords } from './maoriWords';
import { allWords } from './engWords';

export function getAllWords(language: string) {
  return language === 'maori' ? maoriWords : allWords;
}
