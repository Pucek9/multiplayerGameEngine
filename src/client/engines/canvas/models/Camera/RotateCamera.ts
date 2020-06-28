import { PlayerModel } from '../../../../../shared/models';

import BaseCamera from './BaseCamera';
const DEFAULT_ROTATE = 1.56;

export default class RotateCamera extends BaseCamera {
  protected observedObject: PlayerModel;
  diff = DEFAULT_ROTATE;
  direction: number;

  update() {
    this.x = this.observedObject.x;
    this.y = this.observedObject.y;
    this.renderer.ctx.restore();
    this.renderer.ctx.clearRect(
      0,
      0,
      this.renderer.domElement.width,
      this.renderer.domElement.height,
    );
    this.renderer.ctx.save();
    this.renderer.ctx.translate(
      this.renderer.domElement.width / 2 - (this.x - this.x),
      this.renderer.domElement.height / 2 + (this.x - this.x),
    );

    const dx = this.observedObject.cursor.x - this.x;
    const dy = this.observedObject.cursor.y - this.y;
    this.direction = Math.atan2(dy, dx);

    this.diff = this.direction - this.diff;

    this.renderer.ctx.rotate(this.diff);
    this.diff = DEFAULT_ROTATE;
  }

  wheel() {}
  remove() {}
  handleResize() {}
}
