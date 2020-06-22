import { degToRad, rotatePoint } from '../../../../../shared/helpers';
import { MapModel, PlayerModel } from '../../../../../shared/models';

import CameraModel from '../../../../interfaces/CameraModel';
import Cursor from '../../../../interfaces/CursorModel';

export default class DynamicCamera implements CameraModel {
  public x = 0;
  public y = 0;

  map;
  activePlayer;
  cursor;
  renderer;
  diff = -1.56;
  direction: number;
  init({
    activePlayer,
    map,
    cursor,
    renderer,
  }: {
    activePlayer: PlayerModel;
    map: MapModel;
    cursor: Cursor;
    renderer;
  }) {
    this.activePlayer = activePlayer;
    this.renderer = renderer;
    this.cursor = cursor;
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
    if (this.cursor) {
      const dx = this.cursor.x - this.x;
      const dy = this.cursor.y - this.y;

      this.direction = Math.atan2(dy, dx);

      this.diff = this.direction - this.diff ?? 0;

      // if (this.diff !== 0) {
      this.renderer.ctx.rotate(this.diff);
      // console.log(this.diff);
      this.diff = 1.56;
      // }
    }
  }

  wheel() {}
  remove() {}
  handleResize() {}
}
