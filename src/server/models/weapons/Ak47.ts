import { AK47 } from '../../../shared/constants';

import Bullet from '../Bullet';
import { BulletData } from '../BulletData';
import Weapon from './Weapon';

export default class Ak47 extends Weapon {
  type = AK47;
  magazines = 5;
  maxBulletsInMagazine = 30;
  bulletsInMagazine = 30;
  minTimeBetweenBullets = 200;
  reloadTime = 2000;
  shootBulletsCount = 1;
  offset = -0.25;
  bulletConfig = {
    type: AK47,
    flash: true,
    size: 3,
    power: 20,
    range: 800,
  };

  constructor(params?: Partial<Ak47>) {
    super();
    Object.assign(this, params);
  }

  shoot(bulletData: BulletData, game) {
    const interval = setInterval(() => {
      const owner = game.getPlayer(bulletData.owner.id);
      if (owner?.isMouseDown()) {
        if (this.bulletsInMagazine >= this.shootBulletsCount) {
          this.bulletsInMagazine -= this.shootBulletsCount;
          if (this.bulletsInMagazine < this.shootBulletsCount) {
            this.reload();
          }
          bulletData.owner = owner;
          this.generateBullets(this.prepareBullets(bulletData), game, owner);
        } else {
          this.reload();
        }
      } else {
        clearInterval(interval);
      }
    }, this.minTimeBetweenBullets);
  }

  prepareBullets(bulletData: BulletData) {
    return [
      new Bullet({
        owner: bulletData.owner,
        fromX:
          bulletData.owner.x +
          bulletData.owner.size * Math.cos(bulletData.owner.bodyDirection + this.offset),
        fromY:
          bulletData.owner.y +
          bulletData.owner.size * Math.sin(bulletData.owner.bodyDirection + this.offset),
        size: bulletData.owner.size,
        targetX: bulletData.owner.cursor.x,
        targetY: bulletData.owner.cursor.y,
        ...this.bulletConfig,
      }),
    ];
  }
}
