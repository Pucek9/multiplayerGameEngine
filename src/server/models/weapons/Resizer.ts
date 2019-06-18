import Weapon from './Weapon';
import Bullet from '../Bullet';
import BulletData from '../../../shared/models/BulletData';

export default class Resizer extends Weapon {
  type = 'Resizer';
  magazines = 3;
  maxBulletsInMagazine = 10;
  bulletsInMagazine = 10;
  minTimeBetweenBullets = 100;
  reloadTime = 1000;
  shootBulletsCount = 1;
  bulletConfig = {
    color: 'white',
    size: 5,
    power: 1,
    range: 700,
    effectOnPlayer(player) {
      player.size += 2;
      if (player.speed > 0.5) {
        player.speed -= 0.5;
      }
    },
    additionalAction() {
      this.size += 0.1;
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
