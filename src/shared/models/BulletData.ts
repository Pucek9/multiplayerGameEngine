import { Direction } from './Direction';
import { PlayerModel } from './PlayerModel';

export interface BulletData {
  targetX: number;
  targetY: number;
  fromX: number;
  fromY: number;
  size: number;
  owner: PlayerModel;
  dir?: Direction;
}
