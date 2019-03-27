import Weapon from './Weapon';
import Bullet from '../Bullet';
import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';
import PlayerModel from '../../../shared/models/PlayerModel';
import { generateId } from '../../../shared/helpers';

export default class Pistol implements Weapon {
  type = 'Pistol';
  minTimeBetweenBullets = 150;
  reloadTime = 1500;
  ready = true;
  loaded = true;
  bulletsInMagazine: number;

  constructor(private maxBulletsInMagazine: number, private magazines: number) {
    this.bulletsInMagazine = this.maxBulletsInMagazine;
  }

  shoot(mouseClick: MouseCoordinates, owner: PlayerModel): Bullet[] | undefined {
    if (this.ready) {
      if (this.bulletsInMagazine > 0) {
        this.ready = false;
        this.bulletsInMagazine -= 1;
        setTimeout(() => {
          this.ready = true;
        }, this.minTimeBetweenBullets);
        return [
          new Bullet(
            generateId(),
            owner,
            owner.x + owner.size / 4,
            owner.y + owner.size / 4,
            mouseClick.targetX,
            mouseClick.targetY,
            2,
          ),
        ];
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
}
