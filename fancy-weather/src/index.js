import './style.scss';
import 'weather-icons/css/weather-icons.min.css';
import { createHeadMapScript, YaMaps } from './js/api/getMap';
import getWeatherForecast from './js/api/getWeather';
import getCountry from './js/api/getCountry';
import getTime from './js/api/getTime';
import getUserLocation from './js/api/getUserIP';
import { createMainDomStructure, createCurrentTemperatureDom, createMapDom, createThreeDayTempDom, createControlsBlock } from './js/createDom';
import { LANGUAGES } from './constants/constants';
import languageSelector from './js/events/language-selector';
import timeCounter from './js/events/time';

const possibleLanguages = Object.keys(LANGUAGES);
const possibleLanguagesValues = Object.values(LANGUAGES);

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
      currentUnixTime: timeData.unixtime,
    };

    createCurrentTemperatureDom(gatherUserDataFromApi);
    const userMap = new YaMaps();
    userMap.init(gatherUserDataFromApi);
    gatherUserDataFromApi.currentMap = userMap;
    createThreeDayTempDom(gatherUserDataFromApi);
    createControlsBlock(possibleLanguagesValues);
    languageSelector(gatherUserDataFromApi);

    gatherUserDataFromApi.usersTimeDomEl = document.querySelector('.date-and-time');
    timeCounter(gatherUserDataFromApi);

    // const usersTime = document.querySelector('.date-and-time');
    // let initialTime = gatherUserDataFromApi.currentUnixTime;
    // setInterval(() => {
    //   initialTime += 1;
    //   usersTime.innerText = timeConverter(initialTime, lang);
    // }, 1000);

  } catch (e) {
    console.log(e);
  }
}

init(possibleLanguages[0]);

// const usersTime = document.querySelector('.date-and-time');
// function clock(userObj) {
//   usersTime.innerText = userObj.currentTime;
// }
