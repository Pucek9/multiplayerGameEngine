import PlayerModel from '../../shared/models/PlayerModel';
import IRenderable from '../interfaces/IRenderable';

import { Screen } from '../types/Screen';

export default class Camera implements IRenderable {
  private screen;

  constructor(private activePlayer: PlayerModel) {}

  init(screen: Screen) {
    this.screen = screen;
  }

  render() {
    this.screen.camera.position.x = this.activePlayer.x;
    this.screen.camera.position.y = this.activePlayer.y;
  }
}
