import IRenderable from '../interfaces/IRenderable';
import ScreenModel from '../types/ScreenModel';
import Cursor from './Cursor';
import Player from './Player';
import { PointLight } from 'three';

export default class CursorLight implements IRenderable {
  private light: PointLight;
  private activePlayer: Player;
  private cursor: Cursor;

  constructor(public screen: ScreenModel) {}

  init(activePlayer: Player, cursor: Cursor) {
    this.activePlayer = activePlayer;
    this.cursor = cursor;
    //
    this.light = new PointLight(0xffffff, 10);
    // this.light.shadowBias = 0.0001;
    this.light.castShadow = true;
    this.screen.scene.add(this.light);

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
    this.light.position.set(0, 0, 500);
    this.light.position.set(this.cursor.x, this.cursor.y, 30);
  }
}
