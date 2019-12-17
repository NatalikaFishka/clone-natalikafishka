import getSearchResults from '../api/getSearchResults';

export default async function searchCity(userObj) {
  const inputForm = document.querySelector('form');
  const inputFieldContent = document.querySelector('#form-input-text');
  inputForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const usersInput = inputFieldContent.value;
    await getSearchResults(usersInput, userObj);
    inputFieldContent.value = '';
  });
}
