import getImage from '../api/getImage';

export default function reloadImageByBtn(userObj) {
  const newUserObj = userObj;
  const reloadImageBtn = document.querySelector('.load-image');
  const reloadImageBtnIcon = document.querySelector('.icon-refresh');
  reloadImageBtn.addEventListener('click', async () => {
    reloadImageBtnIcon.classList.add('spin');
    await getImage(newUserObj);
    setTimeout(() => reloadImageBtnIcon.classList.remove('spin'), 3000);
  });
}
