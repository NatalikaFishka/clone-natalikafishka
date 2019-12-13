import { GEOLOCATION_TOKEN } from '../../constants/tokens';

export default async function getUserLocation() {
  return fetch(`https://ipinfo.io/json?token=${GEOLOCATION_TOKEN}`).then(response => {
    return response.json();
  });
}
