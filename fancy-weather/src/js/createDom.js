import { CONSTANTS, WEATHER_ICON_CLASSES, TEMPERATURE_UNITS } from '../constants/constants';
import timeConverter from '../js/utils/time-convertor';
import conversDMS from '../js/utils/convertDMS';

export function createMainDomStructure() {
  const structureContainer = document.createDocumentFragment();

  const controls = document.createElement('controls');
  const searchBar = document.createElement('search');
  const content = document.createElement('content');
  const map = document.createElement('map');

  structureContainer.appendChild(controls);
  structureContainer.appendChild(searchBar);
  structureContainer.appendChild(content);
  structureContainer.appendChild(map);

  document.body.appendChild(structureContainer);
}

export function createCurrentTemperatureDom(userDataFromApis) {
  const currentLangConstObj = CONSTANTS[userDataFromApis.userLanguage];

  const infoContainer = document.createDocumentFragment();

  const temperatureInfo = document.createElement('div');
  const cityAndDate = document.createElement('div');
  const summaryBlock = document.createElement('div');

  /* Temperature */

  const tempEl = document.createElement('div');
  tempEl.innerText = `${Math.round(userDataFromApis.temperature)}°`;
  tempEl.className = 'temperature';
  temperatureInfo.appendChild(tempEl);

  /* Icon */

  const iconEl = document.createElement('span');
  iconEl.className = WEATHER_ICON_CLASSES[userDataFromApis.icon];
  temperatureInfo.appendChild(iconEl);

  /* City and Country */
  const cityEl = document.createElement('div');
  cityEl.innerText = `${userDataFromApis.userCity}, ${userDataFromApis.userCountry}`;
  cityEl.className = 'city';
  cityAndDate.appendChild(cityEl);

  /* Week day and current Time */

  const weekDayEl = document.createElement('div');
  const weekDayLangShortArr = currentLangConstObj.weekDayShort;
  weekDayEl.innerText = `${weekDayLangShortArr[userDataFromApis.currentWeekDay]} `;
  weekDayEl.className = 'week-day';
  cityAndDate.appendChild(weekDayEl);

  const dayEl = document.createElement('div');
  dayEl.innerText = timeConverter(userDataFromApis.currentUnixTime, userDataFromApis.userLanguage);
  dayEl.className = 'date-and-time';
  cityAndDate.appendChild(dayEl);

  /* Summary */
  const summaryEl = document.createElement('div');
  const firstLetter = userDataFromApis.summary.substr(0, 1);
  const tail = userDataFromApis.summary.substr(1).toLowerCase();
  summaryEl.innerText = firstLetter + tail;
  summaryEl.className = 'summary';
  summaryBlock.appendChild(summaryEl);

  /* apparentTemperature */

  const apparentTempEl = document.createElement('div');
  apparentTempEl.innerText = `${currentLangConstObj.apparentTempLabel} ${Math.round(userDataFromApis.apparentTemperature)}°`;
  apparentTempEl.className = 'apparent-temperature';
  summaryBlock.appendChild(apparentTempEl);

  /* windSpeed */

  const windSpeedEl = document.createElement('div');
  windSpeedEl.innerText = `${currentLangConstObj.wind} ${userDataFromApis.windSpeed} ${currentLangConstObj.windUnits}`;
  windSpeedEl.className = 'wind-speed';
  summaryBlock.appendChild(windSpeedEl);

  /* humidity */

  const humidityEl = document.createElement('div');
  humidityEl.innerText = `${currentLangConstObj.humidity} ${userDataFromApis.humidity * 100} %`;
  humidityEl.className = 'humidity';
  summaryBlock.appendChild(humidityEl);

  infoContainer.appendChild(temperatureInfo);
  infoContainer.appendChild(cityAndDate);
  infoContainer.appendChild(summaryBlock);

  const mainContainer = document.querySelector('content');
  mainContainer.appendChild(infoContainer);
}

export function createMapDom(userDataFromApis) {
  const currentLangConstObj = CONSTANTS[userDataFromApis.userLanguage];
  const convertedDMS = conversDMS(userDataFromApis);

  const mapElsContainer = document.createDocumentFragment();
  const mapContainer = document.querySelector('map');

  const mapElContainer = document.createElement('div');
  mapElContainer.setAttribute('id', 'yamaps-map');

  const mapEl = document.createElement('div');
  mapEl.setAttribute('id', 'map');
  mapElContainer.appendChild(mapEl);
  mapElsContainer.appendChild(mapElContainer);

  const latitudeEl = document.createElement('div');
  latitudeEl.setAttribute('id', 'latitude');
  latitudeEl.innerText = `${currentLangConstObj.latitudeLabel} ${convertedDMS.convertedLatitude}`;
  mapElsContainer.appendChild(latitudeEl);

  const longitudeEl = document.createElement('div');
  longitudeEl.setAttribute('id', 'longitude');
  longitudeEl.innerText = `${currentLangConstObj.longitudeLabel} ${convertedDMS.convertedLongitude}`;
  mapElsContainer.appendChild(longitudeEl);

  mapContainer.appendChild(mapElsContainer);
}

export function createThreeDayTempDom(userDataFromApis) {
  const currentLangConstObj = CONSTANTS[userDataFromApis.userLanguage];

  const threeDayInfoContainer = document.createElement('div');

  for (let i = 1; i < 4; i += 1) {
    let threeWeekDay;
    const weekDayLangArr = currentLangConstObj.weekDay;
    if ((userDataFromApis.currentWeekDay + i) > 6) {
      threeWeekDay = weekDayLangArr[userDataFromApis.currentWeekDay - 7 + i];
    } else {
      threeWeekDay = weekDayLangArr[userDataFromApis.currentWeekDay + i];
    }

    const singleDayInfoContainer = document.createElement('div');

    /* Icon */

    const iconEl = document.createElement('span');
    iconEl.className = WEATHER_ICON_CLASSES[userDataFromApis.nextWeekWeather[i].icon];
    singleDayInfoContainer.appendChild(iconEl);

    /* Temperature */

    const tempEl = document.createElement('div');
    tempEl.innerText = Math.round(userDataFromApis.nextWeekWeather[i].temperatureMax) + '°';
    tempEl.className = 'temperature';
    singleDayInfoContainer.appendChild(tempEl);

    /* Week day */

    const weekDayEl = document.createElement('div');
    weekDayEl.innerText = threeWeekDay;
    weekDayEl.className = 'week-day';
    singleDayInfoContainer.appendChild(weekDayEl);

    threeDayInfoContainer.appendChild(singleDayInfoContainer);
  }

  const threeDayContainer = document.querySelector('content');
  threeDayContainer.appendChild(threeDayInfoContainer);
}

export function createControlsBlock(languagesArr) {
  const controlsElContainer = document.createDocumentFragment();
  const controlsContainer = document.querySelector('controls');

  /* Load image control button */
  const loadImageEl = document.createElement('div');
  loadImageEl.innerHTML = '<span class="icon-refresh"></span>';
  loadImageEl.className = 'load-image';
  controlsElContainer.appendChild(loadImageEl);

  /* Switch language select button */

  const switchLangEl = document.createElement('div');
  switchLangEl.className = 'language-selection-set';

  const switchLangSelector = document.createElement('select');
  const currentLangSelection = document.createElement('div');
  const switchLangCustomDrop = document.createElement('div');

  switchLangSelector.className = 'switch-lang-original';
  currentLangSelection.className = 'selected-language';
  switchLangCustomDrop.className = 'language-droplist';
  switchLangCustomDrop.classList.add('hide');


  languagesArr.forEach((item, index) => {
    const langOption = document.createElement('option');
    langOption.setAttribute('value', index);
    langOption.textContent = item;
    switchLangSelector.appendChild(langOption);

    const langCustomOption = document.createElement('div');
    langCustomOption.className = 'droplist-option';
    langCustomOption.innerText = item;
    switchLangCustomDrop.appendChild(langCustomOption);
  });

  const switchLangIcon = document.createElement('span');
  switchLangIcon.className = 'icon-arrow';
  switchLangIcon.classList.add('rotate');

  currentLangSelection.textContent = `${languagesArr[0]}`;

  switchLangEl.appendChild(switchLangSelector);
  switchLangEl.appendChild(currentLangSelection);
  switchLangEl.appendChild(switchLangCustomDrop);
  switchLangEl.appendChild(switchLangIcon);

  controlsElContainer.appendChild(switchLangEl);

  /* Switch temperature units selection button */
  const possibleUnits = Object.entries(TEMPERATURE_UNITS);
  const switchUnitsEl = document.createElement('div');
  switchUnitsEl.className = 'units-selection-set';

  possibleUnits.forEach((units) => {
    const unitContainer = document.createElement('div');
    unitContainer.classList.add('unit-system');
    unitContainer.classList.add(units[0]);
    unitContainer.innerText = units[1];
    switchUnitsEl.appendChild(unitContainer);
  });

  controlsElContainer.appendChild(switchUnitsEl);


  /* Insert all to controls tag */

  controlsContainer.appendChild(controlsElContainer);
}

export function createSearchBlock() {
  const searchElContainer = document.createDocumentFragment();
  const searchContainer = document.querySelector('search');

  const searchForm = document.createElement('form');

  const searchInput = document.createElement('input');
  searchInput.setAttribute('type', 'text');
  searchInput.setAttribute('placeholder', 'Search for city');
  searchInput.setAttribute('id', 'form-input-text');
  searchForm.appendChild(searchInput);

  const searchButton = document.createElement('input');
  searchButton.setAttribute('type', 'submit');
  searchButton.innerText = 'Search';
  searchForm.appendChild(searchButton);

  searchElContainer.appendChild(searchForm);
  searchContainer.appendChild(searchElContainer);
}