
export default async function getTime(timezone) {
  const response = await fetch(`https://cors-anywhere.herokuapp.com/http://worldtimeapi.org/api/timezone/${timezone}`);
  const timeJson = await response.json();
  const { raw_offset, unixtime, day_of_week } = timeJson;
  return { raw_offset, unixtime, day_of_week };
}
