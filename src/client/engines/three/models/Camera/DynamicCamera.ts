import { PlayerModel } from '../../../../../shared/models';

import BaseCamera from './BaseCamera';

export default class DynamicCamera extends BaseCamera {
  protected observedObject: PlayerModel;
  constructor() {
    super();
  }

  update() {
    const range = 200;
    const cursor = this.observedObject.cursor;
    this.object.position.x =
      this.observedObject.x - range * Math.cos(this.observedObject.bodyDirection);
    this.object.position.y =
      this.observedObject.y - range * Math.sin(this.observedObject.bodyDirection);
    this.object.lookAt(cursor.x, cursor.y, cursor.z);
  }
}
