import { OrbitControls, PerspectiveCamera } from 'three';
import IUpdatable from '../interfaces/IUpdatable';
import ICamera from '../interfaces/ICamera';
import PlayerModel from '../../shared/models/PlayerModel';
import Cursor from './Cursor';

export default class DynamicCamera implements IUpdatable, ICamera {
  public camera: PerspectiveCamera;
  controls: OrbitControls;

  constructor(private activePlayer: PlayerModel, private cursor: Cursor, private renderer) {
    this.camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 2000);
    this.camera.position.z = 400;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
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
    // this.controls.update();
  }

  remove() {
    this.camera.remove();
  }
}
