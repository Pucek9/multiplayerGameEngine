import { Direction } from '../../../shared/models/Direction';

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
