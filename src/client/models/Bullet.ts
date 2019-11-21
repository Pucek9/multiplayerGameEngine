import BulletModel from '../../shared/models/BulletModel';
import IUpdatable from '../interfaces/IUpdatable';
import ScreenModel from '../interfaces/ScreenModel';
import {
  BufferGeometry,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  MeshPhysicalMaterial,
} from 'three';
import FlashLight from './Light/FlashLight';
import Cursor from './Cursor';
import { optionsService } from '../store/store';

let light;

export default class Bullet extends BulletModel implements IUpdatable {
  private object: Mesh;
  private geometry: SphereGeometry;
  private material: MeshBasicMaterial | MeshPhysicalMaterial;
  private transparency = this.type === 'Push' || this.type === 'Pull';

  setGeometry() {
    this.geometry = new SphereGeometry(this.size, 10, 10, 3);
  }

  setMaterial() {
    console.log(this.type, this.transparency);
    if (this.transparency) {
      this.material = new MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0,
        // alphaMap: texture,
        alphaTest: 0.5,
        // envMap: hdrCubeRenderTarget.texture,
        envMapIntensity: 1,
        depthTest: false,
        // @ts-ignore
        transparency: 0.8,
        transparent: true,
      });
    } else {
      this.material = new MeshBasicMaterial({ color: this.color });
    }
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
    if (!this.transparency) {
      if (options.bulletShadow) {
        this.object.castShadow = true;
      }
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
    if (!light) {
      light = new FlashLight(screen);
    }
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
