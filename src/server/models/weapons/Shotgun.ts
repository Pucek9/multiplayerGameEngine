import Weapon from './Weapon';
import Bullet from '../Bullet';
import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';
import PlayerModel from '../../../shared/models/PlayerModel';
import { generateId, rand } from '../../../shared/helpers';

const DISPERSION = 70;

export default class Shotgun extends Weapon {
  type = 'Shotgun';
  magazines = 10;
  maxBulletsInMagazine = 25;
  bulletsInMagazine = 25;
  minTimeBetweenBullets = 500;
  reloadTime = 2000;
  shootBulletsCount = 5;
  bulletSize = 2;
  bulletPower = 8;
  range = 350;

  constructor() {
    super();
  }

  generateBullets(mouseClick: MouseCoordinates, owner: PlayerModel): Bullet[] {
    const basicsInfo = [owner, owner.x + owner.size / 4, owner.y + owner.size / 4];
    return [
      // @ts-ignore
      new Bullet(
        generateId(),
        ...basicsInfo,
        mouseClick.targetX,
        mouseClick.targetY,
        this.bulletSize,
        this.bulletPower,
        this.range,
      ),
      // @ts-ignore
      new Bullet(
        generateId(),
        ...basicsInfo,
        mouseClick.targetX + rand(DISPERSION),
        mouseClick.targetY + rand(DISPERSION),
        this.bulletSize,
        this.bulletPower,
        this.range,
      ),
      // @ts-ignore
      new Bullet(
        generateId(),
        ...basicsInfo,
        mouseClick.targetX - rand(DISPERSION),
        mouseClick.targetY + rand(DISPERSION),
        this.bulletSize,
        this.bulletPower,
        this.range,
      ),
      // @ts-ignore
      new Bullet(
        generateId(),
        ...basicsInfo,
        mouseClick.targetX - rand(DISPERSION),
        mouseClick.targetY - rand(DISPERSION),
        this.bulletSize,
        this.bulletPower,
        this.range,
      ),
      // @ts-ignore
      new Bullet(
        generateId(),
        ...basicsInfo,
        mouseClick.targetX + rand(DISPERSION),
        mouseClick.targetY - rand(DISPERSION),
        this.bulletSize,
        this.bulletPower,
        this.range,
      ),
    ];
  }
}
