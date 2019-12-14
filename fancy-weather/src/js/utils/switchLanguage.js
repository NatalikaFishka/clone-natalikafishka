import getWeatherForecast from '../api/getWeather';
import { createCurrentTemperatureDom, createThreeDayTempDom, createMapDom } from '../createDom';
import getCountry from '../api/getCountry';
import { createHeadMapScript, YaMaps } from '../api/getMap';

export default async function switchLanguage(userObj) {
  const newUserObj = userObj;

  const { latitude, longitude, userLanguage, locationCoordinates } = newUserObj;

  const { currently } = await getWeatherForecast(locationCoordinates, userLanguage);
  newUserObj.summary = currently.summary;
  const { city, country } = await getCountry(latitude, longitude, userLanguage);
  newUserObj.userCity = city;
  newUserObj.userCountry = country;
  const contentNode = document.querySelector('content');
  contentNode.innerHTML = '';
  createCurrentTemperatureDom(newUserObj);
  createThreeDayTempDom(newUserObj);
  newUserObj.currentMap.map.destroy();

  let headMapScript = document.querySelector('#map-script');
  headMapScript.remove();
  headMapScript = createHeadMapScript(newUserObj.userLanguage);
  headMapScript.onload = (() => {
    const newUserMap = new YaMaps();
    newUserMap.init(newUserObj);
    newUserObj.currentMap = newUserMap;
  });
}
