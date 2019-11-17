import Steering from './Steering';
import { hasKeys } from '../../../shared/helpers';
import Direction from '../../../shared/models/Direction';
import Player from '../../models/Player';

export class CarIndependentSteering extends Steering {
  constructor(public allowForStaticRotate = true, public sensitivity = 0.05, public range = 200) {
    super();
  }
  performSteering(game, player: Player) {
    const lastDir = Math.atan2(player.direction.dy, player.direction.dx);
    const up = hasKeys(player.keys, ['W', 'ArrowUp']);
    const down = hasKeys(player.keys, ['S', 'ArrowDown']);
    const left = hasKeys(player.keys, ['A', 'ArrowLeft']);
    const right = hasKeys(player.keys, ['D', 'ArrowRight']);
    const direction: Direction = {
      dx: 0,
      dy: 0,
    };
    const rememberDir: Direction = {
      dx: 0,
      dy: 0,
    };
    if (up && !down && !left && !right) {
      rememberDir.dx = direction.dx = player.speed * Math.cos(lastDir);
      rememberDir.dy = direction.dy = player.speed * Math.sin(lastDir);
    }
    if (!up && down && !left && !right) {
      rememberDir.dx = -(direction.dx = -player.speed * Math.cos(lastDir));
      rememberDir.dy = -(direction.dy = -player.speed * Math.sin(lastDir));
    }
    if (!up && !down && left && !right && this.allowForStaticRotate) {
      rememberDir.dx = player.speed * Math.cos(lastDir + this.sensitivity);
      rememberDir.dy = player.speed * Math.sin(lastDir + this.sensitivity);
    }
    if (!up && !down && !left && right && this.allowForStaticRotate) {
      rememberDir.dx = player.speed * Math.cos(lastDir - this.sensitivity);
      rememberDir.dy = player.speed * Math.sin(lastDir - this.sensitivity);
    }
    if (up && !down && left && !right) {
      rememberDir.dx = direction.dx = player.speed * Math.cos(lastDir + this.sensitivity);
      rememberDir.dy = direction.dy = player.speed * Math.sin(lastDir + this.sensitivity);
    }
    if (up && !down && !left && right) {
      rememberDir.dx = direction.dx = player.speed * Math.cos(lastDir - this.sensitivity);
      rememberDir.dy = direction.dy = player.speed * Math.sin(lastDir - this.sensitivity);
    }
    if (!up && down && left && !right) {
      rememberDir.dx = -(direction.dx = -player.speed * Math.cos(lastDir + this.sensitivity));
      rememberDir.dy = -(direction.dy = -player.speed * Math.sin(lastDir + this.sensitivity));
    }
    if (!up && down && !left && right) {
      rememberDir.dx = -(direction.dx = -player.speed * Math.cos(lastDir - this.sensitivity));
      rememberDir.dy = -(direction.dy = -player.speed * Math.sin(lastDir - this.sensitivity));
    }
    const lastDirection = { ...player.direction };
    player.direction = { ...direction };
    if (
      !player.isAlive() ||
      (!game.detectPlayerCollision(player) && (rememberDir.dx !== 0 || rememberDir.dy !== 0))
    ) {
      player.go({ ...rememberDir });
    } else if (this.allowForStaticRotate && (rememberDir.dx !== 0 || rememberDir.dy !== 0)) {
      player.moving = false;
      player.direction = { ...rememberDir };
    } else {
      player.moving = false;
      player.direction = { ...lastDirection };
    }
  }
}

const carIndependentSteering = new CarIndependentSteering();
export default carIndependentSteering;
