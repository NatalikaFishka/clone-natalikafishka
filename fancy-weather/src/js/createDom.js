import { CONSTANTS, WEATHER_ICON_CLASSES, TEMPERATURE_UNITS } from '../constants/constants';
import timeConverter from './utils/time-convertor';
import convertDMS from './utils/convertDMS';

const degreeUnit = '<span class="degree-unit">°</span>';

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

  const cityAndDate = document.createElement('div');
  cityAndDate.classList.add('city-and-date');

  const temperatureInfo = document.createElement('div');
  temperatureInfo.classList.add('current-temperature');

  const summaryBlock = document.createElement('div');
  summaryBlock.classList.add('summary');

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


  const usersDate = timeConverter(userDataFromApis);
  const dayEl = document.createElement('div');
  dayEl.innerText = `${usersDate.currentDate}`;
  dayEl.className = 'date';
  cityAndDate.appendChild(dayEl);

  const timeEl = document.createElement('div');
  timeEl.innerText = `${usersDate.time}`;
  timeEl.className = 'time';
  cityAndDate.appendChild(timeEl);

  /* Icon */

  const iconEl = `<span class="${WEATHER_ICON_CLASSES[userDataFromApis.icon]}"></span>`;

  /* Temperature */

  const tempEl = document.createElement('div');
  tempEl.innerHTML = `${Math.round(userDataFromApis.temperature)}${degreeUnit}${iconEl}`;
  tempEl.className = 'temperature';
  temperatureInfo.appendChild(tempEl);

  /* Summary */
  const summaryEl = document.createElement('div');
  const firstLetter = userDataFromApis.summary.substr(0, 1);
  const tail = userDataFromApis.summary.substr(1).toLowerCase();
  summaryEl.innerText = firstLetter + tail;
  summaryEl.className = 'summary-text';
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
  humidityEl.innerText = `${currentLangConstObj.humidity} ${Math.round(userDataFromApis.humidity * 100)} %`;
  humidityEl.className = 'humidity';
  summaryBlock.appendChild(humidityEl);

  temperatureInfo.appendChild(summaryBlock);

  infoContainer.appendChild(cityAndDate);
  infoContainer.appendChild(temperatureInfo);

  const mainContainer = document.querySelector('content');
  mainContainer.appendChild(infoContainer);
}

export function createMapDom(userDataFromApis) {
  const currentLangConstObj = CONSTANTS[userDataFromApis.userLanguage];
  const convertedDMS = convertDMS(userDataFromApis);

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
  threeDayInfoContainer.classList.add('three-day-temperature');

  for (let i = 1; i < 4; i += 1) {
    let threeWeekDay;
    const weekDayLangArr = currentLangConstObj.weekDay;
    if ((userDataFromApis.currentWeekDay + i) > 6) {
      threeWeekDay = weekDayLangArr[userDataFromApis.currentWeekDay - 7 + i];
    } else {
      threeWeekDay = weekDayLangArr[userDataFromApis.currentWeekDay + i];
    }

    const singleDayInfoContainer = document.createElement('div');
    singleDayInfoContainer.classList.add('single-day-temperature');

    /* Week day */

    const weekDayEl = document.createElement('div');
    weekDayEl.innerText = threeWeekDay;
    weekDayEl.className = 'week-day';
    singleDayInfoContainer.appendChild(weekDayEl);

    /* Icon */

    const iconEl = `<span class="icon ${WEATHER_ICON_CLASSES[userDataFromApis.nextWeekWeather[i].icon]}"></span>`;

    /* Temperature */

    const tempEl = document.createElement('div');
    tempEl.innerHTML = `${Math.round(userDataFromApis.nextWeekWeather[i].temperatureMax)}${degreeUnit}${iconEl}`;
    tempEl.className = 'temperature';
    singleDayInfoContainer.appendChild(tempEl);

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

  currentLangSelection.textContent = `${languagesArr[0]} `;

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
    const unitString = units[1];
    unitContainer.innerText = unitString;
    switchUnitsEl.appendChild(unitContainer);
  });

  controlsElContainer.appendChild(switchUnitsEl);


  /* Insert all to controls tag */

  controlsContainer.appendChild(controlsElContainer);
}

export function createSearchBlock(userDataFromApis) {
  const currentLangConstObj = CONSTANTS[userDataFromApis.userLanguage];

  const searchElContainer = document.createDocumentFragment();
  const searchContainer = document.querySelector('search');

  const searchForm = document.createElement('form');

  const micIcon = document.createElement('span');
  micIcon.classList.add('mic-icon');
  micIcon.classList.add('icon-mic-off');
  searchForm.appendChild(micIcon);

  const searchInput = document.createElement('input');
  searchInput.setAttribute('type', 'text');
  searchInput.setAttribute('placeholder', currentLangConstObj.searchInputPlaceholder);
  searchInput.setAttribute('id', 'form-input-text');
  searchForm.appendChild(searchInput);

  const searchButton = document.createElement('input');
  searchButton.setAttribute('type', 'submit');
  searchButton.value = currentLangConstObj.searchButtonText;
  searchForm.appendChild(searchButton);

  searchElContainer.appendChild(searchForm);
  searchContainer.appendChild(searchElContainer);
}
