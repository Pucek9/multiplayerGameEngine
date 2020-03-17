import Weapon from './Weapon';
import Bullet from '../Bullet';
import gamesManager from '../../services/GamesManager';
import GrenadeExplosion from './GrenadeExplosion';
import { GRENADE } from "../../../shared/constants/weapons";

export default class Grenade extends Weapon {
  type = GRENADE;
  magazines = 1;
  maxBulletsInMagazine = 5;
  bulletsInMagazine = 5;
  minTimeBetweenBullets = 500;
  reloadTime = 1000;
  shootBulletsCount = 1;
  bulletConfig: Partial<Bullet> = {
    flash: false,
    type: GRENADE,
    color: 'green',
    size: 5,
    power: 0,
    range: 400,
    speed: 7,
    minSpeed: 0.1,
    allowForManipulate: false,
    hit(angle?: { x: number; y: number }) {
      if (angle) {
        this.reverseX *= angle.x;
        this.reverseY *= angle.y;
      }
      this.decreaseSpeedToMin(1);
    },
    additionalAction() {
      this.decreaseSpeedToMin(0.05);
      if (this.isMinSpeed()) {
        this.deactivate();
      }
    },
    deactivate() {
      const game = gamesManager.getGame(this.owner.roomName);
      if (game) {
        const grenadeExplosion = new GrenadeExplosion();
        game.generateBullets(
          grenadeExplosion.prepareBullets({
            targetX: this.x,
            targetY: this.y,
            fromX: this.x,
            fromY: this.y,
            size: this.size,
            owner: this.owner,
          }),
        );
      }
      this.active = false;
    },
  };

  constructor(params?: Partial<Grenade>) {
    super();
    Object.assign(this, params);
  }
}
