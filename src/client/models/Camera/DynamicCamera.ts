import { PerspectiveCamera, Vector3 } from 'three';

import PlayerModel from '../../../shared/models/PlayerModel';
import IUpdatable from '../../interfaces/IUpdatable';
import Cursor from '../Cursor';
import ICamera from './ICamera';

export default class DynamicCamera implements IUpdatable, ICamera {
  public object: PerspectiveCamera;
  private activePlayer: PlayerModel;
  private cursor: Cursor;

  constructor() {
    this.object = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
    this.object.up = new Vector3(0, 0, 1);
    this.object.position.z = 300;
  }

  init({ activePlayer, cursor }: { activePlayer: PlayerModel; cursor: Cursor }) {
    this.activePlayer = activePlayer;
    this.cursor = cursor;
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
    this.object.position.x =
      this.activePlayer.x - range * Math.cos(this.activePlayer.bodyDirection);
    this.object.position.y =
      this.activePlayer.y - range * Math.sin(this.activePlayer.bodyDirection);
    this.object.lookAt(this.cursor.x, this.cursor.y, this.cursor.z);
    // this.object.position.x = this.activePlayer.x;
    // this.object.position.y = this.activePlayer.y;
  }

  remove() {
    this.object.remove();
  }
}
