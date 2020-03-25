import { TELEPORT } from '../../../shared/constants/powers';

import Player from '../Player';
import Accelerator from './Accelerator';
import ClickPower from './ClickPower';

export default class Teleport extends Accelerator implements ClickPower {
  type = TELEPORT;
  costOfTeleport = 20;

  constructor(params?: Partial<Teleport>) {
    super();
    Object.assign(this, params);
    Object.seal(this);
  }

  useClickPower({ owner, game }: { owner: Player; game }): boolean {
    if (
      owner.speed > this.speed / 2 &&
      !game.detectPlayerCollisionWithObjects(({
        x: owner.cursor.x,
        y: owner.cursor.y,
        size: owner.size,
        shape: owner.shape,
        direction: owner.direction,
      } as unknown) as Player) &&
      owner.tryUseEnergy(this.costOfTeleport)
    ) {
      const diff = {
        x: owner.x - owner.cursor.x,
        y: owner.y - owner.cursor.y,
      };
      owner.x = owner.cursor.x;
      owner.y = owner.cursor.y;
      owner.cursor.x -= diff.x;
      owner.cursor.y -= diff.y;
      // exchange?
      // owner.cursor.x += diff.x;
      // owner.cursor.y += diff.y;
      game.detectPlayerCollisionWithGenerator(owner);
      return true;
    }
    return false;
  }
}
