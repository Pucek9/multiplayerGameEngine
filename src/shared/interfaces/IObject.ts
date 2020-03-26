import { Direction } from '../models';

export interface IObject {
  shape: string;
  x: number;
  y: number;
  direction: Direction;
  speed: number;
}
