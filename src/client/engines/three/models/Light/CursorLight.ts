import { PointLight } from 'three';

import Cursor from '../Cursor';
import { BaseLight } from './BaseLight';

export default class CursorLight extends BaseLight {
  light: PointLight;

  init({ cursor, intensity = 10 }: { cursor: Cursor; intensity?: number }) {
    this.dest = cursor;
    //
    this.light = new PointLight(0xffffff, intensity);
    // this.light.shadowBias = 0.0001;
    this.light.castShadow = true;
    this.screen.scene.add(this.light);

    this.light.position.set(100, 1000, 100);

    this.light.castShadow = true;

    this.light.shadow.mapSize.width = 300;
    this.light.shadow.mapSize.height = 300;
    this.screen.scene.add(this.light);
  }

  update() {
    this.light.position.set(0, 0, 500);
    this.light.position.set(this.dest.x, this.dest.y, 30);
  }
}
