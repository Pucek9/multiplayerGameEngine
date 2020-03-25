import { hasKeys } from '../../../shared/helpers';
import Direction from '../../../shared/models/Direction';
import Player from '../../models/Player';
import Steering from './Steering';

export class CarSteering extends Steering {
  constructor(public allowForStaticRotate = true, public sensitivity = 0.05, public range = 200) {
    super();
  }
  performSteering(game, player: Player) {
    const up = hasKeys(player.keys, ['W', 'ArrowUp']);
    const down = hasKeys(player.keys, ['S', 'ArrowDown']);
    const left = hasKeys(player.keys, ['A', 'ArrowLeft']);
    const right = hasKeys(player.keys, ['D', 'ArrowRight']);
    const direction: Direction = { dx: 0, dy: 0 };
    let bodyDirection = player.bodyDirection;
    const bodySin = Math.sin(player.bodyDirection);
    const bodyCos = Math.cos(player.bodyDirection);

    if (up && !down && !left && !right) {
      direction.dx = player.speed * bodyCos;
      direction.dy = player.speed * bodySin;
    }
    if (!up && down && !left && !right) {
      direction.dx = -player.speed * bodyCos;
      direction.dy = -player.speed * bodySin;
    }
    if (!up && !down && left && !right) {
      bodyDirection += this.sensitivity;
    }
    if (!up && !down && !left && right) {
      bodyDirection -= this.sensitivity;
    }
    if (up && !down && left && !right) {
      bodyDirection += this.sensitivity;
      direction.dx = player.speed * bodyCos;
      direction.dy = player.speed * bodySin;
    }
    if (up && !down && !left && right) {
      bodyDirection -= this.sensitivity;
      direction.dx = player.speed * bodyCos;
      direction.dy = player.speed * bodySin;
    }
    if (!up && down && left && !right) {
      bodyDirection += this.sensitivity;
      direction.dx = -player.speed * bodyCos;
      direction.dy = -player.speed * bodySin;
    }
    if (!up && down && !left && right) {
      bodyDirection -= this.sensitivity;
      direction.dx = -player.speed * bodyCos;
      direction.dy = -player.speed * bodySin;
    }
    const lastDirection = { ...player.direction };
    player.direction = direction;
    if (
      !player.isAlive() ||
      (!game.detectPlayerCollision(player) && (direction.dx !== 0 || direction.dy !== 0))
    ) {
      player.go(direction);
      this.updateCursor(player, bodyDirection);
    } else {
      player.moving = false;
      if (this.allowForStaticRotate) {
        this.updateCursor(player, bodyDirection);
      }
      player.direction = { ...lastDirection };
    }
  }

  private updateCursor(owner: Player, direction: number) {
    owner.bodyDirection = direction;
    owner.cursor.x = owner.x + this.range * Math.cos(owner.bodyDirection);
    owner.cursor.y = owner.y + this.range * Math.sin(owner.bodyDirection);
  }
}

const carSteering = new CarSteering();
export default carSteering;
