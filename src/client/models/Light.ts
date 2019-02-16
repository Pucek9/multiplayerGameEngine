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
    //
    // this.light = new PointLight(0xffffff,10);
    // this.light.shadowBias = 0.0001;
    // this.light.castShadow = true;
    // this.light.shadowDarkness = 0.3;
    // this.light.shadowCameraVisible = true;
    // this.screen.scene.add(this.light)

    this.light = new SpotLight(0xffffff, 20, 700);
    this.light.position.set(100, 1000, 100);

    this.light.castShadow = true;

    this.light.shadow.mapSize.width = 300;
    this.light.shadow.mapSize.height = 300;

    // this.light.shadow.camera.near = 500;
    // this.light.shadow.camera.far = 4000;
    // this.light.shadow.camera.fov = 30;
    this.screen.scene.add(this.light);
  }

  remove() {
    this.screen.scene.remove(this.light);
  }

  render() {
    this.light.position.set(this.activePlayer.x, this.activePlayer.y, 30);
    if (this.cursor) {
      this.light.target = this.cursor.object;
    }
    // this.light.position.set(0,0,30);
    // this.light.position.set(this.cursor.x, this.cursor.y, 30);
    // this.light.target.position.set(this.activePlayer.x, this.cursor.y, 10);
    // this.light.target.position.set(100, 100, 0);
  }
}
