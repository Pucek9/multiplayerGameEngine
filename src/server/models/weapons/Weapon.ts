import { generateId } from '../../../shared/helpers';
import { Item } from '../../../shared/models';

import Bullet from '../Bullet';
import { BulletData } from '../BulletData';

export default abstract class Weapon implements Item {
  type: string;
  ready = true;
  loaded = true;
  offset = 0;
  magazines: number;
  bulletsInMagazine: number;
  maxBulletsInMagazine: number;
  minTimeBetweenBullets: number;
  reloadTime: number;
  shootBulletsCount: number;
  id: number;
  bulletConfig: Partial<Bullet>;

  protected constructor() {
    this.id = generateId();
  }

  shoot(bulletData: BulletData, game) {
    if (this.ready) {
      if (this.bulletsInMagazine >= this.shootBulletsCount) {
        this.ready = false;
        this.bulletsInMagazine -= this.shootBulletsCount;
        if (this.bulletsInMagazine < this.shootBulletsCount) {
          this.reload();
        }
        setTimeout(() => {
          this.ready = true;
        }, this.minTimeBetweenBullets);
        this.generateBullets(this.prepareBullets(bulletData), game, bulletData.owner);
      } else {
        this.reload();
      }
    }
  }

  reload() {
    if (this.loaded && this.magazines > 0) {
      this.loaded = false;
      setTimeout(() => {
        this.bulletsInMagazine = this.maxBulletsInMagazine;
        this.magazines -= 1;
        this.loaded = true;
      }, this.reloadTime);
    }
  }

  prepareBullets(bulletData: BulletData) {
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

  generateBullets(bullets, game, owner) {
    if (bullets?.length > 0) {
      game.generateBullets(bullets);
      game.emitWeaponInfo(owner);
    }
  }
}
