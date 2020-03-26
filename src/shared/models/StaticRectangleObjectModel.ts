import { RECTANGLE } from '../constants';
import { IRectangle } from '../interfaces';

export class StaticRectangleObjectModel implements IRectangle {
  shape = RECTANGLE;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  depth: number;
  color: string;
  deg = 0;
  speed = 0;
  direction = { dx: 0, dy: 0 };

  constructor(params: Partial<StaticRectangleObjectModel>) {
    Object.assign(this, params);
  }
}
