import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';
import Cursor from './Cursor';
import Player from '../../models/Player';

export class FreeCursor extends Cursor {
  updateCursor(mouseCoordinates: MouseCoordinates, owner: Player) {
    owner.cursor.x = mouseCoordinates.clientX + owner.x - mouseCoordinates.innerWidth / 2;
    owner.cursor.y = -mouseCoordinates.clientY + owner.y + mouseCoordinates.innerHeight / 2;
  }
}
const freeCursor = new FreeCursor();
export default freeCursor;
