import Weapon from './Weapon';
import Bullet from '../Bullet';
import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';
import PlayerModel from '../../../shared/models/PlayerModel';

export default class Pistol extends Weapon {
  type = 'Pistol';
  magazines = 30;
  maxBulletsInMagazine = 10;
  bulletsInMagazine = 10;
  minTimeBetweenBullets = 200;
  reloadTime = 1500;
  shootBulletsCount = 1;
  bulletConfig = {
    size: 3,
    power: 10,
    range: 500,
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
