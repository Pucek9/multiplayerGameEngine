import { PerspectiveCamera } from 'three';
import IUpdatable from '../interfaces/IUpdatable';
import ICamera from '../interfaces/ICamera';
import PlayerModel from '../../shared/models/PlayerModel';
import Cursor from './Cursor';

export default class DynamicCamera implements IUpdatable, ICamera {
  public object: PerspectiveCamera;

  constructor(private activePlayer: PlayerModel, private cursor: Cursor) {
    this.object = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 2000);
    this.object.position.z = 300;
  }

  wheel(e: WheelEvent) {
    if (e.deltaY > 0) {
      this.object.position.z += 10;
    } else {
      this.object.position.z -= 10;
    }
  }

  update() {
    this.object.position.x = this.activePlayer.x;
    this.object.position.y = this.activePlayer.y;
    this.object.lookAt(this.cursor.x, this.cursor.y, this.cursor.z);
  }

  remove() {
    this.object.remove();
  }
}
