import { ACCELELATOR } from '../../../shared/constants';
import { Power } from '../../../shared/models';

import Player from '../Player';

export default class Accelerator extends Power {
  type = ACCELELATOR;
  cost = 0.3;
  speed = 10;

  constructor(params?: Partial<Accelerator>) {
    super();
    Object.assign(this, params);
    // Object.seal(this);
  }

  use({ owner }: { owner: Player }) {
    this.active = true;
    this.effect({ owner });
  }

  release({ owner }: { owner: Player }) {
    this.active = false;
    this.effect({ owner });
  }

  effect({ owner }: { owner: Player }): boolean {
    if (this.isActive() && owner.isMoving() && owner.tryUseEnergy(this.cost)) {
      owner.increaseSpeedTo(this.speed);
      return true;
    } else {
      owner.decreaseSpeedToDefault(this.speed);
      return false;
    }
  }
}
