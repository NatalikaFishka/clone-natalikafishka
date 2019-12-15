export default function convertDMS(userObj) {

    const convertLatitude = Math.abs(userObj.latitude);
    const LatitudeDeg = Math.floor(convertLatitude);
    const LatitudeMin = (Math.floor((convertLatitude - LatitudeDeg) * 60));
    const LatitudeCardinal = ((userObj.latitude > 0) ? '' : '-');

    const convertLongitude = Math.abs(userObj.longitude);
    const LongitudeDeg = Math.floor(convertLongitude);
    const LongitudeMin = (Math.floor((convertLongitude - LongitudeDeg) * 60));
    const LongitudeCardinal = ((userObj.longitude > 0) ? '' : '-');

    return {
        convertedLatitude: `${LatitudeCardinal} ${LatitudeDeg}° ${LatitudeMin}'`,
        convertedLongitude: `${LongitudeCardinal} ${LongitudeDeg}° ${LongitudeMin}'`,
    };
}