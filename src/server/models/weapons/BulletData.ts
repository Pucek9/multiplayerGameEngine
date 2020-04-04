import { Direction } from '../../../shared/models';

import Player from '../Player';

export interface BulletData {
  targetX: number;
  targetY: number;
  fromX: number;
  fromY: number;
  size: number;
  owner: Player;
  dir?: Direction;
}
