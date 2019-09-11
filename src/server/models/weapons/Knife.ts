import Weapon from './Weapon';
import Bullet from '../Bullet';
import BulletData from '../../../shared/models/BulletData';

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
    size: 5,
    power: 40,
    range: 50,
    color: 'gray',
  };

  constructor(params?: Partial<Knife>) {
    super();
    Object.assign(this, params);
  }

  generateBullets(bulletData: BulletData) {
    return [
      new Bullet({
        owner: bulletData.owner,
        fromX: bulletData.fromX,
        fromY: bulletData.fromY,
        targetX: bulletData.targetX,
        targetY: bulletData.targetY,
        ...this.bulletConfig,
      }),
    ];
  }
}
