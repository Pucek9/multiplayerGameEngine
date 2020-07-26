import { SpotLight } from 'three';

import Model3D from '../../../../interfaces/Model3D';
import Cursor from '../Cursor';
import { BaseLight } from './BaseLight';

export default class FlashLight extends BaseLight {
  light: SpotLight;

  init({
    source,
    cursor,
    intensity = 4,
    color = 0xffffff,
  }: {
    source: Model3D;
    cursor: Cursor;
    intensity?: number;
    color?: number;
  }) {
    this.source = source;
    this.dest = cursor;
    this.light = new SpotLight(color, intensity, 700);
    this.update();
    this.light.castShadow = true;

    this.light.shadow.mapSize.width = 300;
    this.light.shadow.mapSize.height = 300;

    this.screen.scene.add(this.light);
  }

  remove() {
    this.screen.scene.remove(this.light);
  }

  update() {
    this.light.position.set(this.source.x, this.source.y, 50);
    if (this.dest) {
      this.light.target.position.set(this.dest.object.position.x, this.dest.object.position.y, 10);
      this.light.target.updateMatrixWorld(true);
    }
  }
}
