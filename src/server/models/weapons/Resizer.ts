import Weapon from './Weapon';
import Bullet from '../Bullet';
import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';
import PlayerModel from '../../../shared/models/PlayerModel';

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

  generateBullets(mouseClick: MouseCoordinates, owner: Partial<PlayerModel>) {
    return [
      new Bullet({
        owner,
        fromX: owner.x + owner.size / 4,
        fromY: owner.y + owner.size / 4,
        targetX: mouseClick.targetX,
        targetY: mouseClick.targetY,
        ...this.bulletConfig,
      }),
    ];
  }
}
