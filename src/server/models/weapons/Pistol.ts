import Weapon from './Weapon';
import Bullet from '../Bullet';
import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';
import PlayerModel from '../../../shared/models/PlayerModel';
import { generateId } from '../../../shared/helpers';

export default class Pistol extends Weapon {
  type = 'Pistol';
  magazines = 30;
  maxBulletsInMagazine = 10;
  bulletsInMagazine = 10;
  minTimeBetweenBullets = 200;
  reloadTime = 1500;
  shootBulletsCount = 1;
  bulletSize = 3;
  bulletPower = 10;
  range = 500;

  constructor() {
    super();
  }

  generateBullets(mouseClick: MouseCoordinates, owner: PlayerModel) {
    return [
      new Bullet(
        generateId(),
        owner,
        owner.x + owner.size / 4,
        owner.y + owner.size / 4,
        mouseClick.targetX,
        mouseClick.targetY,
        this.bulletSize,
        this.bulletPower,
        this.range,
      ),
    ];
  }
}
