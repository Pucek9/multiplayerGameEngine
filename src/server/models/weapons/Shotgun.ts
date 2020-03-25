import { SHOTGUN } from '../../../shared/constants/weapons';
import { rand } from '../../../shared/helpers';
import BulletData from '../../../shared/models/BulletData';
import Bullet from '../Bullet';
import Weapon from './Weapon';

const DISPERSION = 70;

export default class Shotgun extends Weapon {
  type = SHOTGUN;
  magazines = 2;
  maxBulletsInMagazine = 25;
  bulletsInMagazine = 25;
  minTimeBetweenBullets = 500;
  reloadTime = 2000;
  shootBulletsCount = 5;
  bulletConfig = {
    type: SHOTGUN,
    size: 2,
    power: 15,
    range: 500,
    flash: false,
  };

  constructor(params?: Partial<Shotgun>) {
    super();
    Object.assign(this, params);
  }

  prepareBullets(bulletData: BulletData): Bullet[] {
    const commonBulletInfo = {
      owner: bulletData.owner,
      fromX: bulletData.fromX,
      fromY: bulletData.fromY,
      ...this.bulletConfig,
    };
    return [
      new Bullet({
        targetX: bulletData.targetX,
        targetY: bulletData.targetY,
        ...commonBulletInfo,
        flash: true,
      }),
      new Bullet({
        targetX: bulletData.targetX + rand(DISPERSION),
        targetY: bulletData.targetY + rand(DISPERSION),
        ...commonBulletInfo,
      }),
      new Bullet({
        targetX: bulletData.targetX - rand(DISPERSION),
        targetY: bulletData.targetY + rand(DISPERSION),
        ...commonBulletInfo,
      }),
      new Bullet({
        targetX: bulletData.targetX - rand(DISPERSION),
        targetY: bulletData.targetY - rand(DISPERSION),
        ...commonBulletInfo,
      }),
      new Bullet({
        targetX: bulletData.targetX + rand(DISPERSION),
        targetY: bulletData.targetY - rand(DISPERSION),
        ...commonBulletInfo,
      }),
    ];
  }
}
