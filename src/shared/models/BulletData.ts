import PlayerModel from './PlayerModel';

export default interface BulletData {
  targetX: number;
  targetY: number;
  fromX: number;
  fromY: number;
  size: number;
  owner: PlayerModel;
}
