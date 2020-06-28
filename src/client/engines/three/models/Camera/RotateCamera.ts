import { PlayerModel } from '../../../../../shared/models';

import BaseCamera from './BaseCamera';

export default class RotateCamera extends BaseCamera {
  protected observedObject: PlayerModel;
  protected range = 200;
  constructor() {
    super();
  }

  update() {
    const cursor = this.observedObject.cursor;
    this.object.position.x =
      this.observedObject.x - this.range * Math.cos(this.observedObject.bodyDirection);
    this.object.position.y =
      this.observedObject.y - this.range * Math.sin(this.observedObject.bodyDirection);
    this.object.lookAt(cursor.x, cursor.y, cursor.z);
  }
}
