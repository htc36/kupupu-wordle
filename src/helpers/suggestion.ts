const vowels = 'aeiouāēīōū';

function getSuggestion(
  s: string,
  board: string[],
  i: number,
  allWords: string[]
) {
  const guess = board[i];
  let lowest = 1e50;
  let bestguess = '';
  for (const x of allWords) {
    if (!board.includes(x) && x != s) {
      const c = wayneDistance(guess, x);
      if (c < lowest) {
        lowest = c;
        bestguess = x;
      }
    }
  }
  return bestguess;
}
function wayneDistance(x: string, y: string) {
  let c = 0;
  for (let i = 0; i < 5; i += 1) {
    const a = x[i];
    const b = y[i];
    if (a != b) {
      let d = 0;
      const v = vowels.indexOf(a);
      const w = vowels.indexOf(b);
      if (v >= 0) {
        if (w >= 0)
          if (Math.abs(w - v) == 5) d = 1;
          else d = 2;
        else d = 16;
      } else if (w > 0) d = 16;
      else if ('wq'.includes(a) && 'wq'.includes(b)) d = 4;
      else if ('ng'.includes(a) && 'ng'.includes(b)) d = 4;
      else d = 8;
      c += (d * 2) / (i + 1);
    }
  }
  return c;
}
export default getSuggestion;
