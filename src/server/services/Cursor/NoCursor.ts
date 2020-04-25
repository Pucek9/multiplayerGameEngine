import { MouseCoordinates } from '../../../shared/apiModels';

import Player from '../../models/Player';
import Cursor from './Cursor';

export class NoCursor extends Cursor {
  updateCursor(mouseCoordinates: MouseCoordinates, owner: Player) {
    undefined;
  }
}
const noCursor = new NoCursor();
export default noCursor;
