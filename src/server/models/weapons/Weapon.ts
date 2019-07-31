import Bullet from '../Bullet';
import Item from '../../../shared/models/Item';
import { generateId } from '../../../shared/helpers';
import BulletData from '../../../shared/models/BulletData';

export default abstract class Weapon implements Item {
  type: string;
  ready = true;
  loaded = true;
  magazines: number;
  bulletsInMagazine: number;
  maxBulletsInMagazine: number;
  minTimeBetweenBullets: number;
  reloadTime: number;
  shootBulletsCount: number;
  id: number;

  protected constructor() {
    this.id = generateId();
  }

  shoot(bulletData: BulletData): Bullet[] | undefined {
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
        return this.generateBullets(bulletData);
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

  generateBullets(bulletData: BulletData): Bullet[] {
    return [];
  }
}
