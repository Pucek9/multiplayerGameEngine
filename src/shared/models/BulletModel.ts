import ICircle from '../interfaces/ICircle';
import { generateId } from '../helpers';

export default class BulletModel implements ICircle {
  public readonly type: string = 'circle';
  public id: number;
  public size: number;
  public x: number;
  public y: number;

  constructor(params) {
    this.id = params.id || generateId();
    this.size = params.size;
    this.x = 0;
    this.y = 0;
  }
}
