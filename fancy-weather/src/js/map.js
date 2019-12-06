import { YANDEX_GEOCODER_TOKEN } from '../constants/tokens';

export function createHeadMapScript() {
  const mapScript = document.createElement('script');
  mapScript.setAttribute('src', `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_GEOCODER_TOKEN}&lang=ru_RU`);
  mapScript.setAttribute('type', 'text/javascript');
  mapScript.setAttribute('id', 'map-script');
  document.head.appendChild(mapScript);
}

export function getMap(latitude, longitude) {
  ymaps.ready(() => {
    const userMap = new ymaps.Map('map', {
      center: [latitude, longitude],
      zoom: 12,
    });
    const markOnTheMap = new ymaps.GeoObject({
      geometry: {
        type: 'Point',
        coordinates: [latitude, longitude],
      },
    });

    userMap.geoObjects.add(markOnTheMap);
  });
}
