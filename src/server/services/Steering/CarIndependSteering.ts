import Steering from './Steering';
import { hasKeys } from '../../../shared/helpers';
import Direction from '../../../shared/models/Direction';
import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';

export class CarIndependSteering extends Steering {
  private lastDir;
  constructor(public allowForStaticRotate = true, public sensitivity = 0.05, public range = 200) {
    super();
  }
  performSteering(game, player) {
    const lastDir = Math.atan2(player.lastDir.dy, player.lastDir.dx);
    const up = hasKeys(player.keys, ['W', 'ArrowUp']);
    const down = hasKeys(player.keys, ['S', 'ArrowDown']);
    const left = hasKeys(player.keys, ['A', 'ArrowLeft']);
    const right = hasKeys(player.keys, ['D', 'ArrowRight']);
    const dir: Direction = {
      dx: 0,
      dy: 0,
    };
    const rememberDir: Direction = {
      dx: 0,
      dy: 0,
    };
    if (up && !down && !left && !right) {
      dir.dx = player.speed * Math.cos(lastDir);
      dir.dy = player.speed * Math.sin(lastDir);
      rememberDir.dx = player.speed * Math.cos(lastDir);
      rememberDir.dy = player.speed * Math.sin(lastDir);
    }
    if (!up && down && !left && !right) {
      dir.dx = -player.speed * Math.cos(lastDir);
      dir.dy = -player.speed * Math.sin(lastDir);
      rememberDir.dx = player.speed * Math.cos(lastDir);
      rememberDir.dy = player.speed * Math.sin(lastDir);
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
      dir.dx = player.speed * Math.cos(lastDir + this.sensitivity);
      dir.dy = player.speed * Math.sin(lastDir + this.sensitivity);
      rememberDir.dx = player.speed * Math.cos(lastDir + this.sensitivity);
      rememberDir.dy = player.speed * Math.sin(lastDir + this.sensitivity);
    }
    if (up && !down && !left && right) {
      dir.dx = player.speed * Math.cos(lastDir - this.sensitivity);
      dir.dy = player.speed * Math.sin(lastDir - this.sensitivity);
      rememberDir.dx = player.speed * Math.cos(lastDir - this.sensitivity);
      rememberDir.dy = player.speed * Math.sin(lastDir - this.sensitivity);
    }
    if (!up && down && left && !right) {
      dir.dx = -player.speed * Math.cos(lastDir + this.sensitivity);
      dir.dy = -player.speed * Math.sin(lastDir + this.sensitivity);
      rememberDir.dx = player.speed * Math.cos(lastDir + this.sensitivity);
      rememberDir.dy = player.speed * Math.sin(lastDir + this.sensitivity);
    }
    if (!up && down && !left && right) {
      dir.dx = -player.speed * Math.cos(lastDir - this.sensitivity);
      dir.dy = -player.speed * Math.sin(lastDir - this.sensitivity);
      rememberDir.dx = player.speed * Math.cos(lastDir - this.sensitivity);
      rememberDir.dy = player.speed * Math.sin(lastDir - this.sensitivity);
    }

    if (
      !player.isAlive() ||
      (!game.detectPlayerCollision(player, dir) && (rememberDir.dx !== 0 || rememberDir.dy !== 0))
    ) {
      player.go(dir, rememberDir);
    }
  }
}

const carIndependSteering = new CarIndependSteering();
export default carIndependSteering;
