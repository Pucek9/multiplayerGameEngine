import Steering from './Steering';
import Direction from '../../../shared/models/Direction';
import { hasKeys } from '../../../shared/helpers';
import Player from '../../models/Player';

export class EightDirectionSteering extends Steering {
  performSteering(game, player: Player) {
    const up = hasKeys(player.keys, ['W', 'ArrowUp']);
    const down = hasKeys(player.keys, ['S', 'ArrowDown']);
    const left = hasKeys(player.keys, ['A', 'ArrowLeft']);
    const right = hasKeys(player.keys, ['D', 'ArrowRight']);

    const direction: Direction = {
      dx: 0,
      dy: 0,
    };
    if (up && !down && !left && !right) {
      direction.dx = 0;
      direction.dy = player.speed;
    }
    if (!up && down && !left && !right) {
      direction.dx = 0;
      direction.dy = -player.speed;
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
      direction.dx = (-Math.sqrt(2) / 2) * player.speed;
      direction.dy = (Math.sqrt(2) / 2) * player.speed;
    }
    if (up && !down && !left && right) {
      direction.dx = (Math.sqrt(2) / 2) * player.speed;
      direction.dy = (Math.sqrt(2) / 2) * player.speed;
    }

    if (!up && down && left && !right) {
      direction.dx = (-Math.sqrt(2) / 2) * player.speed;
      direction.dy = (-Math.sqrt(2) / 2) * player.speed;
    }
    if (!up && down && !left && right) {
      direction.dx = (Math.sqrt(2) / 2) * player.speed;
      direction.dy = (-Math.sqrt(2) / 2) * player.speed;
    }
    player.direction = direction;
    if (!player.isAlive() || !game.detectPlayerCollision(player)) {
      player.go(direction);
    } else {
      player.direction = { dx: 0, dy: 0 };
      player.go();
    }
  }
}

const eightDirectionSteering = new EightDirectionSteering();
export default eightDirectionSteering;
