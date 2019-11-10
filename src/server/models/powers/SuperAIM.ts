import Player from '../Player';
import AIM from './AIM';

export default class SuperAIM extends AIM {
  type = 'SuperAIM';
  cost = 0.4;

  constructor(params?: Partial<SuperAIM>) {
    super();
    Object.assign(this, params);
    Object.seal(this);
  }

  effect({ owner, game }: { owner: Player; game }): boolean {
    if (this.isActive() && owner.tryUseEnergy(this.cost)) {
      const closestPlayerFuturePosition = game.trackClosestPlayerFuturePosition(owner);
      if (closestPlayerFuturePosition) {
        owner.updateCursor(closestPlayerFuturePosition);
        owner.updateDirection();
      }
    } else {
      return false;
    }
  }
}
