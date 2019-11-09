import Player from '../Player';
import AIM from './AIM';
import collisionDetector from '../../services/CollisionDetector';

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
      const closestPlayer = game.trackClosestPlayer(owner);
      if (closestPlayer) {
        const distance = collisionDetector.detectCollision(closestPlayer, owner).distance;
        const bulletSpeed = owner.selectedWeapon?.bulletConfig?.speed ?? 10;
        const enemyDirection = closestPlayer.legsDirection;
        const [x, y] = [closestPlayer.x + (enemyDirection.dx * distance/bulletSpeed), closestPlayer.y + (enemyDirection.dy * distance/bulletSpeed)];
        owner.updateCursor({x,y});
        owner.updateDirection();
      }
    } else {
      return false;
    }
  }
}
