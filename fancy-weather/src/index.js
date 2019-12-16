import './style.scss';
import 'weather-icons/css/weather-icons.min.css';
import { createHeadMapScript, YaMaps } from './js/api/getMap';
import getWeatherForecast from './js/api/getWeather';
import getCountry from './js/api/getCountry';
import getTime from './js/api/getTime';
import getUserLocation from './js/api/getUserIP';
import { createMainDomStructure, createCurrentTemperatureDom, createMapDom, createThreeDayTempDom, createControlsBlock, createSearchBlock, createFormSubmitHeadScript } from './js/createDom';
import { LANGUAGES, TEMPERATURE_UNITS } from './constants/constants';
import languageSelector from './js/events/language-selector';
import timeCounter from './js/events/time';
import unitSelector from './js/events/units-selector';
import searchCity from './js/events/search-form-submit';

const possibleLanguages = Object.keys(LANGUAGES);
const possibleLanguagesValues = Object.values(LANGUAGES);
const possibleUnitsSystems = Object.keys(TEMPERATURE_UNITS);

const defaultSettings = {
  language: possibleLanguages[0],
  units: possibleUnitsSystems[1],
}

async function init(lang, unitSystem) {
  try {
    createHeadMapScript(lang);
    createMainDomStructure();
    const { loc, timezone } = await getUserLocation();
    const timeData = await getTime(timezone);
    const { latitude, longitude, currently, daily } = await getWeatherForecast(loc, lang, unitSystem);
    const { summary, icon, temperature, apparentTemperature, humidity, windSpeed } = currently;
    const { city, country } = await getCountry(latitude, longitude, lang);

    const gatherUserDataFromApi = {
      userUnitSystem: unitSystem,
      userLanguage: lang,
      locationCoordinates: loc,
      userCity: city,
      userCountry: country,
      timezone,
      latitude,
      longitude,
      summary,
      icon,
      temperature,
      apparentTemperature,
      humidity,
      windSpeed,
      currentWeekDay: timeData.day_of_week,
      nextWeekWeather: daily.data,
      currentUnixTime: timeData.unixtime,
    };

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


    gatherUserDataFromApi.usersDayDomEl = document.querySelector('.date');
    gatherUserDataFromApi.usersTimeDomEl = document.querySelector('.time');
    timeCounter(gatherUserDataFromApi);

  } catch (e) {
    console.log(e);
  }
}

init(defaultSettings.language, defaultSettings.units);
