import ICircle from '../interfaces/ICircle';
import { generateId } from '../helpers';

export default class BulletModel implements ICircle {
  readonly shape = 'circle';
  type: string;
  color = 'black';
  size = 1;
  flash = true;
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;

  constructor(params: Partial<BulletModel>) {
    this.id = params.id || generateId();
    Object.assign(this, params);
  }
}
