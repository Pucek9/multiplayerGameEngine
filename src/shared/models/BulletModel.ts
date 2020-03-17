import ICircle from '../interfaces/ICircle';
import { generateId } from '../helpers';
import Direction from './Direction';
import { CIRCLE } from "../constants/other";

export default class BulletModel implements ICircle {
  readonly shape =  CIRCLE;
  type: string;
  color = 'black';
  size = 1;
  flash = true;
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
