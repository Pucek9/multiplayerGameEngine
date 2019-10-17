import Steering from './Steering';
import { hasKeys } from '../../../shared/helpers';
import Direction from '../../../shared/models/Direction';
import MouseCoordinates from "../../../shared/apiModels/MouseCoordinates";

export class CarSteering extends Steering {

  constructor(public sensitivity = 0.05, public range = 200){
    super()
  }
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
      dir.dx = player.speed * Math.cos(player.direction);
      dir.dy = player.speed * Math.sin(player.direction);
    }
    if (!up && down && !left && !right) {
      dir.dx = -player.speed * Math.cos(player.direction);
      dir.dy = -player.speed * Math.sin(player.direction);
    }
    if (!up && !down && left && !right) {
      player.direction += this.sensitivity;
    }
    if (!up && !down && !left && right) {
      player.direction -= this.sensitivity;
    }
    if (up && !down && left && !right) {
      player.direction += this.sensitivity;
      dir.dx = player.speed * Math.cos(player.direction);
      dir.dy = player.speed * Math.sin(player.direction);
    }
    if (up && !down && !left && right) {
      player.direction -= this.sensitivity;
      dir.dx = player.speed * Math.cos(player.direction);
      dir.dy = player.speed * Math.sin(player.direction);
    }
    if (!up && down && left && !right) {
        player.direction += this.sensitivity;
        dir.dx = -player.speed * Math.cos(player.direction);
        dir.dy = -player.speed * Math.sin(player.direction);
    }
    if (!up && down && !left && right) {
        player.direction -= this.sensitivity;
        dir.dx = -player.speed * Math.cos(player.direction);
        dir.dy = -player.speed * Math.sin(player.direction);
    }

    if (!player.isAlive() || !game.detectPlayerCollision(player, dir)) {
      player.go(dir);
      this.updateCursor(player)
    }
  }

  private updateCursor(owner) {
    owner.cursor.x = owner.x + this.range * Math.cos(owner.direction);
    owner.cursor.y = owner.y + this.range * Math.sin(owner.direction);
  }
}

const carSteering = new CarSteering();
export default carSteering;
