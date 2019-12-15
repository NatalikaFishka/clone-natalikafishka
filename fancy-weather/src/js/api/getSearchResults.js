import { GEOCODING_TOKEN } from '../../constants/tokens';
import setContentPerUserSettings from '../utils/display-user-settings';

export default async function getSearchResults(searchInput, userObj) {
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${searchInput}&key=${GEOCODING_TOKEN}&language=${userObj.userLanguage}`);
    const responseJson = await response.json();
    if (responseJson.total_results === 0) {
        return alert(`No results for ${searchInput} received. Please try different input.`);
    }
    const { components, annotations, geometry } = responseJson.results[0];
    userObj.country = components.country;
    userObj.city = components.city;
    userObj.timezone = annotations.timezone.name;
    userObj.latitude = geometry.lat;
    userObj.longitude = geometry.lng;
    userObj.locationCoordinates = `${geometry.lat},${geometry.lng}`;
    setContentPerUserSettings(userObj);

    return userObj;
}