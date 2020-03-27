import {
  BufferGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  SphereGeometry,
} from 'three';

import { PULL, PUSH, SLOW_BULLETS } from '../../shared/constants';
import { BulletModel } from '../../shared/models';

import IUpdatable from '../interfaces/IUpdatable';
import ScreenModel from '../interfaces/ScreenModel';
import { optionsService } from '../store/store';
import Cursor from './Cursor';
import FlashLight from './Light/FlashLight';

export default class Bullet extends BulletModel implements IUpdatable {
  private object: Mesh;
  private geometry: SphereGeometry;
  private material: MeshBasicMaterial | MeshPhysicalMaterial;
  private transparency = this.type === PUSH || this.type === PULL || this.type === SLOW_BULLETS;

  setGeometry() {
    this.geometry = new SphereGeometry(this.size, 10, 10, 3);
  }

  setMaterial() {
    if (this.transparency) {
      this.material = new MeshPhysicalMaterial({
        color: this.color,
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
