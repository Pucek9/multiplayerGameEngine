import { PlayerModel } from '../../../../../shared/models';

import StaticCamera from './StaticCamera';

export default class CursorCamera extends StaticCamera {
  protected observedObject: PlayerModel;

  constructor() {
    super();
  }

  update() {
    this.object.position.x = this.observedObject.cursor.x;
    this.object.position.y = this.observedObject.cursor.y;
  }
}
