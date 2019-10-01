import Player from '../Player';
import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';
import ClickPower from './ClickPower';

export default class Teleport extends ClickPower {
  type = 'Teleport';
  cost = 25;

  constructor(params?: Partial<Teleport>) {
    super();
    Object.assign(this, params);
    Object.seal(this);
  }

  use({ owner, game, mouseClick }: { owner: Player; game; mouseClick: MouseCoordinates }) {
    if (
      mouseClick &&
      !game.detectPlayerCollisionWithObjects(({
        x: mouseClick.targetX,
        y: mouseClick.targetY,
        size: owner.size,
        shape: 'circle',
      } as unknown) as Player) &&
      owner.tryUseEnergy(this.cost)
    ) {
      owner.x = mouseClick.targetX;
      owner.y = mouseClick.targetY;
      game.detectPlayerCollisionWithGenerator(owner);
    }
  }
}
