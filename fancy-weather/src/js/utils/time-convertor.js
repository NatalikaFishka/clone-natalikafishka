import { months } from '../../constants/months'

export default function timeConverter(UNIX_timestamp) {
  const a = new Date(UNIX_timestamp * 1000);
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  let min = a.getMinutes();
  min = (min < 10 ? '0' : '') + min;
  const time = date + ' ' + month + ' ' + hour + ':' + min;
  return time;
}
