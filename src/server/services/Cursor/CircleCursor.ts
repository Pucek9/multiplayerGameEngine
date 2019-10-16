import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';

export class CircleCursor {
  constructor(public range = 200, public sensitivity = 50) {}

  updateCursor(mouseCoordinates: MouseCoordinates, owner) {
    owner.cursor.x =
      owner.x +
      this.range *
        Math.cos(owner.direction - mouseCoordinates.movementX / this.sensitivity);
    owner.cursor.y =
      owner.y +
      this.range *
        Math.sin(owner.direction - mouseCoordinates.movementX / this.sensitivity);
  }
}
const circleCursor = new CircleCursor();
export default circleCursor;
