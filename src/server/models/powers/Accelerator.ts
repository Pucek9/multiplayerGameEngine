import Power from '../../../shared/models/Power';
import Player from '../Player';
import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';
import Bullet from '../Bullet';
import Direction from '../../../shared/models/Direction';
import collisionDetector from '../../services/CollisionDetector';

export default class Accelerator extends Power {
  type = 'Accelerator';
  cost = 0.5;

  constructor(params?: Partial<Accelerator>) {
    super();
    Object.assign(this, params);
    Object.seal(this);
  }

  isActive(): boolean {
    return this.active;
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
    if (this.isActive() && owner.isMoveing() && owner.tryUseEnergy(this.cost)) {
      owner.increaseSpeedTo(10);
      return true;
    } else {
      owner.decreaseSpeedToDefault();
      return false;
    }
  }
}
