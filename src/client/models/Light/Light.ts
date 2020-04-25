import { Color, Light } from 'three';

import ScreenModel from '../../interfaces/ScreenModel';
import Updatable from '../../interfaces/Updatable';
import Cursor from '../Cursor';

export interface Source {
  x: number;
  y: number;
}

export abstract class Lighting implements Updatable {
  light: Light;
  source?: Source;
  dest?: Cursor;

  constructor(public screen: ScreenModel) {}

  update() {}

  abstract init?(params);

  remove() {
    this.screen.scene.remove(this.light);
  }

  setColor(color: number) {
    this.light.color = new Color(color);
  }
}
