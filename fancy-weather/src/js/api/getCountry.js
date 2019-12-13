import { GEOCODING_TOKEN } from '../../constants/tokens';

export default async function getCountry(latitude, longitude, language) {
  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${GEOCODING_TOKEN}&language=${language}`);
  const responseJson = await response.json();
  const { city, country } = responseJson.results[0].components;
  return { city, country };
}
