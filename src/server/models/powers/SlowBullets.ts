import { SLOW_BULLETS } from '../../../shared/constants/powers';

import Bullet from '../Bullet';
import Player from '../Player';
import Aura from './Aura';

export default class SlowBullets extends Aura {
  type = SLOW_BULLETS;
  size = 70;
  cost = 0.01;

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
