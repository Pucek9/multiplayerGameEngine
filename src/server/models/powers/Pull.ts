import ShootPower from './ShootPower';
import BulletData from '../../../shared/models/BulletData';
import Bullet from '../Bullet';
import { Angle } from '../../services/CollisionDetector';

export default class Pull extends ShootPower {
  type = 'Pull';
  minTimeBetweenBullets = 300;
  cost = 10;
  bulletConfig = {
    color: 'white',
    size: 50,
    range: 400,
    power: 0,
    hit(angle: Angle) {},
  };

  prepareBullets(bulletData: BulletData): Bullet[] {
    return [
      new Bullet({
        owner: bulletData.owner,
        fromX: bulletData.targetX,
        fromY: bulletData.targetY,
        targetX: bulletData.fromX,
        targetY: bulletData.fromY,
        ...this.bulletConfig,
      }),
    ];
  }
}
