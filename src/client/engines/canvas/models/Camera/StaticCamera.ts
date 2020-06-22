import { degToRad, rotatePoint } from '../../../../../shared/helpers';
import { MapModel, PlayerModel } from '../../../../../shared/models';

import CameraModel from '../../../../interfaces/CameraModel';

export default class StaticCamera implements CameraModel {
  public x = 0;
  public y = 0;

  map;
  activePlayer;
  renderer;

  init({ activePlayer, map, renderer }: { activePlayer: PlayerModel; map: MapModel; renderer }) {
    this.activePlayer = activePlayer;
    this.renderer = renderer;
    this.map = map;
    this.x = activePlayer.x;
    this.y = activePlayer.y;
    this.renderer.ctx.save();
  }

  update() {
    this.x = this.activePlayer.x;
    this.y = this.activePlayer.y;
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
  }

  wheel() {}
  remove() {}
  handleResize() {}
}
