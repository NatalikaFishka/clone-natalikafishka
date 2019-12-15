import getWeatherForecast from '../api/getWeather';
import { createCurrentTemperatureDom, createThreeDayTempDom, createMapDom } from '../createDom';
import getCountry from '../api/getCountry';
import { createHeadMapScript, YaMaps } from '../api/getMap';
import timeCounter from '../events/time';

export default async function switchLanguage(userObj) {
  const newUserObj = userObj;

  const { latitude, longitude, userLanguage, locationCoordinates } = newUserObj;

  // perform new API request to get info with selected language and set it to user object

  const { currently } = await getWeatherForecast(locationCoordinates, userLanguage);
  const { city, country } = await getCountry(latitude, longitude, userLanguage);

  // set new info to user object

  newUserObj.summary = currently.summary;
  newUserObj.userCity = city;
  newUserObj.userCountry = country;

  // clean info with old language

  const contentNode = document.querySelector('content');
  contentNode.innerHTML = '';

  // create dom part with new info

  createCurrentTemperatureDom(newUserObj);
  createThreeDayTempDom(newUserObj);

  // kill current map instance

  newUserObj.currentMap.map.destroy();
  let headMapScript = document.querySelector('#map-script');
  headMapScript.remove();

  // create new map instance 

  headMapScript = createHeadMapScript(newUserObj.userLanguage);
  headMapScript.onload = (() => {
    const newUserMap = new YaMaps();
    newUserMap.init(newUserObj);
    newUserObj.currentMap = newUserMap;
  });

  // set time counter 
  newUserObj.usersTimeDomEl = document.querySelector('.date-and-time');
}
