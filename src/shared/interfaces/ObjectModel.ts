import { Direction } from '../models';

export interface ObjectModel {
  shape: string;
  x: number;
  y: number;
  direction: Direction;
  speed: number;
  color?: string;
}
