import { hasKeys } from '../../../shared/helpers';
import { Direction } from '../../../shared/models';

import Player from '../../models/Player';
import Steering from './Steering';

export class EightDirectionSteering extends Steering {
  performSteering(game, player: Player) {
    const up = hasKeys(player.keys, ['W', 'ArrowUp']);
    const down = hasKeys(player.keys, ['S', 'ArrowDown']);
    const left = hasKeys(player.keys, ['A', 'ArrowLeft']);
    const right = hasKeys(player.keys, ['D', 'ArrowRight']);
    const direction: Direction = { dx: 0, dy: 0 };
    const ZERO_SEVEN = Math.sqrt(2) / 2;

    if (up && !down && !left && !right) {
      direction.dx = 0;
      direction.dy = -player.speed;
    }
    if (!up && down && !left && !right) {
      direction.dx = 0;
      direction.dy = player.speed;
    }
    if (!up && !down && left && !right) {
      direction.dx = -player.speed;
      direction.dy = 0;
    }
    if (!up && !down && !left && right) {
      direction.dx = player.speed;
      direction.dy = 0;
    }
    if (up && !down && left && !right) {
      direction.dx = -ZERO_SEVEN * player.speed;
      direction.dy = -ZERO_SEVEN * player.speed;
    }
    if (up && !down && !left && right) {
      direction.dx = ZERO_SEVEN * player.speed;
      direction.dy = -ZERO_SEVEN * player.speed;
    }

    if (!up && down && left && !right) {
      direction.dx = -ZERO_SEVEN * player.speed;
      direction.dy = ZERO_SEVEN * player.speed;
    }
    if (!up && down && !left && right) {
      direction.dx = ZERO_SEVEN * player.speed;
      direction.dy = ZERO_SEVEN * player.speed;
    }
    const lastDirection = { ...player.direction };
    player.direction = direction;
    if (
      (!player.isAlive() || !game.detectPlayerCollision(player)) &&
      (direction.dx !== 0 || direction.dy !== 0)
    ) {
      player.go();
    } else {
      player.moving = false;
      player.direction = { ...lastDirection };
    }
  }
}

const eightDirectionSteering = new EightDirectionSteering();
export default eightDirectionSteering;
