import Steering from './Steering';
import { hasKeys } from '../../../shared/helpers';
import Direction from '../../../shared/models/Direction';
import Player from '../../models/Player';

export class RotateSteering extends Steering {
  performSteering(game, player: Player) {
    const up = hasKeys(player.keys, ['W', 'ArrowUp']);
    const down = hasKeys(player.keys, ['S', 'ArrowDown']);
    const left = hasKeys(player.keys, ['A', 'ArrowLeft']);
    const right = hasKeys(player.keys, ['D', 'ArrowRight']);
    const direction: Direction = { dx: 0, dy: 0 };

    if (up && !down && !left && !right) {
      direction.dx = player.speed * Math.cos(player.bodyDirection);
      direction.dy = player.speed * Math.sin(player.bodyDirection);
    }
    if (!up && down && !left && !right) {
      direction.dx = -player.speed * Math.cos(player.bodyDirection);
      direction.dy = -player.speed * Math.sin(player.bodyDirection);
    }
    if (!up && !down && left && !right) {
      direction.dx = -player.speed * Math.sin(player.bodyDirection);
      direction.dy = player.speed * Math.cos(player.bodyDirection);
    }
    if (!up && !down && !left && right) {
      direction.dx = player.speed * Math.sin(player.bodyDirection);
      direction.dy = -player.speed * Math.cos(player.bodyDirection);
    }
    if (up && !down && left && !right) {
      direction.dx =
        player.speed *
        (Math.sqrt(2) / 2) *
        (Math.cos(player.bodyDirection) - Math.sin(player.bodyDirection));
      direction.dy =
        player.speed *
        (Math.sqrt(2) / 2) *
        (Math.sin(player.bodyDirection) + Math.cos(player.bodyDirection));
    }
    if (up && !down && !left && right) {
      direction.dx =
        player.speed *
        (Math.sqrt(2) / 2) *
        (Math.cos(player.bodyDirection) + Math.sin(player.bodyDirection));
      direction.dy =
        player.speed *
        (Math.sqrt(2) / 2) *
        (Math.sin(player.bodyDirection) - Math.cos(player.bodyDirection));
    }
    if (!up && down && left && !right) {
      direction.dx =
        -player.speed *
        (Math.sqrt(2) / 2) *
        (Math.cos(player.bodyDirection) + Math.sin(player.bodyDirection));
      direction.dy =
        -player.speed *
        (Math.sqrt(2) / 2) *
        (Math.sin(player.bodyDirection) - Math.cos(player.bodyDirection));
    }
    if (!up && down && !left && right) {
      direction.dx =
        -player.speed *
        (Math.sqrt(2) / 2) *
        (Math.cos(player.bodyDirection) - Math.sin(player.bodyDirection));
      direction.dy =
        -player.speed *
        (Math.sqrt(2) / 2) *
        (Math.sin(player.bodyDirection) + Math.cos(player.bodyDirection));
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
