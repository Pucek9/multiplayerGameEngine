import BulletModel from '../../shared/models/BulletModel';
import IUpdatable from '../interfaces/IUpdatable';
import ScreenModel from '../types/ScreenModel';
import { Mesh, MeshBasicMaterial, SphereGeometry, BufferGeometry } from 'three';
import FlashLight from './Light/FlashLight';
import Cursor from './Cursor';
import { optionsService } from '../store/store';

export default class Bullet extends BulletModel implements IUpdatable {
  private object: Mesh;
  private geometry: SphereGeometry;
  private material: MeshBasicMaterial;

  setGeometry() {
    this.geometry = new SphereGeometry(this.size, 10, 10, 3);
  }

  setMaterial() {
    this.material = new MeshBasicMaterial({ color: this.color });
  }

  updateObjectGeometry() {
    this.setGeometry();
    this.object.geometry = new BufferGeometry().fromGeometry(this.geometry);
  }

  init(screen: ScreenModel) {
    const options = optionsService.getState();
    this.setGeometry();
    this.setMaterial();
    this.object = new Mesh(this.geometry, this.material);
    this.object.position.z = 10;

    if (options.bulletShadow) {
      this.object.castShadow = true;
    }

    this.update();
    screen.scene.add(this.object);
    if (this.flash && options.blinking) {
      this.showFlash(screen);
    }
  }

  remove(screen: ScreenModel) {
    screen.scene.remove(this.object);
  }

  showFlash(screen: ScreenModel) {
    const light = new FlashLight(screen);
    light.init({
      source: this.object.position,
      cursor: ({
        object: {
          position: { x: this.targetX, y: this.targetY, z: this.object.position.z },
        },
      } as unknown) as Cursor,
      intensity: 20,
    });

    setTimeout(() => {
      light.remove();
    }, 100);
  }

  update() {
    this.object.position.x = this.x;
    this.object.position.y = this.y;
  }
}
