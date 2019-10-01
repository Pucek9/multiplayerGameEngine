import Player from '../Player';
import Bullet from '../Bullet';
import collisionDetector from '../../services/CollisionDetector';
import { Direction } from '../../../shared/models/Direction';
import Aura from './Aura';

export default class SlowBullets extends Aura {
  type = 'SlowBullets';
  size = 70;
  cost = 0.01;

  constructor(params?: Partial<SlowBullets>) {
    super();
    Object.assign(this, params);
    Object.seal(this);
  }

  isActive(): boolean {
    return this.active;
  }

  use() {
    this.active = true;
  }

  release() {
    this.active = false;
  }

  effect({
    bullet,
    bulletDirection,
    owner,
  }: {
    bullet: Bullet;
    bulletDirection: Direction;
    owner: Player;
  }): boolean {
    const cost = this.cost * bullet.power;
    if (
      this.isActive() &&
      bullet.allowForManipulate &&
      owner.hasEnoughEnergy(cost) &&
      collisionDetector.detectCollision(
        bullet,
        { shape: 'circle', size: this.size, x: owner.x, y: owner.y },
        bulletDirection,
      ).yes
    ) {
      owner.useEnergy(cost);
      bullet.customFlag = false;
      bullet.decreaseSpeedToMin();
      return true;
    } else {
      bullet.customFlag = true;
      return false;
    }
  }
}
