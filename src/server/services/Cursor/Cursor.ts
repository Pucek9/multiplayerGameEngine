import MouseCoordinates from '../../../shared/apiModels/MouseCoordinates';

import Player from '../../models/Player';

export default abstract class Cursor {
  abstract updateCursor(mouseCoordinates: MouseCoordinates, owner: Player);
}
