import {
  BufferGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  SphereGeometry,
} from 'three';

import { PULL, PUSH, REVERSE_BULLETS, SLOW_BULLETS } from '../../../../shared/constants';
import { BulletModel } from '../../../../shared/models';

import ScreenModel from '../../../interfaces/ScreenModel';
import Updatable from '../../../interfaces/Updatable';
import { optionsService } from '../../../store/store';
import Cursor from './Cursor';
import FlashLight from './Light/FlashLight';

export default class Bullet extends BulletModel implements Updatable {
  protected transparentBullets = [PUSH, PULL, SLOW_BULLETS, REVERSE_BULLETS];
  private object: Mesh;
  private geometry: SphereGeometry;
  private material: MeshBasicMaterial | MeshPhysicalMaterial;
  private transparency = this.transparentBullets.includes(this.type);

  setGeometry() {
    this.geometry = new SphereGeometry(this.size, 10, 10, 3);
  }

  setMaterial() {
    this.material = new MeshPhysicalMaterial({
      color: this.color,
      // @ts-ignore
      transparency: 1,
    });
    if (this.transparency) {
      this.material.transparent = true;
      // @ts-ignore
      this.material.transparency = 0.8;
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
