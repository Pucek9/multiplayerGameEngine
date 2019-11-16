import Player from '../Player';
import Accelerator from './Accelerator';
import ClickPower from './ClickPower';
import Power from '../../../shared/models/Power';
import BulletData from '../../../shared/models/BulletData';
import Bullet from '../Bullet';

export default abstract class ShootPower extends Power implements ClickPower {
  ready = true;
  minTimeBetweenBullets: number;
  bulletConfig?: any;

  shoot(bulletData: BulletData, game) {
    if (this.ready) {
      this.ready = false;
      setTimeout(() => {
        this.ready = true;
      }, this.minTimeBetweenBullets);
      this.generateBullets(this.prepareBullets(bulletData), game, bulletData.owner);
    }
  }

  prepareBullets(bulletData: BulletData): Bullet[] {
    return [
      new Bullet({
        owner: bulletData.owner,
        fromX: bulletData.fromX,
        fromY: bulletData.fromY,
        targetX: bulletData.targetX,
        targetY: bulletData.targetY,
        ...this.bulletConfig,
      }),
    ];
  }

  generateBullets(bullets, game, owner) {
    if (bullets?.length > 0) {
      game.generateBullets(bullets);
      game.emitWeaponInfo(owner);
    }
  }

  useClickPower({ owner, game }: { owner: Player; game }): boolean {
    if (owner.tryUseEnergy(this.cost)) {
      this.shoot(
        {
          targetX: owner.cursor.x,
          targetY: owner.cursor.y,
          fromX: owner.x + owner.size * Math.cos(owner.direction),
          fromY: owner.y + owner.size * Math.sin(owner.direction),
          size: owner.size,
          owner: owner,
          dir: owner.legsDirection,
        },
        game,
      );
      return true;
    }
    return false;
  }
}
