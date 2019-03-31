import Weapon from './Weapon';
import Bullet from '../Bullet';
import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';
import PlayerModel from '../../../shared/models/PlayerModel';

export default class Resizer extends Weapon {
  type = 'Resizer';
  magazines = 30;
  maxBulletsInMagazine = 10;
  bulletsInMagazine = 10;
  minTimeBetweenBullets = 100;
  reloadTime = 1000;
  shootBulletsCount = 1;
  bulletConfig = {
    size: 5,
    power: 1,
    range: 700,
    effectOnPlayer(player) {
      player.size++;
    }
  };

  constructor() {
    super();
  }

  generateBullets(mouseClick: MouseCoordinates, owner: PlayerModel) {
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
