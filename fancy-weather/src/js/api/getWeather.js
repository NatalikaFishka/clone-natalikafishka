import { WEATHER_TOKEN } from '../../constants/tokens';

export default async function getWeatherForecast(locationCoordinates, lang) {
  return fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${WEATHER_TOKEN}/${locationCoordinates}?units=si&lang=${lang}`).then(response => response.json());
}
