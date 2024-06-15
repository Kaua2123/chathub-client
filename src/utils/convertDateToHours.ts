export function convertDateToHours(date: string) {
  const newDate = new Date(date);
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const hoursAndMinutes = hours + ':' + minutes;

  return hoursAndMinutes;
}
