import { PerspectiveCamera } from 'three';
import PlayerModel from '../../shared/models/PlayerModel';
import ICamera from '../interfaces/ICamera';
import IUpdatable from '../interfaces/IUpdatable';

export default class StaticCamera implements IUpdatable, ICamera {
  public object: PerspectiveCamera;

  constructor(private activePlayer: PlayerModel) {
    this.object = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 2000);
    this.object.position.z = 400;
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
