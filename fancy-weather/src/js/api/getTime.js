
import timeConverter from '../utils/time-convertor';

export default async function getTime(timezone) {
  const response = await fetch(`https://cors-anywhere.herokuapp.com/http://worldtimeapi.org/api/timezone/${timezone}`);
  const timeJson = await response.json();
  const { unixtime, day_of_week } = timeJson;
  const currentTime = timeConverter(unixtime);
  return { currentTime, day_of_week };
}
