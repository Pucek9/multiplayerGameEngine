import { BLACK, CIRCLE } from '../constants';
import { generateId } from '../helpers';
import { Circle } from '../interfaces';
import { Direction } from './Direction';

export class BulletModel implements Circle {
  readonly shape = CIRCLE;
  type: string;
  color = BLACK;
  size = 1;
  flash = false;
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  direction: Direction;
  speed: number;

  constructor(params: Partial<BulletModel>) {
    this.id = params.id || generateId();
    Object.assign(this, params);
  }
}
