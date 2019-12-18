import getWeatherForecast from '../api/getWeather';
import { createCurrentTemperatureDom, createThreeDayTempDom } from '../createDom';

export default async function switchUnits(userObj) {
  const newUserObj = userObj;

  const { currently, daily } = await getWeatherForecast(newUserObj);
  const { temperature, apparentTemperature } = currently;

  newUserObj.temperature = temperature;
  newUserObj.apparentTemperature = apparentTemperature;
  newUserObj.nextWeekWeather = daily.data;

  const contentNode = document.querySelector('content');
  contentNode.innerHTML = '';

  createCurrentTemperatureDom(newUserObj);
  createThreeDayTempDom(newUserObj);
}
