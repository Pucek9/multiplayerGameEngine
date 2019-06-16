import Weapon from './Weapon';
import Bullet from '../Bullet';
import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';
import PlayerModel from '../../../shared/models/PlayerModel';
import { generateId, rand } from '../../../shared/helpers';

const DISPERSION = 70;

export default class Shotgun extends Weapon {
  type = 'Shotgun';
  magazines = 2;
  maxBulletsInMagazine = 25;
  bulletsInMagazine = 25;
  minTimeBetweenBullets = 500;
  reloadTime = 2000;
  shootBulletsCount = 5;
  bulletConfig = {
    size: 2,
    power: 8,
    range: 350,
  };

  constructor() {
    super();
  }

  generateBullets(mouseClick: MouseCoordinates, owner: Partial<PlayerModel>): Bullet[] {
    const commonBulletInfo = {
      owner,
      fromX: owner.x + owner.size / 4,
      fromY: owner.y + owner.size / 4,
      ...this.bulletConfig,
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
