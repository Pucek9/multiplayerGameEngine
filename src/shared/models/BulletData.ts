import PlayerModel from './PlayerModel';
import { Dir } from './Direction';

export default interface BulletData {
  targetX: number;
  targetY: number;
  fromX: number;
  fromY: number;
  size: number;
  owner: PlayerModel;
  dir?: Array<Dir>;
}
