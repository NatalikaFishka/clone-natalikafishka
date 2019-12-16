import timeConverter from '../utils/time-convertor';

export default function timeCounter(userObj) {
  const newUserObj = userObj;
  setInterval(() => {
    newUserObj.currentUnixTime += 1;
    const usersDate = timeConverter(newUserObj);
    newUserObj.usersTimeDomEl.innerText = `${usersDate.time}`;
  }, 1000);
}
