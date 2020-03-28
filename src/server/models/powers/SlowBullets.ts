import { RED, SLOW_BULLETS } from '../../../shared/constants';

import { Angle } from '../../services/CollisionDetector';
import Bullet from '../Bullet';
import Player from '../Player';
import ShootPower from './ShootPower';

export default class SlowBullets extends ShootPower {
  type = SLOW_BULLETS;
  size = 70;
  cost = 0.01;
  minTimeBetweenBullets = 300;
  bulletConfig = {
    type: SLOW_BULLETS,
    color: RED,
    size: 70,
    range: 100,
    power: 0,
    speed: 0,
    hit() {},
    hitFromBullet(bullet, angle: Angle) {
      console.log(this.owner);
      const cost = this.cost * bullet.power;
      if (this.owner.tryUseEnergy(cost)) {
        bullet.customFlag = false;
        bullet.decreaseSpeedToMin(bullet.speed > 0.1 ? bullet.speed / 4 : 0.1);
        return true;
      } else {
        return false;
      }
    },
    additionalAction() {
      this.x = this.owner.x;
      this.y = this.owner.y;
    },
  };

  constructor(params?: Partial<SlowBullets>) {
    super();
    Object.assign(this, params);
    Object.seal(this);
  }

  getSize(): number {
    return this.size;
  }

  isActive(): boolean {
    return this.active;
  }

  use() {
    this.active = true;
  }

  release() {
    this.active = false;
  }

  effect({ bullet, owner }: { bullet: Bullet; owner: Player }): boolean {
    const cost = this.cost * bullet.power;
    if (owner.tryUseEnergy(cost)) {
      bullet.customFlag = false;
      bullet.decreaseSpeedToMin(bullet.speed > 0.1 ? bullet.speed / 4 : 0.1);
      return true;
    } else {
      return false;
    }
  }
}
