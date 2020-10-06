import { CIRCLE } from '../constants';
import { generateId } from '../helpers';
import { Circle } from '../interfaces';
import { Item } from './Item';

export abstract class CircularObjectModel implements Circle, Item {
  shape = CIRCLE;
  id: number;
  type: string;
  x: number;
  y: number;
  size: number;
  color: string;
  speed = 0;
  direction = { dx: 0, dy: 0 };

  constructor(params: Partial<CircularObjectModel>) {
    this.id = params.id || generateId();
    Object.assign(this, params);
  }
}
