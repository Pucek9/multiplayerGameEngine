import Weapon from './Weapon';
import Bullet from '../Bullet';
import gamesManager from '../../services/GamesManager';
import BulletData from '../../../shared/models/BulletData';
import GrenadeExplosion from './GrenadeExplosion';

export default class Grenade extends Weapon {
  type = 'Grenade';
  magazines = 1;
  maxBulletsInMagazine = 5;
  bulletsInMagazine = 5;
  minTimeBetweenBullets = 500;
  reloadTime = 1000;
  shootBulletsCount = 1;
  bulletConfig: Partial<Bullet> = {
    color: 'white',
    size: 5,
    power: 1,
    range: 400,
    speed: 7,
    minSpeed: 0.1,
    hit(angle?: { x: number; y: number }) {
      if (angle) {
        this.reverseX *= angle.x;
        this.reverseY *= angle.y;
      }
      this.decreaseSpeed(1);
    },
    additionalAction() {
      this.decreaseSpeed(0.05);
      if (this.speed === this.minSpeed) {
        this.deactivate();
      }
    },
    deactivate() {
      const game = gamesManager.getGame(this.owner.roomName);
      if (game) {
        const grenadeExplosion = new GrenadeExplosion();
        game.generateBullets(
          grenadeExplosion.generateBullets({
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

  constructor() {
    super();
  }

  generateBullets(bulletData: BulletData) {
    return [
      new Bullet({
        owner: bulletData.owner,
        fromX: bulletData.fromX + bulletData.size / 4,
        fromY: bulletData.fromY + bulletData.size / 4,
        targetX: bulletData.targetX,
        targetY: bulletData.targetY,
        ...this.bulletConfig,
      }),
    ];
  }
}
