import Weapon from './Weapon';
import Bullet from '../Bullet';
import BulletData from '../../../shared/models/BulletData';
import { Dir } from '../../../shared/models/Direction';

export default class Knife extends Weapon {
  type = 'Knife';
  magazines = Infinity;
  maxBulletsInMagazine = Infinity;
  bulletsInMagazine = Infinity;
  minTimeBetweenBullets = 0;
  reloadTime = 0;
  shootBulletsCount = 1;
  bulletConfig = {
    flash: false,
    size: 8,
    power: 40,
    range: 40,
    allowForManipulate: false,
  };

  constructor(params?: Partial<Knife>) {
    super();
    Object.assign(this, params);
  }

  generateBullets(bulletData: BulletData) {
    return [
      new Bullet({
        owner: bulletData.owner,
        fromX:
          bulletData.fromX -
          (bulletData.dir.includes(Dir.LEFT)
            ? bulletData.size
            : bulletData.dir.includes(Dir.RIGHT)
            ? -bulletData.size
            : 0),
        fromY:
          bulletData.fromY -
          (bulletData.dir.includes(Dir.UP)
            ? bulletData.size
            : bulletData.dir.includes(Dir.DOWN)
            ? -bulletData.size
            : 0),
        targetX: bulletData.targetX,
        targetY: bulletData.targetY,
        color: bulletData.owner.color,
        ...this.bulletConfig,
      }),
    ];
  }
}
