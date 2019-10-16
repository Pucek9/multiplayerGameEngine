import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';

export default abstract class Cursor {
  abstract updateCursor(mouseCoordinates: MouseCoordinates, owner);
}
