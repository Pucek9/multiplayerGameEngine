import Player from '../Player';
import ClickPower from './ClickPower';

export default class Teleport extends ClickPower {
  type = 'Teleport';
  cost = 25;

  constructor(params?: Partial<Teleport>) {
    super();
    Object.assign(this, params);
    Object.seal(this);
  }

  use({ owner, game }: { owner: Player; game }) {
    if (
       !game.detectPlayerCollisionWithObjects(({
        x: owner.cursor.x,
        y: owner.cursor.y,
        size: owner.size,
        shape: 'circle',
      } as unknown) as Player) &&
      owner.tryUseEnergy(this.cost)
    ) {
      owner.x = owner.cursor.x;
      owner.y = owner.cursor.y;
      game.detectPlayerCollisionWithGenerator(owner);
    }
  }
}
