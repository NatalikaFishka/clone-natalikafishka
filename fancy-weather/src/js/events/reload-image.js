import getImage from '../api/getImage';

export default function reloadImageByBtn(userObj) {
  const newUserObj = userObj;
  const reloadImageBtn = document.querySelector('.load-image');
  reloadImageBtn.addEventListener('click', async () => getImage(newUserObj));
}
