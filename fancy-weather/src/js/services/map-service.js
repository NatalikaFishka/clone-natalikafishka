import { YaMaps } from '../api/getMap';

export default class MapManager {
  getMap(userObj) {
    if (!this.instance) {
      this.instance = new YaMaps();
      this.instance.init(ymaps, userObj.latitude, userObj.longitude);
    }
    return this.instance;
  }
}
