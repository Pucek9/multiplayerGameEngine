import { MapModel, PlayerModel } from '../../../../../shared/models';

import CameraModel from '../../../../interfaces/CameraModel';
import Cursor from '../../../../interfaces/CursorModel';

export default class DynamicCamera implements CameraModel {
  public x = 0;
  public y = 0;

  map;
  activePlayer;
  init({ activePlayer, map }: { activePlayer: PlayerModel; map: MapModel; cursor: Cursor }) {
    this.activePlayer = activePlayer;
    this.map = map;
    this.x = activePlayer.x;
    this.y = activePlayer.y;
  }

  update() {
    this.x = this.activePlayer.x;
    this.y = this.activePlayer.y;
  }

  wheel() {}
  remove() {}
  handleResize() {}
}
