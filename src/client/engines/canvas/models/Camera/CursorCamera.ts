import { PlayerModel } from '../../../../../shared/models';

import StaticCamera from './StaticCamera';

export default class CursorCamera extends StaticCamera {
  protected observedObject: PlayerModel;

  constructor() {
    super();
  }

  update() {
    this.x = this.observedObject.cursor.x;
    this.y = this.observedObject.cursor.y;
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
