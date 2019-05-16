import { PerspectiveCamera } from 'three';
import IUpdatable from '../interfaces/IUpdatable';
import ICamera from '../interfaces/ICamera';
import PlayerModel from '../../shared/models/PlayerModel';
import Cursor from './Cursor';

export default class DynamicCamera implements IUpdatable, ICamera {
  public camera: PerspectiveCamera;

  constructor(private activePlayer: PlayerModel, private cursor: Cursor) {
    this.camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 2000);
    this.camera.position.z = 300;
  }

  wheel(e: WheelEvent) {
    if (e.deltaY > 0) {
      this.camera.rotation.x += 0.1;
    } else {
      this.camera.rotation.x -= 0.1;
    }
  }

  update() {
    this.camera.position.x = this.activePlayer.x;
    this.camera.position.y = this.activePlayer.y;
    this.camera.lookAt(this.cursor.x, this.cursor.y, this.cursor.z);
  }

  remove() {
    this.camera.remove();
  }
}
