import BaseCamera from './BaseCamera';

export default class StaticCamera extends BaseCamera {
  constructor() {
    super();
  }

  update() {
    this.object.position.x = this.observedObject.x;
    this.object.position.y = this.observedObject.y;
  }
}
