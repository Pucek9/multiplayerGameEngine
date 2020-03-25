import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';
import Player from '../../models/Player';
import Cursor from './Cursor';

export class NoCursor extends Cursor {
  updateCursor(mouseCoordinates: MouseCoordinates, owner: Player) {}
}
const noCursor = new NoCursor();
export default noCursor;
