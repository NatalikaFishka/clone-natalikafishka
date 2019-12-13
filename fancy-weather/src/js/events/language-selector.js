import switchLanguage from '../utils/switchLanguage';

export default function languageSelector(userObj, languageObj) {
  const selectorElement = document.querySelector('.language-selection-set');
  const currentLang = document.querySelector('.selected-language');
  const selectorDropList = document.querySelector('.language-droplist');
  const selectorArrow = document.querySelector('.icon-arrow');

  selectorElement.addEventListener('click', async (e) => {
    selectorElement.classList.toggle('active');
    selectorDropList.classList.toggle('hide');
    selectorArrow.classList.toggle('rotate');
    const possibleLangValues = Object.values(languageObj);
    const possibleLangKeys = Object.keys(languageObj);
    if (possibleLangValues.includes(e.target.innerHTML) && e.target.innerHTML !== currentLang.innerHTML) {
      currentLang.innerHTML = e.target.innerHTML;
      const newUserObj = userObj;
      newUserObj.userLanguage = possibleLangKeys[possibleLangValues.indexOf(currentLang.innerHTML)];
      await switchLanguage(newUserObj);
    }
  });
}
