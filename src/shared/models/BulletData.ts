import Player from '../../server/models/Player';

import Direction from './Direction';

export default interface BulletData {
  targetX: number;
  targetY: number;
  fromX: number;
  fromY: number;
  size: number;
  owner: Player;
  dir?: Direction;
}
