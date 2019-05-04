import PlayerModel from '../../shared/models/PlayerModel';
import IRenderable from '../interfaces/IRenderable';

import ScreenModel from '../types/ScreenModel';

export default class Camera implements IRenderable {
  private screen: ScreenModel;

  constructor(private activePlayer: PlayerModel) {}

  init(screen: ScreenModel) {
    this.screen = screen;
  }

  render() {
    this.screen.camera.position.x = this.activePlayer.x;
    this.screen.camera.position.y = this.activePlayer.y;
  }
}
