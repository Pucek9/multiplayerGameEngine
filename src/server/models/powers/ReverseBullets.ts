import { RED, REVERSE_BULLETS, SLOW_BULLETS } from '../../../shared/constants';

import { Angle } from '../../services/CollisionDetector';
import Aura from './Aura';
import SlowBullets from './SlowBullets';

export default class ReverseBullets extends SlowBullets implements Aura {
  type = REVERSE_BULLETS;
  cost = 0.03;
  bulletConfig = {
    type: SLOW_BULLETS,
    color: RED,
    size: 70,
    range: 100,
    power: 0,
    speed: 0,
    hit() {},
    deactivate() {},
    hitFromBullet(bullet, angle: Angle) {
      console.log('bullet');
      const cost = this.cost * bullet.power;
      if (this.owner.tryUseEnergy(cost)) {
        bullet.customFlag = false;
        bullet.decreaseSpeedToMin(bullet.speed > 0.1 ? bullet.speed / 4 : 0.1);
        if (bullet.isMinSpeed()) {
          bullet.customFlag = true;
          bullet.owner = this.owner;
          bullet.distance = 0;
          bullet.reverseX *= -1;
          bullet.reverseY *= -1;
        }
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
    super(params);
  }
}
