import { hasKeys } from '../../../shared/helpers';
import Direction from '../../../shared/models/Direction';
import Player from '../../models/Player';
import Steering from './Steering';

export class RotateSteering extends Steering {
  performSteering(game, player: Player) {
    const up = hasKeys(player.keys, ['W', 'ArrowUp']);
    const down = hasKeys(player.keys, ['S', 'ArrowDown']);
    const left = hasKeys(player.keys, ['A', 'ArrowLeft']);
    const right = hasKeys(player.keys, ['D', 'ArrowRight']);
    const direction: Direction = { dx: 0, dy: 0 };
    const bodySin = Math.sin(player.bodyDirection);
    const bodyCos = Math.cos(player.bodyDirection);
    const ZERO_SEVEN = Math.sqrt(2) / 2;

    if (up && !down && !left && !right) {
      direction.dx = player.speed * bodyCos;
      direction.dy = player.speed * bodySin;
    }
    if (!up && down && !left && !right) {
      direction.dx = -player.speed * bodyCos;
      direction.dy = -player.speed * bodySin;
    }
    if (!up && !down && left && !right) {
      direction.dx = -player.speed * bodySin;
      direction.dy = player.speed * bodyCos;
    }
    if (!up && !down && !left && right) {
      direction.dx = player.speed * bodySin;
      direction.dy = -player.speed * bodyCos;
    }
    if (up && !down && left && !right) {
      direction.dx = player.speed * ZERO_SEVEN * (bodyCos - bodySin);
      direction.dy = player.speed * ZERO_SEVEN * (bodySin + bodyCos);
    }
    if (up && !down && !left && right) {
      direction.dx = player.speed * ZERO_SEVEN * (bodyCos + bodySin);
      direction.dy = player.speed * ZERO_SEVEN * (bodySin - bodyCos);
    }
    if (!up && down && left && !right) {
      direction.dx = -player.speed * ZERO_SEVEN * (bodyCos + bodySin);
      direction.dy = -player.speed * ZERO_SEVEN * (bodySin - bodyCos);
    }
    if (!up && down && !left && right) {
      direction.dx = -player.speed * ZERO_SEVEN * (bodyCos - bodySin);
      direction.dy = -player.speed * ZERO_SEVEN * (bodySin + bodyCos);
    }
    const lastDirection = { ...player.direction };
    player.direction = direction;
    if (
      (!player.isAlive() || !game.detectPlayerCollision(player)) &&
      (direction.dx !== 0 || direction.dy !== 0)
    ) {
      player.go(direction);
    } else {
      player.moving = false;
      player.direction = { ...lastDirection };
    }
  }
}

const rotateSteering = new RotateSteering();
export default rotateSteering;
