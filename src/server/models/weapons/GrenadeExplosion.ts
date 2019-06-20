import Weapon from './Weapon';
import Bullet from '../Bullet';
import { rand } from '../../../shared/helpers';
import BulletData from '../../../shared/models/BulletData';

const DISPERSION = 70;

export default class GrenadeExplosion extends Weapon {
  type = 'GrenadeExplosion';
  bulletConfig = {
    size: 4,
    power: 50,
    range: 200,
    additionalAction() {
      this.power = this.power - 1;
      this.size = this.size - 0.1;
    },
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
      //
      new Bullet({
        targetX: bulletData.targetX + rand(DISPERSION * 2),
        targetY: bulletData.targetY + rand(DISPERSION * 2),
        ...commonBulletInfo,
      }),
      new Bullet({
        targetX: bulletData.targetX - rand(DISPERSION * 2),
        targetY: bulletData.targetY + rand(DISPERSION * 2),
        ...commonBulletInfo,
      }),
      new Bullet({
        targetX: bulletData.targetX - rand(DISPERSION * 2),
        targetY: bulletData.targetY - rand(DISPERSION * 2),
        ...commonBulletInfo,
      }),
      new Bullet({
        targetX: bulletData.targetX + rand(DISPERSION * 2),
        targetY: bulletData.targetY - rand(DISPERSION * 2),
        ...commonBulletInfo,
      }),
      //
      new Bullet({
        targetX: bulletData.targetX + rand(DISPERSION * 2),
        targetY: bulletData.targetY + rand(DISPERSION),
        ...commonBulletInfo,
      }),
      new Bullet({
        targetX: bulletData.targetX - rand(DISPERSION * 2),
        targetY: bulletData.targetY + rand(DISPERSION),
        ...commonBulletInfo,
      }),
      new Bullet({
        targetX: bulletData.targetX - rand(DISPERSION * 2),
        targetY: bulletData.targetY - rand(DISPERSION),
        ...commonBulletInfo,
      }),
      new Bullet({
        targetX: bulletData.targetX + rand(DISPERSION * 2),
        targetY: bulletData.targetY - rand(DISPERSION),
        ...commonBulletInfo,
      }),
    ];
  }
}
