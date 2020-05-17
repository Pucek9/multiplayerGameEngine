import { HemisphereLight } from 'three';

import { Source } from '../../../../interfaces/LightModel';
import Cursor from '../Cursor';
import { BaseLight } from './BaseLight';

export default class AmbientLight extends BaseLight {
  light: HemisphereLight;

  init({
    source,
    cursor,
    intensity = 8,
    color = 0xffffff,
  }: {
    source: Source;
    cursor: Cursor;
    intensity?: number;
    color?: number;
  }) {
    this.source = source;
    this.dest = cursor;
    this.light = new HemisphereLight(color, null, intensity);
    this.screen.scene.add(this.light);
  }

  remove() {
    this.screen.scene.remove(this.light);
  }
}
