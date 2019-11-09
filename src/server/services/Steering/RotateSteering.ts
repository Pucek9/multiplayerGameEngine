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
    const dir: Direction = {
      dx: 0,
      dy: 0,
    };
    if (up && !down && !left && !right) {
      dir.dx = player.speed * Math.cos(player.direction);
      dir.dy = player.speed * Math.sin(player.direction);
    }
    if (!up && down && !left && !right) {
      dir.dx = -player.speed * Math.cos(player.direction);
      dir.dy = -player.speed * Math.sin(player.direction);
    }
    if (!up && !down && left && !right) {
      dir.dx = -player.speed * Math.sin(player.direction);
      dir.dy = player.speed * Math.cos(player.direction);
    }
    if (!up && !down && !left && right) {
      dir.dx = player.speed * Math.sin(player.direction);
      dir.dy = -player.speed * Math.cos(player.direction);
    }
    if (up && !down && left && !right) {
      dir.dx =
        player.speed *
        (Math.sqrt(2) / 2) *
        (Math.cos(player.direction) - Math.sin(player.direction));
      dir.dy =
        player.speed *
        (Math.sqrt(2) / 2) *
        (Math.sin(player.direction) + Math.cos(player.direction));
    }
    if (up && !down && !left && right) {
      dir.dx =
        player.speed *
        (Math.sqrt(2) / 2) *
        (Math.cos(player.direction) + Math.sin(player.direction));
      dir.dy =
        player.speed *
        (Math.sqrt(2) / 2) *
        (Math.sin(player.direction) - Math.cos(player.direction));
    }
    if (!up && down && left && !right) {
      dir.dx =
        -player.speed *
        (Math.sqrt(2) / 2) *
        (Math.cos(player.direction) + Math.sin(player.direction));
      dir.dy =
        -player.speed *
        (Math.sqrt(2) / 2) *
        (Math.sin(player.direction) - Math.cos(player.direction));
    }
    if (!up && down && !left && right) {
      dir.dx =
        -player.speed *
        (Math.sqrt(2) / 2) *
        (Math.cos(player.direction) - Math.sin(player.direction));
      dir.dy =
        -player.speed *
        (Math.sqrt(2) / 2) *
        (Math.sin(player.direction) + Math.cos(player.direction));
    }

    if (!player.isAlive() || !game.detectPlayerCollision(player, dir)) {
      player.go(dir);
    }
  }
}

const rotateSteering = new RotateSteering();
export default rotateSteering;
