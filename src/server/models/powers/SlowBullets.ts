import { RED, SLOW_BULLETS } from '../../../shared/constants';

import { Angle } from '../../services/CollisionDetector';
import Aura from './Aura';

export default class SlowBullets extends Aura {
  type = SLOW_BULLETS;
  color = RED;
  cost = 0.01;
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
          bullet.decreaseSpeedToMin(bullet.speed > 0.1 ? bullet.speed / 3 : 0.1);
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
    super();
    Object.assign(this, params);
    Object.seal(this);
  }
}
