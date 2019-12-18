import { GEOCODING_TOKEN } from '../../constants/tokens';
import setContentPerUserSettings from '../utils/display-user-settings';
import getTime from './getTime';
import getWeatherForecast from './getWeather';
import ToastService from '../utils/toast-service';
import getImage from './getImage';

export default async function getSearchResults(searchInput, userObj) {
  const newUserObj = userObj;
  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${searchInput}&key=${GEOCODING_TOKEN}&language=${newUserObj.userLanguage}`);
  const responseJson = await response.json();
  if (responseJson.total_results === 0) {
    ToastService.displayToast(`No results for "${searchInput}" received. Please try different input.`);
    return;
  }
  const responseJsonArr = [...responseJson.results];
  const neededComponentIndex = responseJsonArr.find((curr) => (curr.components._type === 'city' || curr.components._type === 'state_district' || curr.components._type === 'state'));


  if (!neededComponentIndex) {
    ToastService.displayToast(`No results for "${searchInput}" received. Please try different input.`);
    return;
  }

  const { components, annotations, geometry } = neededComponentIndex;

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

  const timeObj = await getTime(newUserObj.timezone);
  newUserObj.unixtime = timeObj.unixtime;
  newUserObj.currentWeekDay = timeObj.dayOfWeek;
  newUserObj.searchUtcOffset = timeObj.rowOffset;

  const {
    currently,
    daily,
  } = await getWeatherForecast(newUserObj);
  const {
    summary, icon, temperature, apparentTemperature, humidity, windSpeed,
  } = currently;

  newUserObj.summary = summary;
  newUserObj.icon = icon;
  newUserObj.temperature = temperature;
  newUserObj.apparentTemperature = apparentTemperature;
  newUserObj.humidity = humidity;
  newUserObj.windSpeed = windSpeed;
  newUserObj.nextWeekWeather = daily.data;

  getImage(newUserObj);
  setContentPerUserSettings(newUserObj);
}
