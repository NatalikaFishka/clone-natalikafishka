import { WEATHER_TOKEN } from '../../constants/tokens';

export default async function getWeatherForecast(userObj) {
  return fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${WEATHER_TOKEN}/${userObj.locationCoordinates}?units=${userObj.userUnitSystem}&lang=${userObj.userLanguage}`).then((response) => response.json());
}
