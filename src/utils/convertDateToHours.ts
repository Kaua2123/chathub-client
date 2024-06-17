export function convertDateToHours(date: string) {
  const newDate = new Date(date);
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  let hoursAndMinutes = hours + ':' + minutes;

  if (minutes < 10) {
    hoursAndMinutes = hours + ':0' + minutes;
  }

  return hoursAndMinutes;
}
