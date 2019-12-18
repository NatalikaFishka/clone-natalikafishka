
export default async function getTime(timezone) {
  const response = await fetch(`https://cors-anywhere.herokuapp.com/http://worldtimeapi.org/api/timezone/${timezone}`);
  const timeJson = await response.json();
  const timeObj = {
    rowOffset: timeJson.raw_offset,
    unixtime: timeJson.unixtime,
    dayOfWeek: timeJson.day_of_week,
  };
  return timeObj;
}
