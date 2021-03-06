import { LAND_MINE, WHITE } from '../../../shared/constants';

import gamesManager from '../../services/GamesManager';
import Bullet from '../Bullet';
import GrenadeExplosion from './GrenadeExplosion';
import Weapon from './Weapon';

export default class LandMine extends Weapon {
  type = LAND_MINE;
  magazines = 1;
  maxBulletsInMagazine = 3;
  bulletsInMagazine = 3;
  minTimeBetweenBullets = 500;
  reloadTime = 1000;
  shootBulletsCount = 1;
  bulletConfig: Partial<Bullet> = {
    type: LAND_MINE,
    color: WHITE,
    size: 15,
    power: 0,
    range: 100,
    speed: 0,
    minSpeed: 0,
    defaultSpeed: 0,
    allowForManipulate: false,
    hit(angle?: { x: number; y: number }) {
      this.deactivate();
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

  constructor(params?: Partial<LandMine>) {
    super();
    Object.assign(this, params);
  }
}
