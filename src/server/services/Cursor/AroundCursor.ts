import { MouseCoordinates } from '../../../shared/apiModels';

import Player from '../../models/Player';
import Cursor from './Cursor';

export class AroundCursor extends Cursor {
  constructor(public range = 200, public sensitivity = 100) {
    super();
  }

  updateCursor(mouseCoordinates: MouseCoordinates, owner: Player) {
    owner.cursor.x =
      owner.x +
      this.range * Math.cos(owner.bodyDirection - mouseCoordinates.movementX / this.sensitivity);
    owner.cursor.y =
      owner.y +
      this.range * Math.sin(owner.bodyDirection - mouseCoordinates.movementX / this.sensitivity);
  }
}
const aroundCursor = new AroundCursor();
export default aroundCursor;
