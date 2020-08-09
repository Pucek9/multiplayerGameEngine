import { PlayerModel } from '../../../../../shared/models';

import CameraModel from '../../../../interfaces/CameraModel';
import Model3D from '../../../../interfaces/Model3D';

export default class BaseCamera implements CameraModel {
  public x = 0;
  public y = 0;
  public zoom = 2;

  protected observedObject: Model3D;
  protected renderer;

  init({ observedObject, renderer }: { observedObject: PlayerModel; renderer }) {
    this.observedObject = observedObject;
    this.renderer = renderer;
    this.x = observedObject.x;
    this.y = observedObject.y;
    this.renderer.ctx.save();
  }

  update() {}

  wheel(e: WheelEvent) {
    if (e.deltaY > 0) {
      this.zoom += 0.1;
    } else {
      this.zoom -= 0.1;
    }
  }
  remove() {}
  handleResize() {}
}
