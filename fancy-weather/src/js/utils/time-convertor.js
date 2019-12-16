import { CONSTANTS } from '../../constants/constants'

export default function timeConverter(unixTimestamp, lang) {
  const monthLangArr = CONSTANTS[lang].months;
  const a = new Date(unixTimestamp * 1000);
  const month = monthLangArr[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  let min = a.getMinutes();
  min = (min < 10 ? '0' : '') + min;
  const currentDate = `${date} ${month}`;
  const time = `${hour}:${min}`;
  return { currentDate, time };
}
