import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';
import Cursor from './Cursor';

export class NoCursor extends Cursor {
  updateCursor(mouseCoordinates: MouseCoordinates, owner) {}
}
const noCursor = new NoCursor();
export default noCursor;
