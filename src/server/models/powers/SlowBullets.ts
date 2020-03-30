import { RED, SLOW_BULLETS } from '../../../shared/constants';

import { Angle } from '../../services/CollisionDetector';
import Player from '../Player';
// import ShootPower from './ShootPower';
import Aura from './Aura';

export default class SlowBullets extends Aura {
  type = SLOW_BULLETS;
  color = RED;
  size = 70;
  cost = 0.01;
  minTimeBetweenBullets = 300;
  bulletConfig = {
    type: this.type,
    color: this.color,
    size: this.size,
    range: 1,
    power: 0,
    speed: 0,
    hit() {},
    deactivate() {},
    hitFromBullet(bullet, angle: Angle) {
      const cost = this.owner.selectedPower.cost * bullet.power;
      if (this.owner.tryUseEnergy(cost)) {
        bullet.customFlag = false;
        bullet.decreaseSpeedToMin(bullet.speed > 0.1 ? bullet.speed / 4 : 0.1);
        return true;
      } else {
        return false;
      }
    },
    additionalAction() {
      this.x = this.owner.x;
      this.y = this.owner.y;
    },
  };

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

  use({ owner, game }: { owner: Player; game }) {
    if (!this.bulletId) {
      this.active = true;
      this.effect({ owner, game });
    }
  }

  release({ owner, game }) {
    this.active = false;
    const bullet = game.bullets.find(bullet => bullet.id === this.bulletId);
    if (bullet) {
      console.log(bullet.id, bullet.owner.name);
      bullet.deactivate();
      this.bulletId = null;
    }
  }

  effect({ owner, game }) {
    this.useClickPower({ owner, game });
  }
}
