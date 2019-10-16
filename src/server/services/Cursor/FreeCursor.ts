import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';

export class FreeCursor {
  updateCursor(mouseCoordinates: MouseCoordinates, owner) {
    owner.cursor.x =
      mouseCoordinates.clientX + owner.x - mouseCoordinates.innerWidth / 2;
    owner.cursor.y =
      -mouseCoordinates.clientY + owner.y + mouseCoordinates.innerHeight / 2;
  }
}
const freeCursor = new FreeCursor();
export default freeCursor;
