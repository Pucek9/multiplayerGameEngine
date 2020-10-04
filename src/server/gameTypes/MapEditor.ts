import { MouseCoordinates, NewUser } from '../../shared/apiModels';

import Player from '../models/Player';
import SaveMap from '../models/powers/SaveMap';
import collisionDetector from '../services/CollisionDetector';
import Emitter from '../services/Emitter';
import BaseGame from './BaseGame';

export default class MapEditor extends BaseGame {
  pickupObjects = new Map();

  constructor(public emitter: Emitter, params: Partial<MapEditor>) {
    super(emitter, params);
  }

  connectPlayer(newPlayer: NewUser): Player {
    const player = super.connectPlayer(newPlayer);
    player.addAndSelectPower(new SaveMap());
    this.emitPowerInfo(player);
    return player;
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
    } else {
      this.pickupObjects.delete(player.id);
    }
  }

  mouseUp(owner: string) {
    const player = this.getPlayer(owner);
    player?.setMouseUp();
  }

  mouseRightClick(owner: string) {
    const player = this.getPlayer(owner);
    if (player.selectedPower?.useClickPower) {
      player.useClickPower(this);
      this.emitPowerInfo(player);
    }
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
}
