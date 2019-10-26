import Weapon from './Weapon';
import Bullet from '../Bullet';
import gamesManager from '../../services/GamesManager';
import BulletData from '../../../shared/models/BulletData';
import GrenadeExplosion from './GrenadeExplosion';

export default class Grenade extends Weapon {
  type = 'LandMine';
  magazines = 2;
  maxBulletsInMagazine = 1;
  bulletsInMagazine = 1;
  minTimeBetweenBullets = 500;
  reloadTime = 1000;
  shootBulletsCount = 1;
  bulletConfig: Partial<Bullet> = {
    flash: false,
    color: 'white',
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

  constructor(params?: Partial<Grenade>) {
    super();
    Object.assign(this, params);
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
}
