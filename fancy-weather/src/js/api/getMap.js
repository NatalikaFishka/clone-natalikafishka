import { YANDEX_GEOCODER_TOKEN } from './../../constants/tokens';

export function createHeadMapScript(lang) {
  const mapScript = document.createElement('script');
  mapScript.setAttribute('src', `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_GEOCODER_TOKEN}&lang=${lang}_RU`);
  mapScript.setAttribute('type', 'text/javascript');
  mapScript.setAttribute('id', 'map-script');
  document.head.appendChild(mapScript);
  return mapScript;
}

export class YaMaps {
  init(userObj) {
    ymaps.ready(() => {
      this.map = new ymaps.Map('map', {
        center: [userObj.latitude, userObj.longitude],
        zoom: 10,
        controls: [],
      });
      this.map.behaviors.disable(['drag']);
    });
  }
}
