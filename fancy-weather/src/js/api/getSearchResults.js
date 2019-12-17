import { GEOCODING_TOKEN } from '../../constants/tokens';
import setContentPerUserSettings from '../utils/display-user-settings';
import getTime from './getTime';
import getWeatherForecast from './getWeather';

export default async function getSearchResults(searchInput, userObj) {
  const newUserObj = userObj;
  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${searchInput}&key=${GEOCODING_TOKEN}&language=${newUserObj.userLanguage}`);
  const responseJson = await response.json();
  if (responseJson.total_results === 0) {
    return alert(`No results for ${searchInput} received. Please try different input.`);
  }
  const responseJsonArr = [...responseJson.results];
  let neededComponentIndex = responseJsonArr.find((curr) => (curr.components._type === 'city' || curr.components._type === 'state_district' || curr.components._type === 'state'));

  if (!neededComponentIndex) {
    neededComponentIndex = [...responseJson.results[0]];
  }
  const { components, annotations, geometry } = neededComponentIndex;
  if (!(components._type === 'city' || components._type === 'state_district' || components._type === 'state')) {
    return alert(`No results for ${searchInput} received. Please try different input.`);
  }

  if (components._type === 'city') {
    newUserObj.city = components.city;
  } else if (components._type === 'state') {
    newUserObj.city = components.state;
  } else {
    newUserObj.city = components.state_district;
  }
  newUserObj.country = components.country;
  newUserObj.timezone = annotations.timezone.name;
  newUserObj.latitude = geometry.lat;
  newUserObj.longitude = geometry.lng;
  newUserObj.locationCoordinates = `${geometry.lat},${geometry.lng}`;

  const { raw_offset, unixtime, day_of_week } = await getTime(newUserObj.timezone);
  newUserObj.unixtime = unixtime;
  newUserObj.currentWeekDay = day_of_week;
  newUserObj.searchUtcOffset = raw_offset;

  const { currently, daily } = await getWeatherForecast(newUserObj.locationCoordinates, newUserObj.userLanguage, newUserObj.userUnitSystem);
  const { summary, icon, temperature, apparentTemperature, humidity, windSpeed } = currently;

  newUserObj.summary = summary;
  newUserObj.icon = icon;
  newUserObj.temperature = temperature;
  newUserObj.apparentTemperature = apparentTemperature;
  newUserObj.humidity = humidity;
  newUserObj.windSpeed = windSpeed;
  newUserObj.nextWeekWeather = daily.data;

  setContentPerUserSettings(newUserObj);
}
