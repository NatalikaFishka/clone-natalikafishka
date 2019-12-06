import { weatherIconClassName } from '../constants/weather-classes';
import { weekDay } from '../constants/week';

export async function createCurrentTemperatureDom(summary, icon, city, temperature, apparentTemperature, humidity, windSpeed, weekDay, time) {

  const infoContainer = document.createDocumentFragment();

  /* Icon */

  const iconEl = document.createElement('i');
  iconEl.className = weatherIconClassName[icon];
  infoContainer.appendChild(iconEl);

  /* Summary */
  const summaryEl = document.createElement('p');
  summaryEl.innerText = summary;
  summaryEl.className = 'summary';
  infoContainer.appendChild(summaryEl);

  /* City */
  const cityEl = document.createElement('p');
  cityEl.innerText = city;
  cityEl.className = 'city';
  infoContainer.appendChild(cityEl);

  /* Temperature */

  const tempEl = document.createElement('div');
  tempEl.innerText = Math.round(temperature);
  tempEl.className = 'temperature';
  infoContainer.appendChild(tempEl);

  /* apparentTemperature */

  const apparentTempEl = document.createElement('div');
  apparentTempEl.innerText = `Feels like: ${Math.round(apparentTemperature)}`;
  apparentTempEl.className = 'apparent-temperature';
  infoContainer.appendChild(apparentTempEl);

  /* humidity */

  const humidityEl = document.createElement('div');
  humidityEl.innerText = `Humidity: ${humidity * 100}`;
  humidityEl.className = 'humidity';
  infoContainer.appendChild(humidityEl);

  /* Week day */
  // const timeData = await timeFunction();

  const weekDayEl = document.createElement('div');
  weekDayEl.innerText = weekDay;
  weekDayEl.className = 'week-day';
  infoContainer.appendChild(weekDayEl);

  /* time */

  const timeEl = document.createElement('div');
  timeEl.innerText = time;
  timeEl.className = 'time';
  infoContainer.appendChild(timeEl);


  /* windSpeed */

  const windSpeedEl = document.createElement('div');
  windSpeedEl.innerText = `Wind: ${windSpeed}`;
  windSpeedEl.className = 'wind-speed';
  infoContainer.appendChild(windSpeedEl);

  document.body.appendChild(infoContainer);
}

export function createMapDom() {
  const mapEl = document.createElement('div');
  mapEl.setAttribute('id', 'map');
  mapEl.setAttribute('style', 'width: 600px; height: 400px');
  document.body.appendChild(mapEl);
}

export function createThreeDayTempDom(icon, weekDay, temperature) {
  // const threeDayInfoContainer = document.createDocumentFragment();

  const threeDayInfoContainer = document.createElement('div');


  /* Icon */

  const iconEl = document.createElement('i');
  iconEl.className = weatherIconClassName[icon];
  threeDayInfoContainer.appendChild(iconEl);

  /* Temperature */

  const tempEl = document.createElement('div');
  tempEl.innerText = Math.round(temperature);
  tempEl.className = 'temperature';
  threeDayInfoContainer.appendChild(tempEl);

  /* Week day */

  const weekDayEl = document.createElement('div');
  weekDayEl.innerText = weekDay;
  weekDayEl.className = 'week-day';
  threeDayInfoContainer.appendChild(weekDayEl);

  document.body.appendChild(threeDayInfoContainer);

}
