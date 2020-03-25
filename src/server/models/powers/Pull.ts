import { PULL, WHITE } from '../../../shared/constants';
import BulletData from '../../../shared/models/BulletData';

import { Angle } from '../../services/CollisionDetector';
import gamesManager from '../../services/GamesManager';
import Bullet from '../Bullet';
import Player from '../Player';
import ShootPower from './ShootPower';

export default class Pull extends ShootPower {
  type = PULL;
  minTimeBetweenBullets = 300;
  cost = 10;
  bulletConfig = {
    type: PULL,
    color: WHITE,
    size: 50,
    range: 400,
    power: 0,
    speed: 10,
    hit(angle: Angle) {},
    effectOnPlayer(player: Player) {
      const game = gamesManager.getGame(player.roomName);
      if (game) {
        player.direction.dx = this.direction.dx;
        player.direction.dy = this.direction.dy;
        // player.speed = this.speed;
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
