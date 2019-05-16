import { PerspectiveCamera } from 'three';
import PlayerModel from '../../shared/models/PlayerModel';
import ICamera from '../interfaces/ICamera';
import IUpdatable from '../interfaces/IUpdatable';

export default class StaticCamera implements IUpdatable, ICamera {
  public camera: PerspectiveCamera;

  constructor(private activePlayer: PlayerModel) {
    this.camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 2000);
    this.camera.position.z = 400;
  }

  wheel(e: WheelEvent) {
    if (e.deltaY > 0) {
      this.camera.position.z += 10;
    } else {
      this.camera.position.z -= 10;
    }
  }

  update() {
    this.camera.position.x = this.activePlayer.x;
    this.camera.position.y = this.activePlayer.y;
  }

  remove() {
    this.camera.remove();
  }
}
