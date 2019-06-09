import ICircle from '../interfaces/ICircle';
import { generateId } from '../helpers';

export default class BulletModel implements ICircle {
  readonly shape = 'circle';
  color = 'black';
  size = 1;
  id: number;
  x: number;
  y: number;

  constructor(params) {
    this.id = params.id || generateId();
    params.size && (this.size = params.size);
    params.color && (this.color = params.color);
  }
}
