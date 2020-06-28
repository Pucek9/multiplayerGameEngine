import { PlayerModel } from '../../../../../shared/models';

import CameraModel from '../../../../interfaces/CameraModel';

export default class BaseCamera implements CameraModel {
  public x = 0;
  public y = 0;

  protected observedObject: { x: number; y: number; z?: number };
  protected renderer;

  init({ observedObject, renderer }: { observedObject: PlayerModel; renderer }) {
    this.observedObject = observedObject;
    this.renderer = renderer;
    this.x = observedObject.x;
    this.y = observedObject.y;
    this.renderer.ctx.save();
  }

  update() {}

  wheel() {}
  remove() {}
  handleResize() {}
}
