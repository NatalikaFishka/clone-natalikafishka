
export default async function getTime(timezone) {
  const response = await fetch(`https://cors-anywhere.herokuapp.com/http://worldtimeapi.org/api/timezone/${timezone}`);
  const timeJson = await response.json();
  const { unixtime, day_of_week } = timeJson;
  return { unixtime, day_of_week };
}
