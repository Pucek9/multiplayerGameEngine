import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';
import Cursor from './Cursor';

export class CircleCursor extends Cursor {
  constructor(public range = 200, public sensitivity = 100) {
    super();
  }

  updateCursor(mouseCoordinates: MouseCoordinates, owner) {
    owner.cursor.x =
      owner.x +
      this.range * Math.cos(owner.direction - mouseCoordinates.movementX / this.sensitivity);
    owner.cursor.y =
      owner.y +
      this.range * Math.sin(owner.direction - mouseCoordinates.movementX / this.sensitivity);
  }
}
const circleCursor = new CircleCursor();
export default circleCursor;
