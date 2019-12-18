import { CONSTANTS } from '../../constants/constants';

export default function timeConverter(userObj) {
  const monthLangArr = CONSTANTS[userObj.userLanguage].months;
  const finalUnixTime = userObj.currentUnixTime - userObj.userUtcOffset + userObj.searchUtcOffset;
  const a = new Date(finalUnixTime * 1000);
  const month = monthLangArr[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  let min = a.getMinutes();
  min = (min < 10 ? '0' : '') + min;
  const currentDate = `${date} ${month}`;
  const time = `${hour}:${min}`;
  return { currentDate, time };
}
