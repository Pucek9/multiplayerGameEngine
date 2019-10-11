import Steering from './Steering';
import Direction from '../../../shared/models/Direction';
import { hasKeys } from '../../../shared/helpers';

export class EightDirectionSteering extends Steering {
  performSteering(game, player) {
    const up = hasKeys(player.keys, ['W', 'ArrowUp']);
    const down = hasKeys(player.keys, ['S', 'ArrowDown']);
    const left = hasKeys(player.keys, ['A', 'ArrowLeft']);
    const right = hasKeys(player.keys, ['D', 'ArrowRight']);

    const dir: Direction = {
      dx: 0,
      dy: 0,
    };
    if (up && !down && !left && !right) {
      dir.dx = 0;
      dir.dy = player.speed;
    }
    if (!up && down && !left && !right) {
      dir.dx = 0;
      dir.dy = -player.speed;
    }
    if (!up && !down && left && !right) {
      dir.dx = -player.speed;
      dir.dy = 0;
    }
    if (!up && !down && !left && right) {
      dir.dx = player.speed;
      dir.dy = 0;
    }
    if (up && !down && left && !right) {
      dir.dx = (-Math.sqrt(2) / 2) * player.speed;
      dir.dy = (Math.sqrt(2) / 2) * player.speed;
    }
    if (up && !down && !left && right) {
      dir.dx = (Math.sqrt(2) / 2) * player.speed;
      dir.dy = (Math.sqrt(2) / 2) * player.speed;
    }

    if (!up && down && left && !right) {
      dir.dx = (-Math.sqrt(2) / 2) * player.speed;
      dir.dy = (-Math.sqrt(2) / 2) * player.speed;
    }
    if (!up && down && !left && right) {
      dir.dx = (Math.sqrt(2) / 2) * player.speed;
      dir.dy = (-Math.sqrt(2) / 2) * player.speed;
    }
    if (!player.isAlive() || !game.detectPlayerCollision(player, dir)) {
      player.go(dir);
    }
  }
}

const eightDirectionSteering = new EightDirectionSteering();
export default eightDirectionSteering;
