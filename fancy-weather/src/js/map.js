import { YANDEX_GEOCODER_TOKEN } from '../constants/tokens';

// function userMap(latitude, longitude) {
//   let map = new ymaps.Map("map", {
//     center: [latitude, longitude],
//     zoom: 12,
//   });
// }

export default async function getMap(latitude, longitude) {
  return fetch(`https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_GEOCODER_TOKEN}&lang=en_RU`)
    .then((res) => {
      let userMap = new ymaps.Map("map", {
        center: [latitude, longitude],
        zoom: 12,
      });
    });
};
