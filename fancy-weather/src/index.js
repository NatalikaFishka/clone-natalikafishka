import './style.scss';
import 'weather-icons/css/weather-icons.min.css';
import { getMap, createHeadMapScript, YaMaps } from './js/api/getMap';
import getWeatherForecast from './js/api/getWeather';
import getCountry from './js/api/getCountry';
import getTime from './js/api/getTime';
import getUserLocation from './js/api/getUserIP';
import { createMainDomStructure, createCurrentTemperatureDom, createMapDom, createThreeDayTempDom, createControlsBlock } from './js/createDom';
import { language } from './constants/languages';
import languageSelector from './js/events/language-selector';
import MapManager from './js/services/map-service';

const possibleLanguages = Object.keys(language);
const possibleLanguagesValues = Object.values(language);

async function init(lang) {
  try {
    createHeadMapScript(lang);
    createMainDomStructure();
    createMapDom();
    const { loc, timezone } = await getUserLocation();
    const timeData = await getTime(timezone);
    const { latitude, longitude, currently, daily } = await getWeatherForecast(loc, lang);
    const { summary, icon, temperature, apparentTemperature, humidity, windSpeed } = currently;
    const { city, country } = await getCountry(latitude, longitude, lang);

    const gatherUserDataFromApi = {
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
      currentTime: timeData.currentTime,
    };

    createCurrentTemperatureDom(gatherUserDataFromApi);
    const userMap = new MapManager();
    console.log(userMap);
    userMap.getMap(gatherUserDataFromApi);
    createThreeDayTempDom(gatherUserDataFromApi);
    createControlsBlock(possibleLanguagesValues);
    languageSelector(gatherUserDataFromApi, language);

  } catch (e) {
    console.log(e);
  }
}

init(possibleLanguages[0]);

