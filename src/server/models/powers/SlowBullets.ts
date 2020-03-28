import { RED, SLOW_BULLETS } from '../../../shared/constants';

import { Angle } from '../../services/CollisionDetector';
import Bullet from '../Bullet';
import Player from '../Player';
// import ShootPower from './ShootPower';
import Aura from './Aura';

export default class SlowBullets extends Aura {
  type = SLOW_BULLETS;
  size = 70;
  cost = 0.01;
  minTimeBetweenBullets = 300;
  bulletConfig = {
    type: SLOW_BULLETS,
    color: RED,
    size: 70,
    range: 100,
    power: 0,
    speed: 0,
    hit() {},
    hitFromBullet(bullet, angle: Angle) {
      const cost = this.owner.selectedPower.cost * bullet.power;
      console.log('bullet');
      if (this.owner.tryUseEnergy(cost)) {
        console.log('bullet.speed', bullet.speed);
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
    game.bullets.find(bullet => bullet.id === this.bulletId)?.deactivate();
    this.bulletId = null;
  }

  effect({ owner, game }) {
    this.useClickPower({ owner, game });
  }
}
