import { IMAGE_TOKEN } from '../../constants/tokens';

export default async function getImage(userObj) {
  const url = `https://api.unsplash.com/photos/random?query=town,${userObj.userCity}&client_id=${IMAGE_TOKEN}`;
  const imageProm = await fetch(url);
  const imageJson = await imageProm.json();
  document.documentElement.setAttribute('style', `background-image: url(${imageJson.urls.regular})`);
}
