import Bullet from '../Bullet';
import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';
import PlayerModel from '../../../shared/models/PlayerModel';

export default class Weapon {
  type: string;
  ready = true;
  loaded = true;
  magazines: number;
  bulletsInMagazine: number;
  maxBulletsInMagazine: number;
  minTimeBetweenBullets: number;
  reloadTime: number;
  shootBulletsCount: number;

  constructor() {}

  shoot(mouseClick: MouseCoordinates, owner: PlayerModel): Bullet[] | undefined {
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
        return this.generateBullets(mouseClick, owner);
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

  generateBullets(mouseClick: MouseCoordinates, owner: PlayerModel): Bullet[] {
    return [];
  }
}
