import { CIRCLE } from '../constants';
import { Circle } from '../interfaces';

export abstract class StaticCircularObjectModel implements Circle {
  shape = CIRCLE;
  x: number;
  y: number;
  size: number;
  color: string;
  speed = 0;
  direction = { dx: 0, dy: 0 };

  constructor(params: Partial<StaticCircularObjectModel>) {
    Object.assign(this, params);
  }
}
