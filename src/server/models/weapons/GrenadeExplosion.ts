import { GRENADE_EXPLOSION } from '../../../shared/constants/weapons';
import { rand } from '../../../shared/helpers';
import BulletData from '../../../shared/models/BulletData';

import Bullet from '../Bullet';
import Weapon from './Weapon';

const DISPERSION = 70;

export default class GrenadeExplosion extends Weapon {
  type = GRENADE_EXPLOSION;
  bulletConfig = {
    type: GRENADE_EXPLOSION,
    size: 4,
    power: 50,
    range: 200,
    flash: false,
    additionalAction() {
      if (this.customFlag) {
        this.increaseSpeedToDefault();
        if (this.power > 1) {
          this.power -= 1;
        }
      }
      // this.size = this.size - 0.1; //it looks better, but it causes a significant drop in performance
    },
  };

  constructor() {
    super();
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
        targetX: bulletData.targetX + rand(DISPERSION * 3),
        targetY: bulletData.targetY + rand(DISPERSION),
        ...commonBulletInfo,
      }),
      new Bullet({
        targetX: bulletData.targetX - rand(DISPERSION * 3),
        targetY: bulletData.targetY + rand(DISPERSION),
        ...commonBulletInfo,
      }),
      new Bullet({
        targetX: bulletData.targetX - rand(DISPERSION * 3),
        targetY: bulletData.targetY - rand(DISPERSION),
        ...commonBulletInfo,
      }),
      new Bullet({
        targetX: bulletData.targetX + rand(DISPERSION * 3),
        targetY: bulletData.targetY - rand(DISPERSION),
        ...commonBulletInfo,
      }),
    ];
  }
}
