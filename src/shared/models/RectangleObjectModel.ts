import { RECTANGLE } from '../constants';
import { generateId } from '../helpers';
import { Rectangle } from '../interfaces';
import { Item } from './Item';

export class RectangleObjectModel implements Rectangle, Item {
  shape = RECTANGLE;
  id: number;
  type: string;
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

  constructor(params: Partial<RectangleObjectModel>) {
    this.id = params.id || generateId();
    Object.assign(this, params);
  }
}
