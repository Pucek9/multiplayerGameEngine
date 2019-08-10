import Power from '../../../shared/models/Power';
import Player from '../Player';
import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';

export default class Teleport extends Power {
  type = 'Teleport';
  cost = 25;

  constructor(params?: Partial<Teleport>) {
    super();
    Object.assign(this, params);
    Object.seal(this);
  }

  use(owner: Player, mouseClick: MouseCoordinates) {
    if (mouseClick && owner.tryUseEnergy(this.cost)) {
      owner.x = mouseClick.targetX;
      owner.y = mouseClick.targetY;
    }
  }
}
