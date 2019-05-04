import IRenderable from '../interfaces/IRenderable';
import ScreenModel from '../types/ScreenModel';
import Cursor from './Cursor';
import Player from './Player';
import { SpotLight } from 'three';

export default class Light implements IRenderable {
  private light: SpotLight;
  private activePlayer: Player;
  private cursor: Cursor;

  constructor(public screen: ScreenModel) {}

  init(activePlayer: Player, cursor: Cursor) {
    this.activePlayer = activePlayer;
    this.cursor = cursor;
    this.light = new SpotLight(0xffffff, 20, 700);
    this.light.position.set(100, 1000, 100);
    this.light.castShadow = true;

    this.light.shadow.mapSize.width = 300;
    this.light.shadow.mapSize.height = 300;

    this.screen.scene.add(this.light);
  }

  remove() {
    this.screen.scene.remove(this.light);
  }

  render() {
    this.light.position.set(this.activePlayer.x, this.activePlayer.y, 50);
    if (this.cursor) {
      this.light.target.position.set(
        this.cursor.object.position.x,
        this.cursor.object.position.y,
        10,
      );
      this.light.target.updateMatrixWorld(true);
    }
  }
}
