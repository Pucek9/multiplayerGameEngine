import ShootPower from './ShootPower';
import { Angle } from '../../services/CollisionDetector';
import Player from '../Player';
import gamesManager from '../../services/GamesManager';
import { PUSH } from "../../../shared/constants/powers";

export default class Push extends ShootPower {
  type = PUSH;
  minTimeBetweenBullets = 300;
  cost = 10;
  bulletConfig = {
    type: PUSH,
    color: 'white',
    size: 50,
    range: 400,
    speed: 10,
    power: 0,
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
}
