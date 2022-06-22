export const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export function timeToNextGame(hourPeriod: number) {
  const currentDate = new Date().toLocaleTimeString('en-nz', {
    timeZone: 'Pacific/Auckland',
    hour12: false,
  });
  const time = currentDate.split(':');
  const timeObj = {
    hours: String((24 - parseInt(time[0])) % hourPeriod).padStart(2, '0'),
    minutes: String((60 - parseInt(time[1])) % 60).padStart(2, '0'),
    seconds: String((60 - parseInt(time[2])) % 60).padStart(2, '0'),
  };
  return `${timeObj.hours}: ${timeObj.minutes}: ${timeObj.seconds}`;
}
