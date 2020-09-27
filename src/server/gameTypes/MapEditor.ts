import { MouseCoordinates } from '../../shared/apiModels';

import collisionDetector from '../services/CollisionDetector';
import Emitter from '../services/Emitter';
import BaseGame from './BaseGame';

export default class MapEditor extends BaseGame {
  pickupObjects = new Map();

  constructor(public emitter: Emitter, params: Partial<MapEditor>) {
    super(emitter, params);
  }

  mouseClick(owner: string) {
    const player = this.getPlayer(owner);
    player?.setMouseDown();
    if (player) {
      this.trySelectObject(player);
    }
  }

  trySelectObject(player) {
    const allObjects = [...this.getStaticObjects(), ...this.getItemGenerators()];
    const object = collisionDetector.detectObjectByCollision(player.cursor, allObjects);
    if (object) {
      this.pickupObjects.set(player.id, object);
    }
  }

  mouseUp(owner: string) {
    const player = this.getPlayer(owner);
    player?.setMouseUp();
    this.pickupObjects.delete(owner);
  }

  updateCursor(mouseCoordinates: MouseCoordinates) {
    super.updateCursor(mouseCoordinates);
    const player = this.getPlayer(mouseCoordinates.owner);
    if (player?.isMouseDown() && this.pickupObjects.has(player.id)) {
      const object = this.pickupObjects.get(player.id);
      object.x = player.cursor.x;
      object.y = player.cursor.y;
      this.emitter.emitMessage(player.id, object ?? player.cursor);
      this.emitter.emitStaticObjects(this.roomName, this);
    }
  }

  mouseMove;
}
