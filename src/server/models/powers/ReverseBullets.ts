import { BLUE, REVERSE_BULLETS } from '../../../shared/constants';

import { Angle } from '../../services/CollisionDetector';
import SlowBullets from './SlowBullets';

export default class ReverseBullets extends SlowBullets {
  type = REVERSE_BULLETS;
  color = BLUE;
  cost = 0.03;
  minTimeBetweenBullets = 300;
  bulletConfig = {
    type: this.type,
    color: this.color,
    size: this.size,
    range: 100,
    power: 0,
    speed: 0,
    defaultSpeed: 0,
    hit() {},
    hitFromBullet(bullet, angle: Angle) {
      if (bullet.allowForManipulate) {
        const cost = this.owner.selectedPower.cost * bullet.power;
        if (this.owner.tryUseEnergy(cost)) {
          bullet.manipulated = true;
          bullet.decreaseSpeedToMin(bullet.speed > 0.1 ? bullet.speed / 2 : 0.1);
          if (bullet.isMinSpeed()) {
            bullet.owner = this.owner;
            bullet.manipulated = false;
            bullet.distance = 0;
            bullet.reverseX *= -1;
            bullet.reverseY *= -1;
          }
          return true;
        } else {
          return false;
        }
      }
    },
    additionalAction() {
      this.x = this.owner.x;
      this.y = this.owner.y;
    },
    updatePosition() {
      this.additionalAction();
    },
  };

  constructor(params?: Partial<SlowBullets>) {
    super(params);
  }
}
