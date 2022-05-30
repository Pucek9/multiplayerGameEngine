import { Body } from 'detect-collisions';

import { Direction } from '../models';

export interface ObjectModel {
  body: Body;
  direction: Direction;
  speed: number;
  color?: string;
}
