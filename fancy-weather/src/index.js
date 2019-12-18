import './style.scss';
import 'weather-icons/css/weather-icons.min.css';
import { createHeadMapScript, YaMaps } from './js/api/getMap';
import getWeatherForecast from './js/api/getWeather';
import getCountry from './js/api/getCountry';
import getTime from './js/api/getTime';
import getUserLocation from './js/api/getUserIP';
import {
  createMainDomStructure,
  createCurrentTemperatureDom,
  createMapDom,
  createThreeDayTempDom,
  createControlsBlock,
  createSearchBlock,
} from './js/createDom';
import { LANGUAGES, TEMPERATURE_UNITS } from './constants/constants';
import languageSelector from './js/events/language-selector';
import timeCounter from './js/events/time';
import unitSelector from './js/events/units-selector';
import searchCity from './js/events/search-form-submit';
import getImage from './js/api/getImage';
import reloadImageByBtn from './js/events/reload-image';

const possibleLanguages = Object.keys(LANGUAGES);
const possibleLanguagesValues = Object.values(LANGUAGES);
const possibleUnitsSystems = Object.keys(TEMPERATURE_UNITS);

const defaultSettings = {
  language: possibleLanguages[0],
  units: possibleUnitsSystems[1],
};

const gatherUserDataFromApi = {};

async function init(lang, unitSystem) {
  try {
    createHeadMapScript(lang);
    createMainDomStructure();
    const { loc, timezone } = await getUserLocation();

    gatherUserDataFromApi.locationCoordinates = loc;
    gatherUserDataFromApi.timezone = timezone;
    gatherUserDataFromApi.userLanguage = lang;
    gatherUserDataFromApi.userUnitSystem = unitSystem;

    const timeData = await getTime(timezone);
    const {
      latitude,
      longitude,
      currently,
      daily,
    } = await getWeatherForecast(gatherUserDataFromApi);

    gatherUserDataFromApi.latitude = latitude;
    gatherUserDataFromApi.longitude = longitude;
    gatherUserDataFromApi.nextWeekWeather = daily.data;

    gatherUserDataFromApi.summary = currently.summary;
    gatherUserDataFromApi.icon = currently.summary;
    gatherUserDataFromApi.temperature = currently.temperature;
    gatherUserDataFromApi.apparentTemperature = currently.apparentTemperature;
    gatherUserDataFromApi.humidity = currently.humidity;
    gatherUserDataFromApi.windSpeed = currently.windSpeed;

    const { city, country } = await getCountry(latitude, longitude, lang);

    gatherUserDataFromApi.userCity = city;
    gatherUserDataFromApi.userCountry = country;

    gatherUserDataFromApi.currentWeekDay = timeData.dayOfWeek;
    gatherUserDataFromApi.currentUnixTime = timeData.unixtime;
    gatherUserDataFromApi.userUtcOffset = timeData.rowOffset;
    gatherUserDataFromApi.searchUtcOffset = timeData.rowOffset;

    createCurrentTemperatureDom(gatherUserDataFromApi);
    createMapDom(gatherUserDataFromApi);
    const userMap = new YaMaps();
    userMap.init(gatherUserDataFromApi);
    gatherUserDataFromApi.currentMap = userMap;
    createThreeDayTempDom(gatherUserDataFromApi);
    createControlsBlock(possibleLanguagesValues);
    unitSelector(gatherUserDataFromApi);
    languageSelector(gatherUserDataFromApi);

    createSearchBlock();
    searchCity(gatherUserDataFromApi);

    await getImage(gatherUserDataFromApi);
    reloadImageByBtn(gatherUserDataFromApi);

    gatherUserDataFromApi.usersDayDomEl = document.querySelector('.date');
    gatherUserDataFromApi.usersTimeDomEl = document.querySelector('.time');
    timeCounter(gatherUserDataFromApi);
  } catch (e) {
    throw new Error(e);
  }
}

init(defaultSettings.language, defaultSettings.units);
