
import timeConverter from './utils/time-convertor';

export default async function getTime() {
  const response = await fetch(`http://worldtimeapi.org/api/timezone/Europe/Minsk`);
  const timeJson = await response.json();
  const { unixtime, day_of_week } = timeJson;
  const currentTime = timeConverter(unixtime);
  return { currentTime, day_of_week };
}
