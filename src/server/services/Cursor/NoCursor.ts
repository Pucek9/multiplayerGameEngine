import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';
import Cursor from './Cursor';
import Player from '../../models/Player';

export class NoCursor extends Cursor {
  updateCursor(mouseCoordinates: MouseCoordinates, owner: Player) {}
}
const noCursor = new NoCursor();
export default noCursor;
