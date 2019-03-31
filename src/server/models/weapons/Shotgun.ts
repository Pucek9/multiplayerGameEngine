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
    const commonBulletInfo = {
      owner,
      fromX: owner.x + owner.size / 4,
      fromY: owner.y + owner.size / 4,
      range: this.range,
      size: this.bulletSize,
      power: this.bulletPower,
    };
    return [
      new Bullet({
        targetX: mouseClick.targetX,
        targetY: mouseClick.targetY,
        ...commonBulletInfo,
      }),
      new Bullet({
        targetX: mouseClick.targetX + rand(DISPERSION),
        targetY: mouseClick.targetY + rand(DISPERSION),
        ...commonBulletInfo,
      }),
      new Bullet({
        targetX: mouseClick.targetX - rand(DISPERSION),
        targetY: mouseClick.targetY + rand(DISPERSION),
        ...commonBulletInfo,
      }),
      new Bullet({
        targetX: mouseClick.targetX - rand(DISPERSION),
        targetY: mouseClick.targetY - rand(DISPERSION),
        ...commonBulletInfo,
      }),
      new Bullet({
        targetX: mouseClick.targetX + rand(DISPERSION),
        targetY: mouseClick.targetY - rand(DISPERSION),
        ...commonBulletInfo,
      }),
    ];
  }
}
