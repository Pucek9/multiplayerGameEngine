import { PerspectiveCamera, Vector3 } from 'three';

import { PlayerModel } from '../../../../../shared/models';

import CameraModel from '../../../../interfaces/CameraModel';
import Cursor from '../../../../interfaces/CursorModel';
import Updatable from '../../../../interfaces/Updatable';

export default class DynamicCamera implements Updatable, CameraModel {
  public object: PerspectiveCamera;
  private activePlayer: PlayerModel;
  private cursor: Cursor;

  constructor() {
    this.object = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
    this.object.up = new Vector3(0, 0, 1);
    this.object.position.z = 300;
  }

  init({ activePlayer }: { activePlayer: PlayerModel }) {
    this.activePlayer = activePlayer;
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
    const cursor = this.activePlayer.cursor;
    this.object.position.x =
      this.activePlayer.x - range * Math.cos(this.activePlayer.bodyDirection);
    this.object.position.y =
      this.activePlayer.y - range * Math.sin(this.activePlayer.bodyDirection);
    this.object.lookAt(cursor.x, cursor.y, cursor.z);
    // this.object.position.x = this.activePlayer.x;
    // this.object.position.y = this.activePlayer.y;
  }

  remove() {
    this.object.remove();
  }

  handleResize() {
    this.object.aspect = window.innerWidth / window.innerHeight;
    this.object.updateProjectionMatrix();
  }
}
