import Player from '../Player';
import Bullet from '../Bullet';
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

  getSize(): number {
    return this.size;
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

  effect({ bullet, owner }: { bullet: Bullet; owner: Player }): boolean {
    const cost = this.cost * bullet.power;
    if (owner.hasEnoughEnergy(cost)) {
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
