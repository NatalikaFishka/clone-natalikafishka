import { CONSTANTS } from '../../constants/constants';

let micOn = false;

export default function activateSpeachRecognition(userObj) {
    const micIcon = document.querySelector('.mic-icon');
    const inputField = document.querySelector('#form-input-text');
    const SpeechRecognition = new window.webkitSpeechRecognition();
    SpeechRecognition.lang = CONSTANTS[userObj.userLanguage].speachLang;

    micIcon.addEventListener('click', () => {
        micIcon.classList.toggle('icon-mic-off');
        micIcon.classList.toggle('icon-mic');

        if ([...micIcon.classList].includes('icon-mic') && !micOn) {
            micOn = true;
            SpeechRecognition.start();
        }
        if ([...micIcon.classList].includes('icon-mic-off') && micOn) {
            micOn = false;
            SpeechRecognition.stop();
        }
    });

    SpeechRecognition.addEventListener('result', (e) => {
        inputField.value = e.results[0][0].transcript;
        micIcon.classList.add('icon-mic-off');
        micIcon.classList.remove('icon-mic');
        SpeechRecognition.stop();
        micOn = false;
    });
}
