import { PerspectiveCamera } from 'three';

import { PlayerModel } from '../../../shared/models';

import Updatable from '../../interfaces/Updatable';
import CameraModel from './CameraModel';

export default class StaticCamera implements Updatable, CameraModel {
  public object: PerspectiveCamera;
  private activePlayer: PlayerModel;

  constructor() {
    this.object = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 2000);
    this.object.position.z = 400;
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
    this.object.position.x = this.activePlayer.x;
    this.object.position.y = this.activePlayer.y;
  }

  remove() {
    this.object.remove();
  }
}
