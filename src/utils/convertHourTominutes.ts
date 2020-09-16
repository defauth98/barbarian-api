export default function covertHourToMinutes(timer: string) {
  const [hour, minutes] = timer.split(":").map(Number);

  const timeInMinutes = hour * 60 + minutes;

  return timeInMinutes;
}
