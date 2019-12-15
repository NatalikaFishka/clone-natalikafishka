import setContentPerUserSettings from '../utils/display-user-settings';
import { LANGUAGES } from '../../constants/constants';

export default function languageSelector(userObj) {
  const selectorElement = document.querySelector('.language-selection-set');
  const currentLang = document.querySelector('.selected-language');
  const selectorDropList = document.querySelector('.language-droplist');
  const selectorArrow = document.querySelector('.icon-arrow');

  selectorElement.addEventListener('click', async (e) => {
    selectorElement.classList.toggle('active');
    selectorDropList.classList.toggle('hide');
    selectorArrow.classList.toggle('rotate');
    const possibleLangValues = Object.values(LANGUAGES);
    const possibleLangKeys = Object.keys(LANGUAGES);
    if (possibleLangValues.includes(e.target.innerHTML) && e.target.innerHTML !== currentLang.innerHTML) {
      currentLang.innerHTML = e.target.innerHTML;
      const newUserObj = userObj;
      newUserObj.userLanguage = possibleLangKeys[possibleLangValues.indexOf(currentLang.innerHTML)];
      await setContentPerUserSettings(newUserObj);
    };
  });
}
