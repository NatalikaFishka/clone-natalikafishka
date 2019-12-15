import timeConverter from '../utils/time-convertor';

export default function timeCounter(userObj) {
    setInterval(() => {
        userObj.currentUnixTime += 1;
        userObj.usersTimeDomEl.innerText = timeConverter(userObj.currentUnixTime, userObj.userLanguage);
    }, 1000);
}