import Weapon from './Weapon';
import Bullet from '../Bullet';
import { rand } from '../../../shared/helpers';
import BulletData from '../../../shared/models/BulletData';

const DISPERSION = 70;

export default class Shotgun extends Weapon {
  type = 'Shotgun';
  magazines = 2;
  maxBulletsInMagazine = 25;
  bulletsInMagazine = 25;
  minTimeBetweenBullets = 500;
  reloadTime = 2000;
  shootBulletsCount = 5;
  bulletConfig = {
    size: 2,
    power: 8,
    range: 350,
  };

  constructor() {
    super();
  }

  generateBullets(bulletData: BulletData): Bullet[] {
    const commonBulletInfo = {
      owner: bulletData.owner,
      fromX: bulletData.fromX + bulletData.size / 4,
      fromY: bulletData.fromY + bulletData.size / 4,
      ...this.bulletConfig,
    };
    return [
      new Bullet({
        targetX: bulletData.targetX,
        targetY: bulletData.targetY,
        ...commonBulletInfo,
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
