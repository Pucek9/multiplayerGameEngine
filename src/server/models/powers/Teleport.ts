import Power from '../../../shared/models/Power';
import Player from '../Player';

export default class Teleport extends Power {
  type = 'Teleport';
  cost = 10;

  constructor(params?: Partial<Teleport>) {
    super();
    Object.assign(this, params);
    Object.seal(this);
  }

  use(owner: Player) {
    // owner.x;
    // owner.y;
  }
}
