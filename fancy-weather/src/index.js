import './style.scss';
import 'weather-icons/css/weather-icons.min.css';
import { GEOLOCATION_TOKEN, WEATHER_TOKEN } from './constants/tokens';
import { getMap, createHeadMapScript } from './js/map';
import { createCurrentTemperatureDom, createMapDom, createThreeDayTempDom } from './js/dom';
import getTime from './js/getTime';
import { weekDay } from './constants/week';

async function getUserLocation() {
  return fetch(`https://ipinfo.io/json?token=${GEOLOCATION_TOKEN}`).then(response => {
    return response.json();
  });
}

const lang = 'en';

async function getWeatherForecast(locationCoordinates) {

  return fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${WEATHER_TOKEN}/${locationCoordinates}?units=si&lang=${lang}`).then(response => response.json());
}


async function init() {
  try {
    const timeData = await getTime();
    const { loc, city } = await getUserLocation();
    const { latitude, longitude, currently, daily } = await getWeatherForecast(loc);
    const { summary, icon, temperature, apparentTemperature, humidity, windSpeed } = currently;

    createCurrentTemperatureDom(summary, icon, city, temperature, apparentTemperature, humidity, windSpeed, weekDay[timeData.day_of_week], timeData.currentTime);
    getMap(latitude, longitude);

    for (let i = 1; i < 4; i += 1) {
      let threeWeekDay;
      if ((timeData.day_of_week + i) > 6) {
        threeWeekDay = weekDay[timeData.day_of_week - 7 + i];
      } else {
        threeWeekDay = weekDay[timeData.day_of_week + i];
      }
      createThreeDayTempDom(daily.data[i].icon, threeWeekDay, daily.data[i].temperatureMax);
    }

  } catch (e) {
    console.log(e);
  }
}

createHeadMapScript();
createMapDom();
init();
