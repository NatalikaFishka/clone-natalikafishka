import getWeatherForecast from '../api/getWeather';
import { createCurrentTemperatureDom, createThreeDayTempDom, createMapDom } from '../createDom';
import getCountry from '../api/getCountry';
import { createHeadMapScript, getMap, YaMaps } from '../api/getMap';
import MapManager from '../services/map-service';

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

  let headMapScript = document.querySelector('#map-script');
  headMapScript.remove();
  headMapScript = createHeadMapScript(userObj.userLanguage);
  headMapScript.onload = (() => {
    let userMap = new MapManager();
    console.log(userMap.getMap(userObj));
    userMap.getMap(newUserObj);
  });
}
