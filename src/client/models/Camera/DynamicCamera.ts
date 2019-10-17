import { PerspectiveCamera } from 'three';
import IUpdatable from '../../interfaces/IUpdatable';
import ICamera from './ICamera';
import PlayerModel from '../../../shared/models/PlayerModel';
import Cursor from '../Cursor';

export default class DynamicCamera implements IUpdatable, ICamera {
  public object: PerspectiveCamera;
  private activePlayer: PlayerModel;
  private cursor: Cursor;

  constructor() {}

  init({ activePlayer, cursor }: { activePlayer: PlayerModel; cursor: Cursor }) {
    this.activePlayer = activePlayer;
    this.cursor = cursor;
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
    const range = 200;
    this.object.position.x = this.activePlayer.x - range *  Math.cos( this.activePlayer.direction);
    this.object.position.y = this.activePlayer.y - range * Math.sin(this.activePlayer.direction);

    this.object.lookAt(this.cursor.x, this.cursor.y, this.cursor.z);
    this.object.rotation.z = this.activePlayer.direction - 1.66;
  }

  remove() {
    this.object.remove();
  }
}
