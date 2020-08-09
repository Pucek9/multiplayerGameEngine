import { PlayerModel } from '../../../../../shared/models';

import BaseCamera from './BaseCamera';

export default class DynamicCamera extends BaseCamera {
  protected range = 200;
  protected observedObject: PlayerModel;

  update() {
    this.x = this.observedObject.x + this.range * Math.cos(this.observedObject.bodyDirection);
    this.y = this.observedObject.y + this.range * Math.sin(this.observedObject.bodyDirection);
    this.renderer.ctx.restore();
    this.renderer.ctx.clearRect(
      0,
      0,
      this.renderer.domElement.width,
      this.renderer.domElement.height,
    );
    this.renderer.ctx.save();
    this.renderer.ctx.translate(
      this.renderer.domElement.width / 2,
      this.renderer.domElement.height / 2,
    );
  }
}
