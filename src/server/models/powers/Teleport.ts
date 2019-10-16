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

  use({ owner, game, click }: { owner: Player; game; click: boolean }) {
    if (
      click &&
      !game.detectPlayerCollisionWithObjects(({
        x: owner.cursor.x,
        y: owner.cursor.y,
        size: owner.size,
        shape: 'circle',
      } as unknown) as Player) &&
      owner.tryUseEnergy(this.cost)
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
    }
  }
}
