import { CIRCLE } from '../constants/other';
import ICircle from '../interfaces/ICircle';

export default abstract class StaticCircularObjectModel implements ICircle {
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
