import { HemisphereLight } from 'three';

import Cursor from '../Cursor';
import { Lighting, Source } from './Light';

export default class AmbientLight extends Lighting {
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
