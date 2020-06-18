import { MapModel, PlayerModel } from '../../../../../shared/models';

import CameraModel from '../../../../interfaces/CameraModel';

export default class StaticCamera implements CameraModel {
  public x = 0;
  public y = 0;

  map;
  activePlayer;
  init({ activePlayer, map }: { activePlayer: PlayerModel; map: MapModel }) {
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
