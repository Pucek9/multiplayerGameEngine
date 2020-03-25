import Direction from './Direction';
import Player from '../../server/models/Player';

export default interface BulletData {
  targetX: number;
  targetY: number;
  fromX: number;
  fromY: number;
  size: number;
  owner: Player;
  dir?: Direction;
}
