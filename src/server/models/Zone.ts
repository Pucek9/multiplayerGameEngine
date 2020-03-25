import { generateId } from '../../shared/helpers';

export default class Zone {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(params: Partial<Zone>) {
    this.id = params.id || generateId();
    Object.assign(this, params);
    Object.seal(this);
  }

  static fromMap(map) {
    const [x, y] = [-map.width / 2, -map.height / 2];
    return new Zone({ x, width: map.width, y, height: map.height });
  }
}
