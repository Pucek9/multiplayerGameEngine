import Cursor from '../Cursor';
import IUpdatable from '../../interfaces/IUpdatable';
import { Color, Light } from 'three';
import ScreenModel from '../../types/ScreenModel';

export interface Source {
  x: number;
  y: number;
}

export abstract class Lighting implements IUpdatable {
  light: Light;
  source?: Source;
  dest?: Cursor;

  constructor(public screen: ScreenModel) {}

  update() {};

  abstract init?(params: any);

  remove() {
    this.screen.scene.remove(this.light);
  }

  setColor(color: number) {
    this.light.color = new Color(color);
  }
}
