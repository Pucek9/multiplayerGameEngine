import { KNIFE } from '../../../shared/constants';

import Bullet from '../Bullet';
import { BulletData } from '../BulletData';
import Weapon from './Weapon';

export default class Knife extends Weapon {
  type = KNIFE;
  magazines = Infinity;
  maxBulletsInMagazine = Infinity;
  bulletsInMagazine = Infinity;
  minTimeBetweenBullets = 0;
  reloadTime = 0;
  shootBulletsCount = 1;
  bulletConfig = {
    type: KNIFE,
    flash: false,
    size: 8,
    speed: 1,
    power: 6,
    range: 40,
    allowForManipulate: false,
    hit(angle?: { x: number; y: number }, object?) {},
  };

  constructor(params?: Partial<Knife>) {
    super();
    Object.assign(this, params);
  }

  prepareBullets(bulletData: BulletData) {
    return [
      new Bullet({
        owner: bulletData.owner,
        fromX:
          bulletData.fromX -
          (bulletData.dir.dx === 0
            ? 0
            : bulletData.dir.dx < 0
            ? bulletData.dir.dx + bulletData.size
            : bulletData.dir.dx - bulletData.size),
        fromY:
          bulletData.fromY -
          (bulletData.dir.dy === 0
            ? 0
            : bulletData.dir.dy < 0
            ? bulletData.dir.dy + bulletData.size
            : bulletData.dir.dy - bulletData.size),
        targetX: bulletData.targetX,
        targetY: bulletData.targetY,
        color: bulletData.owner.color,
        ...this.bulletConfig,
      }),
    ];
  }
}
