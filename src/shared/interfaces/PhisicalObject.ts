import { Direction } from '../models';

export interface PhisicalObject {
  shape: string;
  x: number;
  y: number;
  direction: Direction;
  speed: number;
}
