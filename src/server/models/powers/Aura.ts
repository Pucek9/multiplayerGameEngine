import { BulletData } from '../BulletData';
import ShootPower from './ShootPower';

export default abstract class Aura extends ShootPower {
  size = 90;
  minEnergy = 5;

  generateBullets(bullets, game, owner) {
    bullets[0].id = owner.id;
    super.generateBullets(bullets, game, owner);
  }

  shoot(bulletData: BulletData, game) {
    this.generateBullets(this.prepareBullets(bulletData), game, bulletData.owner);
  }

  getSize(): number {
    return this.size;
  }

  use({ owner, game }) {
    super.use({ owner, game });
    if (owner.tryUseEnergy(this.cost)) {
      const bullet = game.bullets.find(_bullet => _bullet.id === owner.id);
      if (!bullet) {
        this._useClickPower({ owner, game });
      }
    } else {
      this.release({ owner, game });
    }
  }

  release({ owner, game }) {
    super.release({ owner, game });
    const bullet = game.bullets.find(_bullet => _bullet.id === owner.id);
    if (bullet) {
      bullet.deactivate();
    }
  }

  useClickPower({ owner, game }) {
    return false;
  }

  _useClickPower({ owner, game }) {
    super.useClickPower({ owner, game });
  }
}
