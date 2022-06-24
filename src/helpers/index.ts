export const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export function timeToNextGame() {
  const currentDate = new Date().toLocaleTimeString('en-nz', {
    timeZone: 'Pacific/Auckland',
    hour12: false,
  });
  const time = currentDate.split(':');
  const timeObj = {
    minutes: String((60 - parseInt(time[1])) % 60).padStart(2, '0'),
    seconds: String((60 - parseInt(time[2])) % 60).padStart(2, '0'),
  };
  // I assume that they will be the same at the end and this mess will be fixed later
  const wordleHours = `${String((24 - parseInt(time[0])) % 24).padStart(
    2,
    '0'
  )}`;
  const cardHours = `${String((24 - parseInt(time[0])) % 12).padStart(2, '0')}`;

  return {
    wordleNextTime: `${wordleHours}:${timeObj.minutes}:${timeObj.seconds}`,
    cardsNExtTime: `${cardHours}:${timeObj.minutes}:${timeObj.seconds}`,
  };
}
