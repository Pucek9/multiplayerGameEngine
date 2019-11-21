import ShootPower from './ShootPower';
import BulletData from '../../../shared/models/BulletData';
import Bullet from '../Bullet';
import { Angle } from '../../services/CollisionDetector';
import gamesManager from '../../services/GamesManager';
import Player from '../Player';

export default class Pull extends ShootPower {
  type = 'Pull';
  minTimeBetweenBullets = 300;
  cost = 10;
  bulletConfig = {
    type: 'Pull',
    color: 'white',
    size: 50,
    range: 400,
    power: 0,
    hit(angle: Angle) {},
    effectOnPlayer(player: Player) {
      const game = gamesManager.getGame(player.roomName);
      if (game) {
        player.direction.dx = this.direction.dx;
        player.direction.dy = this.direction.dy;
        if (!game.detectPlayerCollisionWithObjects(player)) {
          player.go();
        }
      }
    },
  };

  prepareBullets(bulletData: BulletData): Bullet[] {
    return [
      new Bullet({
        owner: bulletData.owner,
        fromX: bulletData.targetX,
        fromY: bulletData.targetY,
        targetX: bulletData.fromX,
        targetY: bulletData.fromY,
        ...this.bulletConfig,
      }),
    ];
  }
}
