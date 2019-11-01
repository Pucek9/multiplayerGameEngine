import Player from '../Player';
import Bullet from '../Bullet';
import SlowBullets from './SlowBullets';
import Aura from './Aura';

export default class ReverseBullets extends SlowBullets implements Aura {
  type = 'ReverseBullets';
  cost = 0.03;

  constructor(params?: Partial<SlowBullets>) {
    super(params);
  }

  effect({ bullet, owner }: { bullet: Bullet; owner: Player }): boolean {
    const cost = this.cost * bullet.power;
    if (owner.tryUseEnergy(cost)) {
      bullet.customFlag = false;
      bullet.decreaseSpeedToMin(bullet.speed > 0.1 ? bullet.speed / 4 : 0.1);
      if (bullet.isMinSpeed()) {
        bullet.customFlag = true;
        bullet.owner = owner;
        bullet.distance = 0;
        bullet.reverseX *= -1;
        bullet.reverseY *= -1;
      }
      return true;
    } else {
      return false;
    }
  }
}
