import './style.scss';
import 'weather-icons/css/weather-icons.min.css';
import { GEOLOCATION_TOKEN, WEATHER_TOKEN } from './constants/tokens';
import getMap from './js/map';

async function getUserLocation() {
  return fetch(`https://ipinfo.io/json?token=${GEOLOCATION_TOKEN}`).then(response => {
    return response.json();
  });
}

const lang = 'en';

async function getWeatherForecast(locationCoordinates) {

  return fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${WEATHER_TOKEN}/${locationCoordinates}?units=si&lang=${lang}`).then(response => response.json());
}

function renderForecastInfo(currently, city) {
  const { summary, icon, temperature, apparentTemperature, humidity, time, windSpeed } = currently;

  const infoContainer = document.createDocumentFragment();

  /* Icon */
  const weatherIconClassName = {
    'clear-day': 'icon wi wi-day-sunny',
    'clear-night': 'icon wi wi-night-clear',
    'rain': 'icon wi wi-rain',
    'snow': 'icon wi wi-snow',
    'sleet': 'icon wi wi-sleet',
    'wind': 'icon wi wi-windy',
    'fog': 'icon wi wi-fog',
    'cloudy': 'icon wi wi-cloudy',
    'partly-cloudy-day': 'icon wi wi-day-cloudy',
    'partly-cloudy-night': 'icon wi wi-night-alt-cloudy',

  };

  const iconEl = document.createElement('i');
  iconEl.className = weatherIconClassName[icon];
  infoContainer.appendChild(iconEl);

  /* Summary */
  const summaryEl = document.createElement('p');
  summaryEl.innerText = summary;
  infoContainer.appendChild(summaryEl);

  /* City */
  const cityEl = document.createElement('p');
  cityEl.innerText = city;
  infoContainer.appendChild(cityEl);

  /* Temperature */

  const tempEl = document.createElement('div');
  tempEl.innerText = Math.round(temperature);
  infoContainer.appendChild(tempEl);

  /* apparentTemperature */

  const apparentTempEl = document.createElement('div');
  apparentTempEl.innerText = Math.round(apparentTemperature);
  infoContainer.appendChild(apparentTempEl);

  /* humidity */

  const humidityEl = document.createElement('div');
  humidityEl.innerText = humidity * 100;
  infoContainer.appendChild(humidityEl);

  /* time */

  const timeEl = document.createElement('div');
  timeEl.innerText = time;
  infoContainer.appendChild(timeEl);

  /* windSpeed */

  const windSpeedEl = document.createElement('div');
  windSpeedEl.innerText = windSpeed;
  infoContainer.appendChild(windSpeedEl);

  /* Create Map */

  // const mapEl = document.createElement('div');
  // mapEl.setAttribute('id', 'map');
  // mapEl.setAttribute('style', 'width: 600px; height: 400px');
  // infoContainer.appendChild(mapEl);

  document.body.appendChild(infoContainer);
}

async function init() {
  try {
    const { loc, city } = await getUserLocation();
    const { latitude, longitude, currently } = await getWeatherForecast(loc);
    await getMap(latitude, longitude);

    renderForecastInfo(currently, city);
  } catch (e) {
    console.log(e);
  }
}

init();

